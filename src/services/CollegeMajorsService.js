const CollegeMajors = require("../models/collegeMajors")
const LogHelper = require("../utils/LogHelper/LogHelper");
const logger = new LogHelper("CollegeMajors");

class CollegeMajorsService{
  //获取学院专业的Service层
  async getCollegeMajors(){
    let res = {
      status: 200,
      msg: "获取学院和专业成功",
      data: null
    };
    let result = await CollegeMajors.GetCollegeAndMajors().catch(err => {
      logger.error(err);
      throw{status: 500, msg: err}
    });
    let newResult = [];
    //修改result格式
    await result.forEach(element => {
      //新存储数组的
      let cnames = newResult.map(s=>s.title);
      if(cnames.includes(element.cname)){
        //已包含该学院
        newResult.forEach(s=>{
          if(s.title === element.cname){
            s.majors.push({
              major_id: element.spe_no,
              major_members: element.get_total_peo===null?0:element.get_total_peo,
              major_name: element.spe_name,
            });
          }
        })
      }else{
        //没包含该学院
        newResult.push({
          title: element.cname,
          majors: [{
            major_id: element.spe_no,
            major_members: element.get_total_peo===null?0:element.get_total_peo,
            major_name: element.spe_name,
          }]
        })
      }
    });
    res.data = newResult;
    return res;
  }


  async getMajorsStudents(majorKey){
    let res = {
      status: 200,
      msg: "获取专业和学生成功",
      data: null
    };
    let result = await CollegeMajors.GetMajorsStudents(majorKey).catch(err => {
      logger.error(err);
      throw{status: 500, msg: err}
    });
    let newResult = [];
    await result.forEach( i => { 
      let tmp = newResult.map(s=>s.spe_id);
      //此同学所在专业已在数组中
      let index = tmp.indexOf(i.spe_no);
      if( -1 !== index){
        newResult[index].students.push({
          studentName: i.sname,
          grade: i.grade,
          rank: i.rank,
        })
      }else{
        //此同学所在专业未在数组中
        newResult.push({
          spe_id: i.spe_no,
          spe_name: i.spe_name,
          college: i.cname,
          location: i.location,
          students:[{
            studentName: i.sname,
            grade: i.grade,
            rank: i.rank,
          }]
        })
      }
      // delete tmp;
    });
    res.data = newResult;
    return res;   
  }

  async jugMajorExist(majorKey){
     let res = {
      status: 200,
      msg: "返回搜索成功",
      data: null
    };
    let result = await CollegeMajors.jugMajorExist(majorKey).catch(err => {
      logger.error(err);
      throw{status: 500, msg: err}
    });
    res.data = result;
    return res;
  }
}

module.exports = new CollegeMajorsService();