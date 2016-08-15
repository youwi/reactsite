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

class BuildList extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.count=0;

  }

  handelDownload(filelink,e){
    e.preventDefault();
    e.stopPropagation();

    window.open("http://"+env.ip+"/file/filelink?filename="+filelink);
    // forjson("http://127.0.0.1:9090/file/filelink?filelink="+filelink,null,(data)=>{
    //
    // });
    return false;
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
                        <span>build:{v.build}</span>
                        <Tooltip label="复制连接" large position="top">
                          <IconButton
                            className={s.myfontsize}
                            name="content_copy">
                          </IconButton>
                        </Tooltip>
                        <Tooltip label="点击下载(右键可以复制链接)" large position="top">
                            <IconButton
                              name="file_download"
                              onClick={this.handelDownload.bind(this,v.filelink)}
                              href={"http://"+env.ip+"/file/filelink?filelink="+v.filelink}>
                            </IconButton>
                          </Tooltip>


                          <Qrcodediv url={"http://"+env.ip+"/file/filelink?filelink="+v.filelink}></Qrcodediv>
                     
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
 //<QrcodeSpan></QrcodeSpan>
 <Icon name="file_download" className={s.svgcss}></Icon>
 */
