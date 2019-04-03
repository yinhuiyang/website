'use strict';

module.exports = function () {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var data = require('./data');
  var list = require('./list.js');

  var _require = require('./api'),
      getFavouriteProjects = _require.getFavouriteProjects,
      getAllProjects = _require.getAllProjects,
      getMyCreateProjects = _require.getMyCreateProjects;

  type = type || $('.Workbench-section .nav-links li.active').find('a').text();
  if (type == '星标项目') {
    data.typeProject = 0;
    $('.gl-pagination').hide();
    list(getFavouriteProjects({ searchtitle: data.searchtitle }));
  } else if (type == '所有参与项目') {
    data.typeProject = 1;
    $('.gl-pagination').show();
    var listdata = getAllProjects({ currentpage: data.allPage, searchtitle: data.searchtitle });
    data.pageView.refresh(listdata.data.result.totalcount);
    data.pageView.enable();
    list(listdata);
  } else {
    data.typeProject = 0;
    $('.gl-pagination').hide();
    list(getMyCreateProjects({ searchtitle: data.searchtitle }));
  }
};