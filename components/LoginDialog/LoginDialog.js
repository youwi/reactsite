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
import { findDOMNode } from 'react-dom';

class LoginDialog extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.username="";
    this.state.passwd="";
    this.state.openDialog=this.props.openDialog||false;
    console.log("    this.state.openDialog:"+    this.state.openDialog);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.loginStep3 = this.loginStep3.bind(this);

    pubsub.subscribe("OPEN_LOGIN_DIALOG",this.handleOpenDialog);
    pubsub.subscribe("CLOSE_LOGIN_DIALOG",this.handleCloseDialog);



  }
  handleFirefox(){
    //kk.style.display='none';
    const bodyHeight = document.body.clientHeight;
    const dialogHeight = this.refs.dia.clientHeight;
    findDOMNode(this.refs.dia).style.position = 'fixed';
    findDOMNode(this.refs.dia).style.top = `${(bodyHeight - dialogHeight) / 2}px`;
    findDOMNode(this.refs.dia).style.zIndex = 9;
    findDOMNode(this.refs.dia).style.background='white';
    findDOMNode(this.refs.dia).style.left='40%';
  }



  handleOpenDialog(id,msg){
    console.log("handleOpenDialog");
    findDOMNode(this.refs.dia).style.display='';
    var dd= findDOMNode(this.refs.dia);
    this.state.msg=msg;
    this.setState({
      openDialog: true
    });
    dd.style.top='100px';
  }

  handleCloseDialog() {
    findDOMNode(this.refs.dia).style.display='none';
    this.setState({
      openDialog: false
    });
  }
  loginStep3(){
    this.handleCloseDialog();
    console.log(this.state.username);
    console.log(this.state.passwd);
    forjson("http://127.0.0.1:9090/login.rest",{username:this.state.username,passwd:this.state.passwd},function (data) {
      pubsub.publish("LOGIN_SUCCESS",data);
      pubsub.publish("APP_MAIN_RELOAD");
    });
    // // forjson("http://127.0.0.1:3000/3333",null,function(data){
    // //     tmp=data;
    // //   at.setState("allapplist",data);
    // //   console.log("aafawfawaaaaaaaaaaaa");
    // // });
  }

  componentDidMount(){
    //this.refs.dia.style.top='100px';
   if(navigator.userAgent.indexOf("Firefox")>0)
      this.handleFirefox();
  }

  handleEnter(o,e){

   // console.log(o.key);
    if(o.key=="Enter")
      this.loginStep3();
  }

  render() {

    return (
      <div onKeyDown={this.handleEnter.bind(this)}>

         <Dialog ref='dia' open={this.state.openDialog} onCancel={this.handleCloseDialog} style={{top:'100px'}}>
          <DialogTitle>认证</DialogTitle>
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
            {this.state.msg}
          </DialogContent>

          <DialogActions>
            <Button type='button' raised accent ripple onClick={this.loginStep3}>登录</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default LoginDialog;
