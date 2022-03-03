const CollegeMajorsService = require('../services/CollegeMajorsService');

class CollegeMajorsController{

  async getCollegeMajor(req, res){
    let result = await CollegeMajorsService.getCollegeMajors();
    console.log(result);
    // res.send({nmsl:"nmsl"});
    res.send(result);
  }

  async getMajorsStudents(req, res){
    const {majorKey}=req.body;
    let result = await CollegeMajorsService.getMajorsStudents(majorKey);
    console.log(result);
    // res.send({nmsl:"nmsl"});
    res.send(result);
  }

  async jugMajorExist(req, res){
    const {majorKey}=req.body;
    let result = await CollegeMajorsService.jugMajorExist(majorKey);
    console.log(result);
    // res.send({nmsl:"nmsl"});
    res.send(result);
  }
}

module.exports = new CollegeMajorsController();