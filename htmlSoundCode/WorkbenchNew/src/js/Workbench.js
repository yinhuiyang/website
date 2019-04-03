var PageView = require('./pageView.js');
var nav = require('./nav.js');
var getlist = require('./getlist.js');
var data = require('./data.js')
var Workbench = {
  init() {
    coos.basePath = 'http://localhost:8000/api/';// 本地调试用
    nav(getlist)
    this.pageView();
    getlist();
    
  },
  getdata() {
    data.pageView.disable();
    console.log(data.pageView.getParams())
    data.pageView.pageIndex = data.pageView.getParams().page
    data.allPage = data.pageView.getParams().page
    getlist();
  },
  pageView() {
    let _this = this
    var pageView = new PageView('.pagination', {
      defaultSize: 5,
      onChange: _this.getdata
    })
    data.pageView = pageView
  }
};
window.Workbench = Workbench;
