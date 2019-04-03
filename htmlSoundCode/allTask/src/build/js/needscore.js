'use strict';

module.exports = function needscore(_ref) {
  var score = _ref.score,
      needid = _ref.needid,
      li = _ref.li,
      $ul = _ref.$ul,
      scorecomment = _ref.scorecomment;

  var _require = require('./api.js'),
      updateScore = _require.updateScore;

  var $html = $('<div class="task-dialog">\n    <div class="task-content">\n      <div class="task-title">\n        <span>\u8BC4\u5206\u610F\u89C1</span>\n        <div style="display:flex">\n          <span class="delDialog scoreDialog">\xD7</span>\n        </div>\n      </div>\n      <div class="task-section">\n        <div class="need-scorecomment">\n          <span>\u8BC4\u5206\u610F\u89C1:</span>\n          <textarea class="form-control" id="needscorecomment" placeholder="\u8BC4\u5206\u610F\u89C1">' + (scorecomment || '') + '</textarea>\n        </div>\n      </div>\n      <div class="task-footer">\n        <span class="btn-default scoreDialog">\u53D6\u6D88</span>\n        <span class="btn-default btn-preserve scorePreserve">\u4FDD\u5B58</span>\n      </div>\n    </div>\n  </div>');
  $html.find('.scoreDialog').click(function () {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove();
    } else {
      $(this).parent().parent().parent().parent().remove();
    }
  });
  $html.find('.scorePreserve').click(function () {
    var $dialog = $(this).parent().parent().parent();
    var paramet = {
      needid: needid,
      score: score,
      scorecomment: $dialog.find('#needscorecomment').val()
    };
    if (!paramet.scorecomment) {
      coos.box.info('评分意见不能为空');
      return;
    }
    updateScore(paramet).then(function (res) {
      $ul.html(li);
      $dialog.remove();
    });
  });
  $('body').append($html);
};