const College = require('../college')

async function bulkCreate() {

  let res = await College.findAll();
  console.log(res);
}

bulkCreate();
