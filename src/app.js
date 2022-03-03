/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 01:08:58
 * @LastEditTime: 2022-01-03 17:04:59
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description:
 * @FilePath: \college-application-enrollment-backend\src\app.js
 */
const path = require('path');
const loginRouter = require("./routers/login");
const configRouter = require("./routers/config");
const baseDataRouter = require("./routers/baseData")
const studentRouter = require("./routers/student")
const InfoViewRouter = require("./routers/InfoView");
const CollegeMajorsRouter = require("./routers/collegeMajors");
const EnrollRouter = require("./routers/enroll");
const cors = require('cors');

const express = require('express');

const app = express();

app.use(cors());
// 为应用使用中间件
// 静态文件中间件
app.use(express.static(path.join(__dirname, '../public')));
// 请求体 parse 中间件，用于 parse json 格式请求体
app.use(express.json({limit:"2000kb"}));

// 为应用使用路由定义
// 待办事项业务路由
// app.use('/api/todo', todoRouter);
app.use("/api/login", loginRouter)
app.use("/api/config", configRouter);
app.use("/api/baseData", baseDataRouter);
app.use("/api/check", studentRouter)
app.use("/api/info", InfoViewRouter);
app.use("/api/enroll",EnrollRouter);
app.use("/api/collegeMajors", CollegeMajorsRouter)
// 若无匹配业务路由，则匹配 404 路由，代表访问路径不存在
app.use(notFound);
/** 若前面的路由抛错，则封装为错误响应返回
 * 错误响应格式为
 * {
 *   error: message
 * }
 */
app.use(errorHandler);

function notFound(req, res) {
    res.status(404);
    res.send({
        error: 'not found'
    });
}

function errorHandler(err, req, res, next) {
    // 抛出的错误可以附带 status 字段，代表 http 状态码
    // 若没有提供，则默认状态码为 500，代表服务器内部错误
    res.status(err.status || 500);
    res.send({ msg: err.msg });
}
// 导出 Express 对象
module.exports = app;
