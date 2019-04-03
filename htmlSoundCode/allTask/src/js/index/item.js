module.exports = function item(result = []) {
  var getTime = require('./getTime.js');
  let html = '';
  result.forEach(el => {
    html += `
    <div class="task-item" id="${el.taskid}">
      <div class="task-title">
        <span>${el.title}</span>
        <div>
          <span class="">${el.allworkhour||'0'}小时</span>
          <span class="">${el.currentprocess||'0'}%</span>
        </div>
      </div>
      <div class="task-state">
        <div class="task-score" ${el.currentprocess == 100 ?"": `style="display: none;"`}>
          <ul>
          ${function (el) {
              let li = ''
              if(!el.score) el.score = 3;
              for(let i = 0; i< el.score; i++) {
                li += `<li><i class="fa fa-star"></i></li>`
              }
              return li
            }(el)
          }
          </ul>
        </div>
        <span>${el.trustusername||''}</span>
      </div>
    <div class="task-time">
      <span>${getTime(el.planstarttime)} -- ${getTime(el.planendtime)}</span>
    </div>
  </div>` 
  });
  if(!result.length){
    html = `<div class="task-item">
    <div class="task-title">
      <span>暂无任务</span>
      <div>
        <span class="">0小时</span>
        <span class="">0%</span>
      </div>
    </div>
    <div class="task-state">
    </div>
  <div class="task-time">
  </div>
</div>`
  }
return html;
}