'use strict';

module.exports.getlist = function (paramet) {
    var api = require('./tool.js');
    var action = 'task/bug/queryList.do';
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.queryVersionList = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/task_need/queryVersionList";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.getUserList = function (paramet) {
    var api = require('./tool.js');
    var action = "task/alltask/getUserList.do";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.queryOne = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/bug/queryOne";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.getBugStatusList = function (paramet) {
    var api = require('./tool.js');
    var action = "task/bug/getBugStatusList.do";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    });
    return res;
};

module.exports.getBugLevelList = function (paramet) {
    var api = require('./tool.js');
    var action = "task/bug/getBugLevelList.do";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    });
    return res;
};

module.exports.getQualityLevel = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/task_dic/queryList?type=0";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    });
    return res;
};

module.exports.getPriorityLevel = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/task_dic/queryList?type=1";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    });
    return res;
};

module.exports.getBugSourceList = function (paramet) {
    var api = require('./tool.js');
    var action = "task/bug/getBugSourceList.do";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    });
    return res;
};

module.exports.bugDelete = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/bug/delete";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.bugEditSave = function (paramet) {
    var api = require('./tool.js');
    var action = "task/bug/bugEditSave.do";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.bugAddSave = function (paramet) {
    var api = require('./tool.js');
    var action = "task/bug/bugAddSave.do";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.insertOrUpdate = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/bug_process/insertOrUpdate";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.assistQueryOne = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/bug_process/queryOne";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.assistQueryList = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/bug_process/queryList";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};

module.exports.assistDelete = function (paramet) {
    var api = require('./tool.js');
    var action = "core/service/bug_process/delete";
    var res = {};
    api.POST(action, paramet, function (data) {
        res = data;
    }, true);
    return res;
};