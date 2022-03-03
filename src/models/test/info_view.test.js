/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-03 16:45:26
 * @LastEditTime: 2022-01-04 15:43:53
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: info_view 测试
 * @FilePath: \college-application-enrollment-backend\src\models\test\info_view.test.js
 */

const InfoView = require("../info_view");

async function GetCollegeInfo(){
  let res= await InfoView.GetCollegeInfo().catch(err=>{
    console.log("err:",err);
  });
  console.log(res[0]);
  /**
   * {
   * cno: '0',
   * cname: '管理学院',
   * plan_total_peo: 1142,
   * get_total_peo: null,
   * suc_cnt: null,
   * adj_cnt: null,
   * suc_max_grade: null,
   * adj_max_grade: null,
   * suc_min_grade: null,
   * adj_min_grade: null,
   * suc_high_rank: null,
   * adj_high_rank: null,
   * suc_avg_grade: null,
   * adj_avg_grade: null,
   * suc_low_rank: null,
   * adj_low_rank: null
   * }
   */
}

async function GetSpeInfo(){
  let res= await InfoView.GetSpeInfo().catch(err=>{
    console.log("err:",err);
  });
  console.log(res[0]);
  /**
   * {
   * spe_no: '064',
   * cno: '12',
   * spe_name: '电气工程及其自动化',
   * plan_total_peo: 69,
   * get_total_peo: 3,
   * suc_cnt: 2,
   * adj_cnt: 1,
   * suc_max_grade: 588,
   * adj_max_grade: 586,
   * suc_min_grade: 581,
   * adj_min_grade: 586,
   * suc_high_rank: 17653,
   * adj_high_rank: 18697,
   * suc_avg_grade: 584.5,
   * adj_avg_grade: 586,
   * suc_low_rank: 19563,
   * adj_low_rank: 18697
   * }
   */
}

async function GetStudentInfo(){
  let res= await InfoView.GetStudentInfo().catch(err=>{
    console.log(err);
  }).then(res=>{
    console.log(res);
  })
  /**
   * {
   * sno: '21441164246471',
   * sname: '蔡**16',
   * grade: 555,
   * rank: 43950,
   * spe_group: '209',
   * isadjust: 1,
   * langue: '英语',
   * intention1: '068',
   * intention2: '066',
   * intention3: '065',
   * intention4: '064',
   * intention5: '067',
   * intention6: '063',
   * spe_no: '068',
   * status: '成功录取',
   * spe_name: '电子商务'
   * },
   */
}

GetStudentInfo();
