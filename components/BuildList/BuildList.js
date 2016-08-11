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
import {Icon,DataTable,TableHeader,IconButton,Button,Dialog,DialogActions,DialogContent,DialogTitle,Textfield } from "react-mdl";
import { forjson  } from "../AjaxJson";
import s from "./cusstom.css";
import Qrcodediv from "../Qrcodediv"
import {TweenOneGroup} from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';

class BuildList extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.count=0;

  }

  handelDownload(filelink,e){
    e.preventDefault();
    e.stopPropagation();
    window.open("http://127.0.0.1:9090/file/filelink?filename="+filelink);
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
                        <spain>build:{v.build}</spain>
                        <span><a onClick={this.handelDownload.bind(this,v.filelink)}
                                 href={"http://127.0.0.1:9090/file/filelink?filelink="+v.filelink}>下载</a>
                        </span>
                          <Qrcodediv url={"http://127.0.0.1:9090/file/filelink?filelink="+v.filelink}></Qrcodediv>
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
 */
