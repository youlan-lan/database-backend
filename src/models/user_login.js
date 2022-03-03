/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 01:23:49
 * @LastEditTime: 2022-01-02 15:12:50
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: user_login表操作
 * @FilePath: \college-application-enrollment-backend\src\models\user_login.js
 */
const db= require("../utils/DBConn/conn");
class UserLogin {
    /**
     *
     * @param {string} uname 用户名
     * @param {string} upsd 用户密码
     * @param {string} usalt 用户密码盐
     */
    async InsertUser(uname,upsd,usalt){
        let res=await db.query("INSERT INTO user_login(uname,upsd,usalt) VALUES(?,?,?)",
        [uname,upsd,usalt]);
        return res;
    }
    async QueryUser(uname){
        let res = await db.query("SELECT uname,upsd,usalt FROM user_login WHERE uname=?",[uname]);
        return res;
    }
}

module.exports=new UserLogin();
