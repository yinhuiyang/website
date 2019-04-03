'use strict';

module.exports = function (paramet, $dialog) {
  var _require = require('./api.js'),
      assistQueryList = _require.assistQueryList;

  var item = '';
  assistQueryList(paramet).result.model1.value.forEach(function (el) {
    item += '<div class="assist-item" data-assistid="' + el.processid + '">\n    <div class="assist-item-left">\n      <span>' + el.username + '</span>\n      <span>' + (el.workdate ? el.workdate.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3") : '') + '</span>\n      <span>' + el.workhour + '\u5C0F\u65F6</span>\n    </div>\n    <div class="assist-item-right">\n      <i class="fa fa-chevron-right"></i>\n    </div>\n  </div>';
  });
  $dialog.find('.assist-list').html(item);
};