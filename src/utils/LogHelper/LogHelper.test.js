/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-02 13:34:33
 * @LastEditTime: 2022-01-02 15:30:19
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: LogHelper使用方法
 * @FilePath: \college-application-enrollment-backend\src\utils\LogHelper\LogHelper.test.js
 */
const LogHelper = require("../log")
const logger= new LogHelper("222");//这里传参会在输出时以[]括起来，建议填写你的类名
logger.info("333") //[2022-01-02T15:03:01.716] [INFO] [222] - 333
const logger3= new LogHelper();
logger3.error("222") //[2022-01-02T15:03:01.722] [ERROR] default - 222
