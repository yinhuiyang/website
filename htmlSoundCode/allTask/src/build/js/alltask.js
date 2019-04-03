'use strict';

var data = require('./data.js');
var nav = require('./nav.js');
var load = require('./load.js');
var _dialog = require('./dialog.js');

var _require = require('./api.js'),
    getTaskStatusList = _require.getTaskStatusList,
    taskDifficulty = _require.taskDifficulty,
    getTaskTypeList = _require.getTaskTypeList,
    taskQuery = _require.taskQuery;
// coos.basePath = 'http://localhost:8080/api/';

window.task = {
  init: function init() {
    getTaskStatusList().then(function (res) {
      if (res.data) {
        data.taskState = res.data.result;
      }
    });
    taskDifficulty().then(function (res) {
      if (res.result) {
        data.taskDifficulty = res.result.model1.value;
      }
    });
    getTaskTypeList().then(function (res) {
      if (res.data) {
        data.taskType = res.data.result;
      }
    });
    this.bodyFn();
  },
  taskInit: function taskInit() {
    nav();
    load().init();
  },
  bodyFn: function bodyFn() {
    $('body').on('click', function () {
      $('.taskdown').hide();
      $('.taskModal-state>ul').hide();
      $('.difficultylevelid>ul').hide();
      $('.typeid>div').hide();
      $('.menuList').hide();
    });
  },
  dialog: function dialog(_ref) {
    var needid = _ref.needid,
        needTitle = _ref.needTitle,
        _ref$addModal = _ref.addModal,
        addModal = _ref$addModal === undefined ? false : _ref$addModal,
        _ref$taskid = _ref.taskid,
        taskid = _ref$taskid === undefined ? "" : _ref$taskid;

    if (addModal) {
      _dialog({ needid: needid, needTitle: needTitle, addModal: addModal });
    } else {
      taskQuery({ taskid: taskid }).then(function (res) {
        res.result.model1.value.needTitle = needTitle;
        $('body').addClass('coos-over-hidden');
        _dialog(res.result.model1.value);
      });
    }
  }
};