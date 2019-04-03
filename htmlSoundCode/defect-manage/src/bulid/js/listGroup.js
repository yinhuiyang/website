'use strict';

module.exports = function (data, state) {
  var dialog = require('./dialog.js');
  var layout = require('./layout.js');

  var _require = require('./api.js'),
      queryOne = _require.queryOne;

  var html = '';
  data.data.result.needs.forEach(function (el) {
    html += '\n  <li>\n    <div class="list-group-item" id="' + el.needid + '">\n      <div class="item-title">\n        <div>\n          <div class="title-font">' + el.needtitle + '</div>\n          <span class="item-state">' + state + '</span>\n        </div>\n        <div class="dropdown-defect">\n          <i class="fa fa-chevron-down dropDown" style=""></i>\n          <ul class="dropdown-menu dropdown-menu-right dropDownBox" style="display: none;">\n            <li>\n              <a href="#" class="addDefect"><i class="fa fa-pencil"></i>\u6DFB\u52A0\u7F3A\u9677</a>\n            </li>\n            <li style="display: ' + (el.needid ? '' : 'none') + ';">\n              <a target="_blank" href="' + coos.basePath + 'task/need/toView.do?&amp;needid=' + el.needid + '"><i class="fa fa-eye"></i>\u67E5\u770B\u9700\u6C42</a>\n            </li>\n          </ul>\n        </div>\n      </div>\n      <div class="interior-list">';
    el.bugs.forEach(function (element) {
      html += '\n          <div class="interior-item" style="width: 100%;" id="' + element.bugid + '">\n            <div class="interior-title">\n              <span>' + element.title + '</span>\n              <div>\n                <span class="">' + (element.workhour || 0) + '\u5C0F\u65F6</span>\n              </div>\n            </div>\n            <div class="interior-state">\n              <span>' + element.username + '</span>\n            </div>\n            <div class="interior-time">\n              <span>' + (element.plancompletetime ? element.plancompletetime.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5") : '') + '</span>\n            </div>\n          </div>\n        ';
    });

    html + '</div>\n      </div>\n    </li>';
  });

  $('.list-group').html(html);
  $('.dropDown').click(function (e) {
    e.stopPropagation();
    $('.dropDownBox').hide();
    $(this).siblings('.dropDownBox').toggle();
  });
  $('.addDefect').click(function () {
    var $need = $(this).parent().parent().parent().parent().parent();
    var paramet = {
      needid: $need.attr('id'),
      task_need_title: $need.find('.item-title .title-font').text(),
      addDefect: true
    };
    console.log(paramet);
    dialog(paramet);
  });
  $('.interior-item').click(function () {
    var data = queryOne({ bugid: $(this).attr('id') });
    dialog(data.result.model1.value);
  });
  layout();
};