/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-03 16:38:54
 * @LastEditTime: 2022-01-04 15:49:07
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description:信息视图表 包括学院信息视图、专业信息视图
 * @FilePath: \college-application-enrollment-backend\src\models\info_view.js
 */
const db = require("../utils/DBConn/conn");

class Infoview{
  /**
   * 查询学院基本信息表
   * @returns Promise
   */
  async GetCollegeInfo(){
    let res= db.query("SELECT * FROM college_info");
    return res;
  }
  /**
   * 查询专业基本信息表
   * @returns
   */
  async GetSpeInfo(){
    let res=db.query("SELECT * FROM spe_info");
    return res;
  }
  /**
   * 查询学生信息表
   * @returns
   */
  async GetStudentInfo(){
    let res=db.query("SELECT * FROM stu_info");
    return res;
  }
}

module.exports=new Infoview();
