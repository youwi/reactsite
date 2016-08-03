/**
 * post请求 得到json
 * @param url
 * @param data
 */

export function forjson(url, data,callback) {

  console.log("0000000000000000000");
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime(), true);
  xhr.send(data);

  xhr.addEventListener('readystatechange', function() {
    if(4 === xhr.readyState && 200 === xhr.status) {
        let data = JSON.parse(xhr.responseText);
        callback(data);
    }
  });
  xhr.addEventListener('error', function() {
    console.log(error);
  });
}
