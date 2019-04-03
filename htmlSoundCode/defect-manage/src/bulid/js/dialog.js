'use strict';

module.exports = function () {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var select = require('./select.js');
  var assist = require('./assist.js');
  var getneedList = require('./getneedList.js');
  var search = require('./search.js');
  var data = require('./data.js');

  var _require = require('./api.js'),
      getUserList = _require.getUserList,
      bugDelete = _require.bugDelete,
      bugEditSave = _require.bugEditSave,
      bugAddSave = _require.bugAddSave,
      assistQueryOne = _require.assistQueryOne;

  var getlist = require('./getlist.js');
  var assistList = require('./assistList.js');
  var $html = $('\n  <div class="defect-dialog">\n    <div class="defect-content">\n      <div class="defect-title">\n        <div class="need-select input-search">\n          <div class="getNeed input" contenteditable="' + (result.addDefect ? 'true' : 'false') + '" name="' + (result.needid || '') + '">' + (result.task_need_title || '需求搜索并选择') + '</div>\n          <ul class="needList" style="display:none">\n            <li value="" class="active">\u4EFB\u52A1\u5408\u4E00\u4E4B\u540E\u7684\u7EDF\u8BA1\u4FEE\u6539</li>\n          </ul>\n        </div>\n        <div style="display:flex">\n          <div class="menuDown" id="menuDown" style="display: ' + (result.addDefect ? 'none' : '') + ';">\n            <i class="fa fa-angle-down"></i>\n            <ul class="menuList" style="display: none;">\n              <li class="delDefect">\n                <i class="fa fa-trash-o"></i>\n                <span>\u5220\u9664\u5230\u56DE\u6536\u7AD9</span>\n              </li>\n            </ul>\n          </div>\n          <span class="delDialog deleteDialog">\xD7</span>\n        </div>\n      </div>\n      <div class="defect-section">\n        <div class="defect-form">\n          <div class="form-title">\n            <div class="" contenteditable="true" data-bugid="' + (result.bugid || '') + '">' + (result.title || '请填写缺陷标题') + '</div>\n          </div>\n          <div class="form-message">\n            <div class="defectStatus">\n              <span value="' + (result.bugstatus || '') + '" index="' + (result.bugstatus || '') + '">' + (result.bugstatus ? data.bugStatus[result.bugstatus] : '请选择') + '</span>\n              <i class="fa fa-angle-down"></i>\n              <ul class="defectStatusList select-chaozuo" style="display: none;">\n              ' + function () {
    var li = '';
    for (var k in data.bugStatus) {
      li += '<li value="' + k + '" class="' + (result.bugstatus == k ? 'active' : '') + '">' + data.bugStatus[k] + '</li>';
    }
    return li;
  }() + '\n              </ul>\n            </div>\n            <div class="form-ascription input-search">\n              <input type="text" id="ascription" placeholder="\u5F52\u5C5E\u4EBA" value="' + (result.ownusername || '') + '" name="' + (result.ownuserid || '') + '" class="input">\n              <ul class="ascriptionList" style="display:none">\n              </ul>\n            </div>\n            <div class="form-time">\n              <i class="fa fa-calendar"></i>\n              <input type="text" class="endTime" placeholder="\u8BA1\u5212\u5B8C\u6210\u65F6\u95F4" value="' + (result.plancompletetime ? result.plancompletetime.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5") : '') + '">\n            </div>\n          </div>\n        <div class="form-illustrate">\n          <div class="illustrate-row">\n            <div>\u7F3A\u9677\u8D28\u7EA7</div>\n              <div>\n                <div class="qualitylevel select-group">\n                  <span title="' + (result.qualitylevel ? data.qualityLevel[result.qualitylevel].description : '') + '" value="' + (result.qualitylevel || '') + '" index="' + (result.qualitylevel || '') + '">' + (result.qualitylevel ? data.qualityLevel[result.qualitylevel].name : '请选择') + '</span>\n                  <i class="fa fa-angle-down"></i>\n                  <ul class="selectList select-chaozuo" style="display: none;width:550px;">\n                  ' + function () {
    var li = '';
    for (var k in data.qualityLevel) {
      li += '<li value="' + data.qualityLevel[k].value + '" style="text-align:left;padding: 0px 5px;" class="' + (k == result.buglevel ? 'active' : '') + '">' + data.qualityLevel[k].name + '<span style="">(' + data.qualityLevel[k].description + ')</span></li>';
    }
    return li;
  }() + '\n                  </ul>\n                </div>\n            </div>\n        </div>\n          <div class="illustrate-row">\n           <div>\u7F3A\u9677\u4F18\u7EA7</div>\n          <div>\n            <div class="prioritylevel select-group">\n              <span title="' + (result.prioritylevel ? data.priorityLevel[result.prioritylevel].description : '') + '" value="' + (result.prioritylevel || '') + '" index="' + (result.prioritylevel || '') + '">' + (result.prioritylevel ? data.priorityLevel[result.prioritylevel].name : '请选择') + '</span>\n              <i class="fa fa-angle-down"></i>\n              <ul class="selectList select-chaozuo" style="display: none;width:550px;">\n              ' + function () {
    var li = '';
    for (var k in data.priorityLevel) {
      li += '<li style="text-align:left;padding: 0px 5px;" value="' + data.priorityLevel[k].value + '" class="' + (k == result.prioritylevel ? 'active' : '') + '">' + data.priorityLevel[k].name + '<span style="">(' + data.priorityLevel[k].description + ')</span></li>';
    }
    return li;
  }() + '\n              </ul>\n            </div>\n          </div>\n        </div>\n            <!--<div class="illustrate-row">\n              <div>\u7F3A\u9677\u7B49\u7EA7</div>\n              <div>\n                <div class="buglevel select-group">\n                  <span value="' + (result.buglevel || '') + '" index="' + (result.buglevel || '') + '">' + (result.buglevel ? data.bugLevel[result.buglevel] : '请选择') + '</span>\n                  <i class="fa fa-angle-down"></i>\n                  <ul class="selectList select-chaozuo" style="display: none;">\n                    ' + function () {
    var li = '';
    for (var k in data.bugLevel) {
      li += '<li value="' + k + '" class="' + (k == result.buglevel ? 'active' : '') + '">' + data.bugLevel[k] + '</li>';
    }
    return li;
  }() + '\n                  </ul>\n                </div>\n              </div>\n            </div>-->\n            <div class="illustrate-row">\n              <div>\u7F3A\u9677\u6765\u6E90</div>\n              <div>\n                  <div class="bugsource select-group">\n                    <span value="' + (result.bugsource || '') + '" index="' + (result.bugsource || '') + '">' + (result.bugsource ? data.bugSource[result.bugsource] : '请选择') + '</span>\n                    <i class="fa fa-angle-down"></i>\n                    <ul class="selectList select-chaozuo" style="display: none;">\n                    ' + function () {
    var li = '';
    for (var k in data.bugSource) {
      li += '<li value="' + k + '" class="' + (k == result.bugsource ? 'active' : '') + '">' + data.bugSource[k] + '</li>';
    }
    return li;
  }() + '\n                    </ul>\n                  </div>\n              </div>\n            </div>\n            <div class="delFloat">\n              <input label="\u56FE\u7247" id="defect-image" value="' + (result.pic || '') + '" file-count="5" group-type="1" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="\u56FE\u7247"> \n            </div>\n            <div class="delFloat">\n              <input label="\u6587\u4EF6" id="defect-file" group-type="1" value="' + (result.file || '') + '" class="input-rule-group input-rule-file" need-addon="true" placeholder="\u6587\u4EF6" file-count="5" cannull="true">\n            </div>\n            <div class="illustrate-row">\n              <div style="margin-right: 60px;">\u63CF\u8FF0</div>\n              <textarea class="illustrate-font" id="defect-editor">' + (result.content || '') + '</textarea>\n            </div>\n          </div>\n          <div class="form-assist" style="display: ' + (result.addDefect ? 'none' : '') + ';">\n            <div class="assist-title">\n              <i class="fa fa-list"></i>\n              <span>\u534F\u52A9\u5217\u8868</span>\n            </div>\n            <div class="assist-list">\n            </div>\n            <div class="assist-add">\n              <i class="fa fa-plus-circle"></i>\n              <span>\u534F\u52A9</span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class="defect-footer">\n        <span class="btn-default deleteDialog">\u53D6\u6D88</span>\n        <span class="btn-default btn-preserve ' + (result.addDefect ? "addDefectBtn" : "preserveDialog") + '">\u4FDD\u5B58</span>\n      </div>\n    </div>\n  </div>\n  ');
  select.init(['.defectStatus', '.select-group'], $html);
  $html.find('.assist-add').click(function () {
    var $dialog = $(this).parent().parent().parent().parent().parent();
    var paramet = {
      bugid: $dialog.find('.form-title>div').attr('data-bugid'),
      dialog: $dialog
    };
    assist(paramet);
  });
  $html.find('.getNeed').on('keydown ', function (e) {
    if (e.keyCode !== 13) return;
    e.preventDefault();
    console.log($(this).text());
    getneedList({ title: $(this).text() });
    var li = '';
    data.needList.forEach(function (el) {
      li += '<li name="' + el.needid + '">' + el.title + '</li>';
    });
    $(this).siblings().html(li);
    $(this).siblings().show();
  });
  $html.find('#ascription').on('input', function () {
    var res = getUserList({ username: $(this).val() });
    var li = '';
    res.data.result.forEach(function (el) {
      li += ' <li name="' + el.userid + '">' + el.username + '</li>';
    });
    $(this).siblings().html(li);
    $(this).siblings().show();
  });
  search.init($html);
  var option = {
    lang: 'ch',
    step: 60,
    datepicker: true,
    timepicker: true,
    format: 'Y-m-d H:i'
  };
  $html.find('.endTime').datetimepicker(option);
  $html.find('#menuDown > i').click(function (e) {
    e.stopPropagation();
    $(this).siblings().toggle();
  });
  $html.find('.deleteDialog').click(function () {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
    } else {
      $(this).parent().parent().parent().parent().remove();
    }
  });
  $html.find('.delDefect').click(function () {
    var $dialog = $(this).parent().parent().parent().parent().parent().parent();
    bugDelete({ bugid: $dialog.find('.form-title > div').attr('data-bugid') });
    $dialog.remove();
    getlist();
  });
  $html.find('.form-title>div').blur(function () {
    if (!$(this).text()) {
      $(this).text('请填写缺陷标题');
    }
  });
  $html.find('.form-title>div').focus(function () {
    if ($(this).text() === '请填写缺陷标题') {
      $(this).text('');
    }
  });
  $html.find('.getNeed').blur(function () {
    if (!$(this).text()) {
      $(this).text('需求搜索并选择');
    }
  });
  $html.find('.getNeed').focus(function () {
    if ($(this).text() === '需求搜索并选择') {
      $(this).text('');
    }
  });
  $html.find('.preserveDialog').click(function () {
    var $dialog = $(this).parent().parent().parent();
    var paramet = {
      bugid: $dialog.find('.form-title>div').attr('data-bugid'),
      title: $dialog.find('.form-title>div').text(),
      bugstatus: $dialog.find('.defectStatus > span').attr('value'),
      // buglevel: $dialog.find('.buglevel > span').attr('value'),
      qualitylevel: $dialog.find('.qualitylevel > span').attr('value'),
      prioritylevel: $dialog.find('.prioritylevel > span').attr('value'),
      bugsource: $dialog.find('.bugsource > span').attr('value'),
      pic: $dialog.find('#defect-image').val(),
      file: $dialog.find('#defect-file').val(),
      content: $dialog.data('editor').getData(),
      plancompletetime: $dialog.find('.endTime').val(),
      ownuserid: $dialog.find('#ascription').attr('name')
    };
    if (paramet.qualitylevel == '') {
      coos.box.info('缺陷质级未选择');
      return;
    }
    if (paramet.prioritylevel == '') {
      coos.box.info('缺陷优先级未选择');
      return;
    }
    if (paramet.title == '请填写缺陷标题') {
      coos.box.info('缺陷标题不能为空');
      return;
    }
    if (paramet.title == '请填写缺陷标题') {
      coos.box.info('缺陷标题不能为空');
      return;
    }
    if (paramet.ownuserid == '') {
      coos.box.info('缺陷归属人不能为空');
      return;
    }
    if (paramet.plancompletetime == '') {
      coos.box.info('计划完成时间不能为空');
      return;
    }
    if (paramet.bugstatus == '') {
      coos.box.info('缺陷状态未选择');
      return;
    }
    // if (paramet.buglevel == '') {
    //   coos.box.info('缺陷等级未选择');
    //   return;
    // }
    if (paramet.bugsource == '') {
      coos.box.info('缺陷来源未选择');
      return;
    }
    var age = /[^(<p>(( )*&nbsp;)+<\/p>)]/ig;
    if (paramet.content == '' || !age.test(paramet.content)) {
      coos.box.info('缺陷描述不能为空');
      return;
    }
    if (bugEditSave(paramet).data.errmsg == '成功') {
      $dialog.remove();
      getlist();
    }
    // console.log(paramet)
  });
  $html.find('.addDefectBtn').click(function () {
    var $dialog = $(this).parent().parent().parent();
    var paramet = {
      needid: $dialog.find('.getNeed').attr('name'),
      title: $dialog.find('.form-title > div').text(),
      ownuserid: $dialog.find('#ascription').attr('name'),
      bugstatus: $dialog.find('.defectStatus > span').attr('value'),
      // buglevel: $dialog.find('.buglevel > span').attr('value'),
      qualitylevel: $dialog.find('.qualitylevel > span').attr('value'),
      prioritylevel: $dialog.find('.prioritylevel > span').attr('value'),
      bugsource: $dialog.find('.bugsource > span').attr('value'),
      plancompletetime: $dialog.find('.endTime').val(),
      pic: $dialog.find('#defect-image').val(),
      file: $dialog.find('#defect-file').val(),
      content: $dialog.data('editor').getData()
    };
    if (paramet.qualitylevel == '') {
      coos.box.info('缺陷质级未选择');
      return;
    }
    if (paramet.prioritylevel == '') {
      coos.box.info('缺陷优先级未选择');
      return;
    }
    if (paramet.title == '请填写缺陷标题') {
      coos.box.info('缺陷标题不能为空');
      return;
    }
    if (paramet.ownuserid == '') {
      coos.box.info('缺陷归属人不能为空');
      return;
    }
    if (paramet.plancompletetime == '') {
      coos.box.info('计划完成时间不能为空');
      return;
    }
    if (paramet.bugstatus == '') {
      coos.box.info('缺陷状态未选择');
      return;
    }
    // if (paramet.buglevel == '') {
    //   coos.box.info('缺陷等级未选择');
    //   return;
    // }
    if (paramet.bugsource == '') {
      coos.box.info('缺陷来源未选择');
      return;
    }
    var age = /[^(<p>(( )*&nbsp;)+<\/p>)]/ig;
    if (paramet.content == '' || !age.test(paramet.content)) {
      coos.box.info('缺陷描述不能为空');
      return;
    }
    if (bugAddSave(paramet).data.errmsg == '成功') {
      $dialog.remove();
      getlist();
    }
  });
  ClassicEditor.create($html.find('#defect-editor')[0], {
    toolbar: ['bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo'],
    language: 'zh-cn'
  }).then(function (editor) {
    $html.data('editor', editor);
  }).catch(function (error) {
    console.error(error);
  });
  assistList({ bugid: result.bugid }, $html);
  $html.find('.assist-list').on('click', '.assist-item', function () {
    var paramet = assistQueryOne({ processid: $(this).attr('data-assistid') }).result.model1.value;
    paramet.dialog = $(this).parent().parent().parent().parent().parent().parent();
    assist(paramet);
  });
  $('body').append($html);
  coos.element.init('.defect-dialog');
};