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
import ReleaseLineVersion from "../ReleaseLineVersion"
import {Message} from "rctui"

class ReleaseLinePlatform extends React.Component{

  constructor(props){
    super(props);
    this.state = {};
    this.state.buildlist={};
    this.state.ioslist=[];
    this.state.androidlist=[];
    this.state.env="dev";
    this.state.active=[ ];
    //   this.state.buildlist={}
    this.state.appversion=this.props.appversion||[];
    this.state.clickcount=0;
    this.activeOne.bind(this);
    this.sortutil.bind(this);
  }
  componentDidMount(){
    this.envTabChange(0);
  }

  /**
   * 双重排序工具
   * @param data
     */
  sortutil(data){
    data.sort((a,b)=> {
      if (a.version != null && b.version != null) {
        try{
          return new Number(a.version) -new Number(b.version)
        } catch(e){
          return a.version > b.version
        }
      }
      if (a.build != null && b.build != null) {
        try{
          return new Number(a.build) -new Number(b.build)
        } catch(e){
          return a.build > b.build
        }
      }
    })
    }

  /**
   * 把字符串延长,去杂
   *
   * @param src
     */
  fill(src){
    var it=8;
    src=src+"";
    var ia=src.indexOf(".");
    src=src.replace(/\./g,"");
    src=src.replace("-","");
    var ib=src.length;

    for(var i=0;i<it-(ib-ia);i++){
      src=src+"0";
    }
    //src=src.substring(0,5);
    return 0+src;
  }

  fill8(src){
    src=src+"";
    var la=src.length;
    for(var i=0;i<3-la;i++){
      src='0'+src;
    }
    return src;
  }

  handelSelectAppVersionPlatform(obj,e){

    forjson("http://127.0.0.1:9090/getappbuild.rest",obj,(data)=>{
      this.state.clickcount++;
      var cid=obj.appid+obj.version+obj.platform;
      data.sort((a,b)=>{
        return b.build-a.build
      });
      if(this.state.buildlist[cid] ==null )
        this.state.buildlist[cid]={};
      //data.show=!this.state.buildlist[obj.appid+obj.version+obj.platform].show||false;
      data.show=true;

      if( this.state.currbuildlistdom==cid+obj.env){
        data.show=false;
        if(this.state.clickcount%2==1)
          data.show=true;
      }
      else{
        this.state.currbuildlistdom=cid+obj.env;
        data.show=true;
        this.state.clickcount=1;
      }

      this.state.buildlist[cid]=data;
      this.setState({buildlist:this.state.buildlist,active:this.state.active});
    });
    this.activeOne(obj);
    // obj.platform=obj.platform=='ios'?"android":"ios";
    // if(obj.sync) return;
    // obj.sync=true;
    // this.handelSelectAppVersionPlatform(obj);
  }

  activeOne(obj){
    ['dev','test','slim','prd','prd-promotion','prd-market'].map((item,i)=>{
      var vid= obj.appid+obj.version+obj.platform;
      if(this.state.active[vid]==null) this.state.active[vid]=[false,false,false,false,false,false];
      obj.env==item?this.state.active[vid][i]=true:this.state.active[vid][i]=false;
    })
  }

  envTabChange(tabId){


    var env=["dev","test","slim","prd"];
    var platform=["ios","android"];
    forjson("http://127.0.0.1:9090/getapp.rest",{appid:this.props.appid},(data)=> {
     // this.state.appname=data[0].appname;
     data= data.sort((a, b)=> {
       var pa=a.version.split(".");
       var pb=b.version.split(".");
       var ka="";
       var kb="";
       var la=pa.length;
       var lb=pb.length;
       for(var i=0;i<5-la;i++){
         pa.push(0);
       }
       for(var i=0;i<5-lb;i++){
         pb.push(0);
       }
       for(var i=0;i<5;i++){
         ka=ka+this.fill8(pa[i]);
         kb=kb+this.fill8(pb[i]);
       }
       return new Number(kb)-new Number(ka);
      });
      this.state.ioslist=[];
      this.state.androidlist=[];
      for(var item of data){
        if(item.platform=="ios")
          this.state.ioslist.push(item);
        else(item.platform=="android")
          this.state.androidlist.push(item);
      }
      this.setState({ env:env[tabId],activeTab: tabId,appversion:data,androidlist:  this.state.androidlist,ioslist:  this.state.ioslist});
    });
  }
  updateChannel(e){
  //  console.log(e)
    if(e.altlKey)
      forjson("http://127.0.0.1:9090/updatechannel.rest",{appid:this.props.appid,appname:this.props.appname,version:1},(data)=>{

        Message.show("更新渠道包返回结果:"+data);
      })
  }



  render() {
    if(this.state.gotoVersion)
      return <ReleaseLineVersion appid={this.props.appid}/>
    return (

      <div>
        <Button style={{left: '48%',marginTop: '20px', textTransform: 'none'}} onClick={this.updateChannel.bind(this)} ripple>{this.props.appname}</Button>

        <div style={{display: 'table', width: '100%'}}>
          <ul>
            <li className={s.listyle}>
              {
                ["android","ios"].map((platformname)=>{
                  var hi=window.screen.availHeight > document.body.clientHeight*2?window.screen.availHeight:document.body.clientHeight-172;
                  var h=document.body.clientHeight-240;
                  return (
                    <Card className={s.bigcard}  key={platformname}  style={{height:h,overflowY: 'scroll'}}
                          shadow={1}  >
                      <CardActions border>
                        {
                          platformname=='android'?
                          <div><IconButton name={platformname}></IconButton>Android</div>
                            :
                          <div><IconButton name="phone_iphone"></IconButton>iOS</div>
                      }

                      </CardActions>
                      <ul>
                        {
                          this.state[platformname+"list"].map((v,i)=>{
                            var vid= v.appid+v.version+platformname;
                            if(this.state.active[vid]==null) this.state.active[vid]=[false,false,false,false,false,false];
                            if(v.platform==platformname)
                            return (
                                <li key={v.version+v.appid+platformname+i} className={s.listyle}>
                                <span className={s.listdate}>
                                  <span style={{color:'blue'}}>{v.version}</span>
                                  <svg aria-hidden="true"   height="16" version="1.1" viewBox="0 0 14 16" width="14">
                                     <path d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z"></path>
                                     </svg>
                                </span>

                                <div className={s.divmain}>

                                  <div className={s.platform} >
                                        <SLabel active={this.state.active[vid][1]} ref={vid+'test'}  onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:platformname,env:'test'})}>Test</SLabel>
                                        <SLabel active={this.state.active[vid][2]} ref={vid+'slim'}  onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:platformname,env:'slim'})}>Sim</SLabel>
                                        <SLabel active={this.state.active[vid][3]} ref={vid+'prd'}  onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:platformname,env:'prd'})}>Prod</SLabel>
                                      {
                                      platformname=='ios'?null:
                                        <SLabel active={this.state.active[vid][4]} ref={vid+'prd-promotion'}  onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:platformname,env:'prd-promotion'})}>Promotion</SLabel>
                                    }
                                    {
                                      platformname=='ios'?null:
                                        <SLabel active={this.state.active[vid][5]} ref={vid+'prd-market'}  onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:platformname,env:'prd-market'})}>Market</SLabel>
                                    }
                                    <BuildList  appversionbuild={this.state.buildlist[v.appid+v.version+platformname]||[]}>
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

      </div>
    );
  }
}

export default ReleaseLinePlatform;
/*
 <IconButton name="keyboard_arrow_right" style={{    position: 'fixed',top: '50%' ,right:'10%'}} onClick={()=>{pubsub.publish("APP_RELEASE_LINE_VERSION"),this.setState({gotoVersion:true})}}/>


 // <IconButton name="keyboard_arrow_left" style={{    position: 'fixed',top: '50%'}} onClick={()=>{pubsub.publish("APP_MAIN")}}/>

 <SLabel active={this.state.active[vid][0]} ref={vid+'dev'} onClick={this.handelSelectAppVersionPlatform.bind(this,{version:v.version,appid:v.appid,platform:platformname,env:'dev'})}>Dev</SLabel>

 */
