module.exports = function load() {
  var data = require('./data.js');
  var getList= require('./getList.js');
  return {
    init() {
      let obj = this.getparameter()
      if (obj.needid){
        $('.nav-task li').removeClass('active')
        $(`.nav-task li[value= ${obj.status|| -1}]`).addClass('active')
        $('.my-btn').removeClass('active')
        $('.my-all').addClass('active')
        data.myState[$('.nav-task li.active a').text()] = 0
      }
      if ((obj.status|| obj.status == '')&&obj.my){
        $('.nav-task li').removeClass('active')
        $('.nav-task li[value= '+obj.status+']').addClass('active')
        $('.my-btn').removeClass('active')
        let status = $('.nav-task li.active a').text() 
        if (obj.my == '1') {
          $('.my-condition .my-my').addClass('active')
        } else if(obj.my == '2') {
          $('.my-condition .my-assign').addClass('active')
        }else{
          $('.my-condition .my-all').addClass('active')
        }
        data.myState[status] = obj.my
      }
      let _this = this
      setTimeout(async function () {
        await getList()
        _this.getneed(obj)
      }, 500)
    },
    getneed (obj) {
      if (!obj.needid) return;
      $('#'+obj.needid).parent().css('boxShadow', '0px 0px 20px #f96900')
      let top = parseFloat($('#'+obj.needid).parent().css('top'))
      top = top+$('.list')[0].offsetTop
      $(window).scrollTop(top)
      // let needTitle = $('#'+obj.needid).find('.item-title .title-font').text()
      // this.taskQuery(obj.taskid, needTitle)
    },
    getparameter () {
      let obj={}
      let status = this.getQueryString('status')
      let needid = this.getQueryString('needid')
      let my = this.getQueryString('my')
      status|| status== ''?obj.status = status: '';
      needid? obj.needid = needid: '';
      my? obj.my = my: '';
      return obj
    },
    getQueryString(name) { 
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
      var r = window.location.search.substr(1).match(reg); 
      if (r != null) return unescape(r[2]); 
      return null; 
    }
  }
}