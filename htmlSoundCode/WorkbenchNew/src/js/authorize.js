module.exports = function (res = {}) {
  var data = require('./data.js')
  var {updateAuthGroup}= require('./api.js')
  let $html= $(`
  <div class="Workbench-dialog">
    <div class="dialog-content">
      <div class="dialog-title">
        <span>授权</span>
        <div style="display:flex">
          <span class="delDialog">×</span>
        </div>
      </div>
      <div class="dialog-section">
        <div class="dialog-form">
          <div class="addAuth"></div>
        </div>
      </div>
      <div class="dialog-footer">
        <span class="btn-default" id="delDialog">取消</span>
        <span class="btn-default btn-preserve" id="preserve">保存</span>
      </div>
    </div>
  </div>`);
  var TreeConfig = {}
  TreeConfig.checkedIds = []
  $(res.checkeddata.value).each(function (index, checkedids) {
    TreeConfig.checkedIds[TreeConfig.checkedIds.length] = checkedids.groupid
  })
  TreeConfig.property = {
    id : "groupid",
    parentid : "parentid",
    text : "name"
  };
  TreeConfig.openHalfCheck = true;
  TreeConfig.hasCheckbox = true;
  TreeConfig.datas = res.list.value;
  TreeConfig.treeUlHeight = "auto";
  TreeConfig.content = $html.find('.addAuth');
  data.TreeConfig = coos.tree(TreeConfig);
  $html.find('.delDialog, #delDialog').click(function () {
    $('body').removeClass('coos-over-hidden')
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove()
    }else{
      $(this).parent().parent().parent().parent().remove()
    }
  })
  $html.find('.btn-preserve').click(function () {
    let CheckedDatas = data.TreeConfig.getCheckedDatas()
    let paramet = {
      group_checkeddatastr: JSON.stringify(CheckedDatas.checkedDatas),
      group_checkeddeletedatastr: JSON.stringify(CheckedDatas.checkedDeleteDatas),
      projectid: res.projectid
    }
    // console.log(paramet)
    $('body').removeClass('coos-over-hidden')
    updateAuthGroup(paramet)
    $(this).parent().parent().parent().remove()
  })
  $('body').append($html)
}