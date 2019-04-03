module.exports = function (res) {
  let project = require('./project.js');
  var getversion =require('./getversion.js');
  var version = require('./version.js')
  var authorize = require('./authorize.js');
  var {projectQueryOne, versionQueryOne, addFavourite, delFavourite, delversion, queryAuthGroup, projectdelete} = require('./api.js');
  let getlist = require('./getlist.js');
  var getTotalCount=require('./getTotalCount.js')
  let html = ''
  res.data.result.projects.forEach((el, index) => {
    html += `
  <div class="project-item">
    <div class="number">
      <span>${index+1}</span>
    </div>
    <div class="item-right">
      <div class="item-title">${el.projectname||el.name|| ''} | ${el.projectcode}</div>
     <!--<div class="item-illustrate">项目说明项目说明项目说明项目说明</div> -->
      <div class="version">
        <ul class="version-list">
          ${
            getversion(2, el.versions, res.data.result.showAddVersionButton, el.projectname||el.name|| '')
          }
        </ul>
        <div class="version-manage">
          ${
            $('.Workbench-section .nav-links li.active').find('a').text()=="星标项目"||el.favouriteid? 
            `<a class="a-link delFavourite" data-favouriteid="${el.favouriteid}"><i class="fa fa-star"></i></a>`:
            `<a class="a-link addFavourite" data-projectid="${el.projectid}"><i class="fa fa-star-o"></i></a>`
          }
          <a class="a-link project-pencil" 
            data-projectid="${el.projectid}" 
            ${res.data.result.showAddPojectButton == '1'&& $('.Workbench-section .nav-links li.active').find('a').text()=="我创建的"? '': 'style="display: none;"'}>
            <i class="fa fa-pencil"></i>
          </a>
          <a class="a-link projectDel"
          data-projectid="${el.projectid}" 
          data-projectname="${el.projectname||el.name|| ''}"
          ${res.data.result.showAddPojectButton == '1'&& $('.Workbench-section .nav-links li.active').find('a').text()=="我创建的"? '': 'style="display: none;"'}><i class="fa fa-trash-o"></i></a>
          <a class="addPower" 
            data-projectid="${el.projectid}" 
            ${res.data.result.showAddPojectButton == '1' && $('.Workbench-section .nav-links li.active').find('a').text()=="我创建的"? '': 'style="display: none;"'}>
            授权
          </a>
          <a class="addversion" data-projectid="${el.projectid}" ${res.data.result.showAddVersionButton == '1' ? '': 'style="display: none;"'}>添加版本</a>
        </div>
      </div>
      <div class="open" ${el.versions.length > 2 ? '': 'style="display: none;"'}>
        <a data-obj='${JSON.stringify(el.versions)}' class="openMore">展开更多</a>
      </div>
    </div>
  </div>`
  });
  if (!res.data.result.projects.length){
    html = `<div class="projects0">暂无项目</div>`
  }
  $('.Workbench .list').html(html)
  $('.openMore').click(function (e) {
    e.preventDefault();
    // console.log($(this).attr('data-obj'))
    let versions = JSON.parse($(this).attr('data-obj'))
    let name = $(this).parent().parent().find('.item-title').text()
    if ($(this).text() == '展开更多') {
      $(this).text('收起更多');
      $(this).parent().parent().find('.version-list').html(getversion(0, versions, res.data.result.showAddVersionButton, name))
    } else {
      $(this).text('展开更多');
      $(this).parent().parent().find('.version-list').html(getversion(2, versions, res.data.result.showAddVersionButton, name))
    }
    
  })
  $('.project-item .project-pencil').click(function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden')
    let projectdata = projectQueryOne({projectid: $(this).attr('data-projectid')})
    project(projectdata.result.data.value)
  })
  $('.version .addversion').click(function(e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden')
    version({projectid: $(this).attr('data-projectid')})
  })
  $('.version .addPower').click(function(e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden')
    var res = queryAuthGroup({projectid: $(this).attr('data-projectid')}).result
    res.projectid = $(this).attr('data-projectid')
    authorize(res)
  })
  $('.version-list').on('click', '.version-pencil', function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden')
    let paramet = {
      versionid: $(this).attr('data-versionid')
    }
    let res = versionQueryOne(paramet).result.data.value
    res.versionid = paramet.versionid
    version(res)
  })
  $('.version-manage').on('click', '.projectDel', function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden')
    let paramet = {
      projectid: $(this).attr('data-projectid')
    }
    let projectname = $(this).attr('data-projectname')
    coos.box.confirm(`是否删除“${projectname}”项目`, function () {
      let res = projectdelete(paramet)
      if (res.errcode == 20001) {
        coos.box.confirm(`当前数据在需求表有关联数据, 是否确定删除？`, function () {
          paramet.forciblyremove = true
          projectdelete(paramet)
          getlist()
          getTotalCount()
          $('body').removeClass('coos-over-hidden')
        })
      } else {
        getlist()
        getTotalCount()
        $('body').removeClass('coos-over-hidden')
      }
    })
  })
  $('.version-list').on('click', '.versionDel', function (e) {
    e.preventDefault();
    $('body').addClass('coos-over-hidden')
    let paramet = {
      versionid: $(this).attr('data-versionid')
    }
    coos.box.confirm(`是否删除${$(this).attr('data-versionname')}版本`, function () {
      let res = delversion(paramet)
      if (res.errcode == 20001) {
        coos.box.confirm(`当前数据在需求表有关联数据, 是否确定删除？`, function () {
          paramet.forciblyremove = true
          delversion(paramet)
          getlist()
          $('body').removeClass('coos-over-hidden')
        })
      } else {
        getlist()
        $('body').removeClass('coos-over-hidden')
      }
    })
  })
  $('.version-manage').on('click', '.addFavourite', function () {
    let projectid = $(this).attr('data-projectid')
    addFavourite({projectid})
    getlist()
    getTotalCount()
  })
  $('.version-manage').on('click', '.delFavourite', function () {
    let favouriteid = $(this).attr('data-favouriteid')
    delFavourite({favouriteid})
    getlist()
    getTotalCount()
  })
}