'use strict';

module.exports = function ($html) {
  var score = {
    _set: 0,
    _get: 0
  };
  Object.defineProperty(score, '_set', {
    get: function get() {
      return this._get;
    },
    set: function set(value) {
      this._get = value;
      var ul = '<ul class="score-ul" value="' + this._get + '">';
      for (var i = 0; i < 5; i++) {
        ul += '<li><i class="fa fa-star ' + (i < this._get ? 'color' : '') + '"></i></li>';
      }
      ul += '</ul>';
      $html.find('.score-list').html(ul);
      if (this._get != 3) {
        $html.find('.opinion-row').show();
      } else {
        $html.find('.opinion-row').hide();
      }
    }
  });
  return score;
};