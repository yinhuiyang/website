'use strict';

module.exports = function (res) {
  var project = require('./project.js');
  var getversion = require('./getversion.js');
  var version = require('./version.js');
  var authorize = require('./authorize.js');

  var _require = require('./api.js'),
      projectQueryOne = _require.projectQueryOne,
      versionQueryOne = _require.versionQueryOne,
      addFavourite = _require.addFavourite,
      delFavourite = _require.delFavourite,
      delversion = _require.delversion,
      queryAuthGroup = _require.queryAuthGroup,
      projectdelete = _require.projectdelete;

  var getlist = require('./getlist.js');
  var getTotalCount = require('./getTotalCount.js');
  var html = '';
  res.data.result.projects.forEach(function (el, index) {
    html += '\n  <div class="project-item">\n    <div class="number">\n      <span>' + (index + 1) + '</span>\n    </div>\n    <div class="item-right">\n      <div class="item-title">' + (el.projectname || el.name || '') + ' | ' + el.projectcode + '</div>\n     <!--<div class="item-illustrate">\u9879\u76EE\u8BF4\u660E\u9879\u76EE\u8BF4\u660E\u9879\u76EE\u8BF4\u660E\u9879\u76EE\u8BF4\u660E</div> -->\n      <div class="version">\n        <ul class="version-list">\n          ' + getversion(2, el.versions, res.data.result.showAddVersionButton, el.projectname || el.name || '') + '\n        </ul>\n        <div class="version-manage">\n          ' + ($('.Workbench-section .nav-links li.active').find('a').text() == "星标项目" || el.favouriteid ? '<a class="a-link delFavourite" data-favouriteid="' + el.favouriteid + '"><i class="fa fa-star"></i></a>' : '<a class="a-link addFavourite" data-projectid="' + el.projectid + '"><i class="fa fa-star-o"></i></a>') + '\n          <a class="a-link project-pencil" \n            data-projectid="' + el.projectid + '" \n            ' + (res.data.result.showAddPojectButton == '1' && $('.Workbench-section .nav-links li.active').find('a').text() == "我创建的" ? '' : 'style="display: none;"') + '>\n            <i class="fa fa-pencil"></i>\n          </a>\n          <a class="a-link projectDel"\n          data-projectid="' + el.projectid + '" \n          data-projectname="' + (el.projectname || el.name || '') + '"\n          ' + (res.data.result.showAddPojectButton == '1' && $('.Workbench-section .nav-links li.active').find('a').text() == "我创建的" ? '' : 'style="display: none;"') + '><i class="fa fa-trash-o"></i></a>\n          <a class="addPower" \n            data-projectid="' + el.projectid + '" \n            ' + (res.data.result.showAddPojectButton == '1' && $('.Workbench-section .nav-links li.active').find('a').text() == "我创建的" ? '' : 'style="display: none;"') + '>\n            \u6388\u6743\n          </a>\n          <a class="addversion" data-projectid="' + el.projectid + '" ' + (res.data.result.showAddVersionButton == '1' ? '' : 'style="display: none;"') + '>\u6DFB\u52A0\u7248\u672C</a>\n        </div>\n      </div>\n      <div class="open" ' + (el.versions.length > 2 ? '' : 'style="display: none;"') + '>\n        <a data-obj=\'' + JSON.stringify(el.versions) + '\' class="openMore">\u5C55\u5F00\u66F4\u591A</a>\n      </div>\n    </div>\n  </div>';
  });
  if (!res.data.result.projects.length) {
    html = '<div class="projects0">\u6682\u65E0\u9879\u76EE</div>';
  }
  $('.Workbench .list').html(html);
  $('.openMore').click(function (e) {
    e.preventDefault();
    // console.log($(this).attr('data-obj'))
    var versions = JSON.parse($(this).attr('data-obj'));
    var name = $(this).parent().parent().find('.item-title').text();
    if ($(this).text() == '展开更多') {
      $(this).text('收起更多');
      $(this).parent().parent().find('.version-list').html(getversion(0, versions, res.data.result.showAddVersionButton, name));
    } else {
      $(this).text('展开更多');
      $(this).parent().parent().find('.version-list').html(getversion(2, versions, res.data.result.showAddVersionButton, name));
    }
  });
  $('.project-item .project-pencil').click(function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden');
    var projectdata = projectQueryOne({ projectid: $(this).attr('data-projectid') });
    project(projectdata.result.data.value);
  });
  $('.version .addversion').click(function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden');
    version({ projectid: $(this).attr('data-projectid') });
  });
  $('.version .addPower').click(function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden');
    var res = queryAuthGroup({ projectid: $(this).attr('data-projectid') }).result;
    res.projectid = $(this).attr('data-projectid');
    authorize(res);
  });
  $('.version-list').on('click', '.version-pencil', function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden');
    var paramet = {
      versionid: $(this).attr('data-versionid')
    };
    var res = versionQueryOne(paramet).result.data.value;
    res.versionid = paramet.versionid;
    version(res);
  });
  $('.version-manage').on('click', '.projectDel', function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden');
    var paramet = {
      projectid: $(this).attr('data-projectid')
    };
    var projectname = $(this).attr('data-projectname');
    coos.box.confirm('\u662F\u5426\u5220\u9664\u201C' + projectname + '\u201D\u9879\u76EE', function () {
      var res = projectdelete(paramet);
      if (res.errcode == 20001) {
        coos.box.confirm('\u5F53\u524D\u6570\u636E\u5728\u9700\u6C42\u8868\u6709\u5173\u8054\u6570\u636E, \u662F\u5426\u786E\u5B9A\u5220\u9664\uFF1F', function () {
          paramet.forciblyremove = true;
          projectdelete(paramet);
          getlist();
          getTotalCount();
          $('body').removeClass('coos-over-hidden');
        });
      } else {
        getlist();
        getTotalCount();
        $('body').removeClass('coos-over-hidden');
      }
    });
  });
  $('.version-list').on('click', '.versionDel', function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden');
    var paramet = {
      versionid: $(this).attr('data-versionid')
    };
    coos.box.confirm('\u662F\u5426\u5220\u9664' + $(this).attr('data-versionname') + '\u7248\u672C', function () {
      var res = delversion(paramet);
      if (res.errcode == 20001) {
        coos.box.confirm('\u5F53\u524D\u6570\u636E\u5728\u9700\u6C42\u8868\u6709\u5173\u8054\u6570\u636E, \u662F\u5426\u786E\u5B9A\u5220\u9664\uFF1F', function () {
          paramet.forciblyremove = true;
          delversion(paramet);
          getlist();
          $('body').removeClass('coos-over-hidden');
        });
      } else {
        getlist();
        $('body').removeClass('coos-over-hidden');
      }
    });
  });
  $('.version-manage').on('click', '.addFavourite', function () {
    var projectid = $(this).attr('data-projectid');
    addFavourite({ projectid: projectid });
    getlist();
    getTotalCount();
  });
  $('.version-manage').on('click', '.delFavourite', function () {
    var favouriteid = $(this).attr('data-favouriteid');
    delFavourite({ favouriteid: favouriteid });
    getlist();
    getTotalCount();
  });
};