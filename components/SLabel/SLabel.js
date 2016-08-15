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
import s from "./cus.css"

class SLabel extends React.Component {

  static propTypes = {

  };

  constructor(props){
    super();
    this.state={};
    this.state.clicked=props.active.a||false;
  }
  componentDidMount(){
    // if(this.props.active.a=="true")
    //   this.refs.mm.style.background='#61f161 ';
    // else
    //   this.refs.mm.style.background="#edfaed";
  }

  handleClick = (event) => {
    //console.log("...AA");
    this.props.onClick(event);
    // if(this.props.active.a=="true")
    //   this.refs.mm.style.background='#61f161';
    // else
    //   this.refs.mm.style.background="#edfaed";
    this.setState({clicked:this.props.active});
    this.state.clicked=!this.state.clicked;
    //+" "+this.state.clicked?s.bk:""
  };

  render() {
    return <span ref="mm"
    className={this.props.active.a=="true"?s.bk:s.fix}
      onClick={this.handleClick.bind(this)}
    >{this.props.children}</span>
  }

}

export default SLabel;
