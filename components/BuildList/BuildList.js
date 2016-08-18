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
import {Tooltip,IconToggle,Icon,DataTable,TableHeader,IconButton,Button,Dialog,DialogActions,DialogContent,DialogTitle,Textfield } from "react-mdl";
import { forjson  } from "../AjaxJson";
import s from "./cusstom.css";
import Qrcodediv from "../Qrcodediv"
import {TweenOneGroup} from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import env from "../../env.json"
import Chipbroad from "clipboard"
import {Message } from "rctui";

class BuildList extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.count=0;

  }
  copyLink(link){
    //Chipbroad.write(link);
    //<button class="btn" data-clipboard-action="copy" data-clipboard-target="div">Copy</button>
    Message.show("已经复制到剪切板");
  }

  handelDownload(filelink,e){
    e.preventDefault();
    e.stopPropagation();

    window.open("http://"+env.ip+"/file/filelink?filename="+filelink);
    // forjson("http://127.0.0.1:9090/file/filelink?filename="+filelink,null,(data)=>{
    //
    // });
    return false;
  }

  componentDidMount(){
    new Chipbroad(".forCopyLink");
  }

  render() {


    return (
      <div  className={s.buildlist}>
        <QueueAnim

          type={['right', 'left']}
          ease={['easeOutQuart', 'easeInOutQuart']}>
          {
            this.props.appversionbuild.show?
              <ul className={s.listyle}>
                {
                  this.props.appversionbuild.length==0?
                    <li>没有构建</li>
                    :
                  this.props.appversionbuild.map((v)=>{
                    return (
                      <li className={s.listlike} key={v.build+v.appid+v.version+v.platform+Math.random()}>
                        <span>{
                          v.env.indexOf("-M")>-1||v.env.indexOf("-P")>-1?v.env:"构建号:"
                        }{v.build}</span>
                        <Tooltip label="复制连接" large position="top">
                          <IconButton
                            data-clipboard-text={"http://"+env.ip+"/file/filelink?filename="+v.filelink}
                            className={s.myfontsize+" forCopyLink"}
                            onClick={this.copyLink.bind(this,"http://"+env.ip+"/file/filelink?filename="+v.filelink)}
                            name="content_copy">
                          </IconButton>
                        </Tooltip>
                        <Tooltip label="点击下载(右键可以复制链接)" large position="top">
                            <IconButton
                              name="file_download"
                              onClick={this.handelDownload.bind(this,v.filelink)}
                              href={"http://"+env.ip+"/file/filelink?filename="+v.filelink}>
                            </IconButton>
                          </Tooltip>

                        {
                          //https://192.168.10.193/installIPA.plist
                          v.platform=='ios'?
                            <Qrcodediv url={"https://"+window.location.host+"/file/itemservices?filename="+v.filelink}></Qrcodediv>
                            :<Qrcodediv url={"http://"+env.ip+"/file/filelink?filename="+v.filelink}></Qrcodediv>
                        }
                        <Qrcodediv url={"http://"+window.location.host+"/m?appid="+v.appid+"&version="+v.version+"&platform="+v.platform+"&env="+v.env+"&build="+v.build}></Qrcodediv>
                        <Qrcodediv url={"itms-services://?action=download-manifest&url="+"https://"+env.httpsip+"/file/filelink?filename="+v.filelink+".plist"}></Qrcodediv>



                      </li>
                    )
                  })
                }
              </ul>
              :null
          }
      </QueueAnim>
      </div>
    );
  }
}

export default BuildList;
/*
  //生成一个临时界面
 <Qrcodediv url={"http://"+env.ip+"/m?appid="+v.appid+"&version="+v.version+"&platform="+v.platform+"&env="+v.env+"&build="+v.build}></Qrcodediv>

 <Qrcodediv url={"itms-services://?action=download-manifest&url="+"https://"+env.httpsip+"/file/filelink?filename="+v.filelink+".plist"}></Qrcodediv>

 //<QrcodeSpan></QrcodeSpan>
 <Icon name="file_download" className={s.svgcss}></Icon>
 */
