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
import Header from './Header';
import Navigation from './Navigation';
import Footer from '../Footer';
import s from './Layout.css';
import {IconButton } from "react-mdl";
import pubsub from "pubsub-js"

class Layout extends React.Component {

  constructor(props){
    super();
    this.state={};
    this.state.bodyhi=window.screen.availHeight > document.body.clientHeight*2?window.screen.availHeight:document.body.clientHeight-78;

  }

  componentDidMount() {
    this.state={};
    window.componentHandler.upgradeElement(this.refs.root);
    window.onresize=()=> {
      this.state.bodyhi=window.screen.availHeight > document.body.clientHeight*2?window.screen.availHeight:document.body.clientHeight-78;
      this.setState({bodyhi:this.state.bodyhi});

    };
  }

  componentWillUnmount() {
  //  window.componentHandler.downgradeElements(this.refs.root);
  }
//style={{height: '30px', position: 'relative','min-height':'34px'}}
  render() {
    var hi=window.screen.availHeight > document.body.clientHeight*2?window.screen.availHeight:document.body.clientHeight-80;
    return (
      <div className={s.fixnav} className="mdl-layout mdl-js-layout"   ref="root">
        <div className="mdl-layout__inner-container">
          <Header>
            <IconButton name="home" onClick={()=>{pubsub.publish("APP_MAIN")}}></IconButton>
            <span className="mdl-layout-title  ">应用分发</span>
            <div className="mdl-layout-spacer"></div>
            <Navigation />
          </Header>
          <main className="mdl-layout__content">
            <div className={s.content} {...this.props}  style={{overflow: 'auto',height:this.state.bodyhi+'px'}}/>

            <Footer />
          </main>
        </div>
      </div>
    );
  }
}

export default Layout;
//
