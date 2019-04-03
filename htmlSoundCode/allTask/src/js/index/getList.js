module.exports = async function getList() {
  var { taskList } = require('./api.js');
  var list = require('./list.js');
  var data = require('./data.js');
  var paramet = {
    status: '',
    my: data.myState[$('.task-manage .nav li.active a').text()]
  }
  switch($('.task-manage .nav li.active a').text()){
    case '规划中':
        paramet.status = '0'
        break;
      case '启动':
        paramet.status = '1'
        break;
      case '进行中':
        paramet.status = '2'
        break;
        case '完成':
        paramet.status = '8'
        break;
      case '上线':
        paramet.status = '9'
        break;
      default:
        paramet.status = ''
  }
  return await taskList(paramet).then(res => {
    list(res, $('.task-manage .nav li.active a').text());
  })
}