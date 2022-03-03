const baseDataService = require('../services/baseDataService');

class baseDataController{
  async addEnrollments(req,res){
    const {enrollments}=req.body;
    let result = await baseDataService.addEnrollments(enrollments)
    console.log(result);
    res.send(result);
  }
  async addIntentions(req,res){
    const {intentions}=req.body;
    let result = await baseDataService.addIntentions(intentions);
    res.status(result.status);
    res.send(result);
  }
  async removeAll(req,res){
    let result = await baseDataService.removeAll();
    res.status(result.status);
    res.send(result);
  }

}

module.exports = new baseDataController()
