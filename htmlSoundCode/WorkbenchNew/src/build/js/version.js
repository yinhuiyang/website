'use strict';

module.exports = function () {
  var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var select = require('./select.js');

  var _require = require('./api.js'),
      versionInsert = _require.versionInsert,
      getTaskStatusList = _require.getTaskStatusList,
      versionUpdate = _require.versionUpdate;

  var getlist = require('./getlist.js');
  var getstatus = require('./getstatus.js');
  var getTime = require('./getTime.js');
  var html = '\n  <div class="Workbench-dialog">\n    <div class="dialog-content">\n      <div class="dialog-title">\n        <span>\u6DFB\u52A0\u7248\u672C</span>\n        <div style="display:flex">\n          <span class="delDialog">\xD7</span>\n        </div>\n      </div>\n      <div class="dialog-section">\n        <div class="dialog-form">\n          <div class="version-group">\n            <div class="version-item-title">\n              <span>\u7248\u672C\u540D\u79F0</span>\n              <sup>*</sup>\n            </div>\n            <div class="version-title version-group-input">\n              <input type="text" class="form-control" id="versionName" placeholder="\u7248\u672C\u540D\u79F0" value="' + (res.title || '') + '">\n            </div>\n          </div>\n          <div class="version-group">\n              <div class="version-item-title">\n                <span>\u72B6\u6001</span>\n                <sup>*</sup>\n              </div>\n              <div class="version-group-input">\n                <div class="status select-group form-control">\n                    <span value="' + res.status + '" index="" id="versionStatus">' + (getstatus(res.status) || '请选择') + '</span>\n                    <i class="fa fa-angle-down"></i>\n                    <ul class="selectList select-chaozuo" style="display: none;">\n                      ' + function () {
    var result = getTaskStatusList().data.result;
    var li = '';
    for (var key in result) {
      li += '<li value="' + key + '" class="' + (res.status == key ? 'active' : '') + '">' + result[key] + '</li>';
    }
    return li;
  }() + '\n                    </ul>\n                </div>\n              </div>\n            </div>\n          <div class="version-group">\n              <div class="version-item-title">\n                <span>\u8BA1\u5212\u4E0A\u7EBF\u65F6\u95F4</span>\n                <sup>*</sup>\n              </div>\n              <div class="version-time version-group-input">\n                <input type="text" class="form-control" id="createTime" placeholder="\u8BA1\u5212\u4E0A\u7EBF\u65F6\u95F4" value="' + getTime(res.planonlinetime) + '">\n              </div>\n            </div>\n          <div>\n            <input label="\u9644\u4EF6" id="versionFile" value="' + (res.file || '') + '" group-type="4" value="" class="input-rule-group input-rule-file" need-addon="true" placeholder="\u9644\u4EF6" file-count="5" cannull="true">\n          </div>\n          <div>\n            <textarea label="\u8BF4\u660E" id="versionRemark" value="' + (res.description || '') + '" group-type="4" class="input-rule-group" placeholder="\u8BF4\u660E" cannull="true"></textarea>\n          </div>\n        </div>\n      </div>\n      <div class="dialog-footer">\n        <span class="btn-default" id="delDialog">\u53D6\u6D88</span>\n        <span class="btn-default btn-preserve">\u4FDD\u5B58</span>\n      </div>\n    </div>\n  </div>';
  var $html = $(html);
  select.init(['.select-group'], $html);
  var option = {
    lang: 'ch',
    step: 60,
    datepicker: true,
    timepicker: true,
    format: 'Y-m-d H:i'
  };
  $html.find('#createTime').datetimepicker(option);
  $html.find('.delDialog, #delDialog').click(function () {
    $('body').removeClass('coos-over-hidden');
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
    } else {
      $(this).parent().parent().parent().parent().remove();
    }
  });
  $html.find('.btn-preserve').click(function () {
    var paramet = {
      projectid: res.projectid,
      title: $('#versionName').val(),
      status: $('#versionStatus').attr('value'),
      planonlinetime: $('#createTime').val(),
      file: $('#versionFile').val(),
      description: $('#versionRemark').val()
    };
    if (!paramet.title) {
      coos.box.info('版本名称不能为空');
      return;
    }
    if (!paramet.status) {
      coos.box.info('状态未选择');
      return;
    }
    if (!paramet.planonlinetime) {
      coos.box.info('计划上线时间不能为空');
      return;
    }
    if (res.versionid) {
      paramet.versionid = res.versionid;
      versionUpdate(paramet);
      $('body').removeClass('coos-over-hidden');
      $(this).parent().parent().parent().remove();
    } else {
      versionInsert(paramet);
      $('body').removeClass('coos-over-hidden');
      $(this).parent().parent().parent().remove();
      versionUpdate(paramet);
    }
    getlist();
  });
  $("body").append($html);
  coos.element.init('.defect-dialog');
};