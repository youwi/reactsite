/**
 * post请求 得到json
 * @param url
 * @param data
 */

export function forjson(url, data,callback) {

  console.log("0000000000000000000");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);


  xhr.addEventListener('readystatechange', function() {
    if(4 === xhr.readyState && 200 === xhr.status) {
        let data = JSON.parse(xhr.responseText);
        callback(data);
    }
    if(4 === xhr.readyState && xhr.status === 404){
      console.log("error");

      if(url.indexOf("/allapp.rest" )>-1)
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
        callback({state:1,token:'121313131',username:"abc"});
    }
  });
  xhr.addEventListener('error', function() {

      /**
       * jsut mock it
       */


    console.log( error);
  });
  xhr.send(data);
}
