module.exports = function (paramet) {
  var { queryVersionList } = require('./api.js');
  var data = require('./data.js');
  data.needList = queryVersionList(paramet).result.data.value;
  console.log(data.needList)
}