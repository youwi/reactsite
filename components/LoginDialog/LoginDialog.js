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
import pubsub from "pubsub-js";
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Textfield } from "react-mdl";
import { forjson  } from "../AjaxJson";

class LoginDialog extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.username="SD";
    this.state.openDialog=this.props.openDialog||false;
    console.log("    this.state.openDialog:"+    this.state.openDialog);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.loginStep3 = this.loginStep3.bind(this);

    pubsub.subscribe("OPEN_LOGIN_DIALOG",this.handleOpenDialog);
    pubsub.subscribe("CLOSE_LOGIN_DIALOG",this.handleCloseDialog);

  }

  handleOpenDialog(){
    console.log("handleOpenDialog");
    this.setState({
      openDialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      openDialog: false
    });
  }
  loginStep3(){
    this.handleCloseDialog();
    console.log(this.state.username);
    console.log(this.state.passwd);
    forjson("/login.rest",null,function (data) {
      pubsub.publish("LOGIN_SUCCESS",data);
    });
    // // forjson("http://127.0.0.1:3000/3333",null,function(data){
    // //     tmp=data;
    // //   at.setState("allapplist",data);
    // //   console.log("aafawfawaaaaaaaaaaaa");
    // // });
  }

  render() {

    return (
      <div id="aa77">

         <Dialog open={this.state.openDialog} onCancel={this.handleCloseDialog}>
          <DialogTitle>输入</DialogTitle>
          <DialogContent>
            <form>
            <Textfield value={this.state.username}
            onChange={(e) => {this.setState({username:e.target.value})}}
            label="用户名:"
            floatingLabel
            style={{width: '200px'}}
          />
            <Textfield value={this.state.passwd} type="password"
              onChange={(e) => {this.setState({passwd:e.target.value})}}
              label="密码:"
              floatingLabel
              style={{width: '200px'}}
            />
              </form>
          </DialogContent>
          <DialogActions>

            <Button type='button' raised accent ripple onClick={this.loginStep3}>登陆</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginDialog;
