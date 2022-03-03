/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 02:07:13
 * @LastEditTime: 2022-01-01 18:42:40
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 用户登录控制层
 * @FilePath: \college-application-enrollment-backend\src\controllers\loginController.js
 */
const EnrollService = require("../services/EnrollService");
const ConfigService = require("../services/ConfigService")

class EnrollController {
    /**
     * 录取和调剂
     */
    async StartEnroll(req, res) {
        //获取规定时间
        const StartTime = await ConfigService.GetValue("BeginSelect")
            .catch(err => { throw err; });
        const nowTime = new Date().getTime();
        console.log(nowTime);
        if (parseInt(StartTime) <= nowTime) {
            //到时间了
            const EnrollStatus = await ConfigService.GetValue("EnrollStatus")
                .catch(async (err) => {
                    if (err.status == 201) {
                        //没有key的错误
                        console.log(err);
                        const resE = await EnrollService.enroll().catch(err => { throw err; });
                        if (resE) {
                            const EnrollStatus = await ConfigService.SetValue("EnrollStatus", "1")
                                .catch(err => { throw err; });
                            if (EnrollStatus) {
                                res.send({ status: 200, msg: "成功自动录取" });
                            }
                        }
                    }
                });
            //获得录取状态值
            if (EnrollStatus == "1") {
                throw { status: 201, msg: "已录取过" };
            } else {
                //录取
                const resE = await EnrollService.enroll().catch(err => { throw err; });
                // const resE = true;
                if (resE) {
                    const EnrollStatus = await ConfigService.SetValue("EnrollStatus", "1")
                        .catch(err => { throw err; });
                    if (EnrollStatus) {
                        res.send({ status: 200, msg: "成功自动录取" });
                    }
                }
                
            }
        } else {
            throw { status: 501, msg: "未到时间" };
        }
    }
}

// new EnrollController().StartEnroll()
module.exports = new EnrollController();
