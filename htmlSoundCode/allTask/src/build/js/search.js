'use strict';

module.exports = {
  index: -1,
  init: function init($html) {
    this.select($html);
    this.click($html);
  },
  select: function select($html) {
    var _this = this;
    $html.find('.input').keydown(function (e) {
      var $li = $(this).parent().parent().find('.input-search li');
      if (e.keyCode == 38) {
        if (_this.index < 0) {
          _this.index = $li.length - 1;
        } else {
          _this.index--;
        }
        $li.removeClass('active');
        $li.eq(_this.index).addClass('active');
      }
      if (e.keyCode == 40) {
        if (_this.index > $li.length - 1) {
          _this.index = 0;
        } else {
          _this.index++;
        }
        $li.removeClass('active');
        $li.eq(_this.index).addClass('active');
      }
      if (e.keyCode == 13) {
        console.log(e.target.id);
        $li.eq(_this.index).click();
      }
    });
  },
  click: function click($html) {
    var _this = this;
    $html.find('.input-search ul').on('mouseover', 'li', function () {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');
      _this.index = $(this).index();
    });
    $html.find('.input-search ul').on('click', 'li', function (e) {
      e.stopPropagation();
      $(this).parent().parent().find('.input').attr({ 'name': $(this).attr('name'), 'value': $(this).text() });
      $(this).parent().parent().find('.input').val($(this).text());
      $(this).parent().parent().find('.input').text($(this).text());
      $('.input-search ul').hide();
    });
  }
};