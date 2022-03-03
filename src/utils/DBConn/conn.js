/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 01:14:54
 * @LastEditTime: 2022-01-03 16:49:16
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 数据库底层连接
 * @FilePath: \college-application-enrollment-backend\src\utils\DBConn\conn.js
 */
const mysql = require("mysql");
const connBase = require("./connBase-dev");//导入开发环境的连接配置
const LogHelper = require("../LogHelper/LogHelper");
const logger=new LogHelper("db")
//这里设置一下连接池的连接数

const db={
  poolOn:false,
  pool:null,
  createPool(){
    if(this.poolOn===true){
      return;
    }else{
      this.pool = mysql.createPool(connBase.Config);
      // console.log("已创建连接池");
      logger.info("创建连接池ok")
      this.poolOn=true;
    }
  },
  query(sql,para){
    logger.info("sql: "+sql+",para: "+para);
    return new Promise((resolve, reject) => {
      if(this.poolOn===false){
        this.createPool();
      }
      // console.log("已有连接池");
      this.pool.getConnection((err, conn) => {
        if (err){
          logger.error("连接池获取失败");
          reject("连接池获取失败 "+err)
        }else{
          conn.query(sql,para, (err, res) => {
            if (err){
              logger.error("sql查询失败: "+sql+",para: "+para+",err:"+err.toString())
              reject("sql查询失败 "+err);
            }
            else{
              logger.info("sql查询成功: "+sql+",para: "+para+",affectedRows:"+res.affectedRows)
              resolve(res);
            }
          });
        }
        conn.release();//释放连接
        // this.pool.end();
        // this.poolOn=false;
      });
    })
  },

  closePool(){
    // console.log(this.pool);
    if(this.poolOn===false|| this.pool=== null){
      throw "连接池已处于关闭状态或连接池不存在";
    }else{
      this.pool.end();
      this.poolOn=false;
    }
  },
}

module.exports=db;
