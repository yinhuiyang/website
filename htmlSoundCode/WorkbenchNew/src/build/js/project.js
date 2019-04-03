'use strict';

module.exports = function () {
  var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _require = require('./api.js'),
      insert = _require.insert,
      projectupdate = _require.projectupdate;

  var getlist = require('./getlist.js');
  var getTotalCount = require('./getTotalCount.js');
  var $html = $('\n  <div class="Workbench-dialog">\n    <div class="dialog-content">\n      <div class="dialog-title">\n        <span>' + (res.projectid ? "修改项目" : '添加项目') + '</span>\n        <div style="display:flex">\n          <span class="delDialog">\xD7</span>\n        </div>\n      </div>\n      <div class="dialog-section">\n        <div class="dialog-form addproject">\n          <div class="form-label">\u540D\u79F0:<sup>*</sup></div>\n          <div  class="form-input"><input type="text" class="project-title" value="' + (res.name || '') + '" placeholder="\u9879\u76EE\u540D\u79F0"></div>\n          <div class="form-label">\u9879\u76EE\u7F16\u53F7:<sup>*</sup></div>\n          <div class="form-input"><input type="text" class="project-number" value="' + (res.projectcode || '') + '" placeholder="\u9879\u76EE\u7F16\u53F7"></div>\n        </div>\n      </div>\n      <div class="dialog-footer">\n        <span class="btn-default" id="delDialog">\u53D6\u6D88</span>\n        <span class="btn-default btn-preserve" id="preserve">\u4FDD\u5B58</span>\n      </div>\n    </div>\n  </div> ');

  $html.find('.delDialog,#delDialog').click(function () {
    $('body').removeClass('coos-over-hidden');
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
    } else {
      $(this).parent().parent().parent().parent().remove();
    }
  });
  $html.find('#preserve').click(function () {
    var paramet = {
      name: $('.dialog-section .project-title').val(),
      projectcode: $('.dialog-section .project-number').val()
    };
    if (!paramet.name) {
      coos.box.info('项目名称不能为空');
      return;
    }
    if (!paramet.projectcode) {
      coos.box.info('项目编号不能为空');
      return;
    }
    if (res.projectid) {
      paramet.projectid = res.projectid;
      var result = projectupdate(paramet);
      if (result.errcode == 10000) {
        coos.box.info(result.errmsg);
        return;
      }
      $('body').removeClass('coos-over-hidden');
      $(this).parent().parent().parent().remove();
    } else {
      var result = insert(paramet);
      getTotalCount();
      if (result.errcode == 10000) {
        coos.box.info(result.errmsg);
        return;
      }
      $('body').removeClass('coos-over-hidden');
      $(this).parent().parent().parent().remove();
      $('.Workbench-section .nav-links li').removeClass('active');
      $('.Workbench-section .nav-links li').eq(2).addClass('active');
    }
    getlist();
  });
  $("body").append($html);
};