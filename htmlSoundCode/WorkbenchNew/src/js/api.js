module.exports.getFavouriteProjects=function(paramet) {
  let api = require('./tool.js');
  let action = 'index/getFavouriteProjects.do';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.getAllProjects=function(paramet) {
  let api = require('./tool.js');
  let action = 'index/getAllProjects.do';
  let res = {}
  paramet.pagesize = 5
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.getMyCreateProjects=function(paramet) {
  let api = require('./tool.js');
  let action = 'index/getMyCreateProjects.do';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.insert=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project/insert';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.projectQueryOne=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project/queryOne';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.projectupdate=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project/update';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.getTaskStatusList=function(paramet) {
  let api = require('./tool.js');
  let action = 'task/alltask/getTaskStatusList.do';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};
module.exports.versionQueryOne=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_version/queryOne';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.versionInsert=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_version/insert';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.versionUpdate=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_version/update';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.addFavourite=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project_favourite/insert';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.delFavourite=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project_favourite/delete';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.delversion=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_version/delete';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.queryAuthGroup=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project/group/queryAuthGroup';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.updateAuthGroup=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project/group/updateAuthGroup';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};
module.exports.projectdelete=function(paramet) {
  let api = require('./tool.js');
  let action = 'core/service/task_project/delete';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};

module.exports.getTotalCount=function(paramet) {
  let api = require('./tool.js');
  let action = 'index/getTotalCount.do';
  let res = {}
  api.POST(action,paramet,function(data) {
      res = data
  },true);
  return res;
};
