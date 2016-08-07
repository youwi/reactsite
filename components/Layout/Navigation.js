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
import { connect } from 'react-redux'
import Link from '../Link';
import {Icon,Menu,MenuItem,IconButton } from 'react-mdl';
import LoginDialog from "../LoginDialog";
import pubsub from "pubsub-js";

class Navigation extends React.Component {

  constructor({dispatch}){
    super();
    this.dispatch=dispatch;
    this.state={};
    this.state.openDialog='';//this.props.openDialog;
  }

  componentDidMount() {
    window.componentHandler.upgradeElement(this.refs.root);
  }


  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.refs.root);
  }
  trigerLoginStep(){
    console.log("logint click");
    this.dispatch({type:"OPEN_LOGIN_DIALOG"});
    pubsub.publish("OPEN_LOGIN_DIALOG");
  }
  trigerLogoutStep(){
    console.log("logout click");
    this.dispatch({type:"OPEN_LOGIN_DIALOG"});
  }

  render() {
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <nav className="mdl-navigation" ref="root">

        <Link className="mdl-navigation__link" to="#">
            <IconButton name="account_circle" id="demo-menu-lower-right" />
            <Menu target="demo-menu-lower-right" align="right">
              <li className="mdl-menu__item" onClick={this.trigerLogoutStep()}>注销</li>
              <li className="mdl-menu__item" onClick={this.trigerLoginStep.bind(this)}>登陆</li>
            </Menu>
        </Link>
      </nav>
    );
  }
}
export default connect()(Navigation)
connect()(LoginDialog)

