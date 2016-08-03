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
import {Icon,Menu,MenuItem,IconButton } from 'react-mdl';

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.refs.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.refs.root);
  }

  render() {
    return (
      <nav className="mdl-navigation" ref="root">
        <Link className="mdl-navigation__link" to="#">
            <IconButton name="account_circle" id="demo-menu-lower-right" />
            <Menu target="demo-menu-lower-right" align="right">
              <MenuItem>登陆</MenuItem>
              <MenuItem>注销</MenuItem>
            </Menu>
        </Link>
      </nav>
    );
  }
}

export default Navigation;
