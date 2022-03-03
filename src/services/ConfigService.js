/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-02 15:46:09
 * @LastEditTime: 2022-01-04 15:46:32
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 处理配置相关事务
 * @FilePath: \college-application-enrollment-backend\src\services\ConfigService.js
 */
const config= require("../models/config");
const LogHelper = require("../utils/LogHelper/LogHelper");
const logger=new LogHelper("ConfigService")
class ConfigService {
  /**
   * 插入键值对到config表中
   * @param {string} key
   * @param {string} value
   * @returns true/err
   */
  async InsertPair(key,value){
    let res= await config.InsertConfig(key,value).catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      logger.error(`已经存在key=${key} err:`+res.err)
      throw {status:202,msg:`已经存在key=${key}`};
    }
    if(res.affectedRows==1){
      return true;
    }else{
      logger.error(res)
      throw {status:501,msg:`影响行数不为1，未知Sql的异常${res}`};
    }
  }
  async GetValue(key){
    let res= await config.ReadConfig(key).catch(err => { return { unsuccess: true, err } });
    if(res){
      return res;
    }else{
      logger.error(`不存在key=${key}`)
      throw {status:201,msg:`不存在key=${key}`};

    }
  }
  /**
   * 修改config表中键值对
   * @param {string} key
   * @returns true/err
   */
  async SetValue(key,value){
    let res= await config.SetConfig(key,value).catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      logger.error(res.err)
      throw {status:501,msg:`未知Sql的查询异常${res.err}`};
    }
    if(res.affectedRows==1){
      return true;
    }else{
      logger.error(res)
      throw {status:501,msg:`影响行数不为1，未知Sql的异常${res}`};
    }
  }

  async GetConfigList(page,pageSize){
    let res = await config.ConfigList(page,pageSize).catch(err => {
      return {
        unsuccess: true,
        err
      } });

    if(res.unsuccess){
      logger.error(res.err);
      throw {status:501,msg:`未知Sql的查询异常${res.err}`};
    }
    return res;

  }

}

module.exports = new ConfigService();
