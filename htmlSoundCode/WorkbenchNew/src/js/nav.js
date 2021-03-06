module.exports = function (getlist=function(){}) {
  let project = require('./project.js');
  let data = require('./data.js');
  $('.Workbench-section .nav-links li').click(function () {
    $('.Workbench-section .nav-links li').removeClass('active');
    $(this).addClass('active');
    $('.nav-controls .nameFiltering').val('');
    data.searchtitle = ''
    getlist($(this).find('a').text())
  })
  $('.Workbench-section .CreateProject a').click(function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden')
    project()
  })
  $('.Workbench-section .nameFiltering').keydown(function (e) {
    if (e.keyCode == 13) {
      data.searchtitle = $(this).val()
      if ($('.Workbench-section .nav-links li.active').find('a').text() == '所有参与项目') {
        data.allPage = 1
        data.pageView.pageIndex = 1
      }
      getlist()
    }
  })
}