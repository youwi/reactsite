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



class BuildList extends React.Component{

  constructor(props){
    super(props);
    this.state = {};

  }

  handelDownload(filename,e){
    e.preventDefault();
    e.stopPropagation();
    forjson("http://127.0.0.1:9090/file/filelink?filename="+filename,null,(data)=>{

    });


    return false;
  }


  render() {

    return (
      <div  >
        <ul className={s.listyle}>
          {
            this.props.appversionbuild.map((v)=>{
              return (
                <li className={s.listlike} key={v.build}>
                  <spain>build:{v.build}</spain>
                  <span><a onClick={this.handelDownload.bind(this,v.filename)}
                           href={"http://127.0.0.1:9090/file/filelink?filename="+v.filename}>下载</a>
                  </span>
                  <span></span>

                </li>
              )
            })
          }
        </ul>

      </div>
    );
  }
}

export default BuildList;
/*
 //<QrcodeSpan></QrcodeSpan>
 */
