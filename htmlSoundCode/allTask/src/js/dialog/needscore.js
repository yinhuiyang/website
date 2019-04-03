module.exports = function needscore({score, needid, li, $ul, scorecomment}) {
  var { updateScore} = require('./api.js');
  let $html = $(`<div class="task-dialog">
    <div class="task-content">
      <div class="task-title">
        <span>评分意见</span>
        <div style="display:flex">
          <span class="delDialog scoreDialog">×</span>
        </div>
      </div>
      <div class="task-section">
        <div class="need-scorecomment">
          <span>评分意见:</span>
          <textarea class="form-control" id="needscorecomment" placeholder="评分意见">${scorecomment||''}</textarea>
        </div>
      </div>
      <div class="task-footer">
        <span class="btn-default scoreDialog">取消</span>
        <span class="btn-default btn-preserve scorePreserve">保存</span>
      </div>
    </div>
  </div>`)
  $html.find('.scoreDialog').click(function () {
    if ($(this).text() == '取消') {
      $(this).parent().parent().parent().remove()
    }else{
      $(this).parent().parent().parent().parent().remove()
    }
  })
  $html.find('.scorePreserve').click(function () {
    let $dialog = $(this).parent().parent().parent()
    var paramet = {
      needid: needid,
      score: score,
      scorecomment: $dialog.find('#needscorecomment').val()
    }
    if(!paramet.scorecomment) {
      coos.box.info('评分意见不能为空');
      return;
    }
    updateScore(paramet).then(res => {
      $ul.html(li)
      $dialog.remove()
    })
  })
  $('body').append($html)
}