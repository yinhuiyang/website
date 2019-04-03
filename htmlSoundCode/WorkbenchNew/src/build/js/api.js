'use strict';

module.exports.getFavouriteProjects = function (paramet) {
  var api = require('./tool.js');
  var action = 'index/getFavouriteProjects.do';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.getAllProjects = function (paramet) {
  var api = require('./tool.js');
  var action = 'index/getAllProjects.do';
  var res = {};
  paramet.pagesize = 5;
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.getMyCreateProjects = function (paramet) {
  var api = require('./tool.js');
  var action = 'index/getMyCreateProjects.do';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.insert = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project/insert';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.projectQueryOne = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project/queryOne';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.projectupdate = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project/update';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.getTaskStatusList = function (paramet) {
  var api = require('./tool.js');
  var action = 'task/alltask/getTaskStatusList.do';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};
module.exports.versionQueryOne = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_version/queryOne';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.versionInsert = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_version/insert';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.versionUpdate = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_version/update';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.addFavourite = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project_favourite/insert';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.delFavourite = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project_favourite/delete';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.delversion = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_version/delete';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.queryAuthGroup = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project/group/queryAuthGroup';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.updateAuthGroup = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project/group/updateAuthGroup';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};
module.exports.projectdelete = function (paramet) {
  var api = require('./tool.js');
  var action = 'core/service/task_project/delete';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};

module.exports.getTotalCount = function (paramet) {
  var api = require('./tool.js');
  var action = 'index/getTotalCount.do';
  var res = {};
  api.POST(action, paramet, function (data) {
    res = data;
  }, true);
  return res;
};