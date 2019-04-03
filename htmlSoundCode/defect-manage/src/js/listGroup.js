module.exports = function (data, state) {
  let dialog = require('./dialog.js');
  var layout = require('./layout.js');
  var { queryOne } = require('./api.js');
  let html = ''
  data.data.result.needs.forEach(el => {
    html += `
  <li>
    <div class="list-group-item" id="${el.needid}">
      <div class="item-title">
        <div>
          <div class="title-font">${el.needtitle}</div>
          <span class="item-state">${state}</span>
        </div>
        <div class="dropdown-defect">
          <i class="fa fa-chevron-down dropDown" style=""></i>
          <ul class="dropdown-menu dropdown-menu-right dropDownBox" style="display: none;">
            <li>
              <a href="#" class="addDefect"><i class="fa fa-pencil"></i>添加缺陷</a>
            </li>
            <li style="display: ${el.needid? '': 'none'};">
              <a target="_blank" href="${coos.basePath}task/need/toView.do?&amp;needid=${el.needid}"><i class="fa fa-eye"></i>查看需求</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="interior-list">`
      el.bugs.forEach(element =>{
        html += `
          <div class="interior-item" style="width: 100%;" id="${element.bugid}">
            <div class="interior-title">
              <span>${element.title}</span>
              <div>
                <span class="">${element.workhour|| 0}小时</span>
              </div>
            </div>
            <div class="interior-state">
              <span>${element.username}</span>
            </div>
            <div class="interior-time">
              <span>${element.plancompletetime? element.plancompletetime.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5"): ''}</span>
            </div>
          </div>
        `
      })
        
      html + `</div>
      </div>
    </li>`;
  });
  
  $('.list-group').html(html);
  $('.dropDown').click(function (e) {
    e.stopPropagation();
    $('.dropDownBox').hide();
    $(this).siblings('.dropDownBox').toggle();

  });
  $('.addDefect').click(function () {
    let $need = $(this).parent().parent().parent().parent().parent()
    let paramet = {
      needid: $need.attr('id'),
      task_need_title: $need.find('.item-title .title-font').text(),
      addDefect: true
    }
    console.log(paramet);
    dialog(paramet)
  })
  $('.interior-item').click(function () {
    let data = queryOne({bugid: $(this).attr('id')})
    dialog(data.result.model1.value)
  })
  layout()
}
