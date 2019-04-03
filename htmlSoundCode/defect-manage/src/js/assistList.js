module.exports = function(paramet, $dialog) {
  var { assistQueryList } = require('./api.js');
  let item = ''
  assistQueryList(paramet).result.model1.value.forEach(el => {
    item += `<div class="assist-item" data-assistid="${el.processid}">
    <div class="assist-item-left">
      <span>${el.username}</span>
      <span>${el.workdate?el.workdate.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3"): ''}</span>
      <span>${el.workhour}小时</span>
    </div>
    <div class="assist-item-right">
      <i class="fa fa-chevron-right"></i>
    </div>
  </div>`
  });
  $dialog.find('.assist-list').html(item)
}