module.exports = function dialog(result = {}) {
  var getTime = require('./getTime.js');
  var data= require('./data.js');
  var select = require('./select.js');
  var search = require('./search.js');
  var getList = require('./getList.js');
  var progressList = require('./progressList.js');
  var progress = require('./progress.js');
  var score = require('./score.js');
  var typeRadio = require('./typeRadio.js');
  var { getUserList, insertOrUpdate, needQueryOne, deleteTask, processQueryOne } = require('./api.js');
  result.addModal? needQueryOne({needid: result.needid}).then(res => {
    result.needplanendtime = res.result.data.value.planonlinetime
  }) : '';
  var myDate = new Date();
  var st = myDate.toLocaleDateString().split('/').join('-')+" 09:00"
  var end = myDate.toLocaleDateString().split('/').join('-')+" 18:00"
  let $html = $(
    `<div class="taskModal ${result.addModal?"addModal": ""}" id="taskModal" data-needid= "${result.needid|| ''}" data-taskid = "${result.taskid|| ''}" needplanendtime= "${getTime(result.needplanendtime)}">
      <div class="taskModal-dialog">
        <div class="demand-content">
          <a  href="${coos.basePath}task/need/toView.do?&needid=${result.needid}" target="_blank" class="demand-title">
            ${result.needTitle}
          </a>
          <div style="display: flex;">
            <div class="task-menu" style="display: ${result.addModal? "none":""}"> 
              <i class="fa fa-angle-down"></i> 
              <ul class="menuList"> 
                <li class="delTask"><i class="fa fa-trash-o"></i> <span>删除到回收站</span></li> 
                <li class="copyTask"><i class="fa fa-clipboard"></i> <span>复制任务</span></li> 
              </ul> 
            </div> 
            <span class="taskClose modalRemove">×</span> 
          </div> 
        </div> 
        <div class="taskModal-contentBox"> 
          <div class="taskModal-content"> 
            <div class="taskModal-title"> 
              <div class="" contenteditable="true" placeholder="任务名称" > ${result.title||"填写任务标题"}</div> 
            </div> 
            <div class="taskModal-message">
              <div class="taskModal-personLiable input-search"> 
                <input type="text" autocomplete="off" id="personLiable" placeholder="负责人" value="${result.trustusername||''}" name="${result.trustuserid||''}" class="form-control-none input"> 
                <ul class="personLiable-ul" style="display:none"> 
                </ul> 
              </div> 
              <div class="input-time">
                <i class="fa fa-calendar time-icon"></i> 
                <input type="text" class="startTimeIput form-control-none" placeholder="任务开始时间" value="${getTime(result.planstarttime)|| st}"/> 
              </div> 
              -- 
              <div style="margin-left: 6px;"> 
                <i class="fa fa-calendar time-icon"></i> 
                <input type="text" class="endTimeIput form-control-none" placeholder="任务结束时间" value="${getTime(result.planendtime)|| end}"/>
              </div> 
            </div> 
            <div class="taskModal-illustrate"> 
              <div class="illustrate-row">
              <div class="workingHoursTitle"><span>预估工时</span></div>
              <div><div id="workingHours"></div></div>
              </div>
              <div class="illustrate-row"> 
                <div><span>难度</span></div> 
                <div> 
                  <div id="difficultylevelid" class="difficultylevelid">
                      ${function () {
                        let li = '';
                        let index = -1;
                        data.taskDifficulty.forEach(el => {
                          if (result.taskdifficultylevelid == el.taskdifficultylevelid) {
                            li += `<li value="${el.taskdifficultylevelid}" class="active">${el.name}</li>`
                            index = data.taskDifficulty.indexOf(el);
                          } else {
                            li += `<li value="${el.taskdifficultylevelid}">${el.name}</li>`
                          }
                        });
                        return `<span index="${index|| ''}" value="${result.taskdifficultylevelid || ''}">${(data.taskDifficulty[index]||{}).name|| '请选择'}</span><i class="fa fa-angle-down"></i> 
                        <ul class="difficultylevelList select_task">
                        ${li}
                        </ul>`
                        }()
                      }
                  </div>
                </div> 
              </div> 
              <div class="illustrate-row"> 
                <div><span>类型</span></div> 
                <div>
                  <div id="typeid" class="typeid">
                    ${function () {
                      let li = '';
                      let index = -1;
                      data.taskType.forEach(el => {
                        if (result.type == el.tasktypeid){
                          li += `<li value="${el.tasktypeid}" class="active">${el.name}</li>`
                          index = data.taskType.indexOf(el)
                        } else {
                          li +=  `<li value="${el.tasktypeid}">${el.name}</li>`
                        }
                      })
                      return `<span index="${index|| ""}" value="${result.type || ''}">${(data.taskType[index]||{}).name|| '请选择'}</span><i class="fa fa-angle-down"></i> 
                      <div class="tasktypeList-box select_task"> <!-- -->
                        <ul class="tasktypeList">${li}</ul>
                      </div>`
                      }()
                    }
                   </div>
                </div> 
              </div> 
              <div class="rateOfProgress"> 
                <div><span>进度</span></div> 
                <div><span class="currentprocess">${result.currentprocess|| '0'}%</span></div> 
              </div>
              <div class="illustrate-row" style="display: none">
                <div><span>评分</span></div>
                <div class="score-list">
                  <ul class="score-ul" value="${result.score}">
                    <li><i class="fa fa-star color"></i></li>
                    <li><i class="fa fa-star color"></i></li>
                    <li><i class="fa fa-star color"></i></li>
                    <li><i class="fa fa-star color"></i></li>
                    <li><i class="fa fa-star color"></i></li>
                  </ul>
                </div>
              </div>
              <div class="opinion-row" style="display: none">
                <div><span>评分意见</span></div>
                <div>
                  <textarea class="form-control" id="scorecomment" placeholder="评分意见">${result.scorecomment||''}</textarea>
                </div>
              </div>
              <div class="illustrate-row"> 
                <div><span>说明</span></div> 
                <textarea class="illustrate-font " id="illustrateEditor"> ${result.description || ''}</textarea> 
              </div> 
            </div>
            <div class="ProgressListBox" style="display: ${result.addModal? "none":""}">
              <div class="Progress-title"><i class="fa fa-list"></i><span>进度列表</span></div> 
              <div class="Progress-List">
              </div> 
              <div class="Progress-add"> 
                <i class="fa fa-plus-circle"></i> 
                <span>填写进度</span> 
              </div> 
            </div> 
          </div> 
        </div> 
        <div class="taskModal-footer">
          <span class="cancel-btn modalRemove">取消</span>
          <span class="preserve-btn  modalPreserve">保存</span>
        </div>
      </div> 
    </div>`)
    !result.addModal? progressList({taskid:result.taskid, currentprocess: result.currentprocess}, $html): '';
    coos.plugin.load("jquery_ui_slider", function() {
			coos.input.recallSliderPips();
      $html.find('#workingHours').slider( {
        max:32,
        value: result.estimatedworkhour||0,
        slide: function( event, ui ) {
          event.currentTarget
        $(event.currentTarget).find('.ui-slider-handle').html( ui.value );
      }
      }).slider("pips", {
        rest : "label",
        prefix : "",
        suffix : "",
        step : 4
      })
      $html.find('#workingHours').find('.ui-slider-handle').html( $html.find('#workingHours').slider("value") )
    })
    
    $html.data("taskScore", (result.loginuserid|| '') == result.createuserid)
    // console.log($html.data("taskScore"))
    $html.data("score", result.score)
    select.init(['#difficultylevelid'], $html)
    $html.find('#typeid').click(function () {
      let $modal = $(this).parent().parent().parent().parent().parent().parent().parent()
      let typeid = $(this).find('span').attr('value')
      typeRadio($modal, typeid)
    })
    $html.on('click', '.score-ul li i', function () {
      let idx = $(this).parent().index()
      score($html)._set = idx + 1
    })
    $html.find('#personLiable').on('input', function () {
      let li=''
      getUserList({username: $(this).val()}).then( res => {
        res.data.result.forEach(el => {
          li += ` <li name="${el.userid}">${el.username}</li>`
        })
        $(this).siblings().html(li);
        $(this).siblings().show();
      })  
    })
    search.init($html)
    $html.find('.Progress-add').click(function() {
      let $modal = $(this).parent().parent().parent().parent().parent()
      let paramet = {
        taskid: $modal.attr('data-taskid'),
        modal: $modal
      }
      // console.log(paramet)
      progress(paramet)
    })
    $html.find('.Progress-List').on('click', '.Progress-item', function () {
      let $modal = $(this).parent().parent().parent().parent().parent().parent()
      let processid = $(this).attr('data-processid')
      processQueryOne({processid}).then(res => {
        res.result.model1.value.modal = $modal
        progress(res.result.model1.value)
      })
    })
    var startTime = $html.find('.startTimeIput').val()
    var endTime = $html.find('.endTimeIput').val()
    let option={
      lang: 'ch', 
      step: 60,
      datepicker:true,
      timepicker:true,
      format:'Y-m-d H:i',
    }
    option.onClose = function(dp,$input){
      if(startTime != $input.val()){
        if (endTime > getTime(result.needplanendtime)){
          coos.box.info('任务结束时间不能大于需求结束时间('+getTime(result.needplanendtime)+')')
          return
        }
        startTime = $input.val()
      }
    }
    $html.find('.startTimeIput').datetimepicker(option)
    option.onClose = function(dp,$input){
      if(endTime != $input.val()){
        endTime = $input.val()
        if (endTime > getTime(result.needplanendtime)){
          coos.box.info('任务结束时间不能大于需求结束时间('+getTime(result.needplanendtime)+')')
          return
        }
      }
    }
    $html.find('.endTimeIput').datetimepicker(option)
    $html.find('.time-icon').click(function() {
      $(this).siblings('input').datetimepicker('show')
    })
    ClassicEditor
      .create( $html.find( '#illustrateEditor' )[0], {
        toolbar: [  'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ],
        language: 'zh-cn'
    } ).then(editor => {
      $html.data('editor', editor)
    })
    $html.find('.taskModal-title div').focus(function () {
      if ($(this).text().trim() == '填写任务标题'){
        $(this).text('')
      }
    })
    $html.find('.taskModal-title div').blur(function () {
      if ($(this).text().trim() == ''){
        $(this).text('填写任务标题')
      }
    })
    $html.on('click','.modalRemove',function(){
      $('body').removeClass('coos-over-hidden')
      let $modal = ''
      if ($(this).text() == '取消') {
        $(this).parent().parent().parent().remove()
        $modal = $(this).parent().parent().parent()
      }else{
        $(this).parent().parent().parent().parent().remove()
        $modal = $(this).parent().parent().parent().parent()
      }
      if ($modal.find('.currentprocess').text().trim() != `${result.currentprocess||'0'}%`) {
        getList()
      }
    })
    $html.find('.task-menu > i').click(function (e) {
      e.stopPropagation();
      $(this).siblings().toggle()
    })
    $html.find('.delTask').click(function () {
      let $modal = $(this).parent().parent().parent().parent().parent().parent();
      deleteTask({taskid: $modal.attr('data-taskid')}).then(res => {
        getList()
        $modal.remove()
      })
    })
    $html.find('.copyTask').click(function () {
      var paramet = $.extend(true, {}, result)
      paramet.taskid = '';
      paramet.addModal = true
      paramet.currentprocess = 0
      // console.log(result)
      // console.log(paramet)
      dialog(paramet)
    })
    $html.find('.modalPreserve').click(function () {
      $('body').removeClass('coos-over-hidden')
      let $modal = $(this).parent().parent().parent();
      let paramet = {
        title: $modal.find('.taskModal-title div').text(),
        trustuserid: $modal.find('#personLiable').attr('name'),
        username: $modal.find('#personLiable').attr('value'),
        needid: $modal.attr('data-needid'),
        planstarttime: $modal.find('.startTimeIput').val(),
        planendtime: $modal.find('.endTimeIput').val(),
        description: $modal.data('editor').getData(),
        taskdifficultylevelid: $modal.find('#difficultylevelid > span').attr('value'),
        type: $modal.find('#typeid > span').attr('value'),
        estimatedworkhour: $modal.find('#workingHours').slider("value"),
      }
      if (!result.addModal) {
        paramet.taskid = $modal.attr('data-taskid')
        paramet.score = $modal.find('.score-ul').attr('value')
        paramet.scorecomment = $modal.find("#scorecomment").val()
        if (paramet.score !=3 && !paramet.scorecomment) {
          coos.box.info('评分意见不能为空');
          return;
        }
      }
      if (paramet.title.trim() == '填写任务标题') {
        coos.box.info('任务标题不能为空');
        return;
      }
      if (paramet.trustuserid == '') {
        coos.box.info('任务负责人未选择');
        return;
      }
      if (paramet.trustuserid == '') {
        coos.box.info('任务负责人未选择');
        return;
      }
      if (paramet.planstarttime == '') {
        coos.box.info('任务开始时间不能为空');
        return;
      }
      if (paramet.planendtime == '') {
        coos.box.info('任务结束时间不能为空');
        return;
      }
      if (paramet.taskdifficultylevelid == '') {
        coos.box.info('任务难度未选择');
        return;
      }
      if (paramet.type == '') {
        coos.box.info('任务类型未选择');
        return;
      }
      insertOrUpdate(paramet).then(res => {
        getList()
        $modal.remove()
      })
    })
    $('body').append($html);
}
