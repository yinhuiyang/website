module.exports = function layout() {
		var colNum = 3
    var colSumHeight = [];
    // if ($('.list').width() <= 700) {
    //   colNum = 1
    // } else if ($('.list').width() > 700 && $('.list').width() <= 1050){
    //   colNum = 2
    // } else if($('.list').width() > 1050 && $('.list').width() <= 1400){
    //   colNum = 3
    // } else if($('.list').width() > 1400) {
    //   colNum = 4
    // }($('.list').width()/colNum-40)+'px'
    let taskWidth = 100/3+'%' 
    // $('.task-item').css('width', 'calc('+this.data.taskWidth+' - 40px)')
    $('.list > li').css('width', 'calc('+taskWidth+' - 20px)')
    $('.task-item').css('width', '100%')
    // $('.title-font').css({'maxWidth': 'calc(100% - 65px)'})
    var nodeWidth = $(".list>li").outerWidth(true)
		for (var i=0;i<colNum;i++) {
			colSumHeight.push(0);
    }
    $(".list>li").each(function(){
      var $cur = $(this),
        idx = 0,
        minSumHeight = colSumHeight[0];

      // 获取到solSumHeight中的最小高度
      for (var i=0;i<colSumHeight.length;i++) {
        if (minSumHeight > colSumHeight[i]) {
          minSumHeight = colSumHeight[i];
          idx = i;
        }
      }

      // 设置各个item的css属性
      $cur.css({
        left: nodeWidth*idx,
        top: minSumHeight
      })

      // 更新solSumHeight
      colSumHeight[idx] = colSumHeight[idx] + $cur.outerHeight(true);
    })
    let maxSumHeight = 0
    for (var i=0;i<colSumHeight.length;i++) {
      if (maxSumHeight < colSumHeight[i]) {
        maxSumHeight = colSumHeight[i];
      }
    }
    $('.list').css({'height': maxSumHeight+'px'})
    $(window).off('resize').on("resize", function(){
      layout()
		})
}
