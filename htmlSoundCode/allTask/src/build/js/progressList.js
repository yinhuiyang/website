'use strict';

module.exports = function progressList(_ref, $modal) {
  var taskid = _ref.taskid,
      _ref$currentprocess = _ref.currentprocess,
      currentprocess = _ref$currentprocess === undefined ? 0 : _ref$currentprocess;

  var _require = require('./api.js'),
      queryPageList = _require.queryPageList;

  var score = require('./score.js');
  // var getTime = require('./getTime.js');
  queryPageList({ taskid: taskid }).then(function (res) {
    var html = '';
    res.result.model1.value.forEach(function (el) {
      html += '<div class="Progress-item" data-processid="' + el.processid + '"> \n          <div class="Progress-item-left"> \n              <span>' + el.process + '%</span> \n              <span>' + (el.workdate ? el.workdate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3") : '') + '</span> \n              <span>' + (el.workhour || '') + '\u5C0F\u65F6</span> \n          </div> \n          <div class="Progress-item-right"><i class="fa fa-chevron-right"></i></div> \n        </div>';
      if (currentprocess < el.process) {
        currentprocess = el.process;
      }
    });
    $modal.find('.Progress-List').html(html);
    $modal.find('.rateOfProgress div:last-child span').text(currentprocess + '%');
    if (currentprocess == 100 && $modal.data('taskScore')) {
      $modal.find('.score-list').parent().show();
      score($modal)._set = $modal.data('score');
    } else {
      $modal.find('.score-list').parent().hide();
    }
  });
};