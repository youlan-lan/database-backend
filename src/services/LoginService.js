/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 01:46:54
 * @LastEditTime: 2022-01-02 16:38:21
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 处理登录相关事务
 * @FilePath: \college-application-enrollment-backend\src\services\LoginService.js
 */

const crypto = require('crypto');
const userLogin = require("../models/user_login")
const JWT = require("../utils/JWT/JWTHelper");
const LogHelper = require("../utils/LogHelper/LogHelper");
const logger=new LogHelper("LoginService")
class LoginService {
  /**
   * 生成UUID
   * @returns string
   */
  generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
    return uuid;
  }
  /**
   *
   * @param {string} uname 用户名
   * @param {string} upsd 用户密码
   * @returns
   */
  async Register(uname, upsd) {
    let res = await userLogin.QueryUser(uname).catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      // console.log("err:", res.err);
      logger.error(res.err)
      throw {status:501,msg:"sql查询异常:"+res.err}
    }
    if (res.length > 0) {
      throw {status:201,msg:"用户已存在"}
    }
    const UUID = this.generateUUID();
    const hashPsd = crypto.createHash("sha256").update(upsd).update(UUID).digest("hex");
    res = await userLogin.InsertUser(uname, hashPsd, UUID).catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      logger.error(res.err)
      throw {status:501,msg:"sql查询异常:"+res.err}
    }
    if (res.affectedRows === 1) {
      return res.affectedRows;
    } else {
      logger.error(res)
      throw {status:501,msg:"新建用户异常:"+res}
    }
  }
  /**
   * 用户登录
   * @param {string} uname
   * @param {string} psd
   */
  async Login(uname, psd) {
    let res = await userLogin.QueryUser(uname).catch(err => { return { unsuccess: true, err } });
    if (res.unsuccess) {
      throw {status:501,msg:"sql查询出错"+res.err}
    }
    if (res.length > 0) {
      const { upsd, usalt } = res[0];
      const hashPsd = crypto.createHash("sha256").update(psd).update(usalt).digest("hex");
      if (hashPsd !== upsd) {
        throw {status:201,msg:"用户名或密码错误"}
      }
      const jwt=JWT.GetJWT(uname);
      return jwt;

    } else {
      throw {status:201,msg:"用户不存在"}
    }
  }
}
module.exports = new LoginService();
