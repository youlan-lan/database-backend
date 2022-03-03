/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-02 13:31:47
 * @LastEditTime: 2022-01-02 15:02:27
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description:
 * @FilePath: \college-application-enrollment-backend\src\models\log.js
 */

class LogHelper {

  /**
   *
   * @param {string} cat 分类名称
   */
  constructor(cat) {
    this.log4js = require("log4js");
    this.log4js.configure({
      appenders: {
        consoleout: {
          type: "console"
        }
      },
      categories: {
        default: { appenders: ["consoleout"], level: "debug" },
        anything: { appenders: ["consoleout"], level: "debug" }
      }
    });
    this.logger=this.log4js.getLogger(cat ? `[${cat}]` : "");
  }
  info(str){
    this.logger.info(str);
  }
  error(str){
    this.logger.error(str);
  }
}
module.exports = LogHelper;
