/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-02 15:36:34
 * @LastEditTime: 2022-01-02 17:02:41
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description:
 * @FilePath: \college-application-enrollment-backend\src\models\test\config.test.js
 */

const Config = require("../config");
async function InsertTest() {
  Config.InsertConfig("tt5","ttt").then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log("err:",err);
  })
}
async function ReadTest() {
  Config.ReadConfig("tt").then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log("err:",err);
  })
}
async function UpdateTest() {
  Config.SetConfig("tt3","222").then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log("err:",err);
  })
}

async function ConfigList(){
  Config.ConfigList(4,2).then(res=>{
    console.log(res);
  }).then(err=>{
    console.log("err:",err);
  })
}
ConfigList();
