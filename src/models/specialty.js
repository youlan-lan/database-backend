const db = require("../utils/DBConn/conn");

/**
 *专业类
 */
class Specialty {
  /**
   * 创建一个专业
   * @param {Object}Specialty 专业
   * @param {String}Specialty.cno 学院号
   * @param {String}Specialty.spe_cno 专业号
   * @param {String}Specialty.spe_name 专业名
   * @param {String}Specialty.spe_group 专业组
   * @param {Number}Specialty.total_peo 招生人数
   * @return {Promise<void>}
   */
  async CreateSpecialty(Specialty) {

  }

  /**
   * 创建多个专业
   * @param {Object[]} Specialties 专业数组
   * @param {String}Specialties.cno 学院号
   * @param {String}Specialties.spe_no 专业号
   * @param {String}Specialties.spe_name 专业名
   * @param {String}Specialties.spe_group 专业组
   * @param {Number}Specialties.total_peo 招生人数
   * @param {Number}Specialties.remark, 专业备注
   * @param {Number}Specialties.location 办学地点
   * @param {Number}Specialties.language 外语语种
   *
   * @return {Promise<void>}
   */
  async bulkCreateSpecialties(Specialties) {
    let params = [];
    Specialties.forEach(e => {
      params.push([
        e.cno,
        e.spe_no,
        e.spe_name,
        e.spe_group,
        e.total_peo,
        e.remark,
        e.location,
        e.language
      ])
    })
    let res = await db.query("INSERT INTO specialty(cno,spe_no,spe_name,spe_group,total_peo,remark,location,langue) VALUES ?",
      [params]);
    return res;

  }

  /**
   * 查询所有专业
   * @return {Promise<void>}
   * @constructor
   */
  async FindAll() {

    let sql = "SELECT *FROM college.specialty order by  CAST(specialty.spe_group as SIGNED), CAST(specialty.spe_no as SIGNED)"
    let res = await db.query(sql);
    return res;

  }
}

/**
 * 专业体检限制类
 */
class SpecialtyPhysique {
  /**
   * 创建一个专业体检限制
   * @param {Object} SpecialtyPhysique 专业体检限制
   * @param {String} SpecialtyPhysique.spe_no 专业号
   * @param {String} SpecialtyPhysique.physique 专业限制
   * @return {Promise<void>}
   * @constructor
   */
  async CreateSpecialtyPhysique(SpecialtyPhysique) {

  }

  /**
   * 创建多个专业体检限制
   * @param {Object[]} SpecialtyPhysiques 专业体检限制数组
   * @param {String} SpecialtyPhysiques.spe_no 专业号
   * @param {String} SpecialtyPhysiques.physique 专业限制
   * @return {Promise<void>}
   */
  async bulkCreateSpecialtyPhysiques(SpecialtyPhysiques) {
    let params = [];
    SpecialtyPhysiques.forEach(e => {
      params.push([
        e.spe_no,
        e.physique
      ])
    })
    let res = await db.query("INSERT INTO spe_physique(spe_no,physique) VALUES ?",
      [params]);
    return res;
  }


}

module.exports = {
  Specialty: new Specialty(),
  SpecialtyPhysiques: new SpecialtyPhysique()
}
