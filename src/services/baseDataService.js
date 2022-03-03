const {StudentIntention, StudentPhysiques} = require('../models/student');
const {Specialty, SpecialtyPhysiques} = require('../models/specialty');
const College = require('../models/college');
const LogHelper = require("../utils/LogHelper/LogHelper");
const logger = new LogHelper("baseDataService");

class BaseDataService {
  /**
   * 引入招生计划表，导入专业、学院、专业限制数据
   * @param {Object[]}enrollments
   * @return {Promise<*>}
   */
  async addEnrollments(enrollments) {
    let result = {
      status: 200,
      msg: "导入招生计划表成功",
      data: {}
    }

    //插入学院数据
    let colleges = getColleges(enrollments);//学院数组
    let collegeResult = await College.bulkCreate(colleges).catch(err => {
      logger.error(err);
      throw{status: 500, msg: err}
    });
    result.data.collegeResult = collegeResult;

    //插入专业数据
    let specialties = await getSpecialties(enrollments);//专业数组
    let specialtiesResult = await Specialty.bulkCreateSpecialties(specialties).catch(err => {
      logger.error(err);
      throw{status: 500, msg: err}
    });
    result.data.specialtiesResult = specialtiesResult;

    //插入专业限制数据
    let spe_physiques = getSpePhysiques(enrollments);//专业限制数组
    let spePhysiquesResult = await SpecialtyPhysiques.bulkCreateSpecialtyPhysiques(spe_physiques).catch(err => {
      logger.error(err);
      throw{status: 500, msg: err}
    });
    result.data.spePhysiquesResult = spePhysiquesResult;
    return result;
  }

  /**
   * 引入考生填报志愿数据，导入考生志愿、体检筛查数据
   * @param {Object[]}intentions
   * @return {Promise<*>}
   */
  async addIntentions(intentions) {
    let result = {
      status: 200,
      msg: "导入考生填报志愿数据成功",
      data: {}
    }
    let studentIntentions = await getStudentIntentions(intentions);
    let intentionsResult = await StudentIntention.bulkCreateStudentIntentions(studentIntentions).catch(err=>{
      logger.error(err);
      throw{status: 500, msg: err}
    })

    let studentPhysiques = getStudentPhysiques(intentions);
    let physiquesResult = await StudentPhysiques.bulkCreateStudentPhysiques(studentPhysiques).catch(err=>{
      logger.error(err);
      throw{status: 500, msg: err}
    });

    result.data.intentionsResult = intentionsResult;
    result.data.physiquesResult = physiquesResult;
    return result;
  }

  /**
   * 删除所有基本数据以及结果数据
   * @return {Promise<{msg: string, data: void, status: number}>}
   */
  async removeAll(){
    let res = await College.removeAll();
    return {status:200,msg:"删除成功",data:res}
  }

}











/**
 * 从招生计划表里获取学院数组
 * @param enrollments
 * @return {Object[]} colleges 学院数组
 */
function getColleges(enrollments) {
  let collegeSet = new Set();
  let colleges = [];
  enrollments.forEach((enrollment, index) => {
    collegeSet.add(enrollment["学院名称"])
  })
  let index = 0;
  collegeSet.forEach((e) => {
    colleges.push({
      cno: index,
      cname: e
    });
    index++;
  })
  return colleges;
}

/**
 * 从招生计划表里获取专业数组
 * @param enrollments 招生计划表
 * @return {Promise<*>} 专业数组
 */
async function getSpecialties(enrollments) {
  let colleges = await College.findAll();
  let result = enrollments.map(e => {
    return {
      "cno": getCnobyColleges(colleges, e["学院名称"]),
      "spe_no": e["专业代号"],
      "spe_name": e["专业名称"],
      "spe_group": e["专业组号"],
      "total_peo": e["招生计划数"],
      "remark":e["专业备注"],
      "location":e["办学地点"],
      "language":e["外语语种"]
    };
    // return[
    //   getCnobyColleges(colleges,e["学院名称"]),
    //   e["专业代号"],
    //   e["专业名称"],
    //   e["专业组号"],
    //   e["招生计划数"]
    // ]
  })
  return result;
}

/**
 * 从学院数组中，按照学院名查找，找出学院号
 * @param colleges 学院数组
 * @param cname 学院名
 * @return {String|*|null} 学院号
 */
function getCnobyColleges(colleges, cname) {
  let college = colleges.find(e => {
    return e.cname === cname;
  })

  return college ? college.cno : null;
}

/**
 * 从招生计划表里获取体检受限
 * @param enrollments 招生计划表
 * @return {Object[]} 体检受限数组
 */
function getSpePhysiques(enrollments) {
  let result = [];
  enrollments.forEach(e => {
    if (e["体检受限1"]) {
      result.push({
        spe_no: e["专业代号"],
        physique: e["体检受限1"]
      })
    }
    if (e["体检受限2"]) {
      result.push({
        spe_no: e["专业代号"],
        physique: e["体检受限2"]
      })
    }
  })
  return result;
}

/**
 * 从原始志愿填报表数据中找出考生志愿数组
 * @param {Object[]}intentions 原始志愿填报表
 * @return {Object[]} 考生志愿数组
 */
async function getStudentIntentions(intentions) {
  let result= [];
  let specialties = await Specialty.FindAll();
  let stuintentions = intentions.map(e=>{
    let item = {
      sno:e["考生号"],
      sname:e["姓名"],
      grade:e["投档成绩"],
      rank:e["排位"],
      spe_group:e["专业组号"],
      isadjust:e["服从调剂"]==="是",
      language:e["外语语种"],
      intention1:null,
      intention2:null,
      intention3:null,
      intention4:null,
      intention5:null,
      intention6:null,
    }
    for (let i = 1; i <= 6; i++) {
      if(e["专业志愿" + i])item["intention"+i] = getSpeNoBySpecialties(specialties, e["专业志愿" + i], e["专业组号"]);
    }
    return item;
  })
  return stuintentions;
}

/**
 * 从专业数组中，按照专业名和专业组，查找专业号
 * @param {Object[]} specialties 专业数组
 * @param {String}spe_name 专业名
 * @param {String}spe_group 专业组
 * @return {String|*} 专业号
 */
function getSpeNoBySpecialties(specialties,spe_name,spe_group){
  let result = specialties.find(e=>{
    if(e["spe_name"]===spe_name && e["spe_group"]===spe_group)
      return true;
  })
  return result? result.spe_no:null;

}

/**
 * 从原始志愿填报表数据中找出考生体检受限数据
 * @param {Object[]}intentions 原始志愿填报表
 * @return {Object[]}考生体检受限数组
 */
function getStudentPhysiques(intentions) {
  let result = [];
  intentions.forEach(e => {


    if(e["体检筛选备注"]){
      let physiques = e["体检筛选备注"].split(',');
      console.log(physiques)
      //这里需要用到隐式转换检验'',[],['']，所以是!=而不是!==，故此无需更改
      if (physiques != 0) {
        physiques.forEach(phy => {
          result.push({
            sno: e["考生号"],
            physique: phy
          })
        })
      }
    }

  })
  return result;

}

module.exports = new BaseDataService()
