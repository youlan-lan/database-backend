const db= require("../utils/DBConn/conn");

/**
 * 学生志愿模型
 */
class StudentIntention{
    /**
     * 创建多个学生志愿
     * @param {Object[]} StudentIntentions 专业体检限制数组
     * @param {String} StudentIntentions.sno 学生号
     * @param {String} StudentIntentions.sname 学生姓名
     * @param {Number} StudentIntentions.grade 投档成绩
     * @param {Number} StudentIntentions.rank 排位
     * @param {String} StudentIntentions.spe_group 专业号
     * @param {Number} StudentIntentions.isadjust 服从调剂
     * @param {Number} StudentIntentions.language 外语语种
     * @param {String} StudentIntentions.intention1 专业志愿1
     * @param {String} StudentIntentions.intention2 专业志愿2
     * @param {String} StudentIntentions.intention3 专业志愿3
     * @param {String} StudentIntentions.intention4 专业志愿4
     * @param {String} StudentIntentions.intention5 专业志愿5
     * @param {String} StudentIntentions.intention6 专业志愿6
     * @return {Promise<void>}
     */
    async bulkCreateStudentIntentions(StudentIntentions){
      let params = [];
      StudentIntentions.forEach(e=>{
        params.push([
          e.sno,
          e.sname,
          e.grade,
          e.rank,
          e.spe_group,
          e.isadjust,
          e.language,
          e.intention1,
          e.intention2,
          e.intention3,
          e.intention4,
          e.intention5,
          e.intention6,
        ])
      })
      let res=await db.query("INSERT INTO stu_intention(sno,sname,grade,`rank`,spe_group,isadjust,langue,intention1,intention2,intention3,intention4,intention5,intention6) VALUES ?",
        [params]);
      return res;
    }
}

/**
 * 学生体检模型
 */
class StudentPhysique{
    /**
     * 创建多个学生体检限制
     * @param {Object[]} StudentPhysiques 专业体检限制数组
     * @param {String} StudentPhysiques.sno 考生号
     * @param {String} StudentPhysiques.physique 体检限制
     * @return {Promise<void>}
     */
    async bulkCreateStudentPhysiques(StudentPhysiques){
      let params = [];
      StudentPhysiques.forEach(e=>{
        params.push([
          e.sno,
          e.physique
        ])
      })
      let res=await db.query("INSERT INTO stu_physique(sno,physique) VALUES ?",
        [params]);
      return res;
    }
}

module.exports = {
  StudentIntention:new StudentIntention(),
  StudentPhysiques:new StudentPhysique()
}

