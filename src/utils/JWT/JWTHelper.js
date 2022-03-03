/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 15:43:31
 * @LastEditTime: 2022-01-01 15:50:24
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: JWT相关操作
 * @FilePath: \college-application-enrollment-backend\src\services\JWTService.js
 */
const jwt = require('jsonwebtoken');
const privateKey=require("./secretKey")

class JWT{
    /**
   * @description 生成jwt
   * @param {String} userName 用户名
   * @return {Object} jwt
   */
  GetJWT(userName) {
    let content={userName};
    let token = jwt.sign(content,privateKey,{
      expiresIn: 60*60*24*10//十天过期
    });
    // console.log(token);
    return token;
  }
  /**
   * @description jwt验证
   * @param {string} token jwt
   * @return {Object/boolen} 验证成功返回用户信息，否则返回false
   */
  VerifyJWT(token){
    return new Promise((reslove,reject)=>{
      jwt.verify(token,privateKey,(err,jwt)=>{
        if(err){
          reject("jwt过期或错误");
        }else{
          reslove(jwt);
        }
      });
    })
  }
}

module.exports = new JWT();
