
react-ui使用了特殊的css
优先使用less这个引导器
        
        { test: /\.(less)$/, loader: 'style-loader!css-loader!postcss-loader!less-loader' },
 
react-mdl使用了不同的css
       后使用css引导器
       
       test: /\.css/,
       loaders: [
         'style-loader',
         `css-loader?${JSON.stringify({
           sourceMap: isDebug,
           // CSS Modules https://github.com/css-modules/css-modules
           modules: true,
           localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
           // CSS Nano http://cssnano.co/options/
           minimize: !isDebug,
         })}`,
         'postcss-loader',
       ],
     },
