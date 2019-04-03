'use strict';

module.exports = function (type, versions, showAddVersionButton, name) {
  var getTime = require('./getTime.js');
  var getstatus = require('./getstatus.js');
  var li = '';
  var num = 2;
  type == 2 && versions.length > 2 ? num = 2 : num = versions.length;
  for (var i = 0; i < num; i++) {
    li += '<li>\n      <div>\n        <a class="version-number" href="toVersion.do?versionid=' + versions[i].versionid + '">' + versions[i].title + '</a>\n        <span class="time">' + getTime(versions[i].planonlinetime) + '</span>\n        <span class="status ' + (versions[i].status == '8' || versions[i].status == '9' ? 'coos-green' : '') + '" >' + getstatus(versions[i].status) + '</span>\n        <a class="a-link version-pencil" data-versionid="' + versions[i].versionid + '" ' + (showAddVersionButton == '1' ? '' : 'style="display: none;"') + '><i class="fa fa-pencil"></i></a>\n        <a class="a-link versionDel" \n        data-versionid="' + versions[i].versionid + '"\n        data-versionname="' + (name + '' + versions[i].title) + '"\n        ' + (showAddVersionButton == '1' ? '' : 'style="display: none;"') + '><i class="fa fa-trash-o"></i></a>\n      </div>\n    </li>';
  }
  return li;
};