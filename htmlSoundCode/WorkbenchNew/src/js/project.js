module.exports = function (res={}) {
  let {insert, projectupdate} = require('./api.js');
  let getlist = require('./getlist.js');
  let getTotalCount = require('./getTotalCount.js')
  let $html = $(`
  <div class="Workbench-dialog">
    <div class="dialog-content">
      <div class="dialog-title">
        <span>${res.projectid? "修改项目":'添加项目'}</span>
        <div style="display:flex">
          <span class="delDialog">×</span>
        </div>
      </div>
      <div class="dialog-section">
        <div class="dialog-form addproject">
          <div class="form-label">名称:<sup>*</sup></div>
          <div  class="form-input"><input type="text" class="project-title" value="${res.name|| ''}" placeholder="项目名称"></div>
          <div class="form-label">项目编号:<sup>*</sup></div>
          <div class="form-input"><input type="text" class="project-number" value="${res.projectcode|| ''}" placeholder="项目编号"></div>
        </div>
      </div>
      <div class="dialog-footer">
        <span class="btn-default" id="delDialog">取消</span>
        <span class="btn-default btn-preserve" id="preserve">保存</span>
      </div>
    </div>
  </div> `);
  
  $html.find('.delDialog,#delDialog').click(function () {
    $('body').removeClass('coos-over-hidden')
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove()
    }else{
      $(this).parent().parent().parent().parent().remove()
    }
  })
  $html.find('#preserve').click(function () {
    let paramet = {
      name: $('.dialog-section .project-title').val(),
      projectcode: $('.dialog-section .project-number').val()
    }
    if (!paramet.name) {
      coos.box.info('项目名称不能为空');
      return;
    }
    if (!paramet.projectcode) {
      coos.box.info('项目编号不能为空');
      return;
    }
    if (res.projectid) {
      paramet.projectid = res.projectid
      var result =projectupdate(paramet)
      if (result.errcode == 10000) {
        coos.box.info(result.errmsg)
        return
      }
      $('body').removeClass('coos-over-hidden')
      $(this).parent().parent().parent().remove()
    } else {
      var result = insert(paramet)
      getTotalCount()
      if (result.errcode == 10000) {
        coos.box.info(result.errmsg)
        return
      }
      $('body').removeClass('coos-over-hidden')
      $(this).parent().parent().parent().remove()
      $('.Workbench-section .nav-links li').removeClass('active');
      $('.Workbench-section .nav-links li').eq(2).addClass('active')
    }
    getlist()
  })
  $("body").append($html);
}