const studentService = require("../services/studentService");

class studentController {
    /**
     * 查询专业细项
     */
    async Check(req, res) {
            const { sno } = req.body;
            const detail = await studentService.Check(sno).catch(err => { throw err; });
            if (res) {
                res.send({ status: 200, msg: "查询成功", detail });
            }
        }
        /**
         * 判断考生号和姓名
         */
    async Compare(req, res) {
        const { sno, name } = req.body;
        const sname = await studentService.Compare(sno, name).catch(err => { throw err; });
        if (name != sname[0].sname) {
            res.send({ status: 201, msg: "考生号和姓名不匹配" });

        } else {
            res.send({ status: 200, msg: "查找中", sname });

        }
    }

    //判断时间
    async Start(req, res) {
        const { nowTime } = req.body;
        const time = await studentService.Start(nowTime).catch(err => { throw err; });
        if (parseInt(nowTime) < parseInt(time[0].value)) {
            throw { status: 201, msg: "未到查询时间" };
        } else {
            res.send({ status: 200, msg: "请稍等", flag: true });
        }
    }

    async Status(req, res) {
        const { sno } = req.body;
        const status = await studentService.Status(sno).catch(err => { throw err; });
        if (status[0].status == "成功录取" || status[0].status == "调剂录取") {
            res.send({ status: 200, msg: "已被录取", flag: true });
        } else {
            res.send({ status: 200, msg: "暂无录取信息", flag: false });
        }
    }

}
module.exports = new studentController();