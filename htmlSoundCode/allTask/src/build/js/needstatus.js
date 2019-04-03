'use strict';

module.exports = function (status) {
  var statusName = '';
  switch (status) {
    case '0':
      statusName = "规划中";
      break;
    case '1':
      statusName = "启动";
      break;
    case '2':
      statusName = "进行中";
      break;
    case '8':
      statusName = "完成";
      break;
    case '9':
      statusName = "上线";
      break;
    default:
      statusName = '';
  }
  return statusName;
};