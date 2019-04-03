module.exports = function () {
  var data= require('./data.js');
  var getList = require('./getList.js');
  $('.task-manage .nav-task li a').click(function (e) {
    e.preventDefault()
    $('.task-manage .nav-task li').removeClass('active')
    $('.task-manage .my-condition .my-btn').removeClass('active')
    $(this).parent().addClass('active')
    let status = $(this).text()
    if (data.myState[status] == '1') {
      $('.task-manage .my-condition .my-my').addClass('active')
    } else if(data.myState[status] == '2') {
      $('.task-manage .my-condition .my-assign').addClass('active')
    }else{
      $('.task-manage .my-condition .my-all').addClass('active')
    }
    history.replaceState({},'',`?status=${$(this).parent().attr('value')||''}&my=${data.myState[status]}`)
    getList()
  })
  $('.task-manage .my-condition .my-btn span').click(function(){
    $('.task-manage .my-condition .my-btn').removeClass('active')
    $(this).parent().addClass('active')
    let status = $('.task-manage .nav-task li.active a').text()
    data.myState[status] = $(this).attr('value')
    history.replaceState({},'',`?status=${$('.task-manage .nav-task li.active').attr('value')||''}&my=${data.myState[status]}`)
    getList()
  })
}