/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 01:37:19
 * @LastEditTime: 2022-01-01 01:57:17
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: user_login表测试
 * @FilePath: \college-application-enrollment-backend\src\models\test\user_login.test.js
 */
const UserLogin = require("../user_login");
async function Insert(){
    let res= await UserLogin.InsertUser("test1","test-psd","test-salut").catch(err=>{return{unsuccess:true,err}});
    if(res.unsuccess){
        console.log("err:",res.err);
    }else{
        console.log("success:",res);
    }
}
async function QueryUser(){
    let res= await UserLogin.QueryUser("test").catch(err=>{return{unsuccess:true,err}});
    if(res.unsuccess){
        console.log("err:",res.err);
    }else{
        console.log("success:",res);
    }
}
QueryUser();