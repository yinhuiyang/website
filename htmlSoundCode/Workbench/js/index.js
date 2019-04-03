var PageView = require('./pageView.js')
// api.baseURL = 'http://localhost:8000/api/'
// var basePath = 'http://192.168.81.17:8081/vrv.task/'
var Workbench = {
  init(){
    this.PageViewinit()
    this.elementfn()
  },
  data:{
    pageView: {},
    favourite: true,
    favouritePage: 1,
    allPage:1,
    searchProjectName: '',
  },
  elementfn () {
    let _this = this
    $('.nav-links li').click(function () {
      $('.nav-links li').removeClass('active')
      $(this).addClass('active')
      $('.nav-controls .nameFiltering').val('')
      if (_this.data.searchProjectName !== '') {
        _this.data.searchProjectName = ''
        _this.data.favourite? _this.data.favouritePage = 1: _this.data.allPage= 1;
      }
      if ($(this).find('a').text() == '星标项目'){
        _this.data.favourite = true
        _this.data.pageView.pageIndex = _this.data.favouritePage // 分页组件到当前页
        _this.favouritePageList(_this.data.favouritePage,'')
      } else {
        _this.data.favourite = false
        _this.data.pageView.pageIndex = _this.data.allPage
        _this.queryList(_this.data.allPage, '')
      }
    })
    $('body').on('click', '.asterisk i', function () {
      let del = $(this).attr('class').indexOf('fa-star-o') < 0
      let versionid = $(this).attr('data-versionid')
      let projectid = $(this).attr('data-projectid')
      let Params = {versionid, projectid}
      if (del){
        _this.delFavourite(Params)
      }else{
        _this.addFavourite(Params)
      }
      console.log(del)
    })
    $('.nav-controls .nameFiltering').keydown(function (e) {
      if (!e) e = window.event;
      if ((e.keyCode || e.which) == 13) {
        _this.data.searchProjectName = $(this).val()
        _this.data.pageView.pageIndex = 1
        if (_this.data.favourite) {
          _this.favouritePageList(1, _this.data.searchProjectName)
        } else {
          _this.queryList(1, _this.data.searchProjectName)
        }
      }
    })
  },
  pageView () {
    var  _this = this
    var pageView = new PageView('.pagination', {
      defaultSize: 10,
      onChange: _this.getData.bind(_this)
      })
    this.data.pageView = pageView
  },
  getData () {
    this.data.pageView.disable();
    let Params = this.data.pageView.getParams()
    if (this.data.favourite) {
      this.favouritePageList(Params.page, this.data.searchProjectName)
      this.data.favouritePage = Params.page
    } else {
      this.queryList(Params.page,  this.data.searchProjectName)
      this.data.allPage = Params.page
    }
  },
  PageViewinit() {
    this.pageView()
    this.getData()
  },
  favouritePageList (page, version_projectname) {
    let _this = this
    let action = 'core/service/task_version/favouritePageList'
    let data = {
      pagesize:10,
      currentpage:page,
      version_projectname:version_projectname
    }
    api.POST(action, data, function (res) {
      _this.list(res)
      _this.data.pageView.refresh(res.result.model1.totalcount);
      _this.data.pageView.enable()
    })
  },
  queryList(page, version_projectname) {
    let _this = this
    var action = 'core/service/task_version/queryList';
    var data = {
      pagesize: 10,
      currentpage: page,
      version_projectname: version_projectname
    };
    api.POST(action, data, function (res) {
      _this.list(res)
      _this.data.pageView.refresh(res.result.model1.totalcount, _this.data.allPage);
      _this.data.pageView.enable()
    });
  },
  addFavourite (Params) {
    let _this = this
    var action = 'index/addFavourite.do';
    var data ={
      versionid: Params.versionid,
      projectid: Params.projectid
    }
    api.POST(action, data, function (res) {
      if (_this.data.favourite){
        _this.favouritePageList(_this.data.favouritePage, _this.data.searchProjectName)
      } else {
        _this.queryList(_this.data.allPage, _this.data.searchProjectName)
      }
    })
  },
  delFavourite (Params) {
    let _this = this
    var action = 'index/deleteFavourite.do';
    var data ={
      versionid: Params.versionid
    }
    api.POST(action, data, function (res) {
      if (_this.data.favourite){
        _this.favouritePageList(_this.data.favouritePage, _this.data.searchProjectName)
      } else {
        _this.queryList(_this.data.allPage, _this.data.searchProjectName)
      }
    })
  },
  getstatus(status){
    switch(status){
      case '0':
        return '规划中';
      case '1':
        return '启动';
      case '2':
        return '进行中';
      case '8':
        return '完成';
      case '9':
        return '上线';
      default:
       return '上线';
    }
  },
  item (dataItem, i) {
    let html = `<li class="project-row">
    <div class="index-s40">
      <span>${i+1}</span>
    </div>
    <div class="project-details">
      <h3>
        <a class="project" href="${basePath}index/toVersion.do?versionid=${dataItem.versionid}">
          <span class="project-name">
            ${dataItem.version_projectname}
          </span>
        </a>
      </h3>
    </div>
    <div class="controls">
      <div class="asterisk">
        <i class="fa ${this.data.favourite? 'fa-star': dataItem.isfavourite=='0'?'fa-star-o': 'fa-star'}" data-versionid="${dataItem.versionid}" data-projectid="${dataItem.projectid}"></i>
      </div>
      <div class="status">
        <div><span>${this.getstatus(dataItem.status)}</span></div>
        <div><span>${this.getTime(dataItem.planonlinetime)}</span></div>
      </div>
    </div>
  </li>`
   return html
  },
  list (res) {
    let listHtml = ''
    res.result.model1.value.forEach((el, i) => {
      listHtml += this.item(el, i)
    })

    if (!res.result.model1.value.length){
      listHtml = '<li class="noData">你还没有给任何项目加注星标</li>'
    }
    $('.projects-list').html(listHtml)
  },
  getTime (time) {
    return (time? time.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5"): '')
  }
}
window.Workbench = Workbench