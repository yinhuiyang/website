module.exports.getlist=function(paramet) {
    let api = require('./tool.js');
    let action = 'task/bug/queryList.do';
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    },true);
    return res;
};

module.exports.queryVersionList = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/task_need/queryVersionList"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    },true);
    return res;
}

module.exports.getUserList = function (paramet){
    let api = require('./tool.js');
    let action = "task/alltask/getUserList.do"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    },true);
    return res;
}

module.exports.queryOne = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/bug/queryOne"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    },true);
    return res;
}

module.exports.getBugStatusList = function (paramet){
    let api = require('./tool.js');
    let action = "task/bug/getBugStatusList.do"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    });
    return res;
}

module.exports.getBugLevelList = function (paramet){
    let api = require('./tool.js');
    let action = "task/bug/getBugLevelList.do"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    });
    return res;
}

module.exports.getQualityLevel = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/task_dic/queryList?type=0"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    });
    return res;
}

module.exports.getPriorityLevel = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/task_dic/queryList?type=1"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    });
    return res;
}

module.exports.getBugSourceList = function (paramet){
    let api = require('./tool.js');
    let action = "task/bug/getBugSourceList.do"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    });
    return res;
}

module.exports.bugDelete = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/bug/delete"
    let res = {}
    api.POST(action,paramet,function(data) {
        res = data
    },true);
    return res;
}

module.exports.bugEditSave = function (paramet){
    let api = require('./tool.js');
    let action = "task/bug/bugEditSave.do";
    let res = {};
    api.POST(action,paramet,function(data) {
        res = data;
    },true);
    return res;
}

module.exports.bugAddSave = function (paramet){
    let api = require('./tool.js');
    let action = "task/bug/bugAddSave.do";
    let res = {};
    api.POST(action,paramet,function(data) {
        res = data;
    },true);
    return res;
}

module.exports.insertOrUpdate = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/bug_process/insertOrUpdate";
    let res = {};
    api.POST(action,paramet,function(data) {
        res = data;
    },true);
    return res;
}

module.exports.assistQueryOne = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/bug_process/queryOne";
    let res = {};
    api.POST(action,paramet,function(data) {
        res = data;
    },true);
    return res;
}

module.exports.assistQueryList = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/bug_process/queryList";
    let res = {};
    api.POST(action,paramet,function(data) {
        res = data;
    },true);
    return res;
}

module.exports.assistDelete = function (paramet){
    let api = require('./tool.js');
    let action = "core/service/bug_process/delete";
    let res = {};
    api.POST(action,paramet,function(data) {
        res = data;
    },true);
    return res;
}
