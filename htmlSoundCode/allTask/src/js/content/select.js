module.exports = {
  dom: '',
  index: 0,
  init(doms,$html) {
    doms.forEach(el => {
      this.listShow($html.find(el));
      if (el == '#typeid'){
        this.typeLiClick($html.find(el).find('li'));
      }else{
        this.liClick($html.find(el).find('li'));
      }
    })
    this.getkeyup()
  },
  listShow (dom) {
    let _this = this
    dom.click(function (e) {
      e.stopPropagation()
      if ($(this).find('.select_task').css('display') !== 'none') {
        $('.select_task').hide()
        _this.dom =  ''
      } else{
        $('.select_task').hide()
        $(this).find('.select_task').toggle()
        _this.dom =  this
        $(_this.dom).find('li').removeClass('active')
        let j= parseInt($(_this.dom).find('span').attr('index'))
        _this.index = j
        $(_this.dom).find('li').eq(_this.index).addClass('active')
      }
    })
    dom.find('li').mouseover(function () {
      $(this).siblings().removeClass('active')
      $(this).addClass('active')
      _this.index = $(this).index()
    })
    // $(dom+' ul li').click(function (e) {
    //   e.stopPropagation()
    //   $(this).parent().parent().find('span').text($(this).text())
    //   $(this).parent().parent().find('span').attr({'value': $(this).attr('value'), 'index': _this.index})
    //   $(this).parent().hide()
    // })
  },
  liClick($li) {
    let _this = this
    $li.click(function (e) {
      e.stopPropagation()
      _this.index = $(this).index()
      $(this).parent().parent().find('span').attr({
        'value': $(this).attr('value'),
        'index': $(this).index()
      })
      $(this).parent().parent().find('span').text($(this).text())
      $(this).parent().hide()
      // console.log($(this).parent()[0])
    })
  },
  typeLiClick($li) {
    let _this = this
    $li.click(function (e) {
      e.stopPropagation()
      _this.index = $(this).index()
      $(this).parent().parent().parent().find('span').attr({
        'value': $(this).attr('value'),
        'index': $(this).index()
      })
      $(this).parent().parent().parent().find('span').text($(this).text())
      $(this).parent().parent().hide()
      // console.log($(this).parent()[0])
    })
  },
  getkeyup () {
    let _this = this;
    $(document).keydown(function (e) {
      let $li = $(_this.dom).find('li')
      if (e.keyCode == 38){
        if (_this.index<0) {
          _this.index = $li.length-1
          $li.removeClass('active')
          $li.eq(_this.index).addClass('active')
        } else {
          _this.index --
          $li.removeClass('active')
          $li.eq(_this.index).addClass('active')
        }
        return false
      }
      if(e.keyCode == 40){
        if(_this.index > $li.length-1) {
          _this.index = 0
          $li.removeClass('active')
          $li.eq(_this.index).addClass('active')
        }else {
          _this.index ++
          $li.removeClass('active')
          $li.eq(_this.index).addClass('active')
        }
        return false
      }
      if(e.keyCode == 13) {
        if($li.eq(_this.index).attr('class') == 'active'){
          // $(_this.dom).find('span').text($li.eq(_this.index).text())
          // $(_this.dom).find('span').attr({'value': $li.eq(_this.index).attr('value'), 'index': _this.index})
          // $(_this.dom).find('ul').hide()
          if(e.target.id != 'personLiable'){
            $li.eq(_this.index).click()
          }
        }
      }
    })

  }
}
