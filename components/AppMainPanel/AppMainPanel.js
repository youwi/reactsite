
import React from 'react';
import s from './custom.css';
import { Tooltip ,Icon,List,ListItem,ListItemAction,ListItemContent} from 'react-mdl';
import {  DataTable,TableHeader,CardTitle,Card,CardActions,CardText,Button} from 'react-mdl';
import {forjson } from '../AjaxJson';
import pubsub from "pubsub-js";
import { findDOMNode } from 'react-dom';
import  ReleaseLineVersion  from "../ReleaseLineVersion"
import Qrcodediv from '../Qrcodediv';




class AppMainPanel extends React.Component {

  constructor(props){
    super(props);
    this.state={};
    this.state.allapplist=[];
    this.state.appversion=[];

    setTimeout(()=>{
      forjson("http://127.0.0.1:9090/getallapp.rest",{token:'123'},(data)=>{
          this.setState({allapplist:data||[]});
      });
    },2);

    pubsub.subscribe("APP_DETAIL",(type,data)=>{
      // this.setState( {appid:data.appid} );
      // this.setState({ token:data.token});
      // console.log("APP_DETAIL")
    });
    pubsub.subscribe("APP_MAIN",(type,data)=>{
      this.setState({selectapp:null});
      // this.setState({ token:data.token});
      // console.log("APP_DETAIL")
    });
  //  this.handelSelectApp.bind(this);
  }


  componentDidMount() {

    // console.log("121323123131");
    // document.title = "App分发平台";
    // this.state.allapplist=this.allapplist;
    // var tmp=this.state.allapplist;
    // var at=this;
    // // forjson("http://127.0.0.1:3000/3333",null,function(data){
    // //     tmp=data;
    // //   at.setState("allapplist",data);
    // //   console.log("aafawfawaaaaaaaaaaaa");
    // // });
  };

  handelSelectApp(appid,e){

      this.setState({selectapp:appid});
  }


  render() {
    if(this.state.selectapp){
      return (
        <ReleaseLineVersion appid={this.state.selectapp}></ReleaseLineVersion>
      )
    }else
    return (

      <List  >
        {   this.state.allapplist.map( (app)=> {
            return (

            <li className={s.postli} key={app.appid} ref={"domappid"+app.appid}>
              <div className={s.fade}>
              <Card   shadow={2} style={{width: '150px', height: '150px', margin: '10px',float: "left"}}
                    onClick={this.handelSelectApp.bind(this,app.appid)}>
              <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC'}}>{app.version}</CardTitle>
              <CardText>{app.appname}</CardText>
            </Card>
                </div>
              </li>

            )
          })
        }

        </List>

    );
  }

}
export default AppMainPanel;
// <ListItem threeLine key={app.appid} className={s.postli } className={ s.appblock}>
//   <ListItemContent avatar="person" subtitle={app.desc}>{app.appname}</ListItemContent>
//   <ListItemAction>
//     <img width="280" height="210" src="http://img.ui.cn/data/file/1/3/0/741031.png"
//          data-original="http://img.ui.cn/data/file/1/3/0/741031.png"
//          className="imgloadinglater"
//          alt="设计师们：金樽清酒斗十千，一组gif/jpg值万钱" rel="nofollow"
//     />
//   </ListItemAction>
// </ListItem>
//
// <li threeLine key={app.appid} className={s.postli } className={ s.appblock}>
//   <div className={s.shade}  ></div>
//   <div className={s.cover}>
//     <a href="#"  title="设计师们：我们的App">
//       <img  className={s.imgblock}
//             src="http://img.ui.cn/data/file/1/3/0/741031.png"
//             data-original="http://img.ui.cn/data/file/1/3/0/741031.png"
//
//             alt="设计师们：金樽清酒斗十千，一组gif/jpg值万钱"
//             rel="nofollow"  />
//     </a>
//   </div>
//   <div className={s.info} >
//     <h4 className={s.title +" "+s.ellipsis+" "+s.download}>设计师们：金樽清酒斗十千，一组gif/jpg值万钱</h4>
//     <div className={s.msg+" "+ s.mtn +" "+s.cl}>
//       <span className="classify">原创</span>
//       <span><i className="icon-eye" title="浏览数"></i><em>2024</em></span>
//       <span><i className="icon-comment" title="评论数" data-garbage="true"></i><em>14</em></span>
//       <span><i className="icon-leaf" title="点赞数"></i><em>14</em></span>
//     </div>
//     <p className="user cl">
//       <a href="http://i.ui.cn/ucenter/901200.html" target="_blank">
//         <img src="http://imgavater.ui.cn/avatar/0/0/2/1/901200.png?imageMogr2/auto-orient/crop/!1024x1024a7a0/thumbnail/60x60" title="BOSS直聘"/> <strong className="name">
//         <em>BOSS直聘</em>
//       </strong></a>
//     </p>
//   </div>
//   <div className={s.line}></div>
// </li>
