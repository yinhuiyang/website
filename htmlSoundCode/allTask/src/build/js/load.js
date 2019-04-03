'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function load() {
  var data = require('./data.js');
  var getList = require('./getList.js');
  return {
    init: function init() {
      var obj = this.getparameter();
      if (obj.needid) {
        $('.nav-task li').removeClass('active');
        $('.nav-task li[value= ' + (obj.status || -1) + ']').addClass('active');
        $('.my-btn').removeClass('active');
        $('.my-all').addClass('active');
        data.myState[$('.nav-task li.active a').text()] = 0;
      }
      if ((obj.status || obj.status == '') && obj.my) {
        $('.nav-task li').removeClass('active');
        $('.nav-task li[value= ' + obj.status + ']').addClass('active');
        $('.my-btn').removeClass('active');
        var status = $('.nav-task li.active a').text();
        if (obj.my == '1') {
          $('.my-condition .my-my').addClass('active');
        } else if (obj.my == '2') {
          $('.my-condition .my-assign').addClass('active');
        } else {
          $('.my-condition .my-all').addClass('active');
        }
        data.myState[status] = obj.my;
      }
      var _this = this;
      setTimeout((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return getList();

              case 2:
                _this.getneed(obj);

              case 3:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      })), 500);
    },
    getneed: function getneed(obj) {
      if (!obj.needid) return;
      $('#' + obj.needid).parent().css('boxShadow', '0px 0px 20px #f96900');
      var top = parseFloat($('#' + obj.needid).parent().css('top'));
      top = top + $('.list')[0].offsetTop;
      $(window).scrollTop(top);
      // let needTitle = $('#'+obj.needid).find('.item-title .title-font').text()
      // this.taskQuery(obj.taskid, needTitle)
    },
    getparameter: function getparameter() {
      var obj = {};
      var status = this.getQueryString('status');
      var needid = this.getQueryString('needid');
      var my = this.getQueryString('my');
      status || status == '' ? obj.status = status : '';
      needid ? obj.needid = needid : '';
      my ? obj.my = my : '';
      return obj;
    },
    getQueryString: function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]);
      return null;
    }
  };
};