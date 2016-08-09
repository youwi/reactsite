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
import {Snackbar,Icon,DataTable,TableHeader,IconButton,Button,Dialog,DialogActions,DialogContent,DialogTitle,Textfield } from "react-mdl";
import { forjson  } from "../AjaxJson";

import BuildList from "../BuildList/BuildList"

import s from "./GlobalToast.css";

class GlobalToast extends React.Component{

  constructor(props) {
    super(props);
      this.state={};
      this.state.isopen=false;
      pubsub.subscribe("TOAST_INFO",(type,data)=>{
        this.setState({ isopen:true,info:data});
      });
  }



    render() {

      return (

        <Snackbar
          className={s.shadow}
          active={this.state.isopen}
          onClick={()=>{}}
          onTimeout={()=>{this.setState({isopen:false})}}
          action="x">{this.state.info}</Snackbar>
      );
    }
}

export default GlobalToast;
/*

 */
