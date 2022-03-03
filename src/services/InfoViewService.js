/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-03 16:53:57
 * @LastEditTime: 2022-01-03 17:09:59
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 信息表查询
 * @FilePath: \college-application-enrollment-backend\src\services\InfoViewService.js
 */
const infoView= require("../models/info_view")
const LogHelper = require("../utils/LogHelper/LogHelper");
const logger=new LogHelper("InfoViewService")

class InfoViewService {
  async GetCollegeInfo(){
    let res= await infoView.GetCollegeInfo().catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      logger.error(`未知的SQL查询异常 `+res.err)
      throw {status:501,msg:`未知的SQL查询异常 `+res.err};
    }
    // console.log("get res",res);
    return res;
  }
  async GetSpeInfo(){
    let res= await infoView.GetSpeInfo().catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      logger.error(`未知的SQL查询异常 `+res.err)
      throw {status:501,msg:`未知的SQL查询异常 `+res.err};
    }
    return res;
  }
  async GetAllStudentInfo(){
    let res= await infoView.GetStudentInfo().catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      logger.error(`未知的SQL查询异常 `+res.err)
      throw {status:501,msg:`未知的SQL查询异常 `+res.err};
    }
    return res;
  }

}

module.exports= new InfoViewService();
