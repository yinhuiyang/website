'use strict';

var PageView = require('./pageView.js');
var nav = require('./nav.js');
var getlist = require('./getlist.js');
var data = require('./data.js');
var Workbench = {
  init: function init() {
    // coos.basePath = 'http://localhost:8000/api/';
    nav(getlist);
    this.pageView();
    getlist();
  },
  getdata: function getdata() {
    data.pageView.disable();
    console.log(data.pageView.getParams());
    data.pageView.pageIndex = data.pageView.getParams().page;
    data.allPage = data.pageView.getParams().page;
    getlist();
  },
  pageView: function pageView() {
    var _this = this;
    var pageView = new PageView('.pagination', {
      defaultSize: 5,
      onChange: _this.getdata
    });
    data.pageView = pageView;
  }
};
window.Workbench = Workbench;