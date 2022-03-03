/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 02:07:13
 * @LastEditTime: 2022-01-01 18:42:40
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 用户登录控制层
 * @FilePath: \college-application-enrollment-backend\src\controllers\loginController.js
 */
const LoginService = require("../services/LoginService");

class loginController{
  /**
   * 用户注册
   */
    async Register(req,res){
        const {userName,userPsd}=req.body;
        const result= await LoginService.Register(userName,userPsd).catch(err=>{ throw err;})
        if(result===1){
            res.send({status:200,msg:"注册成功"});
        }
    }
    /**
     * 登录
     */
    async Login (req,res){
      const{userName,userPsd}=req.body;
      console.log(req.body);
      const jwt=await LoginService.Login(userName,userPsd).catch(err=>{ throw err;});
      if(jwt){
        res.send({status:200,msg:"登录成功",jwt});
      }
    }
}
module.exports = new loginController();
