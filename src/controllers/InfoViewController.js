/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-03 16:58:34
 * @LastEditTime: 2022-01-04 15:50:11
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 信息表控制层
 * @FilePath: \college-application-enrollment-backend\src\controllers\InfoViewController.js
 */

const InfoViewService= require("../services/InfoViewService");

class InfoViewController{
  async GetCollegeInfo(req,res) {
    let result = await InfoViewService.GetCollegeInfo().catch(err=>{throw err});
    if(result){
      res.send({status:200,data:result});
    }
  }
  async GetSpeInfo(req,res) {
    let result = await InfoViewService.GetSpeInfo().catch(err=>{throw err});
    if(result){
      res.send({status:200,data:result});
    }
  }
  async GetAllStudentInfo(req, res) {
    let result = await InfoViewService.GetAllStudentInfo().catch(err=>{throw err});
    if(result){
      res.send({status:200,data:result});
    }
  }
}
module.exports= new InfoViewController();
