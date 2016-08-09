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
import s from "./Qrcodediv.css"
import ReactDOM from "react-dom"

class Qrcodediv extends React.Component {
  constructor(props){
    super(props);
    this.state={};
    this.state.display="none";
  }

  // static propTypes = {
  //   to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  //   onClick: PropTypes.func,
  // };

  handleClick = (event) => {

    if(this.state.display=="none")
      this.setState({display:"table"});
    if(this.state.display=="table")
      this.setState({display:"none"});

  };

  render() {

    const { to, ...props } = this.props; // eslint-disable-line no-use-before-define
    return (

      <span
        className={s.qrdiv}
        onClick={this.handleClick.bind(this)}
      >
              <svg
        x="0px" y="0px"  viewBox="0 0 401.994 401.994" className={s.svgcss}>
        <g>
          <g>
            <path d="M0,401.991h182.724V219.265H0V401.991z M36.542,255.813h109.636v109.352H36.542V255.813z"/>
            <rect x="73.089" y="292.355" width="36.544" height="36.549"/>
            <rect x="292.352" y="365.449" width="36.553" height="36.545"/>
            <rect x="365.442" y="365.449" width="36.552" height="36.545"/>
            <polygon points="365.446,255.813 328.904,255.813 328.904,219.265 219.265,219.265 219.265,401.991 255.813,401.991
                                255.813,292.355 292.352,292.355 292.352,328.904 401.991,328.904 401.991,219.265 401.991,219.265 365.446,219.265 		"/>
            <path d="M0,182.728h182.724V0H0V182.728z M36.542,36.542h109.636v109.636H36.542V36.542z"/>
            <rect x="73.089" y="73.089" width="36.544" height="36.547"/>
            <path d="M219.265,0v182.728h182.729V0H219.265z M365.446,146.178H255.813V36.542h109.633V146.178z"/>
            <rect x="292.352" y="73.089" width="36.553" height="36.547"/>
          </g>
        </g>
      </svg>
        <span style={{display:this.state.display}} >
        <QRCode renderer="canvas" content={this.props.url} scale="5" margin="20" background="white" foreground="green" />
      </span>
        </span>

    )
  }

}

export default Qrcodediv;
