/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-03 17:02:11
 * @LastEditTime: 2022-01-07 14:14:00
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 信息表查询的路由
 * @FilePath: \college-application-enrollment-backend\src\routers\InfoView.js
 */
const express = require('express');
const router = express.Router();
const JWTHelper= require("../utils/JWT/JWTHelper");
const LogHelper = require("../utils/LogHelper/LogHelper");
const logger=new LogHelper("InfoViewRouter")

const InfoViewController = require('../controllers/InfoViewController');

// Express 是通过 next(error) 来表达出错的，无法识别 async 函数抛出的错误
// wrap 函数的作用在于将 async 函数抛出的错误转换为 next(error)
function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (e) {
      // console.log(e);
      next(e);
    }
  };
}
router.use(async (req,res,next)=>{
  if(req.method!=="POST"){
    console.log("跳过",req.method);
    next();//跳过jwt验证
    return;
  }
  const jwt=req.headers.authorization;
  if(jwt){
    let user=await JWTHelper.VerifyJWT(jwt).catch(err=>{
      logger.error(err)
      return res.status(405).send({msg:err})
    });
    if(user.userName){
      logger.info("jwt认证通过 user="+user.userName)
      next();
    }
  }else{
    logger.error("未找到jwt");
    return res.status(403).send({
      msg:"未找到jwt"
    })
  }
})

// 组装路由
router.get('/college', wrap(InfoViewController.GetCollegeInfo));
router.get("/spe",wrap(InfoViewController.GetSpeInfo));
router.get("/allstu",wrap(InfoViewController.GetAllStudentInfo));

module.exports = router;
