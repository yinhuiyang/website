module.exports =  function typeRadio($modal, typeid) {
  var data= require('./data.js');
  let $html = $(`
    <div class="dialog">
      <div class="dialog-content">
        <div class="dialog-header">
          <span>类型选择</span>
          <div style="display:flex">
            <span class="delDialog">×</span>
          </div>
        </div>
        <div class="dialog-section">
          <div class="dialog-form">
            <div class="dialog-radio">
              ${
                function () {
                  let radio = ''
                  data.taskType.forEach(el => {
                    radio += `<label>
                      <input type="radio" name="typeid" value="${el.tasktypeid}" data-label="${el.name}" ${typeid == el.tasktypeid? 'checked': ''}>
                      ${el.name}
                    </label>`
                  })
                  return radio
                }()
              }
            </div>
          </div>
        </div>
        <div class="dialog-footer">
          <span class="btn-default" id="delDialog">取消</span>
          <span class="btn-default btn-confirm" id="confirm">确定</span>
        </div>
      </div>
    </div>
  `)
  $html.find('.delDialog, #delDialog').click(function() {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove()
    }else{
      $(this).parent().parent().parent().parent().remove()
    }
  })
  $html.find('#confirm').click(function () {
    let $radio = $(this).parent().parent().parent()
    let typeid = $radio.find('input[name=typeid]:checked').val()
    let typeName = $radio.find('input[name=typeid]:checked').attr('data-label')
    // console.log(typeid, typeName)
    $modal.find('#typeid > span').text(typeName)
    $modal.find('#typeid > span').attr('value', typeid)
    $radio.remove()
  })
  $('body').append($html);
}
