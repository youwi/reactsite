
import React from 'react';
import s from './custom.css';
import { Tooltip ,Icon,List,ListItem,ListItemAction,ListItemContent} from 'react-mdl';
import forjson from '../AjaxJson';

import Qrcodediv from '../Qrcodediv';

var allapplist=[{
  appid:"1",
  appname:"悟空找房",
  appicon:"http://static.wkzf.com/web_fe/img/source/public/logo.png",
  version:"1.2",
  desc:" 二手房网重庆建设工程信息网"
},
  {
    appid:"2",
    appname:"有房有客",
    appicon:"http://static.wkzf.com/web_fe/img/source/public/logo.png",
    version:"1.2",
    desc:" 二手房网重庆建设工程信息网"
  }];


class AppMainPanel extends React.Component {

  componentDidMount() {
    this._update=this._update.bind(this);
    console.log("121323123131");
    document.title = title;
    this.state.allapplist=allapplist;
    var tmp=this.state.allapplist;
    var at=this;
    forjson("http://127.0.0.1:3000/3333",null,function(data){
        tmp=data;
      at.setState("allapplist",data);
      console.log("aafawfawaaaaaaaaaaaa");
    });
  };

  _update(){
    var at=this;
    forjson("http://127.0.0.1:3000/3333",null,function(data){
      tmp=data;
      at.setState("allapplist",data);
      console.log("aafawfawaaaaaaaaaaaa");
    });

  };

  render() {



    return (
      <List style={{width: '650px'}}>
        {   allapplist.map(function (app) {
            return (
              <ListItem threeLine key={app.appid}>
                <ListItemContent avatar="person" subtitle={app.desc}>{app.appname}</ListItemContent>
                <ListItemAction>
                  <a href="#" onclick={this._update}>update</a>
                </ListItemAction>
              </ListItem>
            )
          })
        }

          <ListItem threeLine>
            <ListItemContent avatar="person" subtitle="Bryan Bad. He is also known for playing Hal in Malcom in the Middle.">悟空找房</ListItemContent>
            <ListItemAction>
              <a href="#"><Icon name="person" /></a>
            </ListItemAction>
          </ListItem>
          <ListItem threeLine>
            <ListItemContent avatar="person" subtitle="Aaron  also featured in the Need For Speed Movie.">Aaron Paul</ListItemContent>
            <ListItemAction>
              <a href="#"><Icon name="account_circle"></Icon></a>
            </ListItemAction>
          </ListItem>
          <ListItem threeLine>
            <ListItemContent avatar="person" subtitle="Bob Odinkrik played the role of Saul in Breaking Bad s in his own show now, called Better Call Saul.">Bob Odenkirk</ListItemContent>
            <ListItemAction>
              <a href="#"><Icon name="star" />二维码</a>
            </ListItemAction>
          </ListItem>
        </List>

    );
  }

}
export default AppMainPanel;
