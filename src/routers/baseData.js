const express = require('express');
const router = express.Router();
const JWTHelper= require("../utils/JWT/JWTHelper");
const baseDataController = require('../controllers/baseDataController');
const LogHelper = require("../utils/LogHelper/LogHelper");
const logger=new LogHelper("baseDataRouter")
// Express 是通过 next(error) 来表达出错的，无法识别 async 函数抛出的错误
// wrap 函数的作用在于将 async 函数抛出的错误转换为 next(error)
function wrap(handler) {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (e) {
            next(e);
        }
    };
}
router.use(async (req,res,next)=>{
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
router.post('/addIntentions', wrap(baseDataController.addIntentions));
router.post('/addEnrollments', wrap(baseDataController.addEnrollments));
router.post('/removeAll', wrap(baseDataController.removeAll));


module.exports = router;
