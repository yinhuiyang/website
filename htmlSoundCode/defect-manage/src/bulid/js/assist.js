'use strict';

module.exports = function () {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _require = require('./api.js'),
      insertOrUpdate = _require.insertOrUpdate,
      assistDelete = _require.assistDelete;

  var assistList = require('./assistList.js');
  var $html = $('\n  <div class="defect-dialog">\n    <div class="defect-content">\n      <div class="defect-title">\n        <span>\u586B\u5199\u534F\u52A9</span>\n        <div style="display:flex">\n          <div class="menuDown" id="menuDown" style="display: ' + (result.processid ? '' : 'none') + ';">\n            <i class="fa fa-angle-down"></i>\n            <ul class="menuList" style="display: none;">\n              <li class="delAssist">\n                <i class="fa fa-trash-o"></i>\n                <span>\u5220\u9664</span>\n              </li>\n            </ul>\n          </div>\n          <span class="delDialog">\xD7</span>\n        </div>\n      </div>\n      <div class="defect-section">\n        <div class="defect-form">\n            <div class="form-content">\n              <div class="assist-row">\n                <div class="row-title"><span>\u5DE5\u4F5C\u65E5\u671F</span><sup>*</sup></div>\n                <div class="row-time"><input type="text" placeholder="\u5DE5\u4F5C\u65E5\u671F" class="assist-time" value="' + (result.workdate ? result.workdate.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3") : '') + '"></div>\n              </div>\n              <div class="assist-row">\n                <div class="row-title"><span>\u5DE5\u4F5C\u65F6\u957F</span><sup>*</sup></div>\n                <div id="assist-hour"></div>\n              </div>\n              <div class="assist-row">\n                <input label="\u56FE\u7247" id="assist-image" file-count="5" value="' + (result.pic || '') + '" group-type="4" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="\u56FE\u7247"> \n              </div>\n              <div class="assist-row">\n                <textarea label="\u5907\u6CE8" id="assist-remark" value="' + (result.remark || '') + '" group-type="4" class="input-rule-group" placeholder="\u5907\u6CE8" cannull="true"></textarea>\n              </div>\n            </div>\n        </div>\n      </div>\n      <div class="defect-footer">\n        <span class="btn-default" id="delDialog">\u53D6\u6D88</span>\n        <span class="btn-default btn-preserve addAssistBtn" data-bugid="' + result.bugid + '" data-processid=' + (result.processid || '') + '>\u4FDD\u5B58</span>\n      </div>\n    </div>\n  </div>');
  $html.find('#assist-hour').slider({
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
  $html.find('#assist-hour').find('.ui-slider-handle').html($html.find('#assist-hour').slider("value"));
  $html.find('.delDialog, #delDialog').click(function () {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
    } else {
      $(this).parent().parent().parent().parent().remove();
    }
  });
  $html.find('#menuDown > i').click(function (e) {
    e.stopPropagation();
    $(this).siblings().toggle();
  });
  $html.find('.delAssist').click(function () {
    var $dialog = $(this).parent().parent().parent().parent().parent().parent();
    assistDelete({ processid: result.processid });
    $dialog.remove();
    assistList({ bugid: result.bugid }, result.dialog);
  });
  var option = {
    lang: 'ch',
    step: 60,
    datepicker: true,
    timepicker: false,
    format: 'Y-m-d'
  };
  $html.find('.assist-time').datetimepicker(option);
  $html.find('.addAssistBtn').click(function () {
    var $dialog = $(this).parent().parent().parent();
    var $parent = result.dialog;
    var processid = $(this).attr("data-processid");
    var paramet = {
      remark: $dialog.find('#assist-remark').val(),
      workhour: $dialog.find('#assist-hour').slider("value"),
      workdate: $dialog.find('.assist-time').val(),
      pic: $dialog.find('#assist-image').val()
    };
    if (processid) {
      paramet.processid = processid;
    } else {
      paramet.bugid = $(this).attr("data-bugid");
    }
    if (!paramet.workdate) {
      coos.box.info('工作时间不能为空');
      return;
    }
    if (!paramet.workhour) {
      coos.box.info('工作时间不能为零');
      return;
    }
    // if (!paramet.remark) {
    //   coos.box.info('备注不能为空');
    //   return;
    // }
    // console.log(paramet)
    insertOrUpdate(paramet);
    assistList({ bugid: $(this).attr("data-bugid") }, $parent);
    $dialog.remove();
  });
  $('body').append($html);
  coos.element.init('.defect-dialog');
};