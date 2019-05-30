const data ={
  //渠道状态
  status:{
    '1':'启用',
    '2':'禁用',
  }
}

module.exports = {
  statusStr(val){
    return data.status[val];
  },
  //日期
  date(item){
    let date = new Date(item);
    var Y = date.getFullYear();
    var M = date.getMonth()+1;
    var D = date.getDate();
    return `${Y}-${M>10 ? M : '0'+M}-${D>10?D:'0'+D}`
  },
  time(val){
    let date = new Date(item);
    var Y = date.getFullYear();
    var M = date.getMonth()+1;
    var D = date.getDate();
    var H = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return `${Y}-${M>10 ? M : '0'+M}-${D>10?D:'0'+D} ${H>10?'H':'0'+H}:${m>10?m:'0'+m}}:${s>10?s:'0'+s}}`
  }
};
