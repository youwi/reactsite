/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import history from '../../core/history';
import {Icon } from "react-mdl";
import QRCode from "../rc-qrcode";
import s from "./QrcodedivTip.css"
import ReactDOM from "react-dom"

class AaButton extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.state.display="none";
  }


  handleClick = (event) => {

    this.setState({show:!this.state.show});

  };

  render() {

    const { to, ...props } = this.props; // eslint-disable-line no-use-before-define
    return (
        <button className={s.aabutton}></button>

    )
  }

}

export default AaButton;
