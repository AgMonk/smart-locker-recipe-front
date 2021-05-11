// 获取对象类型
let getTypeOf = function (obj) {
  let type = Object.prototype.toString.call(obj);
  return type.replace("[object ", "").replace("]", "");
}
// 格式化输出字符串
let format = function (template, ...data) {
  if (data === undefined || data.length === 0) {
    return template;
  }
  let d = data[0];
  let s = template;
  if (data.length === 1 && getTypeOf(d) === 'Object') {
    for (let key in d) {
      if (d.hasOwnProperty(key)) {
        // s = s.replaceAll("{" + key + "}", d[key]);
        let re = "{" + key + "}";
        while (s.includes(re)){
          s= s.replace(re, d[key])
        }
      }
    }
    return s;
  }
  if (data.length > 1) {
    for (let i = 0; i < data.length; i++) {
      s = s.replace("{}", data[i]);
    }
    return s;
  }
  return template;
}
//Date对象格式化方法
Date.prototype.format = function (fmt) {
  let o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds()             //毫秒
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
}
//格式化日志方法
console.slf4j = function  (template, ...data){
  console.log(format (template, ...data))
}
//字符串格式化方法
String.prototype.format = function (...data) {return format(this, ...data)}
console.clear()

export const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

export {
  getTypeOf,
  format,
}

export const getClientWidth = ()=>{
  let w = document.body.clientWidth;
  if (w < 768) {
    return 0;
  }
  if (w < 992) {
    return 1;
  }
  if (w < 1200) {
    return 2;
  }
  if (w < 1920) {
    return 3;
  }
  return 4
}
