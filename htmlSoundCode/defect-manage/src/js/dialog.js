module.exports = (result = {}) => {
  let select = require('./select.js');
  let assist = require('./assist.js');
  var getneedList = require('./getneedList.js');
  var search = require('./search.js');
  var data= require('./data.js');
  var { getUserList, bugDelete, bugEditSave, bugAddSave, assistQueryOne } = require('./api.js');
  var getlist = require('./getlist.js');
  var assistList = require('./assistList.js');
  let $html = $(`
  <div class="defect-dialog">
    <div class="defect-content">
      <div class="defect-title">
        <div class="need-select input-search">
          <div class="getNeed input" contenteditable="${result.addDefect?'true': 'false'}" name="${result.needid|| ''}">${result.task_need_title|| '需求搜索并选择'}</div>
          <ul class="needList" style="display:none">
            <li value="" class="active">任务合一之后的统计修改</li>
          </ul>
        </div>
        <div style="display:flex">
          <div class="menuDown" id="menuDown" style="display: ${result.addDefect? 'none': ''};">
            <i class="fa fa-angle-down"></i>
            <ul class="menuList" style="display: none;">
              <li class="delDefect">
                <i class="fa fa-trash-o"></i>
                <span>删除到回收站</span>
              </li>
            </ul>
          </div>
          <span class="delDialog deleteDialog">×</span>
        </div>
      </div>
      <div class="defect-section">
        <div class="defect-form">
          <div class="form-title">
            <div class="" contenteditable="true" data-bugid="${result.bugid|| ''}">${result.title|| '请填写缺陷标题'}</div>
          </div>
          <div class="form-message">
            <div class="defectStatus">
              <span value="${result.bugstatus|| ''}" index="${result.bugstatus|| ''}">${result.bugstatus?data.bugStatus[result.bugstatus]: '请选择'}</span>
              <i class="fa fa-angle-down"></i>
              <ul class="defectStatusList select-chaozuo" style="display: none;">
              ${
                function () {
                  let li = ''
                  for (let k in data.bugStatus){
                    li +=`<li value="${k}" class="${result.bugstatus == k?'active': ''}">${data.bugStatus[k]}</li>`
                  }
                  return li
                }()
              }
              </ul>
            </div>
            <div class="form-ascription input-search">
              <input type="text" id="ascription" placeholder="归属人" value="${result.ownusername|| ''}" name="${result.ownuserid||''}" class="input">
              <ul class="ascriptionList" style="display:none">
              </ul>
            </div>
            <div class="form-time">
              <i class="fa fa-calendar"></i>
              <input type="text" class="endTime" placeholder="计划完成时间" value="${result.plancompletetime? result.plancompletetime.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5"): ''}">
            </div>
          </div>
        <div class="form-illustrate">
          <div class="illustrate-row">
            <div>缺陷质级</div>
              <div>
                <div class="qualitylevel select-group">
                  <span title="${result.qualitylevel?data.qualityLevel[result.qualitylevel].description: ''}" value="${result.qualitylevel|| ''}" index="${result.qualitylevel|| ''}">${result.qualitylevel?data.qualityLevel[result.qualitylevel].name: '请选择'}</span>
                  <i class="fa fa-angle-down"></i>
                  <ul class="selectList select-chaozuo" style="display: none;width:550px;">
                  ${
                    function () {
                      let li = ''
                      for (let k in data.qualityLevel){
                        li += `<li value="${data.qualityLevel[k].value}" style="text-align:left;padding: 0px 5px;" class="${k == result.buglevel? 'active': ''}">${data.qualityLevel[k].name}<span style="">(${data.qualityLevel[k].description})</span></li>`
                      }
                      return li
                    }()
                  }
                  </ul>
                </div>
            </div>
        </div>
          <div class="illustrate-row">
           <div>缺陷优级</div>
          <div>
            <div class="prioritylevel select-group">
              <span title="${result.prioritylevel?data.priorityLevel[result.prioritylevel].description: ''}" value="${result.prioritylevel|| ''}" index="${result.prioritylevel|| ''}">${result.prioritylevel?data.priorityLevel[result.prioritylevel].name: '请选择'}</span>
              <i class="fa fa-angle-down"></i>
              <ul class="selectList select-chaozuo" style="display: none;width:550px;">
              ${
                function () {
                  let li = ''
                  for (let k in data.priorityLevel){
                    li += `<li style="text-align:left;padding: 0px 5px;" value="${data.priorityLevel[k].value}" class="${k == result.prioritylevel? 'active': ''}">${data.priorityLevel[k].name}<span style="">(${data.priorityLevel[k].description})</span></li>`
                  }
                  return li
                }()
              }
              </ul>
            </div>
          </div>
        </div>
            <!--<div class="illustrate-row">
              <div>缺陷等级</div>
              <div>
                <div class="buglevel select-group">
                  <span value="${result.buglevel|| ''}" index="${result.buglevel|| ''}">${result.buglevel?data.bugLevel[result.buglevel]: '请选择'}</span>
                  <i class="fa fa-angle-down"></i>
                  <ul class="selectList select-chaozuo" style="display: none;">
                    ${
                      function () {
                        let li = ''
                        for (let k in data.bugLevel){
                          li += `<li value="${k}" class="${k == result.buglevel? 'active': ''}">${data.bugLevel[k]}</li>`
                        }
                        return li
                      }()
                    }
                  </ul>
                </div>
              </div>
            </div>-->
            <div class="illustrate-row">
              <div>缺陷来源</div>
              <div>
                  <div class="bugsource select-group">
                    <span value="${result.bugsource|| ''}" index="${result.bugsource|| ''}">${result.bugsource?data.bugSource[result.bugsource]: '请选择'}</span>
                    <i class="fa fa-angle-down"></i>
                    <ul class="selectList select-chaozuo" style="display: none;">
                    ${
                      function () {
                        let li = ''
                        for (let k in data.bugSource){
                          li += `<li value="${k}" class="${k == result.bugsource? 'active': ''}">${data.bugSource[k]}</li>`
                        }
                        return li
                      }()
                    }
                    </ul>
                  </div>
              </div>
            </div>
            <div class="delFloat">
              <input label="图片" id="defect-image" value="${result.pic|| ''}" file-count="5" group-type="1" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="图片"> 
            </div>
            <div class="delFloat">
              <input label="文件" id="defect-file" group-type="1" value="${result.file|| ''}" class="input-rule-group input-rule-file" need-addon="true" placeholder="文件" file-count="5" cannull="true">
            </div>
            <div class="illustrate-row">
              <div style="margin-right: 60px;">描述</div>
              <textarea class="illustrate-font" id="defect-editor">${result.content|| ''}</textarea>
            </div>
          </div>
          <div class="form-assist" style="display: ${result.addDefect? 'none': ''};">
            <div class="assist-title">
              <i class="fa fa-list"></i>
              <span>协助列表</span>
            </div>
            <div class="assist-list">
            </div>
            <div class="assist-add">
              <i class="fa fa-plus-circle"></i>
              <span>协助</span>
            </div>
          </div>
        </div>
      </div>
      <div class="defect-footer">
        <span class="btn-default deleteDialog">取消</span>
        <span class="btn-default btn-preserve ${result.addDefect? "addDefectBtn":"preserveDialog"}">保存</span>
      </div>
    </div>
  </div>
  `)
  select.init(['.defectStatus', '.select-group'], $html)
  $html.find('.assist-add').click(function () {
    let $dialog = $(this).parent().parent().parent().parent().parent()
    let paramet = {
      bugid: $dialog.find('.form-title>div').attr('data-bugid'),
      dialog: $dialog
    }
    assist(paramet)
  })
  $html.find('.getNeed').on('keydown ',function (e) {
    if(e.keyCode !== 13) return;
    e.preventDefault()
    console.log($(this).text())
    getneedList({title: $(this).text()})
    let li=''
    data.needList.forEach(el => {
      li += `<li name="${el.needid}">${el.title}</li>`
    });
    $(this).siblings().html(li)
    $(this).siblings().show()
  })
  $html.find('#ascription').on('input', function () {
    var res = getUserList({username: $(this).val()});
    let li=''
    res.data.result.forEach(el => {
      li += ` <li name="${el.userid}">${el.username}</li>`
    })
    $(this).siblings().html(li);
    $(this).siblings().show();
  })
  search.init($html)
  let option={
    lang: 'ch', 
    step: 60,
    datepicker:true,
    timepicker:true,
    format:'Y-m-d H:i',
  }
  $html.find('.endTime').datetimepicker(option)
  $html.find('#menuDown > i').click(function (e) {
    e.stopPropagation();
    $(this).siblings().toggle()
  })
  $html.find('.deleteDialog').click(function () {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove()
    }else{
      $(this).parent().parent().parent().parent().remove()
    }
  })
  $html.find('.delDefect').click(function () {
    let $dialog = $(this).parent().parent().parent().parent().parent().parent();
    bugDelete({bugid: $dialog.find('.form-title > div').attr('data-bugid')})
    $dialog.remove()
    getlist()

  })
  $html.find('.form-title>div').blur(function () {
    if (!$(this).text()){
      $(this).text('请填写缺陷标题')
    }
  })
  $html.find('.form-title>div').focus(function () {
    if ($(this).text() === '请填写缺陷标题'){
      $(this).text('')
    }
  })
  $html.find('.getNeed').blur(function () {
    if (!$(this).text()){
      $(this).text('需求搜索并选择')
    }
  })
  $html.find('.getNeed').focus(function () {
    if ($(this).text() === '需求搜索并选择'){
      $(this).text('')
    }
  })
  $html.find('.preserveDialog').click(function () {
    let $dialog = $(this).parent().parent().parent()
    let paramet = {
      bugid: $dialog.find('.form-title>div').attr('data-bugid'),
      title: $dialog.find('.form-title>div').text(),
      bugstatus: $dialog.find('.defectStatus > span').attr('value'),
      // buglevel: $dialog.find('.buglevel > span').attr('value'),
      qualitylevel: $dialog.find('.qualitylevel > span').attr('value'),
      prioritylevel: $dialog.find('.prioritylevel > span').attr('value'),
      bugsource: $dialog.find('.bugsource > span').attr('value'),
      pic: $dialog.find('#defect-image').val(),
      file: $dialog.find('#defect-file').val(),
      content: $dialog.data('editor').getData(),
      plancompletetime: $dialog.find('.endTime').val(),
      ownuserid: $dialog.find('#ascription').attr('name')
    }
    if (paramet.qualitylevel == '') {
      coos.box.info('缺陷质级未选择');
      return;
    }
    if (paramet.prioritylevel == '') {
      coos.box.info('缺陷优先级未选择');
      return;
    }
    if (paramet.title == '请填写缺陷标题') {
      coos.box.info('缺陷标题不能为空');
      return;
    }
    if (paramet.title == '请填写缺陷标题') {
      coos.box.info('缺陷标题不能为空');
      return;
    }
    if (paramet.ownuserid == '') {
      coos.box.info('缺陷归属人不能为空');
      return;
    }
    if (paramet.plancompletetime == '') {
      coos.box.info('计划完成时间不能为空');
      return;
    }
    if (paramet.bugstatus == '') {
      coos.box.info('缺陷状态未选择');
      return;
    }
    // if (paramet.buglevel == '') {
    //   coos.box.info('缺陷等级未选择');
    //   return;
    // }
    if (paramet.bugsource == '') {
      coos.box.info('缺陷来源未选择');
      return;
    }
    let age = /[^(<p>(( )*&nbsp;)+<\/p>)]/ig
    if (paramet.content == ''|| !age.test(paramet.content)) {
      coos.box.info('缺陷描述不能为空');
      return;
    }
    if (bugEditSave(paramet).data.errmsg == '成功') {
      $dialog.remove();
      getlist()
    }
    // console.log(paramet)
  })
  $html.find('.addDefectBtn').click(function () {
    let $dialog = $(this).parent().parent().parent()
    let paramet = {
      needid: $dialog.find('.getNeed').attr('name'),
      title: $dialog.find('.form-title > div').text(),
      ownuserid: $dialog.find('#ascription').attr('name'),
      bugstatus: $dialog.find('.defectStatus > span').attr('value'),
      // buglevel: $dialog.find('.buglevel > span').attr('value'),
      qualitylevel: $dialog.find('.qualitylevel > span').attr('value'),
      prioritylevel: $dialog.find('.prioritylevel > span').attr('value'),
      bugsource: $dialog.find('.bugsource > span').attr('value'),
      plancompletetime: $dialog.find('.endTime').val(),
      pic: $dialog.find('#defect-image').val(),
      file: $dialog.find('#defect-file').val(),
      content: $dialog.data('editor').getData()
    }
    if (paramet.qualitylevel == '') {
      coos.box.info('缺陷质级未选择');
      return;
    }
    if (paramet.prioritylevel == '') {
      coos.box.info('缺陷优先级未选择');
      return;
    }
    if (paramet.title == '请填写缺陷标题') {
      coos.box.info('缺陷标题不能为空');
      return;
    }
    if (paramet.ownuserid == '') {
      coos.box.info('缺陷归属人不能为空');
      return;
    }
    if (paramet.plancompletetime == '') {
      coos.box.info('计划完成时间不能为空');
      return;
    }
    if (paramet.bugstatus == '') {
      coos.box.info('缺陷状态未选择');
      return;
    }
    // if (paramet.buglevel == '') {
    //   coos.box.info('缺陷等级未选择');
    //   return;
    // }
    if (paramet.bugsource == '') {
      coos.box.info('缺陷来源未选择');
      return;
    }
    let age = /[^(<p>(( )*&nbsp;)+<\/p>)]/ig
    if (paramet.content == ''|| !age.test(paramet.content)) {
      coos.box.info('缺陷描述不能为空');
      return;
    }
    if (bugAddSave(paramet).data.errmsg == '成功'){
      $dialog.remove();
      getlist()
    }
  })
  ClassicEditor
        .create( $html.find( '#defect-editor' )[0], {
          toolbar: [  'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ],
          language: 'zh-cn'
      } ).then(editor => {
        $html.data('editor', editor)
    })
    .catch( error => {
            console.error( error );
        } );
  assistList({bugid: result.bugid}, $html)
  $html.find('.assist-list').on('click', '.assist-item',function () {
    let paramet = assistQueryOne({processid: $(this).attr('data-assistid')}).result.model1.value
    paramet.dialog = $(this).parent().parent().parent().parent().parent().parent()
    assist(paramet)
  })
  $('body').append($html);
  coos.element.init('.defect-dialog');
}