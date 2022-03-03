/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 01:23:49
 * @LastEditTime: 2022-01-01 01:55:22
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: enroll操作
 * @FilePath: \college-application-enrollment-backend\src\models\enroll.js
 */
const db= require("../utils/DBConn/conn");
class Enroll {
    /**
     * 
     * @description 
     * @param {string} spe_group 专业组号
     * @param {object} data 录取数据
     */

    /**
     * 
     * @description 获取专业所有信息
     */
    async GetSpecialty(){
        let res = await db.query("select `spe_no`,`spe_group`,`total_peo`,`langue` from specialty");
        return res;
    }

    /**
     * 
     * @description 获取所有的组号
     */
    // async GetGroup(){
    //     let group = await db.query("select `spe_group` from specialty group by `spe_group`");
    //     return group;
    // }
    /**
     * 
     * @description 获取组号的专业
     */
    // async GetSpeGroup(spe_group){
    //     let all_specialty = await db.query("select `spe_no`, `total_peo`,`langue` from specialty " +
    //     "where `spe_group` = ?", spe_group);
    //     return all_specialty;
    // }
    /**
     * 
     * @description 获取专业的体检受限
     */
     async GetSPhysiques(){
        let res = await db.query("select * from spe_physique");
        return res;
    }
    // async GetSpePhysiques(spe_no){
    //     let physiques = await db.query("SELECT `physique` FROM `spe_physique` " +
    //                 "WHERE `spe_no` = ?", [spe_no]);
    //     return physiques;
    // }
    /**
     * 
     * @description 获得专业组的学生
     */
     async GetGroupStudentsInfo(spe_group){
        let studentsInfo = await db.query("SELECT `sno`,`rank`,`isadjust`,`langue`, " +
        "`intention1` ,`intention2` ,`intention3` ,`intention4` ,`intention5` ,`intention6` "+
        "FROM stu_intention " + "WHERE `spe_group` =? ORDER BY `rank` ", [spe_group]);
        return studentsInfo;
    } 
    
    // async GetGroupStudents(spe_group){
    //     let students = await db.query("SELECT `sno`,`rank`,`isadjust`,`langue` " +
    //     "FROM stu_intention " + "WHERE `spe_group` =? ORDER BY `rank` ", [spe_group]);
    //     return students;
    // }
    /**
     * 
     * @description 获得学生志愿
     */
    // async GetIntentions(sno){
    //     let intentions = await db.query("SELECT  `intention1`,`intention2`,`intention3`,"
    //     + "`intention4`,`intention5`,`intention6` "
    //     + "FROM stu_intention " + "WHERE `sno` = ?", [sno])
    //     return intentions;
    // }
    /**
     * 
     * @description 获得学生体检受限
     */

     async GetStudentsPhysiques(){
        let physiques = await db.query("SELECT * FROM `stu_physique` ")
        return physiques;
    }
    // async GetStuPhysiques(sno){
    //     let physiques = await db.query("SELECT `physique` FROM `stu_physique` " +
    //             "WHERE `sno` = ?", [sno])
    //     return physiques;
    // }
    /**
     * 
     * @description 插入结果表
     */
    async InsertResult(data){
        let res = await db.query("INSERT INTO `result` (`spe_no`,`sno`,`status`)"
        + " values ?", [data]);
        return res;
    }

    
}

module.exports=new Enroll();
