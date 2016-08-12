/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-console, global-require */

const fs = require('fs');
const del = require('del');
const ejs = require('ejs');
const webpack = require('webpack');

// TODO: Update configuration settings
const config = {
  title: 'ADP',        // Your website title
  url: 'http://adp.wkzf',          // Your website URL
  project: 'http://stash.wkzf/projects/QA',      // Firebase project. See README.md -> How to Deploy
  trackingID: 'yu',                 // Google Analytics Site's ID
};

const tasks = new Map(); // The collection of automation tasks ('clean', 'build', 'publish', etc.)

function run(task) {
  const start = new Date();
  console.log(`Starting '${task}'...`);
  return Promise.resolve().then(() => tasks.get(task)()).then(() => {
    console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
  }, err => console.error(err.stack));
}

//
// Clean up the output directory
// -----------------------------------------------------------------------------
tasks.set('clean', () => del(['public/dist/*', '!public/dist/.git'], { dot: true }));

//
// Copy ./index.html into the /public folder
// -----------------------------------------------------------------------------
tasks.set('html', () => {
  const webpackConfig = require('./webpack.config');
  const assets = JSON.parse(fs.readFileSync('./public/dist/assets.json', 'utf8'));
  const template = fs.readFileSync('./public/index.ejs', 'utf8');
  const render = ejs.compile(template, { filename: './public/index.ejs' });
  const output = render({ debug: webpackConfig.debug, bundle: assets.main.js, config });
  fs.writeFileSync('./public/index.html', output, 'utf8');
});

tasks.set('build-prd', () => {



  var  hostport=JSON.parse(fs.readFileSync(("./env.json"))).prd;
  const webpackConfig = require('./webpack.config');
  const assets = JSON.parse(fs.readFileSync('./public/dist/assets.json', 'utf8'));
  const template = fs.readFileSync('./public/index.ejs', 'utf8');
  const render = ejs.compile(template, { filename: './public/index.ejs' });
  const output = render({ debug: false, bundle: "main.js", config });
  fs.writeFileSync('./public/release/index.html', output, 'utf8');


  const mainjs = fs.readFileSync('./public/'+assets.main.js, 'utf8');
  fs.writeFileSync("./public/release/main.js",mainjs,'utf-8');

  var fse = require('fs-extra');

  fse.copySync("./public/cdn","./public/release/cdn/" );
 // fse.copySync("./public/*.png","./public/release/"  );

});

//
// Generate sitemap.xml
// -----------------------------------------------------------------------------
tasks.set('sitemap', () => {
  const urls = require('./routes.json')
    .filter(x => !x.path.includes(':'))
    .map(x => ({ loc: x.path }));
  const template = fs.readFileSync('./public/sitemap.ejs', 'utf8');
  const render = ejs.compile(template, { filename: './public/sitemap.ejs' });
  const output = render({ config, urls });
  fs.writeFileSync('public/sitemap.xml', output, 'utf8');
});

//
// Bundle JavaScript, CSS and image files with Webpack
// -----------------------------------------------------------------------------
tasks.set('bundle', () => {
  const webpackConfig = require('./webpack.config');
  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackConfig.stats));
        resolve();
      }
    });
  });
});

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
tasks.set('build', () =>
      Promise.resolve()
      .then(()=> changePrd())
      .then(() => run('clean'))
      .then(() => run('bundle'))
      .then(() => run('html'))
      .then(() => run('sitemap'))
      .then(() => run("build-prd"))
);

//
// Build and publish the website
// -----------------------------------------------------------------------------
tasks.set('prd', () => {
  global.DEBUG = process.argv.includes('--debug') || false;

  return run('build')

});

function  changeDev() {
  fs.writeFileSync('./env.json', JSON.stringify({ip:'127.0.0.1:9090'}), 'utf8');
}
function  changePrd() {
  fs.writeFileSync('./env.json', JSON.stringify({ip:'10.0.18.47:8101'}), 'utf8');
}
//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------
tasks.set('start', () => {
  changeDev();
  let count = 0;
  global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
  return run('clean').then(() => new Promise(resolve => {
    const bs = require('browser-sync').create();
    const webpackConfig = require('./webpack.config');
    const compiler = webpack(webpackConfig);
    // Node.js middleware that compiles application in watch mode with HMR support
    // http://webpack.github.io/docs/webpack-dev-middleware.html
    const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: webpackConfig.stats,
    });
    const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
    compiler.plugin('done', stats => {
      // Generate index.html page
      const bundle = stats.compilation.chunks.find(x => x.name === 'main').files[0];
      const template = fs.readFileSync('./public/index.ejs', 'utf8');
      const render = ejs.compile(template, { filename: './public/index.ejs' });
      const output = render({ debug: true, bundle: `/dist/${bundle}`, config });
      fs.writeFileSync('./public/index.html', output, 'utf8');

      // Launch Browsersync after the initial bundling is complete
      if (++count === 1) {
        bs.init({
          server: {
            baseDir: 'public',
            middleware: [
              webpackDevMiddleware,
              webpackHotMiddleware,
              // Serve index.html for all unknown requests
              (req, res, next) => {
                if (req.headers.accept && req.headers.accept.startsWith('text/html')) {
                  req.url = '/index.html'; // eslint-disable-line no-param-reassign
                }
                next();
              },
            ],
          },
        }, resolve);
      }
    });
  }));
});


// Execute the specified task or default one. E.g.: node run build
run(process.argv[2] || 'start');
