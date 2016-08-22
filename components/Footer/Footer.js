/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';

//position: ' '
function Footer() {


  return (
    <footer className="mdl-mini-footer"     style={{ bottom: '0px',width: '100%',padding:'1px 16px'}}>
      <div className="mdl-mini-footer__left-section">

        <ul className="mdl-mini-footer__link-list">

          <li><Link to="/about">About © WKZF-QA-Team</Link></li>
          <li><Link to="/about">Version 1.0</Link></li>

        </ul>
      </div>
      <div className="mdl-mini-footer__right-section">
        <ul className="mdl-mini-footer__link-list">
          <li className="mdl-mini-footer--social-btn" style={{ backgroundColor: 'transparent' }}></li>

        </ul>
      </div>
    </footer>
  );
}

export default Footer;
/*
 <li><Link to="/privacy">Privacy & Terms</Link></li>
 <li><Link to="/tree">浏览文件</Link></li>
 <div className="mdl-logo">© WKZF-QA-Team</div>
 */
