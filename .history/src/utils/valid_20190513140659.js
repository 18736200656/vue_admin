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
    var 
  }
};
