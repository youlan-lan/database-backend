/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-02 15:57:17
 * @LastEditTime: 2022-01-02 17:03:26
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description:
 * @FilePath: \college-application-enrollment-backend\src\controllers\configController.js
 */

const ConfigService= require("../services/ConfigService");
class ConfigController {
  async Insert(req,res){
    const{key,value}=req.body;
    const result = await ConfigService.InsertPair(key,value).catch(err=>{throw err;});
    if(result){
      res.send({status:200,key,value});
    }
  }
  async GetValue(req,res){
    const {key}=req.query;
    const result = await ConfigService.GetValue(key).catch(err=>{throw err;});
    // console.log(result);
    if(result){
      res.send({status:200,key,value:result})
    }else{
      res.send({status:202,key,msg:"key对应值为空"})
    }
  }
  async SetValue(req,res){
    const {key,value}=req.body;
    const result = await ConfigService.SetValue(key,value).catch(err=>{throw err;});
    if(result){
      res.send({status:200,key,value,msg:"更新成功"})
    }
  }
  async GetConfigList(req,res){

    const {page,pageSize}=req.query;
    console.log(page,pageSize)

    const result = await ConfigService.GetConfigList(Number(page),Number(pageSize)).catch(err => {
      throw err;
    })
    res.send({status:200,ConfigList:result})
  }
}
module.exports=new ConfigController();
