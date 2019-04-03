'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = require('./server.js');
module.exports.taskList = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            action = 'task/alltask/taskList.do';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context.next = 6;
            return result;

          case 6:
            return _context.abrupt('return', _context.sent);

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function () {
    return _ref.apply(this, arguments);
  };
}();

module.exports.getTaskStatusList = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            action = 'task/alltask/getTaskStatusList.do';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context2.next = 6;
            return result;

          case 6:
            return _context2.abrupt('return', _context2.sent);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function () {
    return _ref2.apply(this, arguments);
  };
}();

module.exports.taskDifficulty = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            action = 'core/service/TASK_DIFFICULTY_LEVEL/queryList';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context3.next = 6;
            return result;

          case 6:
            return _context3.abrupt('return', _context3.sent);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function () {
    return _ref3.apply(this, arguments);
  };
}();

module.exports.getTaskTypeList = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            action = 'task/alltask/getTaskTypeList.do';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context4.next = 6;
            return result;

          case 6:
            return _context4.abrupt('return', _context4.sent);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function () {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.taskQuery = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            action = 'core/service/task/queryOne';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context5.next = 6;
            return result;

          case 6:
            return _context5.abrupt('return', _context5.sent);

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function () {
    return _ref5.apply(this, arguments);
  };
}();

module.exports.getUserList = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            action = 'task/alltask/getUserList.do';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context6.next = 6;
            return result;

          case 6:
            return _context6.abrupt('return', _context6.sent);

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function () {
    return _ref6.apply(this, arguments);
  };
}();

module.exports.insertOrUpdate = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            action = 'core/service/task/insertOrUpdate';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context7.next = 6;
            return result;

          case 6:
            return _context7.abrupt('return', _context7.sent);

          case 7:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function () {
    return _ref7.apply(this, arguments);
  };
}();

module.exports.needQueryOne = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            action = 'core/service/task_need/queryOne';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context8.next = 6;
            return result;

          case 6:
            return _context8.abrupt('return', _context8.sent);

          case 7:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));

  return function () {
    return _ref8.apply(this, arguments);
  };
}();

module.exports.deleteTask = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            action = 'core/service/task/delete';
            paramet = (0, _extends3.default)({ deletestatus: 1 }, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context9.next = 6;
            return result;

          case 6:
            return _context9.abrupt('return', _context9.sent);

          case 7:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function () {
    return _ref9.apply(this, arguments);
  };
}();

module.exports.queryPageList = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            action = 'core/service/task_process/queryPageList';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context10.next = 6;
            return result;

          case 6:
            return _context10.abrupt('return', _context10.sent);

          case 7:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function () {
    return _ref10.apply(this, arguments);
  };
}();

module.exports.processUpdate = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            action = 'core/service/task_process/insertOrUpdate';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context11.next = 6;
            return result;

          case 6:
            return _context11.abrupt('return', _context11.sent);

          case 7:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function () {
    return _ref11.apply(this, arguments);
  };
}();

module.exports.processQueryOne = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            action = 'core/service/task_process/queryOne';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context12.next = 6;
            return result;

          case 6:
            return _context12.abrupt('return', _context12.sent);

          case 7:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function () {
    return _ref12.apply(this, arguments);
  };
}();

module.exports.updateScore = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            action = 'core/service/task_need/updateScore';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context13.next = 6;
            return result;

          case 6:
            return _context13.abrupt('return', _context13.sent);

          case 7:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, this);
  }));

  return function () {
    return _ref13.apply(this, arguments);
  };
}();

module.exports.delProcess = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            action = 'core/service/task_process/delete';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context14.next = 6;
            return result;

          case 6:
            return _context14.abrupt('return', _context14.sent);

          case 7:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, this);
  }));

  return function () {
    return _ref14.apply(this, arguments);
  };
}();

module.exports.finish = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action, paramet, result;
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            action = 'task/need/finish.do';
            paramet = (0, _extends3.default)({}, data);
            result = '';

            api.POST(action, paramet, function (res) {
              result = res;
            }, true);
            _context15.next = 6;
            return result;

          case 6:
            return _context15.abrupt('return', _context15.sent);

          case 7:
          case 'end':
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));

  return function () {
    return _ref15.apply(this, arguments);
  };
}();