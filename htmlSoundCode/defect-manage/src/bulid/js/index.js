'use strict';

var data = require('./data.js');
var state = require('./nav.js');
var getlist = require('./getlist.js');

var _require = require('./api.js'),
    getBugStatusList = _require.getBugStatusList,
    getBugLevelList = _require.getBugLevelList,
    getBugSourceList = _require.getBugSourceList;

var defect = {
  init: function init() {
    this.bodyFn();
    data.bugStatus = getBugStatusList().data.result;
    data.bugLevel = getBugLevelList().data.result;
    data.bugSource = getBugSourceList().data.result;
    setTimeout(function () {
      getlist();
      state(getlist, data);
    }, 500);
    $('body').click(function () {
      $('.select-chaozuo').hide();
    });
  },
  bodyFn: function bodyFn() {
    $('body').click(function () {
      $('.dropDownBox').hide();
    });
  }
};
window.defect = defect;