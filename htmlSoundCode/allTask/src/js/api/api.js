var api =  require('./server.js');
module.exports.taskList = async function (data = {}) {
  let action = 'task/alltask/taskList.do';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.getTaskStatusList = async function (data = {}) {
  let action = 'task/alltask/getTaskStatusList.do';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.taskDifficulty = async function (data = {}) {
  let action = 'core/service/TASK_DIFFICULTY_LEVEL/queryList';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.getTaskTypeList = async function (data = {}) {
  let action = 'task/alltask/getTaskTypeList.do';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.taskQuery = async function (data = {}) {
  let action = 'core/service/task/queryOne';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.getUserList = async function (data = {}) {
  let action = 'task/alltask/getUserList.do';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.insertOrUpdate = async function (data = {}) {
  let action = 'core/service/task/insertOrUpdate';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.needQueryOne = async function (data = {}) {
  let action = 'core/service/task_need/queryOne';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.deleteTask = async function (data = {}) {
  let action = 'core/service/task/delete';
  const paramet = { deletestatus: 1, ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.queryPageList = async function (data = {}) {
  let action = 'core/service/task_process/queryPageList';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.processUpdate = async function (data = {}) {
  let action = 'core/service/task_process/insertOrUpdate';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.processQueryOne = async function (data = {}) {
  let action = 'core/service/task_process/queryOne';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.updateScore = async function (data = {}) {
  let action = 'core/service/task_need/updateScore';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.delProcess = async function (data = {}) {
  let action = 'core/service/task_process/delete';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}

module.exports.finish = async function (data = {}) {
  let action = 'task/need/finish.do';
  const paramet = { ...data };
  let result = '';
  api.POST(action, paramet, function (res) {
    result = res;
  }, true)
  return await result;
}
