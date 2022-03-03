const studentCheck = require("../models/studentCheck")
class studentService {

    /**
     * 学生查询
     * @param {string} sno
     * @param {string} 
     */
    async Check(sno) {
        let res = await studentCheck.QueryStudent(sno).catch(err => { return { unsuccess: true, err } });
        if (res.unsuccess) {
            throw { status: 501, msg: "sql查询出错" + res.err }
        }
        if (res.length > 0) {
            return res
        } else {
            throw { status: 201, msg: "查询成功" }

        }
    }

    async Compare(sno, name) {

        let res = await studentCheck.CompareStudent(sno, name).catch(err => { return { unsuccess: true, err } });
        if (res.unsuccess) {
            throw { status: 501, msg: "sql查询出错" + res.err }
        }
        if (res.length > 0) {
            return res
        } else {
            throw { status: 201, msg: "考生不存在" }
        }
    }

    async Start(nowTime) {
        let res = await studentCheck.startTime(nowTime).catch(err => { return { unsuccess: true, err } });
        if (res.unsuccess) {
            throw { status: 501, msg: "sql查询出错" + res.err }
        }
        if (res.length > 0) {
            return res
        } else {
            throw { status: 201 }
        }
    }

    async Status(sno) {
        let res = await studentCheck.Status(sno).catch(err => { return { unsuccess: true, err } });
        if (res.unsuccess) {
            throw { status: 501, msg: "sql查询出错" + res.err }
        }
        if (res.length > 0) {
            return res
        } else {
            throw { status: 201 }
        }
    }
}
module.exports = new studentService();