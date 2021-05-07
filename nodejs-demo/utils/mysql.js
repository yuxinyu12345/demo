const mysql = require('mysql')

// 创建mysql连接
const connection = mysql.createConnection({
    
})
module.exports = {
  config: {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'test'
  },

  //数据库连接池

  sqlConnect:function(sql, sqlArr, callBack) {
    var pool = mysql.createPool(this.config)
    pool.getConnection((err, conn) => {
      console.log('12233');
      if(err) {
        console.log('连接失败');
        return
      }
       conn.query(sql, sqlArr, callBack)

      //  释放连接
      conn.release()
    })
  }
}