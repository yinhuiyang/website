module.exports =  function () {
  var {getTotalCount} = require('./api.js')
  var res = getTotalCount().data.result
  $('.Workbench-section .nav-links li').each(function (i) {
    if (i == 0) {
      $(this).find('span').text(`(${res.favouriteCount})`)
    } else if (i == 1) {
      $(this).find('span').text(`(${res.participationCount})`)
    }else if (i == 2) {
      $(this).find('span').text(`(${res.createCount})`)
    }
    
  })
}