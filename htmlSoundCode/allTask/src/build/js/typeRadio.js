'use strict';

module.exports = function typeRadio($modal, typeid) {
  var data = require('./data.js');
  var $html = $('\n    <div class="dialog">\n      <div class="dialog-content">\n        <div class="dialog-header">\n          <span>\u7C7B\u578B\u9009\u62E9</span>\n          <div style="display:flex">\n            <span class="delDialog">\xD7</span>\n          </div>\n        </div>\n        <div class="dialog-section">\n          <div class="dialog-form">\n            <div class="dialog-radio">\n              ' + function () {
    var radio = '';
    data.taskType.forEach(function (el) {
      radio += '<label>\n                      <input type="radio" name="typeid" value="' + el.tasktypeid + '" data-label="' + el.name + '" ' + (typeid == el.tasktypeid ? 'checked' : '') + '>\n                      ' + el.name + '\n                    </label>';
    });
    return radio;
  }() + '\n            </div>\n          </div>\n        </div>\n        <div class="dialog-footer">\n          <span class="btn-default" id="delDialog">\u53D6\u6D88</span>\n          <span class="btn-default btn-confirm" id="confirm">\u786E\u5B9A</span>\n        </div>\n      </div>\n    </div>\n  ');
  $html.find('.delDialog, #delDialog').click(function () {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
    } else {
      $(this).parent().parent().parent().parent().remove();
    }
  });
  $html.find('#confirm').click(function () {
    var $radio = $(this).parent().parent().parent();
    var typeid = $radio.find('input[name=typeid]:checked').val();
    var typeName = $radio.find('input[name=typeid]:checked').attr('data-label');
    // console.log(typeid, typeName)
    $modal.find('#typeid > span').text(typeName);
    $modal.find('#typeid > span').attr('value', typeid);
    $radio.remove();
  });
  $('body').append($html);
};