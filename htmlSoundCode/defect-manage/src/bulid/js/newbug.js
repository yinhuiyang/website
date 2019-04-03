'use strict';

var data = require('./data.js');
var state = require('./nav.js');
var getlist = require('./getlist.js');

var _require = require('./api.js'),
    getBugStatusList = _require.getBugStatusList,
    getBugLevelList = _require.getBugLevelList,
    getBugSourceList = _require.getBugSourceList,
    queryOne = _require.queryOne,
    getQualityLevel = _require.getQualityLevel,
    getPriorityLevel = _require.getPriorityLevel;

var _dialog = require('./dialog.js');
var defect = {
  defectInit: function defectInit() {
    this.bodyFn();
    setTimeout(function () {
      getlist();
      state(getlist, data);
    }, 500);
    $('body').click(function () {
      $('.select-chaozuo').hide();
    });
  },
  init: function init() {
    // coos.basePath = 'http://localhost:8000/api/';
    try {
      data.bugStatus = getBugStatusList().data.result;
      data.bugLevel = getBugLevelList().data.result;
      data.bugSource = getBugSourceList().data.result;
      data.qualityLevel = getQualityLevel().result.model1.value;
      data.priorityLevel = getPriorityLevel().result.model1.value;
    } catch (error) {
      console.log('未登录', error);
    }
  },
  bodyFn: function bodyFn() {
    $('body').click(function () {
      $('.dropDownBox').hide();
    });
  },
  dialog: function dialog() {
    var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var paramet = {};
    if (!res.bugid) {
      paramet = {
        needid: res.needid || '',
        task_need_title: res.task_need_title || '',
        addDefect: true
      };
    } else {
      paramet = queryOne({ bugid: res.bugid }).result.model1.value;
    }
    _dialog(paramet);
  }
};
window.defect = defect;