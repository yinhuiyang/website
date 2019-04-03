'use strict';

module.exports = function () {
  var res = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var data = require('./data.js');

  var _require = require('./api.js'),
      updateAuthGroup = _require.updateAuthGroup;

  var $html = $('\n  <div class="Workbench-dialog">\n    <div class="dialog-content">\n      <div class="dialog-title">\n        <span>\u6388\u6743</span>\n        <div style="display:flex">\n          <span class="delDialog">\xD7</span>\n        </div>\n      </div>\n      <div class="dialog-section">\n        <div class="dialog-form">\n          <div class="addAuth"></div>\n        </div>\n      </div>\n      <div class="dialog-footer">\n        <span class="btn-default" id="delDialog">\u53D6\u6D88</span>\n        <span class="btn-default btn-preserve" id="preserve">\u4FDD\u5B58</span>\n      </div>\n    </div>\n  </div>');
  var TreeConfig = {};
  TreeConfig.checkedIds = [];
  $(res.checkeddata.value).each(function (index, checkedids) {
    TreeConfig.checkedIds[TreeConfig.checkedIds.length] = checkedids.groupid;
  });
  TreeConfig.property = {
    id: "groupid",
    parentid: "parentid",
    text: "name"
  };
  TreeConfig.openHalfCheck = true;
  TreeConfig.hasCheckbox = true;
  TreeConfig.datas = res.list.value;
  TreeConfig.treeUlHeight = "auto";
  TreeConfig.content = $html.find('.addAuth');
  data.TreeConfig = coos.tree(TreeConfig);
  $html.find('.delDialog, #delDialog').click(function () {
    $('body').removeClass('coos-over-hidden');
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
    } else {
      $(this).parent().parent().parent().parent().remove();
    }
  });
  $html.find('.btn-preserve').click(function () {
    var CheckedDatas = data.TreeConfig.getCheckedDatas();
    var paramet = {
      group_checkeddatastr: JSON.stringify(CheckedDatas.checkedDatas),
      group_checkeddeletedatastr: JSON.stringify(CheckedDatas.checkedDeleteDatas),
      projectid: res.projectid
      // console.log(paramet)
    };$('body').removeClass('coos-over-hidden');
    updateAuthGroup(paramet);
    $(this).parent().parent().parent().remove();
  });
  $('body').append($html);
};