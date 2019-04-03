'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var _require, taskList, list, data, paramet;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _require = require('./api.js'), taskList = _require.taskList;
            list = require('./list.js');
            data = require('./data.js');
            paramet = {
              status: '',
              my: data.myState[$('.task-manage .nav li.active a').text()]
            };
            _context.t0 = $('.task-manage .nav li.active a').text();
            _context.next = _context.t0 === '规划中' ? 7 : _context.t0 === '启动' ? 9 : _context.t0 === '进行中' ? 11 : _context.t0 === '完成' ? 13 : _context.t0 === '上线' ? 15 : 17;
            break;

          case 7:
            paramet.status = '0';
            return _context.abrupt('break', 18);

          case 9:
            paramet.status = '1';
            return _context.abrupt('break', 18);

          case 11:
            paramet.status = '2';
            return _context.abrupt('break', 18);

          case 13:
            paramet.status = '8';
            return _context.abrupt('break', 18);

          case 15:
            paramet.status = '9';
            return _context.abrupt('break', 18);

          case 17:
            paramet.status = '';

          case 18:
            _context.next = 20;
            return taskList(paramet).then(function (res) {
              list(res, $('.task-manage .nav li.active a').text());
            });

          case 20:
            return _context.abrupt('return', _context.sent);

          case 21:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function getList() {
    return _ref.apply(this, arguments);
  }

  return getList;
}();