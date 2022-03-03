/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-02 13:23:52
 * @LastEditTime: 2022-01-02 16:11:02
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: config表的模型
 * @FilePath: \college-application-enrollment-backend\src\models\config.js
 */
const db = require("../utils/DBConn/conn");
class Config {

  /**
   * 插入配置信息
   * @param {string} key
   * @param {string} value
   * @returns
   */
  async InsertConfig(key, value) {
    let res = await db.query("INSERT INTO config(`key`,`value`) VALUES(?,?)", [key, value]);
    return res;
  }
  /**
   * 读取配置信息
   * @param {string} key
   * @returns {string} value
   */
  async ReadConfig(key) {
    let res = await db.query("SELECT `value` FROM config WHERE `key`=?", [key]).catch(err => {return undefined});
    return res[0] ? res[0].value : undefined;
  }

  async SetConfig(key, value) {
    let res = await this.ReadConfig(key);
    if(res){
      res= await db.query("UPDATE config SET `value`=? WHERE `key`=?",[value,key]);
      return res;
    }else{
      return await this.InsertConfig(key,value);
    }
  }

  /**
   * 获取配置列表
   * @param {Number}page 页码
   * @param {Number}pageSize 页面大小
   * @return {Object[]} Key-Value 键值对数组
   */
  async ConfigList(page,pageSize){
      let sql = "SELECT * FROM college.config limit ? offset ?";
      if(pageSize && page && 0<pageSize && 0<pageSize){
        let res = await db.query(sql,[pageSize,(page-1)*pageSize])
        return res;
      }else {
        return {msg: "参数不存在或小于零"}
      }
  }

}



module.exports = new Config();
