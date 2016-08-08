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
import s from "./cusstom.css";

class ReleaseLineVersion extends React.Component{

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

  }

  render() {

    return (
      <div >
        <ul>
        <li>
          <span className={s.listdate}>
          <relative-time datetime="2016-06-16T03:36:27Z" title="2016年6月16日 GMT+8 上午11:36">on 16 Jun</relative-time>
            <svg aria-hidden="true" class="octicon octicon-tag" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z"></path></svg>
          </span>

          <div className={s.divmain}>
            <div class="tag-info commit js-details-container">
                  <span class="tag-name">v1.5.3</span>

              <ul class="tag-references">
                <li className={s.left}>
                  <a href="/pillarjs/path-to-regexp/archive/v1.5.3.zip" rel="nofollow">
                    <svg aria-hidden="true" class="octicon octicon-file-zip" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M8.5 1H1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V4.5L8.5 1zM11 14H1V2h3v1h1V2h3l3 3v9zM5 4V3h1v1H5zM4 4h1v1H4V4zm1 2V5h1v1H5zM4 6h1v1H4V6zm1 2V7h1v1H5zM4 9.28A2 2 0 0 0 3 11v1h4v-1a2 2 0 0 0-2-2V8H4v1.28zM6 10v1H4v-1h2z"></path></svg>
                    ipa
                  </a>
                </li>
              </ul>
            </div>

          </div>

        </li>
      </ul>
      </div>
    );
  }
}

export default ReleaseLineVersion;
