'use strict';

module.exports = function list(result, status) {
  var layout = require('./layout.js');
  var item = require('./item.js');
  var dialog = require('./dialog.js');
  var needscore = require('./needscore.js');
  var needstatus = require('./needstatus.js');

  var _require = require('./api.js'),
      taskQuery = _require.taskQuery,
      updateScore = _require.updateScore,
      needQueryOne = _require.needQueryOne,
      finish = _require.finish;

  var getList = require('./getList.js');
  var html = '';
  var isneedmanager = false;
  result.data.result.needs.forEach(function (el) {
    var needtrustuseridArr = el.needtrustuserid.split(',');
    var completetrustuseridArr = el.completetrustuserid.split(',');
    var show = el.showcomplete == '1' && needtrustuseridArr.indexOf(result.data.result.userid) > -1 && el.needstatus == '2';
    var yellowColor = completetrustuseridArr.indexOf(result.data.result.userid) < 0;
    var addCompleteShow = show && yellowColor;
    isneedmanager = el.needcreateuserid == el.loginuserid;
    html += '<li>\n      <div class="list-item" id="' + (el.needid || '') + '">\n        <div class="item-title">\n          <div class="needTitle">\n            <div class="title-font">\n              ' + (el.needtitle || '暂无需求') + '\n              <i class="fa fa-circle needComplete ' + (yellowColor ? 'yellowColor' : 'greenColor') + '"  style="' + (show ? "" : "display:none") + '"></i>\n            </div>\n            <div class="needState">\n              <span class="item-state">' + (needstatus(el.needstatus) || status) + '</span>\n              <ul class="needscore needscoreList ' + (!isneedmanager ? 'prohibit' : '') + '" ' + (el.needstatus < 7 ? 'style="display:none"' : '') + '>\n                ' + function () {
      var li = '';
      for (var i = 0; i < 5; i++) {
        li += '<li><i class="fa fa-star ' + (i < el.needscore ? 'color' : '') + '"></i></li>';
      }
      return li;
    }() + '\n              </ul>\n            </div>\n          </div>\n          <div class="dropdown-task">\n            <i class="fa fa-chevron-down xiaicon" id="dropdownMenu1" style="' + (el.needid ? "" : "display:none") + '"></i>\n            <ul class="dropdown-menu dropdown-menu-right taskdown" aria-labelledby="dropdownMenu1">\n              <li><a href="#" class="addtask"><i class="fa fa-pencil"></i>\u8FFD\u52A0\u4EFB\u52A1</a></li>\n              <li><a  href="#" class="addDefect"><i class="fa fa-pencil"></i>\u6DFB\u52A0\u7F3A\u9677</a></li>\n              <li><a target="_blank" href="' + coos.basePath + 'task/need/toView.do?&needid=' + el.needid + '"><i class="fa fa-eye"></i>\u67E5\u770B\u9700\u6C42</a></li>\n              <li><a  href="#" class="addComplete" style="' + (addCompleteShow ? "" : "display:none") + '"><i class="fa fa-gear"></i>\u5B8C\u6210</a></li>\n            </ul>\n          </div>\n        </div>\n        <div class="task-list">\n        ' + item(el.tasks) + '\n        </div>\n      </div>\n    </li>';
  });
  $('.task-manage .list').html(html);
  $('.task-manage .list .xiaicon').click(function (e) {
    e.stopPropagation();
    $('.taskdown').hide();
    $(this).siblings('.taskdown').toggle();
  });
  $('.task-manage .task-item').click(function () {
    var _this = this;

    taskQuery({ taskid: $(this).attr('id') }).then(function (res) {
      var needTitle = $(_this).parent().parent().parent().find('.title-font').text();
      res.result.model1.value.needTitle = needTitle;
      $('body').addClass('coos-over-hidden');
      dialog(res.result.model1.value);
    });
  });
  $('.task-manage .addtask').click(function (e) {
    e.stopPropagation();
    var $item = $(this).parent().parent().parent().parent().parent();
    var result = {
      needid: $item.attr('id'),
      needTitle: $item.find('.title-font').text(),
      addModal: true
    };
    $('body').addClass('coos-over-hidden');
    dialog(result);
    $('.taskdown').hide();
  });
  $('.task-manage .addDefect').click(function (e) {
    e.preventDefault();
    var needTitle = $(this).parent().parent().parent().parent().parent().find('.title-font').text();
    var needid = $(this).parent().parent().parent().parent().parent().attr('id');
    defect.dialog({ needid: needid, task_need_title: needTitle });
  });
  $('.task-manage .addComplete').click(function (e) {
    e.preventDefault();
    var paramet = {
      needid: $(this).parent().parent().parent().parent().parent().attr('id')
    };
    finish(paramet).then(function (res) {
      if (res.data.errmsg == "成功") {
        getList();
      } else {
        coos.box.info(res.data.errmsg);
      }
    });
  });
  if (isneedmanager) {
    $('.task-manage .needState .needscoreList').on('click', ' li i', function () {
      var _this2 = this;

      var $list = $(this).parent().parent().parent().parent().parent().parent();
      var idx = $(this).parent().index() + 1;
      var li = '';
      for (var i = 0; i < 5; i++) {
        li += '<li><i class="fa fa-star ' + (i < idx ? 'color' : '') + '"></i></li>';
      }
      if (idx != 3) {
        var $ul = $(this).parent().parent();
        needQueryOne({ needid: $list.attr('id') }).then(function (res) {
          var paramet = {
            score: idx,
            needid: $list.attr('id'),
            li: li, $ul: $ul,
            scorecomment: res.result.data.value.scorecomment
          };
          needscore(paramet);
        });
      } else {
        updateScore({ needid: $list.attr('id'), score: idx, scorecomment: '' }).then(function (res) {
          $(_this2).parent().parent().html(li);
        });
      }
    });
  }
  layout();
};