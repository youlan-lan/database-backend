const db = require("../utils/DBConn/conn");

class College {
  /**
   * 创建单个学院
   * @param cno 学院号
   * @param cname 学院名
   * @return {Promise<unknown>}
   */
  async Create(cno, cname) {
    let res = await db.query("INSERT INTO college(cno,cname) VALUES(?,?)",
      [cno, cname]);
    return res;
  }

  /**
   * 创建多个学院
   * @param {Object[]} colleges 学院数组
   * @param {String} colleges.cname 学院名
   * @param {String} colleges.cno 学院号
   */
  async bulkCreate(colleges) {
    let sql = "INSERT INTO college(cno,cname) VALUES ?";
    let params = []
    colleges.forEach(e=>{
      params.push([
        e.cno,
        e.cname
      ])
    })
    let res = await db.query(sql, [params]);
    return res;
  }

  /**
   * 获取学院的数量
   * @return {Promise<*>} 学院的数量
   */
  async getCount(){
    let sql = "SELECT count(*) from college.college";
    let res = await db.query(sql);
    return res[0]["count(*)"];
  }

  // async findOne(cname){
  //     let res = await db.query("SELECT uname,upsd,usalt FROM user_login WHERE uname=?",[uname]);
  //     return res;
  // }
  //
  /**
   * 获取所有专业(慎用)
   * @return {Promise<unknown>}
   */
  async findAll(){
      let res = await db.query("SELECT * FROM college ");
      return res;
  }

  /**
   * 删除学院表内所有的学院（慎用，由于本系统使用的数据表的外键关联使用了众多的cascade，此操作会导致所有基本数据以及结果数据全部丢失）
   * @return {Promise<void>}
   */
  async removeAll(){
    let res = await db.query("DELETE FROM `college`.`college` WHERE (`cno` != ''||'1');");
    return res;
  }
}

module.exports = new College();
