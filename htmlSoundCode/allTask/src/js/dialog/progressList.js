module.exports = function progressList({taskid, currentprocess = 0}, $modal) {
  var { queryPageList } = require('./api.js');
  var score = require('./score.js');
  // var getTime = require('./getTime.js');
  queryPageList({taskid: taskid}).then(res => {
    let html = ''
    res.result.model1.value.forEach(el => {
      html += `<div class="Progress-item" data-processid="${el.processid}"> 
          <div class="Progress-item-left"> 
              <span>${el.process}%</span> 
              <span>${el.workdate?el.workdate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"):''}</span> 
              <span>${el.workhour||''}小时</span> 
          </div> 
          <div class="Progress-item-right"><i class="fa fa-chevron-right"></i></div> 
        </div>`
        if (currentprocess < el.process) {
          currentprocess = el.process
        }
    });
    $modal.find('.Progress-List').html(html);
    $modal.find('.rateOfProgress div:last-child span').text(currentprocess+'%');
    if (currentprocess == 100&& $modal.data('taskScore')) {
      $modal.find('.score-list').parent().show()
      score($modal)._set = $modal.data('score')
    } else {
      $modal.find('.score-list').parent().hide()
    }
  })
}
