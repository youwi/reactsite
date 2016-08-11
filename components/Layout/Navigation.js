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
import {forjson}  from "../AjaxJson";

class Navigation extends React.Component {

  constructor({dispatch}){
    super();
    this.dispatch=dispatch;
    this.state={};
    this.state.openDialog='';//this.props.openDialog;
    pubsub.subscribe("LOGIN_SUCCESS",(type,data)=>{
      this.setState( {username:data.name,token:data.token} );
      console.log("LOGIN_SUCCESS")});
 
  }

  componentDidMount() {
    forjson("http://127.0.0.1:9090/userinfo.rest",null,(data)=> {
      this.setState({username: data.username});
    });
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
    this.setState({username:null,token:null});
    localStorage.token=null;
    pubsub.publish("LOGIN_OUT");
   }

  trigerLoginSuccess(){


  }

  render() {
    const { dispatch, visibleTodos, visibilityFilter } = this.props;
    return (
      <nav className="mdl-navigation" ref="root">

        <Link className="mdl-navigation__link" to="#">{this.state.username}
            <IconButton name="account_circle" id="demo-menu-lower-right" />
            <Menu target="demo-menu-lower-right" align="right">
              <li className="mdl-menu__item" onClick={this.trigerLogoutStep.bind(this)}>注销              </li>
              {
                this.state.username?
                  <li className="mdl-menu__item">{this.state.username}</li>
                :
                   <li className="mdl-menu__item" onClick={this.trigerLoginStep.bind(this)}>登陆</li>

              }

            </Menu>
        </Link>
        <IconButton name="file_upload" className="material-icons" onClick={ () => {pubsub.publish("OPEN_UPLOAD_FORM")} }>file_upload</IconButton>
      </nav>
    );
  }
}
export default connect()(Navigation)
connect()(LoginDialog)

