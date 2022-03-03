/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 02:18:36
 * @LastEditTime: 2022-01-01 16:11:22
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: login相关路由
 * @FilePath: \college-application-enrollment-backend\src\routers\login.js
 */
const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController');

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

// 组装路由
router.post('/reg', wrap(loginController.Register));
router.post('/login',wrap(loginController.Login));

module.exports = router;
