'use strict';

module.exports = function () {
  var _require = require('./api.js'),
      getTotalCount = _require.getTotalCount;

  var res = getTotalCount().data.result;
  $('.Workbench-section .nav-links li').each(function (i) {
    if (i == 0) {
      $(this).find('span').text('(' + res.favouriteCount + ')');
    } else if (i == 1) {
      $(this).find('span').text('(' + res.participationCount + ')');
    } else if (i == 2) {
      $(this).find('span').text('(' + res.createCount + ')');
    }
  });
};