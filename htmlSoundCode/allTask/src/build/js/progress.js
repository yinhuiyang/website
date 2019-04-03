'use strict';

module.exports = function progress() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _require = require('./api.js'),
      processUpdate = _require.processUpdate,
      delProcess = _require.delProcess;

  var progressList = require('./progressList.js');
  var $html = $('\n   <div class="taskModal-schedule"  style="z-index: 50;">     \n             <div class="schedule-dialog">     \n                 <div class="schedule-top">     \n                     <div class="schedule-title">\u586B\u5199\u8FDB\u5EA6</div>     \n                     <span class="scheduleClose scheduleClose-btn">\xD7</span>\n                 </div>     \n                 <div class="schedule-content-box">     \n                     <div class="schedule-content">     \n                         <div class="ProgressBar-group">     \n                             <div class="ProgressBar-title"><span>\u4EFB\u52A1\u8FDB\u5EA6</span><sup>*</sup></div>     \n                             <div id="ProgressBar"></div>     \n                         </div>     \n                         <div class="ProgressBar-group">     \n                             <div class="ProgressBar-title"><span>\u5DE5\u4F5C\u65E5\u671F</span><sup>*</sup></div>     \n                             <div class="ProgressBar-time"><input type="text" placeholder="\u5DE5\u4F5C\u65E5\u671F" class="form-control" value="' + (result.workdate ? result.workdate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3") : '') + '"/></div>     \n                         </div>     \n                         <div class="ProgressBar-group">     \n                             <div class="ProgressBar-title"><span>\u5DE5\u4F5C\u65F6\u957F</span><sup>*</sup></div>     \n                             <div id="ProgressBar-hour"></div>     \n                         </div>     \n                         <div class="ProgressBar-group row">     \n                             <input label="\u56FE\u7247" id="Progress-image" value="' + (result.images || '') + '" file-count="5" group-type="4" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="\u56FE\u7247">     \n                         </div>     \n                         <div class="ProgressBar-group row">     \n                             <textarea label="\u5907\u6CE8" id="Progress-remark" value="' + (result.remark || '') + '" group-type="4" class="input-rule-group" placeholder="\u5907\u6CE8"></textarea>     \n                         </div>     \n                     </div>     \n                 </div>     \n              \n                 <div class="schedule-footer">\n                    <span class="delProgress" ' + (result.processid ? '' : 'style="display:none"') + '>\u5220\u9664</span>\n                    <span class="scheduleClose-btn">\u53D6\u6D88</span>\n                    <span class="preserve-btn">\u4FDD\u5B58</span> \n                 </div>     \n             </div>     \n         </div>\n  ');
  $html.find('#ProgressBar').slider({
    value: result.process || 0,
    slide: function slide(event, ui) {
      event.currentTarget;
      $(event.currentTarget).find('.ui-slider-handle').html(ui.value);
    }
  }).slider("pips", {
    rest: "label",
    prefix: "",
    suffix: "",
    step: 20
  });
  $html.find('#ProgressBar').find('.ui-slider-handle').html($html.find('#ProgressBar').slider("value"));
  $html.find('#ProgressBar-hour').slider({
    max: 24,
    value: result.workhour || 0,
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
  $html.find('#ProgressBar-hour').find('.ui-slider-handle').html($html.find('#ProgressBar-hour').slider("value"));
  var option = { "lang": "ch", "datepicker": true, "timepicker": false, "format": "Y-m-d" };
  $html.find('.ProgressBar-time input').datetimepicker(option);
  $html.find('.scheduleClose-btn').click(function () {
    $(this).parent().parent().parent().remove();
  });
  $html.find('.delProgress').click(function () {
    var $progress = $(this).parent().parent().parent();
    delProcess({ processid: result.processid, taskid: result.taskid }).then(function (res) {
      progressList({ taskid: result.taskid }, result.modal);
      $progress.remove();
    });
  });
  $html.find('.preserve-btn').click(function () {
    var $progress = $(this).parent().parent().parent();
    var paramet = {
      taskid: result.taskid,
      process: $progress.find('#ProgressBar').slider("value"),
      workdate: $progress.find('.ProgressBar-time input').val(),
      workhour: $progress.find('#ProgressBar-hour').slider("value"),
      images: $progress.find('#Progress-image').val(),
      remark: $progress.find('#Progress-remark').val()
    };
    if (result.processid) {
      paramet.processid = result.processid;
    }
    if (!paramet.process) {
      coos.box.info('进度未填');
      return;
    }
    if (!paramet.workdate) {
      coos.box.info('工作日期未填');
      return;
    }
    if (!paramet.workhour) {
      coos.box.info('工作时长未填');
      return;
    }
    // console.log(paramet)
    processUpdate(paramet).then(function (res) {});
    progressList({ taskid: paramet.taskid }, result.modal);
    $progress.remove();
  });
  $('body').append($html);
  coos.element.init('.taskModal-schedule');
};