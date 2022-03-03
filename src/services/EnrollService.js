/*
 * @Author: Orangepi - xcy2001@sina.cn
 * @Date: 2022-01-01 01:46:54
 * @LastEditTime: 2022-01-01 02:45:34
 * @LastEditors: Orangepi - xcy2001@sina.cn
 * @Description: 处理录取相关事务
 * @FilePath: \college-application-enrollment-backend\src\services\LoginService.js
 */


const Enroll = require("../models/enroll");
class EnrollService {
    async enroll() {
        let remainList = {
            specialty: [],
            langue: [],
            remain_peo: [],
            lowest: [],
            physique: []
        };
        let remain_stu = [];
        const plans = await getPlan()
            .catch(err => { return { unsuccess: true, err } });
        if (plans.unsuccess) {
            console.log("err:", plans.err);
            throw new Error(plans.err)
        };
        // console.log(plans);
        for (const plan of plans) {
            //plan:当前专业组的招生计划
            // console.log(plan);
            const students = await getGroupStudents(plan.group)
                .catch(err => { return { unsuccess: true, err } });
            // console.log(students);
            if (students.unsuccess) {
                console.log("err:", students.err);
            }
            if (students) {
                // console.log(students);
                const remain = await enrollSP(students, plan)
                    .catch(err => { return { unsuccess: true, err } });
                if (remain.unsuccess) {
                    console.log("err:", remain.err);
                    throw new Error(remain.err);
                };
                remainList.specialty.push(...remain.plan.specialty);
                remainList.langue.push(...remain.plan.langue);
                remainList.remain_peo.push(...remain.plan.remain_peo);
                remainList.lowest.push(...remain.plan.lowest);
                remainList.physique.push(...remain.plan.physique);
                remain_stu.push(...remain.students);
                // console.log(remain);
                // console.log(remainList);
                // console.log(remain_stu);
            } else {
                remainList.specialty.push(...plan.specialty);
                remainList.langue.push(...plan.langue);
                remainList.remain_peo.push(...plan.remain_peo);
                remainList.lowest.push(...plan.lowest);
                remainList.physique.push(...plan.physique);
            }
        }
        remainList = order_List(remainList);
        // console.log(remain_stu);
        // console.log(remainList);
        adjust(remainList, remain_stu);
        return true;
    }

}

function order_List(remainList) {
    let after_List = {
        specialty: [],
        langue: [],
        remain_peo: [],
        lowest: [],
        physique: []
    }
    while (remainList.lowest.length) {
        const index = remainList.lowest.indexOf(Math.min(...remainList.lowest));

        after_List.specialty.push(remainList.specialty[index]);
        after_List.langue.push(remainList.langue[index]);
        after_List.remain_peo.push(remainList.remain_peo[index]);
        after_List.lowest.push(remainList.lowest[index]);
        after_List.physique.push(remainList.physique[index]);

        remainList.specialty.splice(index, 1);
        remainList.langue.splice(index, 1);
        remainList.remain_peo.splice(index, 1);
        remainList.lowest.splice(index, 1);
        remainList.physique.splice(index, 1);
    }
    return after_List;
}

/**
     * @description 获取招生计划
     * @returns {Array} 招生计划信息 
     */
async function getPlan() {
    const res = await Enroll.GetSpecialty()
        .catch(err => { return { unsuccess: true, err } });

    if (res.unsuccess) {
        throw new Error("获取招生计划表失败:" + res.err)
    }
    const speRes = await Enroll.GetSPhysiques()
        .catch(err => { return { unsuccess: true, err } });
    if (speRes.unsuccess) {
        throw new Error("获取专业体质失败:" + speRes.err)
    }

    const groups = res.reduce((pre, now) => {
        if (pre.indexOf(now.spe_group) == -1) {
            pre.push(now.spe_group);
        }
        return pre;
    }, [])
    let plans = [];
    for (const spe_group of groups) {
        const specialtyRes = res.filter(item => {
            return item.spe_group == spe_group;
        })
        const specialty = specialtyRes.map(item => {
            return item.spe_no
        });
        const langue = specialtyRes.map(item => {
            return item.langue
        });
        const remain_peo = specialtyRes.map(item => {
            return item.total_peo
        });
        const lowest = specialtyRes.map(item => {
            return Infinity
        });
        let physique = [];
        for (const spe of specialty) {
            let spe_physique = speRes.filter(item => {
                return item.spe_no == spe
            }).map(item => {
                return item.physique
            })
            physique.push(spe_physique);
        }
        let plan = {
            "group": spe_group,
            "specialty": specialty,
            "langue": langue,
            "remain_peo": remain_peo,
            "lowest": lowest,
            "physique": physique
        };
        console.log(plan);
        plans.push(plan);
    }
    return plans;
}


// async function getPlan() {//获取招生计划
//     let plans = [];
//     const group = await Enroll.GetGroup()
//         .catch(err => { return { unsuccess: true, err } });
//     if (group.unsuccess) {
//         console.log("err:", group.err);
//         throw new Error("获取分组失败:" + group.err)
//     }
//     // console.log(group);
//     for (const iterator of group) {
//         const all_specialty = await Enroll.GetSpeGroup(iterator.spe_group)
//             .catch(err => { return { unsuccess: true, err } });
//         if (all_specialty.unsuccess) {
//             console.log("err:", all_specialty.err);
//             throw new Error("获取专业失败:" + all_specialty.err)
//         }
//         remain_peo = all_specialty.map((item) => {
//             return item.total_peo;
//         })
//         specialty = all_specialty.map((item) => {
//             return item.spe_no;
//         })
//         langue = all_specialty.map((item) => {
//             return item.langue;
//         })
//         lowest = all_specialty.map((item) => {
//             return Infinity;
//         })
//         const specialty_group = {
//             "group": iterator.spe_group,
//             "specialty": specialty,
//             "langue": langue,
//             "remain_peo": remain_peo,
//             "lowest": lowest,
//             "physique": []
//         }
//         for (const specialty of specialty_group.specialty) {
//             const physiques = await Enroll.GetSpePhysiques(specialty)
//                 .catch(err => { return { unsuccess: true, err } });

//             if (physiques.unsuccess) {
//                 console.log("err:", physiques.err);
//                 throw new Error("获取体检受限失败:" + physiques.err)
//             }
//             let phy = [];
//             if (physiques.length) {
//                 for (const item of physiques) {
//                     phy.push(item.physique);
//                 }
//             }
//             specialty_group.physique.push(phy);
//         }
//         plans.push(specialty_group);
//     }
//     // console.log(plans);
//     return plans;
// }

/**
 * @description 获取某个专业组学生填报的志愿信息
 * @param {int} group 专业组id
 * @returns {Array} 该专业组学生填报的志愿信息
 */

async function getGroupStudents(group) {
    const studentsInfo = await Enroll.GetGroupStudentsInfo(group)
        .catch(err => { return { unsuccess: true, err } });
    // console.log(studentsInfo);
    if (studentsInfo.unsuccess) {
        console.log("err:", studentsInfo.err);
        throw new Error("获取学生失败:" + studentsInfo.err)
    }

    const stuPhysiques = await Enroll.GetStudentsPhysiques()
        .catch(err => { return { unsuccess: true, err } });
    if (stuPhysiques.unsuccess) {
        console.log("err:", stuPhysiques.err);
        throw new Error("获取学生体质失败:" + stuPhysiques.err)
    }

    let students = [];
    if (studentsInfo.length) {
        for (const stuInfo of studentsInfo) {
            let intention = [];
            intention.push(stuInfo.intention1, stuInfo.intention2, stuInfo.intention3
                , stuInfo.intention4, stuInfo.intention5, stuInfo.intention6);
                
            let physique = stuPhysiques.filter(item => {
                    return item.sno == stuInfo.sno
                }).map(item => {
                    return item.physique
                })

            let stu = {
                "sno": stuInfo.sno,
                "rank": stuInfo.rank,
                "isadjust": stuInfo.isadjust,
                "langue": stuInfo.langue,
                "intentions": intention,
                "physique": physique
            }
            students.push(stu);
        }
    }
    console.log(students);
    return students

}
// async function getGroupStudents(group) {
//     const students = await Enroll.GetGroupStudents(group)
//         .catch(err => { return { unsuccess: true, err } });
//     console.log(students);
//     if (students.unsuccess) {
//         console.log("err:", students.err);
//         throw new Error("获取学生失败:" + students.err)
//     }
//     if (students.length) {
//         for (const stu of students) {
//             const intentions = await Enroll.GetIntentions(stu.sno)
//                 .catch(err => { return { unsuccess: true, err } });
//             if (intentions.unsuccess) {
//                 console.log("err:", intentions.err);
//                 throw new Error("获取学生志愿失败:" + intentions.err)
//             };
//             stu.intentions = [];
//             for (const key in intentions[0]) {
//                 if (Object.hasOwnProperty.call(intentions[0], key)) {
//                     const intention = intentions[0][key];
//                     stu.intentions.push(intention);
//                 }
//             }
//             const physiques = await Enroll.GetStuPhysiques(stu.sno)
//                 .catch(err => { return { unsuccess: true, err } });
//             if (physiques.unsuccess) {
//                 console.log("err:", physiques.err);
//                 throw new Error("获取学生体质失败:" + physiques.err)
//             };
//             stu.physique = [];
//             if (physiques.length) {
//                 for (const phy of physiques) {
//                     stu.physique.push(phy.physique);
//                 }
//             }
//         }
//         // console.log(students);  
//     }
//     console.log(students);
//     return students;
// }

// getGroupStudents('209');
// getGroupStudents(201);


/**
 * @description 判断某志愿是否可以加入
 * @param {object} students 学生信息
 * @param {object} plan 专业组信息
 * @return {Array} remainList 专业信息
 */
async function enrollSP(students, plan) {
    let remainList = {
        plan: plan,
        students: []
    };
    let resList = [];
    for (const stu of students) {
        let enroll = false;
        for (const s_intention of stu.intentions) {
            //遍历学生志愿
            const index = plan.specialty.indexOf(s_intention);
            if (index != -1) {
                //该专业有剩余的席位
                if (!plan.langue[index] || stu.langue == plan.langue[index]) {
                    //外语语种要求不冲突
                    let Disable = true;
                    for (const physique of stu.physique) {
                        if (plan.physique[index].indexOf(physique) != -1) {
                            //体制受限
                            Disable = false;
                            break;
                        }
                    }

                    if (Disable) {
                        //学生没有体质受限,录取
                        enroll = true;
                        plan.remain_peo[index]--;
                        plan.lowest[index] = stu.rank;
                        //插入到成功录取数组
                        resList.push([plan.specialty[index], stu.sno, "成功录取"]);

                        if (plan.remain_peo[index] == 0) {
                            plan.specialty.splice(index, 1);
                            plan.langue.splice(index, 1);
                            plan.remain_peo.splice(index, 1);
                            plan.lowest.splice(index, 1);
                            plan.physique.splice(index, 1);
                        }
                        //录取到就退出
                        break;
                    }
                }
            }
        }
        if (!enroll) {
            //没有被录取
            if (stu.isadjust) {
                //允许调剂
                remainList.students.push(stu);
                remainList.plan = plan;
            } else {
                //不允许调剂，退档直接插入结果表 
                resList.push([null, stu.sno, "退档"]);
                // const res = Enroll.InsertResult(null, stu.sno, "退档");
                // if (res.unsuccess) {
                //     console.log("err:", res.err);
                //     throw new Error("插入失败:" + res.err)
                // }
            }
        }
    }
    if (resList.length) {
        const res = await Enroll.InsertResult(resList)
            .catch(err => { return { unsuccess: true, err } });
        if (res.unsuccess) {
            // console.log("xxxerr:", res.err);
            throw new Error("插入失败:" + res.err);
        }
        // console.log("enrollList" + enrollList);
    }
    return remainList;
}


async function adjust(remainList, remain_stu) {
    let resList = [];
    for (const stu of remain_stu) {
        //标记是否成功调剂
        let adjust_suc = false;
        for (let i = 0; i < remainList.remain_peo.length; i++) {
            //遍历所有专业
            //外语语种,体质监测是否过关
            let disable = true;

            if (!remainList.langue[i] || stu.langue == remainList.langue[i]) {
                //外语语种通过
                for (const iterator of stu.physique) {
                    if (remainList.physique[i].indexOf(iterator) != -1) {
                        //体制受限
                        disable = false;
                        break;
                    }
                }
            } else {
                disable = false;
            }

            if (disable) {
                //外语语种合格，体制没有受限，调剂到该专业
                adjust_suc = true;
                resList.push([remainList.specialty[i], stu.sno, "调剂录取"]);
                // const res = await db.query("INSERT INTO `result` (`spe_no`,`sno`,`status`)"
                //             + " values(?,?,?)", [remainList.specialty[i], stu.sno, "调剂录取"]);
                //调剂之后该专业满人，从调剂表删除该专业
                if (--remainList.remain_peo[i] == 0) {
                    remainList.specialty.splice(i, 1);
                    remainList.langue.splice(i, 1);
                    remainList.remain_peo.splice(i, 1);
                    remainList.lowest.splice(i, 1);
                    remainList.physique.splice(i, 1);
                };
                break;
            }
        }
        if (!adjust_suc) {
            //退档
            resList.push([null, stu.sno, "退档"])
            // const res = await db.query("INSERT INTO `result` (`spe_no`,`sno`,`status`)"
            //         + " values(null,?,?)", [stu.sno, "退档"]);
        }
    }
    if (resList.length) {
        const res = await Enroll.InsertResult(resList)
            .catch(err => { return { unsuccess: true, err } });
        if (res.unsuccess) {
            console.log("err:", res.err);
            throw new Error("插入失败:" + res.err)
        }
        // console.log(resList);
    }
}
// getPlan();
// const E = new EnrollService();
// E.enroll();
module.exports = new EnrollService();