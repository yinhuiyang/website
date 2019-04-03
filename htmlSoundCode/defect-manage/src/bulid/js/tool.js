'use strict';

module.exports = {
  baseURL: coos.basePath, // 'http://localhost:8000/api/',//  
  POST: function POST(action, data, callback, async, err, type) {
    var url = this.baseURL + action;
    async = async || false;
    if (async = 'true') {
      async = true;
    }
    if (async = 'false') {
      async = false;
    }
    type = type || 'json';
    $.ajax({
      url: url,
      data: data,
      type: 'post',
      dataType: type,
      async: async, // 异步请求
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
      beforeSend: function beforeSend() {},
      success: function success(o) {
        var fn = typeof callback === "function";
        if (callback && fn) {
          callback(o);
        }
      },
      complete: function complete(XMLHttpRequest, textStatus) {},
      error: function error(XMLHttpRequest, textStatus, errorThrown) {
        var fn = typeof err === "function";
        if (err && fn) {
          err(XMLHttpRequest, textStatus, errorThrown);
        }
      }
    });
  }
};