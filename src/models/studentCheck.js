const db = require("../utils/DBConn/conn");
class studentCheck {
    /**
     * @param {string}  sno 考生号码
     * @param {string}  
     * @param {string}  
     */

    //查询专业细项
    async QueryStudent(sno) {
        let res = await db.query("SELECT spe_name,cname,location from adm_result WHERE sno=?", [sno]);
        return res;
    }

    //判断名字和考生号是否对应
    async CompareStudent(sno, name) {
        let res = await db.query("SELECT sname from stu_intention WHERE sno=?", [sno]);
        return res;
    }

    //判断是否到查询时间
    async startTime(nowTime) {
        let res = await db.query("SELECT `value` from `config` WHERE `key` = 'BeginQuery'");
        return res;
    }

    //判断录取状态
    async Status(sno) {
        let res = await db.query("SELECT status from result WHERE sno=?", [sno]);
        return res;
    }
}

module.exports = new studentCheck();