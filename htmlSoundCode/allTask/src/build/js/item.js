'use strict';

module.exports = function item() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var getTime = require('./getTime.js');
  var html = '';
  result.forEach(function (el) {
    html += '\n    <div class="task-item" id="' + el.taskid + '">\n      <div class="task-title">\n        <span>' + el.title + '</span>\n        <div>\n          <span class="">' + (el.allworkhour || '0') + '\u5C0F\u65F6</span>\n          <span class="">' + (el.currentprocess || '0') + '%</span>\n        </div>\n      </div>\n      <div class="task-state">\n        <div class="task-score" ' + (el.currentprocess == 100 ? "" : 'style="display: none;"') + '>\n          <ul>\n          ' + function (el) {
      var li = '';
      if (!el.score) el.score = 3;
      for (var i = 0; i < el.score; i++) {
        li += '<li><i class="fa fa-star"></i></li>';
      }
      return li;
    }(el) + '\n          </ul>\n        </div>\n        <span>' + (el.trustusername || '') + '</span>\n      </div>\n    <div class="task-time">\n      <span>' + getTime(el.planstarttime) + ' -- ' + getTime(el.planendtime) + '</span>\n    </div>\n  </div>';
  });
  if (!result.length) {
    html = '<div class="task-item">\n    <div class="task-title">\n      <span>\u6682\u65E0\u4EFB\u52A1</span>\n      <div>\n        <span class="">0\u5C0F\u65F6</span>\n        <span class="">0%</span>\n      </div>\n    </div>\n    <div class="task-state">\n    </div>\n  <div class="task-time">\n  </div>\n</div>';
  }
  return html;
};