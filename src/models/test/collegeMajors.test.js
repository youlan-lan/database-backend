const collegeMajors = require('../collegeMajors')

async function fun(){
  // let result = await collegeMajors.GetCollegeAndMajors();
  // console.log(result, typeof result);
  // let result = await collegeMajors.GetMajorsStudents("6");
  // let newResult = [];
  // await result.forEach( i => { 
  //   let tmp = newResult.map(s=>s.spe_id);
  //   //此同学所在专业已在数组中
  //   let index = tmp.indexOf(i.spe_no);
  //   if( -1 !== index){
  //     newResult[index].students.push({
  //       studentName: i.spe_name,
  //       grade: i.grade,
  //       rank: i.rank,
  //     })
  //   }else{
  //     //此同学所在专业未在数组中
  //     newResult.push({
  //       spe_id: i.spe_no,
  //       spe_name: i.spe_name,
  //       college: i.cname,
  //       location: i.location,
  //       students:[{
  //         studentName: i.spe_name,
  //         grade: i.grade,
  //         rank: i.rank,
  //       }]
  //     })
  //   }
  //   // delete tmp;
  // });

  let result = await collegeMajors.jugMajorExist("电子");
  console.log(result);
}

fun();
