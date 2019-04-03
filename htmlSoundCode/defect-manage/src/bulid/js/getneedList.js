'use strict';

module.exports = function (paramet) {
  var _require = require('./api.js'),
      queryVersionList = _require.queryVersionList;

  var data = require('./data.js');
  data.needList = queryVersionList(paramet).result.data.value;
  console.log(data.needList);
};