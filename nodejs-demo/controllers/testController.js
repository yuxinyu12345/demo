var dbMysql = require('../utils/mysql')

resTest = (req, res, next) => {
  var sql = 'select * from test';
  var sqlArr = [];
  var callBack = (err, data) => {
    if(err) {
      console.log('连接出错了');
    } else {
      res.send({
        'list': data
      })
    }
  }

  dbMysql.sqlConnect(sql, sqlArr, callBack)

  // res.render('index', { title: 'Express' });
}


module.exports = {
  resTest
}
