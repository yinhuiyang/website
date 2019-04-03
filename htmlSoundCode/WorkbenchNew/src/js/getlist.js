module.exports = function (type = '') {
  var data = require('./data')
  var list = require('./list.js')
  var {getFavouriteProjects, getAllProjects, getMyCreateProjects} = require('./api');
  type = type || $('.Workbench-section .nav-links li.active').find('a').text()
  if (type == '星标项目') {
    data.typeProject = 0
    $('.gl-pagination').hide();
    list(getFavouriteProjects({searchtitle: data.searchtitle}))
  } else if (type == '所有参与项目') {
    data.typeProject = 1
    $('.gl-pagination').show();
    let listdata = getAllProjects({currentpage: data.allPage, searchtitle: data.searchtitle})
    data.pageView.refresh(listdata.data.result.totalcount);
    data.pageView.enable()
    list(listdata)
  } else {
    data.typeProject = 0
    $('.gl-pagination').hide();
    list(getMyCreateProjects({searchtitle: data.searchtitle}))
  }
}
