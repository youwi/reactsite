/**
 * post请求 得到json
 * @param url
 * @param data
 */

import pubsub from "pubsub-js";
var globalToken=null;

pubsub.subscribe("LOGIN_OUT",()=>{globalToken=null});

export function forjson(url, data,callback) {

  //var os = require("os");
  //var hostname = os.hostname();
  var hostport="10.0.18.47:8101";
 // var hostport="127.0.0.1:8080";
  url=url.replace(/(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]):\d+/,hostport);

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
  xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");

  if(globalToken==null && localStorage.token !=null)
    globalToken=localStorage.token;
  if(globalToken!=null && localStorage.token ==null)
    localStorage.token=globalToken;

  if(data==null) data={};
  data.token=globalToken;
  data=serForm(data);


  xhr.addEventListener('readystatechange', function() {
    if(4 === xhr.readyState && 200 === xhr.status) {
     // if(url.indexOf("/file/")>0)
        let data = JSON.parse(xhr.responseText);
      if(data.token) {
        globalToken=data.token;
        localStorage.token=data.token;
      }
      if(data.state==0)
        pubsub.publish("OPEN_LOGIN_DIALOG");
      else if(data.state==-4)
        pubsub.publish("TOAST_INFO",data.msg);
      else if(data.state==-1)
        pubsub.publish("TOAST_INFO","server内部错误");
      else if(data.state==-5)
        pubsub.publish("TOAST_INFO","数据库错误");
      else if(data.state==-100)
        pubsub.publish("TOAST_INFO","未知错误");
      else
        callback(data);
    }
    if(4 === xhr.readyState && xhr.status === 404){
      console.log("error");

      if(url.indexOf("/getallapp.rest" )>-1)
        callback([{
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
          },
          {
            appid:"3",
            appname:"有房有客",
            appicon:"http://static.wkzf.com/web_fe/img/source/public/logo.png",
            version:"1.2",
            desc:" 二手房网重庆建设工程信息网"
          },
          {
            appid:"4",
            appname:"有房有客",
            appicon:"http://static.wkzf.com/web_fe/img/source/public/logo.png",
            version:"1.2",
            desc:" 二手房网重庆建设工程信息网"
          }]);
      else if(url.indexOf("/getapp.rest")>-1){
        callback(  [{
          identy:"com.wkzf",
          appid:1,
          version:"1.2",
          appname:"悟空找房",
          desc:"app描述信息",
          appicon:"www.baidu.com",
          createat:12131313131,
          platform:"ios",
          size:"1231131",
          filename:"D:/abc.ipa",
          state:1
        },
          {
            identy:"com.wkzf",
            appid:1,
            version:"1.3",
            appname:"悟空找房",
            desc:"app描述信息",
            appicon:"www.baidu.com",
            createat:12131313131,
            platform:"ios",
            size:"1231131",
            filename:"D:/abc.ipa",
            state:1
          }])
      }
       else
        callback({state:1,token:'121313131',name:"abc"});
    }
  });
  xhr.addEventListener('error', function(e) {

      /**
       * jsut mock it
       */
    pubsub.publish("TOAST_INFO","服务器请求错误");
    console.log( e);
  });
  xhr.send(data);
}

/**
 * 表单转化
 * @param data
 */
function serForm(data) {

  var out="";
  for(var tt in data){
    out=out+"&"+tt+"="+data[tt]
  }
  return out;

}

