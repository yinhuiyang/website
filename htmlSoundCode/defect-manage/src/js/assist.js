module.exports = function (result = {}) {
  var { insertOrUpdate, assistDelete } = require('./api.js');
  var assistList = require('./assistList.js');
  let $html = $(`
  <div class="defect-dialog">
    <div class="defect-content">
      <div class="defect-title">
        <span>填写协助</span>
        <div style="display:flex">
          <div class="menuDown" id="menuDown" style="display: ${result.processid? '': 'none'};">
            <i class="fa fa-angle-down"></i>
            <ul class="menuList" style="display: none;">
              <li class="delAssist">
                <i class="fa fa-trash-o"></i>
                <span>删除</span>
              </li>
            </ul>
          </div>
          <span class="delDialog">×</span>
        </div>
      </div>
      <div class="defect-section">
        <div class="defect-form">
            <div class="form-content">
              <div class="assist-row">
                <div class="row-title"><span>工作日期</span><sup>*</sup></div>
                <div class="row-time"><input type="text" placeholder="工作日期" class="assist-time" value="${result.workdate?result.workdate.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3"): ''}"></div>
              </div>
              <div class="assist-row">
                <div class="row-title"><span>工作时长</span><sup>*</sup></div>
                <div id="assist-hour"></div>
              </div>
              <div class="assist-row">
                <input label="图片" id="assist-image" file-count="5" value="${result.pic|| ''}" group-type="4" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="图片"> 
              </div>
              <div class="assist-row">
                <textarea label="备注" id="assist-remark" value="${result.remark|| ''}" group-type="4" class="input-rule-group" placeholder="备注" cannull="true"></textarea>
              </div>
            </div>
        </div>
      </div>
      <div class="defect-footer">
        <span class="btn-default" id="delDialog">取消</span>
        <span class="btn-default btn-preserve addAssistBtn" data-bugid="${result.bugid}" data-processid=${result.processid|| ''}>保存</span>
      </div>
    </div>
  </div>`);
  $html.find('#assist-hour').slider( {
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
  $html.find('#assist-hour').find('.ui-slider-handle').html( $html.find('#assist-hour').slider("value") )
  $html.find('.delDialog, #delDialog').click(function() {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove()
    }else{
      $(this).parent().parent().parent().parent().remove()
    }
  })
  $html.find('#menuDown > i').click(function (e) {
    e.stopPropagation();
    $(this).siblings().toggle()
  })
  $html.find('.delAssist').click(function () {
    let $dialog = $(this).parent().parent().parent().parent().parent().parent();
    assistDelete({processid: result.processid})
    $dialog.remove()
    assistList({bugid: result.bugid}, result.dialog)
  })
  let option={
    lang: 'ch', 
    step: 60,
    datepicker:true,
    timepicker:false,
    format:'Y-m-d',
  }
  $html.find('.assist-time').datetimepicker(option)
  $html.find('.addAssistBtn').click(function () {
    let $dialog = $(this).parent().parent().parent()
    let $parent = result.dialog
    let processid = $(this).attr("data-processid")
    let paramet = {
      remark: $dialog.find('#assist-remark').val(),
      workhour: $dialog.find('#assist-hour').slider("value"),
      workdate: $dialog.find('.assist-time').val(),
      pic: $dialog.find('#assist-image').val()
    }
    if (processid) {
      paramet.processid = processid
    } else {
      paramet.bugid = $(this).attr("data-bugid")
    }
    if (!paramet.workdate) {
      coos.box.info('工作时间不能为空');
      return;
    }
    if (!paramet.workhour) {
      coos.box.info('工作时间不能为零');
      return;
    }
    // if (!paramet.remark) {
    //   coos.box.info('备注不能为空');
    //   return;
    // }
    // console.log(paramet)
    insertOrUpdate(paramet)
    assistList({bugid: $(this).attr("data-bugid")}, $parent)
    $dialog.remove()
  })
  $('body').append($html)
  coos.element.init('.defect-dialog');
}