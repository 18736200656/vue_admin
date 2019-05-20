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
  timeDate(val){
    let date = val.split(' ');
    return date[0]
  }
};
