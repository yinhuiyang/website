'use strict';

module.exports = function dialog() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var getTime = require('./getTime.js');
  var data = require('./data.js');
  var select = require('./select.js');
  var search = require('./search.js');
  var getList = require('./getList.js');
  var progressList = require('./progressList.js');
  var progress = require('./progress.js');
  var score = require('./score.js');
  var typeRadio = require('./typeRadio.js');

  var _require = require('./api.js'),
      getUserList = _require.getUserList,
      insertOrUpdate = _require.insertOrUpdate,
      needQueryOne = _require.needQueryOne,
      deleteTask = _require.deleteTask,
      processQueryOne = _require.processQueryOne;

  result.addModal ? needQueryOne({ needid: result.needid }).then(function (res) {
    result.needplanendtime = res.result.data.value.planonlinetime;
  }) : '';
  var myDate = new Date();
  var st = myDate.toLocaleDateString().split('/').join('-') + " 09:00";
  var end = myDate.toLocaleDateString().split('/').join('-') + " 18:00";
  var $html = $('<div class="taskModal ' + (result.addModal ? "addModal" : "") + '" id="taskModal" data-needid= "' + (result.needid || '') + '" data-taskid = "' + (result.taskid || '') + '" needplanendtime= "' + getTime(result.needplanendtime) + '">\n      <div class="taskModal-dialog">\n        <div class="demand-content">\n          <a  href="' + coos.basePath + 'task/need/toView.do?&needid=' + result.needid + '" target="_blank" class="demand-title">\n            ' + result.needTitle + '\n          </a>\n          <div style="display: flex;">\n            <div class="task-menu" style="display: ' + (result.addModal ? "none" : "") + '"> \n              <i class="fa fa-angle-down"></i> \n              <ul class="menuList"> \n                <li class="delTask"><i class="fa fa-trash-o"></i> <span>\u5220\u9664\u5230\u56DE\u6536\u7AD9</span></li> \n                <li class="copyTask"><i class="fa fa-clipboard"></i> <span>\u590D\u5236\u4EFB\u52A1</span></li> \n              </ul> \n            </div> \n            <span class="taskClose modalRemove">\xD7</span> \n          </div> \n        </div> \n        <div class="taskModal-contentBox"> \n          <div class="taskModal-content"> \n            <div class="taskModal-title"> \n              <div class="" contenteditable="true" placeholder="\u4EFB\u52A1\u540D\u79F0" > ' + (result.title || "填写任务标题") + '</div> \n            </div> \n            <div class="taskModal-message">\n              <div class="taskModal-personLiable input-search"> \n                <input type="text" autocomplete="off" id="personLiable" placeholder="\u8D1F\u8D23\u4EBA" value="' + (result.trustusername || '') + '" name="' + (result.trustuserid || '') + '" class="form-control-none input"> \n                <ul class="personLiable-ul" style="display:none"> \n                </ul> \n              </div> \n              <div class="input-time">\n                <i class="fa fa-calendar time-icon"></i> \n                <input type="text" class="startTimeIput form-control-none" placeholder="\u4EFB\u52A1\u5F00\u59CB\u65F6\u95F4" value="' + (getTime(result.planstarttime) || st) + '"/> \n              </div> \n              -- \n              <div style="margin-left: 6px;"> \n                <i class="fa fa-calendar time-icon"></i> \n                <input type="text" class="endTimeIput form-control-none" placeholder="\u4EFB\u52A1\u7ED3\u675F\u65F6\u95F4" value="' + (getTime(result.planendtime) || end) + '"/>\n              </div> \n            </div> \n            <div class="taskModal-illustrate"> \n              <div class="illustrate-row">\n              <div class="workingHoursTitle"><span>\u9884\u4F30\u5DE5\u65F6</span></div>\n              <div><div id="workingHours"></div></div>\n              </div>\n              <div class="illustrate-row"> \n                <div><span>\u96BE\u5EA6</span></div> \n                <div> \n                  <div id="difficultylevelid" class="difficultylevelid">\n                      ' + function () {
    var li = '';
    var index = -1;
    data.taskDifficulty.forEach(function (el) {
      if (result.taskdifficultylevelid == el.taskdifficultylevelid) {
        li += '<li value="' + el.taskdifficultylevelid + '" class="active">' + el.name + '</li>';
        index = data.taskDifficulty.indexOf(el);
      } else {
        li += '<li value="' + el.taskdifficultylevelid + '">' + el.name + '</li>';
      }
    });
    return '<span index="' + (index || '') + '" value="' + (result.taskdifficultylevelid || '') + '">' + ((data.taskDifficulty[index] || {}).name || '请选择') + '</span><i class="fa fa-angle-down"></i> \n                        <ul class="difficultylevelList select_task">\n                        ' + li + '\n                        </ul>';
  }() + '\n                  </div>\n                </div> \n              </div> \n              <div class="illustrate-row"> \n                <div><span>\u7C7B\u578B</span></div> \n                <div>\n                  <div id="typeid" class="typeid">\n                    ' + function () {
    var li = '';
    var index = -1;
    data.taskType.forEach(function (el) {
      if (result.type == el.tasktypeid) {
        li += '<li value="' + el.tasktypeid + '" class="active">' + el.name + '</li>';
        index = data.taskType.indexOf(el);
      } else {
        li += '<li value="' + el.tasktypeid + '">' + el.name + '</li>';
      }
    });
    return '<span index="' + (index || "") + '" value="' + (result.type || '') + '">' + ((data.taskType[index] || {}).name || '请选择') + '</span><i class="fa fa-angle-down"></i> \n                      <div class="tasktypeList-box select_task"> <!-- -->\n                        <ul class="tasktypeList">' + li + '</ul>\n                      </div>';
  }() + '\n                   </div>\n                </div> \n              </div> \n              <div class="rateOfProgress"> \n                <div><span>\u8FDB\u5EA6</span></div> \n                <div><span class="currentprocess">' + (result.currentprocess || '0') + '%</span></div> \n              </div>\n              <div class="illustrate-row" style="display: none">\n                <div><span>\u8BC4\u5206</span></div>\n                <div class="score-list">\n                  <ul class="score-ul" value="' + result.score + '">\n                    <li><i class="fa fa-star color"></i></li>\n                    <li><i class="fa fa-star color"></i></li>\n                    <li><i class="fa fa-star color"></i></li>\n                    <li><i class="fa fa-star color"></i></li>\n                    <li><i class="fa fa-star color"></i></li>\n                  </ul>\n                </div>\n              </div>\n              <div class="opinion-row" style="display: none">\n                <div><span>\u8BC4\u5206\u610F\u89C1</span></div>\n                <div>\n                  <textarea class="form-control" id="scorecomment" placeholder="\u8BC4\u5206\u610F\u89C1">' + (result.scorecomment || '') + '</textarea>\n                </div>\n              </div>\n              <div class="illustrate-row"> \n                <div><span>\u8BF4\u660E</span></div> \n                <textarea class="illustrate-font " id="illustrateEditor"> ' + (result.description || '') + '</textarea> \n              </div> \n            </div>\n            <div class="ProgressListBox" style="display: ' + (result.addModal ? "none" : "") + '">\n              <div class="Progress-title"><i class="fa fa-list"></i><span>\u8FDB\u5EA6\u5217\u8868</span></div> \n              <div class="Progress-List">\n              </div> \n              <div class="Progress-add"> \n                <i class="fa fa-plus-circle"></i> \n                <span>\u586B\u5199\u8FDB\u5EA6</span> \n              </div> \n            </div> \n          </div> \n        </div> \n        <div class="taskModal-footer">\n          <span class="cancel-btn modalRemove">\u53D6\u6D88</span>\n          <span class="preserve-btn  modalPreserve">\u4FDD\u5B58</span>\n        </div>\n      </div> \n    </div>');
  !result.addModal ? progressList({ taskid: result.taskid, currentprocess: result.currentprocess }, $html) : '';
  coos.plugin.load("jquery_ui_slider", function () {
    coos.input.recallSliderPips();
    $html.find('#workingHours').slider({
      max: 32,
      value: result.estimatedworkhour || 0,
      slide: function slide(event, ui) {
        event.currentTarget;
        $(event.currentTarget).find('.ui-slider-handle').html(ui.value);
      }
    }).slider("pips", {
      rest: "label",
      prefix: "",
      suffix: "",
      step: 4
    });
    $html.find('#workingHours').find('.ui-slider-handle').html($html.find('#workingHours').slider("value"));
  });

  $html.data("taskScore", (result.loginuserid || '') == result.createuserid);
  // console.log($html.data("taskScore"))
  $html.data("score", result.score);
  select.init(['#difficultylevelid'], $html);
  $html.find('#typeid').click(function () {
    var $modal = $(this).parent().parent().parent().parent().parent().parent().parent();
    var typeid = $(this).find('span').attr('value');
    typeRadio($modal, typeid);
  });
  $html.on('click', '.score-ul li i', function () {
    var idx = $(this).parent().index();
    score($html)._set = idx + 1;
  });
  $html.find('#personLiable').on('input', function () {
    var _this = this;

    var li = '';
    getUserList({ username: $(this).val() }).then(function (res) {
      res.data.result.forEach(function (el) {
        li += ' <li name="' + el.userid + '">' + el.username + '</li>';
      });
      $(_this).siblings().html(li);
      $(_this).siblings().show();
    });
  });
  search.init($html);
  $html.find('.Progress-add').click(function () {
    var $modal = $(this).parent().parent().parent().parent().parent();
    var paramet = {
      taskid: $modal.attr('data-taskid'),
      modal: $modal
      // console.log(paramet)
    };progress(paramet);
  });
  $html.find('.Progress-List').on('click', '.Progress-item', function () {
    var $modal = $(this).parent().parent().parent().parent().parent().parent();
    var processid = $(this).attr('data-processid');
    processQueryOne({ processid: processid }).then(function (res) {
      res.result.model1.value.modal = $modal;
      progress(res.result.model1.value);
    });
  });
  var startTime = $html.find('.startTimeIput').val();
  var endTime = $html.find('.endTimeIput').val();
  var option = {
    lang: 'ch',
    step: 60,
    datepicker: true,
    timepicker: true,
    format: 'Y-m-d H:i'
  };
  option.onClose = function (dp, $input) {
    if (startTime != $input.val()) {
      if (endTime > getTime(result.needplanendtime)) {
        coos.box.info('任务结束时间不能大于需求结束时间(' + getTime(result.needplanendtime) + ')');
        return;
      }
      startTime = $input.val();
    }
  };
  $html.find('.startTimeIput').datetimepicker(option);
  option.onClose = function (dp, $input) {
    if (endTime != $input.val()) {
      endTime = $input.val();
      if (endTime > getTime(result.needplanendtime)) {
        coos.box.info('任务结束时间不能大于需求结束时间(' + getTime(result.needplanendtime) + ')');
        return;
      }
    }
  };
  $html.find('.endTimeIput').datetimepicker(option);
  $html.find('.time-icon').click(function () {
    $(this).siblings('input').datetimepicker('show');
  });
  ClassicEditor.create($html.find('#illustrateEditor')[0], {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'],
    language: 'zh-cn'
  }).then(function (editor) {
    $html.data('editor', editor);
  });
  $html.find('.taskModal-title div').focus(function () {
    if ($(this).text().trim() == '填写任务标题') {
      $(this).text('');
    }
  });
  $html.find('.taskModal-title div').blur(function () {
    if ($(this).text().trim() == '') {
      $(this).text('填写任务标题');
    }
  });
  $html.on('click', '.modalRemove', function () {
    $('body').removeClass('coos-over-hidden');
    var $modal = '';
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
      $modal = $(this).parent().parent().parent();
    } else {
      $(this).parent().parent().parent().parent().remove();
      $modal = $(this).parent().parent().parent().parent();
    }
    if ($modal.find('.currentprocess').text().trim() != (result.currentprocess || '0') + '%') {
      getList();
    }
  });
  $html.find('.task-menu > i').click(function (e) {
    e.stopPropagation();
    $(this).siblings().toggle();
  });
  $html.find('.delTask').click(function () {
    var $modal = $(this).parent().parent().parent().parent().parent().parent();
    deleteTask({ taskid: $modal.attr('data-taskid') }).then(function (res) {
      getList();
      $modal.remove();
    });
  });
  $html.find('.copyTask').click(function () {
    var paramet = $.extend(true, {}, result);
    paramet.taskid = '';
    paramet.addModal = true;
    paramet.currentprocess = 0;
    // console.log(result)
    // console.log(paramet)
    dialog(paramet);
  });
  $html.find('.modalPreserve').click(function () {
    $('body').removeClass('coos-over-hidden');
    var $modal = $(this).parent().parent().parent();
    var paramet = {
      title: $modal.find('.taskModal-title div').text(),
      trustuserid: $modal.find('#personLiable').attr('name'),
      username: $modal.find('#personLiable').attr('value'),
      needid: $modal.attr('data-needid'),
      planstarttime: $modal.find('.startTimeIput').val(),
      planendtime: $modal.find('.endTimeIput').val(),
      description: $modal.data('editor').getData(),
      taskdifficultylevelid: $modal.find('#difficultylevelid > span').attr('value'),
      type: $modal.find('#typeid > span').attr('value'),
      estimatedworkhour: $modal.find('#workingHours').slider("value")
    };
    if (!result.addModal) {
      paramet.taskid = $modal.attr('data-taskid');
      paramet.score = $modal.find('.score-ul').attr('value');
      paramet.scorecomment = $modal.find("#scorecomment").val();
      if (paramet.score != 3 && !paramet.scorecomment) {
        coos.box.info('评分意见不能为空');
        return;
      }
    }
    if (paramet.title.trim() == '填写任务标题') {
      coos.box.info('任务标题不能为空');
      return;
    }
    if (paramet.trustuserid == '') {
      coos.box.info('任务负责人未选择');
      return;
    }
    if (paramet.trustuserid == '') {
      coos.box.info('任务负责人未选择');
      return;
    }
    if (paramet.planstarttime == '') {
      coos.box.info('任务开始时间不能为空');
      return;
    }
    if (paramet.planendtime == '') {
      coos.box.info('任务结束时间不能为空');
      return;
    }
    if (paramet.taskdifficultylevelid == '') {
      coos.box.info('任务难度未选择');
      return;
    }
    if (paramet.type == '') {
      coos.box.info('任务类型未选择');
      return;
    }
    insertOrUpdate(paramet).then(function (res) {
      getList();
      $modal.remove();
    });
  });
  $('body').append($html);
};