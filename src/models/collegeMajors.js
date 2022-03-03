const db = require("../utils/DBConn/conn");

class CollegeMajors {
  /**
   * 查询学院基本信息表
   * @returns Promise
   */
  async GetCollegeAndMajors(){
    let res= await db.query(
      "select `spe_info`.spe_no,  `spe_info`.spe_name, `college`.cname,`spe_info`.get_total_peo " +
      "from college, spe_info " +
      "where `college`.cno = `spe_info`.cno " +
      "order by `college`.cno;");
    return res;
  }
  /**
   * 查询专业对应的学生
   * @param {查询关键字}} majorskey 
   * @returns 
   */
  async GetMajorsStudents(majorskey){
    let res = await db.query("SELECT `stu_info`.spe_no, `stu_info`.sname, `stu_info`.spe_name, `stu_info`.grade, `stu_info`.`rank`, `stu_info`.location, college.cname " +
                       "FROM stu_info, college, specialty " + 
                       "where specialty.cno = college.cno and stu_info.spe_no = specialty.spe_no and (`stu_info`.spe_name like '%' ? '%' or `stu_info`.spe_no like '%' ? '%') " +
                       "order by spe_no , `rank` ", [majorskey, majorskey]);
    return res;
  }

  async jugMajorExist(majorskey){
    let res = await db.query("select count(*) from specialty where spe_name like '%' ? '%' or spe_no like '%' ? '';", [majorskey, majorskey]);
    return res;
  }
}

module.exports = new CollegeMajors();
