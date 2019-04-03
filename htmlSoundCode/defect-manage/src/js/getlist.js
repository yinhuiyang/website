module.exports = function() {
  var { getlist } = require('./api.js');
  var listGroup = require('./listGroup.js');
  var data= require('./data.js');
  if (!$('.defect-manage .nav li.active a').text()) return;
  var paramet = {
    bugstatus: '',
    my: data.myState[$('.defect-manage .nav li.active a').text()]
  }
    switch($('.defect-manage .nav li.active a').text()){
      case '待修复':
        paramet.bugstatus = '0'
        break;
      case '待验证':
        paramet.bugstatus = '1'
        break;
      case '验证完成':
        paramet.bugstatus = '2'
        break;
        case '拒绝':
        paramet.bugstatus = '3'
        break;
      default:
        paramet.bugstatus = ''
    }
  let res = getlist(paramet);
  listGroup(res, $('.defect-manage .nav li.active a').text());
  // console.log(res);
}