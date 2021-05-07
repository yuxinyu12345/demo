var dbMysql = require('../utils/mysql')

resBook = (req, res, next) => {
  // let {id} = req.query;
  var sql = 'select * from book where id=?';
  var sqlArr = [1];
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
}

insertBook = (req, res, next) => {
  var sql = 'INSERT INTO book(`book_name`,`book_price`) VALUES ("c","2")';
  var sqlArr = [
  ];
  var callBack = (err, data) => {
    if(err) {
      console.log(err);
      console.log('连接出错了');
    } else {
      res.send({
        state: 200,
        success: true
      })
    }
  }
  dbMysql.sqlConnect(sql, sqlArr, callBack)
}

deleteBook = (req, res, next) => {
  console.log(req);
  let {id} = req.query;
  var sql = 'delete from book where id=?';
  var sqlArr = [id];
  var callBack = (err, data) => {
    if(err) {
      console.log(err);
      console.log('连接出错了');
    } else {
      res.send({
        state: 200,
        success: true
      })
    }
  }
  dbMysql.sqlConnect(sql, sqlArr, callBack)
}

module.exports = {
  resBook,
  insertBook,
  deleteBook
}
