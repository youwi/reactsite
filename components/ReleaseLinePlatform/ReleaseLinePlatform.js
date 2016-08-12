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
import {Card,CardActions,CardText,CardTitle,CardMenu,Tab,Tabs,Icon,DataTable,TableHeader,IconButton,Button,Dialog,DialogActions,DialogContent,DialogTitle,Textfield } from "react-mdl";
import { forjson  } from "../AjaxJson";
import s from "./cusstom.css";
import BuildList from "../BuildList/BuildList";
import SLabel from "../SLabel";

class ReleaseLinePlatform extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.buildlist={};
    this.state.ioslist=[];
    this.state.androidlist=[];
    this.state.env="dev";
    //   this.state.buildlist={}
    this.state.appversion=this.props.appversion||[];

  }
  componentDidMount(){
    this.envTabChange(0);
  }

  handelSelectAppVersionPlatform(obj,e){

    console.log("...");
    forjson("http://127.0.0.1:9090/getappbuild.rest",obj,(data)=>{
      data.sort((a,b)=>{
        return a.build<b.build;
      });


      if(this.state.buildlist[obj.appid+obj.version] ==null )
        this.state.buildlist[obj.appid+obj.version]={}
      data.show=!this.state.buildlist[obj.appid+obj.version].show||false;
      this.state.buildlist[obj.appid+obj.version]=data;
      this.setState({buildlist:this.state.buildlist});
    });
  }
  envTabChange(tabId){


    var env=["dev","test","slim","prd"];
    var platform=["ios","android"];
    forjson("http://127.0.0.1:9090/getapp.rest",{appid:this.props.appid},(data)=> {
      data.sort((a, b)=> {
        return a.version < b.version;
      });
      this.state.ioslist=[];
      this.state.androidlist=[];
      for(var item of data){
        if(item.platform=="ios")
          this.state.ioslist.push(item);
        else(item.platform=="android")
          this.state.androidlist.push(item);
      }
      this.setState({env:env[tabId],activeTab: tabId,appversion:data,androidlist:  this.state.androidlist,ioslist:  this.state.ioslist});
    });
  }



  render() {

    return (

      <div>
        <IconButton name="keyboard_arrow_left" style={{    position: 'fixed',top: '50%'}} onClick={()=>{pubsub.publish("APP_MAIN")}}/>

        <div style={{display: 'table', width: '100%'}}>
          <ul>
            <li className={s.listyle}>
              {
                ["android","ios"].map((platformname)=>{
                  return (
                    <Card className={s.bigcard}
                          shadow={1}  >
                      <CardActions border>
                        <Button colored>{platformname}</Button>
                      </CardActions>
                      <ul>
                        {
                          this.state[platformname+"list"].map((v)=>{
                            return (
                                <li key={v.version+v.appid} className={s.listyle}>
                                <span className={s.listdate}>
                                  <span>{v.version}</span>
                                  <svg aria-hidden="true"   height="16" version="1.1" viewBox="0 0 14 16" width="14">
                                     <path d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z"></path>
                                     </svg>
                                </span>

                                <div className={s.divmain}>
                                  <span>{v.appname}</span><br/>
                                  <div className={s.platform} >
                                    <SLabel onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:'android',env:'dev'})}>dev</SLabel>
                                    <SLabel onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:'android',env:'test'})}>test</SLabel>
                                    <SLabel onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:'android',env:'slim'})}>slim</SLabel>
                                    <SLabel onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:'android',env:'prd'})}>prd</SLabel>
                                    <BuildList  appversionbuild={this.state.buildlist[v.appid+v.version]||[]}>
                                    </BuildList>
                                  </div>
                                </div>

                              </li>
                            )
                          })
                        }
                      </ul>
                      <CardText>

                      </CardText>


                      <CardMenu style={{color: '#fff'}}>
                        <IconButton name="share" />
                      </CardMenu>
                    </Card>
                  )


                })
              }


            </li>
            <li  className={s.listyle}>



            </li>
          </ul>
        </div>

        <br/>
        <IconButton name="keyboard_arrow_right" style={{    position: 'fixed',top: '50%' ,right:'10%'}} onClick={()=>{pubsub.publish("APP_MAIN")}}/>


      </div>
    );
  }
}

export default ReleaseLinePlatform;
/*

 */
