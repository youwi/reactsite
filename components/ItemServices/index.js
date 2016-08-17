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
import Layout from '../../components/Layout';

import AppMainPanel from '../../components/AppMainPanel/AppMainPanel'
import { connect } from 'react-redux';
import LoginDialog from "../../components/LoginDialog";
import { Provider } from 'react-redux';
import Store from "../../core/store.js";
import {App} from "../../components/TodoApp/TodoApp";
import GlobalToast from "../../components/GlobalToast";
import UploadForm from "../../components/UploadAppForm";
import AddAppForm from  "../../components/AddAppForm";
import {  forjson } from "../AjaxJson";

import {Grid,Cell,Button,Card,CardTitle,CardText} from "react-mdl"
import env from "../../env.json";

class ItemServices extends React.Component {


  constructor(props) {
    super(props);
    this.state = {};
    this.getQueryString.bind(this);

  }
  componentDidMount() {

;

    this.setState({appid:this.getQueryString("appid"),
     version:this.getQueryString("version"),
     platform:this.getQueryString("platform"),
     env:this.getQueryString("env"),
     build:this.getQueryString("build")
    });
    forjson("http://127.0.0.1:9090/getsingleapp.rest",{
      appid:this.getQueryString("appid"),
      version:this.getQueryString("version"),
      platform:this.getQueryString("platform"),
      env:this.getQueryString("env"),
      build:this.getQueryString("build")
    },(data)=>{
      this.setState(data);
    })

  }
  getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  render() {
    return (
      <div >
        <Grid className="demo-grid-ruler">
          <Cell col={4}>
            <Card   shadow={2} style={{width: '100%', height: '150px'}}   >
              <CardTitle expand style={{color: '#fff', background: 'url('+this.state.appicon+') center no-repeat #46B6AC',backgroundSize: '100%'}}>
                version:{this.state.version}<br/>
                build:{this.state.build}<br/>
                revision:{this.state.revision}
              </CardTitle>
              <CardText>{this.state.appname}</CardText>
            </Card>
          </Cell>
          <Cell col={4}>
              <center>
                  {
                    //<Qrcodediv url={
                    this.state.appid==null?"参数错误"
                      :<a href={"itms-services://?action=download-manifest&url=https://"+env.httpsip+"/file/filelink?filelink="+this.state.filelink+".plist"} >
                        <Button raised ripple>点击安装</Button>
                      </a>
                  }
              </center>
            </Cell>
                  <Cell col={4}>
                    <center>QA测试团队</center>
                </Cell>
          </Grid>
      </div>
    )
  }
}

//export default connect(select)(HomePage);
export default ItemServices;
