module.exports = function (res = {}) {
  var select = require('./select.js');
  var {versionInsert, getTaskStatusList, versionUpdate}= require('./api.js');
  let getlist = require('./getlist.js');
  var getstatus = require('./getstatus.js');
  var getTime = require('./getTime.js');
  let html = `
  <div class="Workbench-dialog">
    <div class="dialog-content">
      <div class="dialog-title">
        <span>添加版本</span>
        <div style="display:flex">
          <span class="delDialog">×</span>
        </div>
      </div>
      <div class="dialog-section">
        <div class="dialog-form">
          <div class="version-group">
            <div class="version-item-title">
              <span>版本名称</span>
              <sup>*</sup>
            </div>
            <div class="version-title version-group-input">
              <input type="text" class="form-control" id="versionName" placeholder="版本名称" value="${res.title|| ''}">
            </div>
          </div>
          <div class="version-group">
              <div class="version-item-title">
                <span>状态</span>
                <sup>*</sup>
              </div>
              <div class="version-group-input">
                <div class="status select-group form-control">
                    <span value="${res.status}" index="" id="versionStatus">${getstatus(res.status)|| '请选择'}</span>
                    <i class="fa fa-angle-down"></i>
                    <ul class="selectList select-chaozuo" style="display: none;">
                      ${
                        function() {
                          let result = getTaskStatusList().data.result
                          let li = ''
                          for(var key in result) {
                            li += `<li value="${key}" class="${res.status== key?'active':''}">${result[key]}</li>`
                          }
                          return li
                        }()
                      }
                    </ul>
                </div>
              </div>
            </div>
          <div class="version-group">
              <div class="version-item-title">
                <span>计划上线时间</span>
                <sup>*</sup>
              </div>
              <div class="version-time version-group-input">
                <input type="text" class="form-control" id="createTime" placeholder="计划上线时间" value="${getTime(res.planonlinetime)}">
              </div>
            </div>
          <div>
            <input label="附件" id="versionFile" value="${res.file||''}" group-type="4" value="" class="input-rule-group input-rule-file" need-addon="true" placeholder="附件" file-count="5" cannull="true">
          </div>
          <div>
            <textarea label="说明" id="versionRemark" value="${res.description|| ''}" group-type="4" class="input-rule-group" placeholder="说明" cannull="true"></textarea>
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <span class="btn-default" id="delDialog">取消</span>
        <span class="btn-default btn-preserve">保存</span>
      </div>
    </div>
  </div>`
  let $html = $(html)
  select.init(['.select-group'], $html)
  let option={
    lang: 'ch', 
    step: 60,
    datepicker:true,
    timepicker:true,
    format:'Y-m-d H:i',
  }
  $html.find('#createTime').datetimepicker(option)
  $html.find('.delDialog, #delDialog').click(function () {
    $('body').removeClass('coos-over-hidden')
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove()
    }else{
      $(this).parent().parent().parent().parent().remove()
    }
  })
  $html.find('.btn-preserve').click(function () {
    let paramet = {
      projectid: res.projectid,
      title: $('#versionName').val(),
      status: $('#versionStatus').attr('value'),
      planonlinetime: $('#createTime').val(),
      file: $('#versionFile').val(),
      description: $('#versionRemark').val()
    }
    if (!paramet.title) {
      coos.box.info('版本名称不能为空');
      return;
    }
    if (!paramet.status) {
      coos.box.info('状态未选择');
      return;
    }
    if (!paramet.planonlinetime) {
      coos.box.info('计划上线时间不能为空');
      return;
    }
    if (res.versionid) {
      paramet.versionid = res.versionid
      versionUpdate(paramet)
      $('body').removeClass('coos-over-hidden')
      $(this).parent().parent().parent().remove()
    } else {
      versionInsert(paramet)
      $('body').removeClass('coos-over-hidden')
      $(this).parent().parent().parent().remove()
      versionUpdate(paramet)
    }
    getlist()
  })
  $("body").append($html);
  coos.element.init('.defect-dialog');
}