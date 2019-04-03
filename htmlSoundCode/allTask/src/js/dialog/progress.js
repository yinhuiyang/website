module.exports = function progress(result = {}) {
  var { processUpdate, delProcess } = require('./api.js');
  var progressList = require('./progressList.js');
  let $html = $(`
   <div class="taskModal-schedule"  style="z-index: 50;">     
             <div class="schedule-dialog">     
                 <div class="schedule-top">     
                     <div class="schedule-title">填写进度</div>     
                     <span class="scheduleClose scheduleClose-btn">×</span>
                 </div>     
                 <div class="schedule-content-box">     
                     <div class="schedule-content">     
                         <div class="ProgressBar-group">     
                             <div class="ProgressBar-title"><span>任务进度</span><sup>*</sup></div>     
                             <div id="ProgressBar"></div>     
                         </div>     
                         <div class="ProgressBar-group">     
                             <div class="ProgressBar-title"><span>工作日期</span><sup>*</sup></div>     
                             <div class="ProgressBar-time"><input type="text" placeholder="工作日期" class="form-control" value="${result.workdate? result.workdate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"):''}"/></div>     
                         </div>     
                         <div class="ProgressBar-group">     
                             <div class="ProgressBar-title"><span>工作时长</span><sup>*</sup></div>     
                             <div id="ProgressBar-hour"></div>     
                         </div>     
                         <div class="ProgressBar-group row">     
                             <input label="图片" id="Progress-image" value="${result.images||''}" file-count="5" group-type="4" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="图片">     
                         </div>     
                         <div class="ProgressBar-group row">     
                             <textarea label="备注" id="Progress-remark" value="${result.remark|| ''}" group-type="4" class="input-rule-group" placeholder="备注"></textarea>     
                         </div>     
                     </div>     
                 </div>     
              
                 <div class="schedule-footer">
                    <span class="delProgress" ${result.processid? '':'style="display:none"'}>删除</span>
                    <span class="scheduleClose-btn">取消</span>
                    <span class="preserve-btn">保存</span> 
                 </div>     
             </div>     
         </div>
  `)
  $html.find('#ProgressBar').slider( {
    value: result.process || 0,
    slide: function( event, ui ) {
      event.currentTarget
    $(event.currentTarget).find('.ui-slider-handle').html( ui.value );
  }
  }).slider("pips", {
    rest : "label",
    prefix : "",
    suffix : "",
    step : 20
  })
  $html.find('#ProgressBar').find('.ui-slider-handle').html( $html.find('#ProgressBar').slider("value") )
  $html.find('#ProgressBar-hour').slider( {
    max:24,
    value: result.workhour|| 0,
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
  $html.find('#ProgressBar-hour').find('.ui-slider-handle').html( $html.find('#ProgressBar-hour').slider("value") )
  let option={"lang":"ch","datepicker":true,"timepicker":false,"format":"Y-m-d"}
  $html.find('.ProgressBar-time input').datetimepicker(option)
  $html.find('.scheduleClose-btn').click(function () {
    $(this).parent().parent().parent().remove()
  })
  $html.find('.delProgress').click(function() {
    let $progress = $(this).parent().parent().parent()
    delProcess({processid: result.processid,taskid:result.taskid}).then(res => {
      progressList({ taskid: result.taskid }, result.modal);
      $progress.remove()
    })
  })
  $html.find('.preserve-btn').click(function () {
    let $progress = $(this).parent().parent().parent()
    var paramet = {
      taskid: result.taskid,
      process: $progress.find('#ProgressBar').slider("value"),
      workdate: $progress.find('.ProgressBar-time input').val(),
      workhour: $progress.find('#ProgressBar-hour').slider("value"),
      images: $progress.find('#Progress-image').val(),
      remark: $progress.find('#Progress-remark').val()
    }
    if (result.processid) {
      paramet.processid = result.processid
    }
    if (!paramet.process){
      coos.box.info('进度未填')
      return
    }
    if (!paramet.workdate){
      coos.box.info('工作日期未填')
      return
    }
    if (!paramet.workhour){
      coos.box.info('工作时长未填')
      return
    }
    // console.log(paramet)
    processUpdate(paramet).then(res => {})
    progressList({ taskid: paramet.taskid }, result.modal);
    $progress.remove()
  })
  $('body').append($html)
  coos.element.init('.taskModal-schedule')
}
