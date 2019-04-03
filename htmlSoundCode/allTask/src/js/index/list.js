module.exports = function list(result, status) {
  var layout = require('./layout.js');
  var item = require('./item.js');
  var dialog = require('./dialog.js');
  var needscore = require('./needscore.js');
  var needstatus= require('./needstatus.js');
  var { taskQuery, updateScore, needQueryOne, finish } = require('./api.js');
  var getList = require('./getList.js');
  let html = '';
  let isneedmanager = false;
  result.data.result.needs.forEach(el => {
    let needtrustuseridArr =  el.needtrustuserid.split(',')
    let completetrustuseridArr = el.completetrustuserid.split(',')
    let show = el.showcomplete== '1'&& needtrustuseridArr.indexOf(result.data.result.userid) > -1 && el.needstatus == '2'
    let yellowColor = completetrustuseridArr.indexOf(result.data.result.userid) < 0
    let addCompleteShow = show && yellowColor
    isneedmanager = el.needcreateuserid == el.loginuserid
    html += 
    `<li>
      <div class="list-item" id="${el.needid|| ''}">
        <div class="item-title">
          <div class="needTitle">
            <div class="title-font">
              ${el.needtitle|| '暂无需求'}
              <i class="fa fa-circle needComplete ${yellowColor? 'yellowColor': 'greenColor'}"  style="${show? "":"display:none"}"></i>
            </div>
            <div class="needState">
              <span class="item-state">${needstatus(el.needstatus)||status}</span>
              <ul class="needscore needscoreList ${!isneedmanager ?'prohibit': ''}" ${el.needstatus < 7? 'style="display:none"': ''}>
                ${function() {
                  let li = ''
                  for(let i=0; i<5; i++) {
                    li += `<li><i class="fa fa-star ${i < el.needscore?'color': ''}"></i></li>`
                  }
                  return li
                }()}
              </ul>
            </div>
          </div>
          <div class="dropdown-task">
            <i class="fa fa-chevron-down xiaicon" id="dropdownMenu1" style="${el.needid? "":"display:none"}"></i>
            <ul class="dropdown-menu dropdown-menu-right taskdown" aria-labelledby="dropdownMenu1">
              <li><a href="#" class="addtask"><i class="fa fa-pencil"></i>追加任务</a></li>
              <li><a  href="#" class="addDefect"><i class="fa fa-pencil"></i>添加缺陷</a></li>
              <li><a target="_blank" href="${coos.basePath}task/need/toView.do?&needid=${el.needid}"><i class="fa fa-eye"></i>查看需求</a></li>
              <li><a  href="#" class="addComplete" style="${addCompleteShow? "":"display:none"}"><i class="fa fa-gear"></i>完成</a></li>
            </ul>
          </div>
        </div>
        <div class="task-list">
        ${item(el.tasks)}
        </div>
      </div>
    </li>`
  });
 $('.task-manage .list').html(html)
 $('.task-manage .list .xiaicon').click(function (e) {
  e.stopPropagation()
  $('.taskdown').hide()
  $(this).siblings('.taskdown').toggle()
 })
 $('.task-manage .task-item').click(function () {
  taskQuery({taskid: $(this).attr('id')}).then(res => {
    let needTitle = $(this).parent().parent().parent().find('.title-font').text()
    res.result.model1.value.needTitle = needTitle
    $('body').addClass('coos-over-hidden')
    dialog(res.result.model1.value)
  })
 })
 $('.task-manage .addtask').click(function (e) {
  e.stopPropagation()
   let $item = $(this).parent().parent().parent().parent().parent()
   let result = {
     needid: $item.attr('id'),
     needTitle: $item.find('.title-font').text(),
     addModal: true
   }
   $('body').addClass('coos-over-hidden')
   dialog(result)
   $('.taskdown').hide()
 })
 $('.task-manage .addDefect').click(function (e) {
  e.preventDefault();
  let needTitle = $(this).parent().parent().parent().parent().parent().find('.title-font').text()
  let needid = $(this).parent().parent().parent().parent().parent().attr('id')
  defect.dialog({needid:needid,task_need_title: needTitle})
 })
 $('.task-manage .addComplete').click(function(e) {
  e.preventDefault();
  let paramet= {
    needid: $(this).parent().parent().parent().parent().parent().attr('id')
  }
  finish(paramet).then(res => {
    if (res.data.errmsg == "成功") {
      getList()
    } else {
      coos.box.info(res.data.errmsg);
    }
  })
 })
 if (isneedmanager) {
  $('.task-manage .needState .needscoreList').on('click', ' li i', function() {
    let $list = $(this).parent().parent().parent().parent().parent().parent()
    let idx = $(this).parent().index()+1
    let li = ''
    for(let i=0; i<5; i++) {
      li += `<li><i class="fa fa-star ${i < idx?'color': ''}"></i></li>`
    }
    if (idx != 3) {
      let $ul = $(this).parent().parent()
      needQueryOne({needid:$list.attr('id')}).then(res => {
        let paramet = {
          score: idx,
          needid: $list.attr('id'),
          li: li, $ul: $ul,
          scorecomment: res.result.data.value.scorecomment
        }
        needscore(paramet)
      })
    }else{
      updateScore({needid: $list.attr('id'), score: idx, scorecomment: ''}).then(res => {
        $(this).parent().parent().html(li)
      })
    }
   })
 }
 layout()
}