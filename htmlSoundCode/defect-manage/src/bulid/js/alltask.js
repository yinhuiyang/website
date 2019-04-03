var task={
  init () {
    // this.addProgress($('.taskModal-schedule'))
    this.load()
    this.navfn()
    // this.itemFn()
    // this.taskState()
    // this.taskDifficulty()
    // this.taskType()
  },
    initall () {
        // this.addProgress($('.taskModal-schedule'))
        // this.load()
        // this.navfn()
        this.itemFn()
        this.taskState()
        this.taskDifficulty()
        this.taskType()
    },
  editor: {},
  load () {
    let obj = this.getparameter()
    if (obj.needid){
        $('.nav-task li').removeClass('active')
        $('.nav-task li[value= '+obj.status+']').addClass('active')
      $('.my-btn').removeClass('active')
      $('.my-all').addClass('active')
        this.data.myState[$('.nav-task li.active a').text()] = 0
    }
    if ((obj.status|| obj.status == '')&&obj.my){
      $('.nav-task li').removeClass('active')
      $('.nav-task li[value= '+obj.status+']').addClass('active')
      $('.my-btn').removeClass('active')
      let status = $('.nav-task li.active a').text() 
      if (obj.my == '1') {
        $('.my-condition .my-my').addClass('active')
      } else if(obj.my == '2') {
        $('.my-condition .my-assign').addClass('active')
      }else{
        $('.my-condition .my-all').addClass('active')
      }
      this.data.myState[status] = obj.my
    }
    let _this = this
    setTimeout(function () {
    if (obj.needid){
      _this.addtaskList($('.nav-task li.active a').text())
      _this.getneed(obj)
    }else if ((obj.status|| obj.status == '')&&obj.my) {
      _this.addtaskList($('.nav-task li.active a').text())
    }else{
        _this.addtaskList('启动')
    }
    },500)
    
    // let html = this.loadTitle(this.dataTask)
    // $('.list').html(html)
    // this.layout()
  },
  getneed (obj) {
    $('#'+obj.needid).parent().css('boxShadow', '0px 0px 20px #f96900')
    let top = parseFloat($('#'+obj.needid).parent().css('top'))
    top = top+$('.list')[0].offsetTop
    $(window).scrollTop(top)
    // let needTitle = $('#'+obj.needid).find('.item-title .title-font').text()
    // this.taskQuery(obj.taskid, needTitle)
  },
  data:{
    top: 0,
    taskState: {},
    taskDifficulty: [],
    taskType: [],
    taskData: {},
    taskWidth: '',
    myState:{'全部': 1, '规划中': 1, '启动': 1, '进行中': 1, '完成': 1, '上线': 1}
  },
  addstatus: '',
  addtaskList (status){
    let action = 'task/alltask/taskList.do'
    switch(status){
      case '规划中':
        this.addstatus = '0'
        break;
      case '启动':
        this.addstatus = '1'
        break;
      case '进行中':
        this.addstatus = '2'
        break;
        case '完成':
        this.addstatus = '8'
        break;
      case '上线':
        this.addstatus = '9'
        break;
      default:
        this.addstatus = ''
    }
    let data ={
      status : this.addstatus,
      my: this.data.myState[status]
    }
    let _this = this
    api.POST(action,data, function(res){
      if(res.data.result.length == 1 && !res.data.result[0].needid){
        res.data.result[0].needtitle = '暂无需求'
        res.data.result[0].tasks[0]={title : '暂无任务'}
      }
      let html = _this.loadTitle(res.data.result, status)
      $('.list').html(html)
      _this.layout()
    },true)
  },
  getparameter () {
    let obj={}
    // obj.taskid = this.getQueryString('taskid')
    let status = this.getQueryString('status')
    let needid = this.getQueryString('needid')
    let my = this.getQueryString('my')
    status|| status== ''?obj.status = status: '';
    needid? obj.needid = needid: '';
    my? obj.my = my: '';
    return obj
  },
  getQueryString(name) { 
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null; 
  } ,
  needQueryOne (needid) {
    let action = 'core/service/task_need/queryOne'
    let data = {
      needid: needid
    }
    let _this = this
    let needplanendtime = ''
    api.POST(action,data, function(res){
      needplanendtime = res.result.data.value.planonlinetime
    },true)
    return needplanendtime
  },
  taskQuery (taskid, needTitle){
    let action = 'core/service/task/queryOne'
    let data = {
      taskid: taskid
    }
    let _this = this
    api.POST(action,data, function(res){
      res.result.model1.value.needTitle = needTitle
      let taskdata = {
        taskid: taskid,
        el: res.result.model1.value
      }
      _this.getProgress(taskdata)
    })
  },
  getProgress (taskdata) {
    let _this = this
    let action = 'core/service/task_process/queryPageList'
    let data = {
      taskid: taskdata.taskid
    } 
    api.POST(action,data, function(res){
        taskdata.el.ProgressList = res.result.model1.value
        _this.taskModal(taskdata.el, 'revise')
    })
  },
  needRenovate (needid, status) {
    let action = 'task/alltask/getTaskListFromNeedid.do'
    let data = {
      needid: needid,
      status: this.addstatus,
      my: this.data.myState[status]
    }
    let _this = this
    api.POST(action,data, function(res){
      if (!res.data.result.length){
        let status = $('.nav-task li.active a').text()
        _this.addtaskList(status)
      } else {
        _this.addtask(res.data.result, needid)
      }
      
    })
  },
  taskState () {
    let _this = this
    let action = 'task/alltask/getTaskStatusList.do'
    let data = {
    } 
    api.POST(action,data, function(res){
      _this.data.taskState = res.data.result
    })
  },
  taskDifficulty () {
    let _this = this
    let action = 'core/service/TASK_DIFFICULTY_LEVEL/queryList'
    let data = {
    } 
    api.POST(action,data, function(res){
      _this.data.taskDifficulty = res.result.model1.value
    })
  },
  taskType () {
    let _this = this
    let action = 'task/alltask/getTaskTypeList.do'
    let data = {
    } 
    api.POST(action,data, function(res){
      _this.data.taskType = res.data.result
    })
  },
  personLiable (username) {
    let _this = this
    let action = 'task/alltask/getUserList.do'
    let data = {
      username: username
    } 
    api.POST(action,data, function(res){
      let html = ''
      res.data.result.forEach(el =>{
        html +='<li name=\"'+el.userid+'\">'+el.username+'</li>' 
      })
      $('.personLiable-ul').html(html)
      $('.personLiable-ul').show()
    })
  },
  taskUpdate (taskdata) {
    let _this = this
    let action = 'core/service/task/insertOrUpdate'
    api.POST(action,taskdata, function(res){
    })
  },
  taskAddDate (taskdata, $taskModal) {
    let _this = this
    let action = 'core/service/task/insertOrUpdate'
    if(taskdata.title == ''|| taskdata.title == '填写任务标题') {
      coos.box.info('请填写任务标题')
      return 
    }
    if (taskdata.status == 'undefined'){
      coos.box.info('状态不能为空')
      return
    }
    if (taskdata.trustuserid == ''){
      coos.box.info('负责人不能为空')
      return
    }
    if (taskdata.planstarttime == ''){
      coos.box.info('开始时间不能为空')
      return
    }
    if (taskdata.planendtime == ''){
      coos.box.info('结束时间不能为空')
      return
    }
    if (taskdata.taskdifficultylevelid == ''){
      coos.box.info('难度不能为空')
      return
    }
    if (taskdata.type == ''){
      coos.box.info('类型不能为空')
      return
    }
    if(taskdata.planstarttime > taskdata.planendtime) {
      coos.box.info('开始时间不能大于结束时间')
      return
    }
    if(taskdata.planendtime > $taskModal.attr('needplanendtime')){
      coos.box.info('任务结束时间不能大于需求结束时间('+$taskModal.attr('needplanendtime')+')')
      return
    }
    let data = {
      title: taskdata.title,
      trustuserid: taskdata.trustuserid,
      username: taskdata.username,
      needid: taskdata.needid,
      planstarttime: taskdata.planstarttime,
      planendtime: taskdata.planendtime,
      status: taskdata.status,
      description: taskdata.description,
      taskdifficultylevelid: taskdata.taskdifficultylevelid,
      type: taskdata.type
    }
    if (taskdata.taskid) {
      data.taskid = taskdata.taskid
    }
    api.POST(action,data, function(res){
        if (!taskdata.taskid) {
          _this.addtaskList($('.nav-task li.active a').text())
        } else {
          let needid = $taskModal.attr('data-needid')
          let status = $('.nav-task li.active a').text()
          _this.needRenovate(needid,status)
        }
        $taskModal.remove()
    })
  },
  postProgress (ProgressData) {
    let _this = this
    let action = 'core/service/task_process/insertOrUpdate'
    let data = {
      taskid: $('.taskModal-schedule').attr('data-taskid'),
      process: $('#ProgressBar').slider("value"),
      workdate: $('.taskModal-schedule .ProgressBar-time input').val(),
      workhour: $('#ProgressBar-hour').slider("value"),
      images: $('.taskModal-schedule #Progress-image').val(),
      file: $('#Progress-file').val(),
      remark: $('#Progress-remark').val()
    }
    if (!data.process){
      coos.box.info('进度未填')
      return
    }
    if (!data.workdate){
      coos.box.info('工作日期未填')
      return
    }
    if (!data.workhour){
      coos.box.info('工作时长未填')
      return
    }
    if(ProgressData.Update){
      data.processid = ProgressData.processid
    }
    api.POST(action,data, function(res){
      _this.addProgresstime()
      _this.delProgressdata()
      $('.taskModal-schedule').remove()
    })
  },
  getProgressitem(processid){
    let _this = this
    let action = 'core/service/task_process/queryOne'
    let data={
      processid: processid
    }
    api.POST(action,data, function(res){
      let Progressdata = res.result.model1.value
      Progressdata.workdate = Progressdata.workdate? Progressdata.workdate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3") : '';
      $('#ProgressBar').slider("value", (Progressdata.process|| ''))
      $('#ProgressBar').find('.ui-slider-handle').html( $('#ProgressBar').slider("value"))
      $('#ProgressBar-hour').slider("value", (Progressdata.workhour|| ''))
      $('#ProgressBar-hour').find('.ui-slider-handle').html( $('#ProgressBar-hour').slider("value") )
      $('.taskModal-schedule .ProgressBar-time input').val(Progressdata.workdate)
      $('.taskModal-schedule #Progress-image').val(Progressdata.images|| '').change()
      $('#Progress-file').val(Progressdata.file|| '').change()
      $('#Progress-remark').val(Progressdata.remark|| '')
    })
  },
  deletestatus (taskid) {
    let _this = this
    let action = 'core/service/task/delete'
    let data={
      taskid: taskid,
      deletestatus: 1
    }
    api.POST(action,data, function(res){
      if(res.errcode == 0){
        _this.addtaskList($('.nav-task li.active a').text())
      }
    })
  },
  getTaskdata ($taskModal) {
    let taskdata = {}
    taskdata.title = $taskModal.find('.taskModal-title>div').text()
    taskdata.trustuserid = $taskModal.find('.taskModal-personLiable input').attr('name')
    taskdata.username = $taskModal.find('.taskModal-personLiable input').attr('value')
    taskdata.needid = $taskModal.attr('data-needid')
    taskdata.planstarttime = $taskModal.find('.startTimeIput').val()
    taskdata.planendtime = $taskModal.find('.endTimeIput').val()
    taskdata.status = '1' // $('#taskModal .taskModal-state>span').attr('value')
    taskdata.description = $taskModal.data('editor').getData()
    taskdata.taskdifficultylevelid = $taskModal.find('#difficultylevelid>span').attr('value')
    taskdata.type = $taskModal.find('#typeid>span').attr('value') || ''
    if ($('#taskModal').attr('data-taskid')) {
      taskdata.taskid = $('#taskModal').attr('data-taskid')
    }
    return taskdata
  },
  
  navfn () {
    _this = this
    $('.nav-task li a').click(function (e) {
      e.preventDefault()
      $('.nav-task li').removeClass('active')
      $('.my-condition .my-btn').removeClass('active')
      $(this).parent().addClass('active')
      let status = $(this).text()
      if (_this.data.myState[status] == '1') {
        $('.my-condition .my-my').addClass('active')
      } else if(_this.data.myState[status] == '2') {
        $('.my-condition .my-assign').addClass('active')
      }else{
        $('.my-condition .my-all').addClass('active')
      }
      history.replaceState({},'','?status='+$(this).parent().attr('value')+'&my='+_this.data.myState[status]) 
      _this.addtaskList(status)
    })
    $('.my-condition .my-btn span').click(function(){
      $('.my-condition .my-btn').removeClass('active')
      $(this).parent().addClass('active')
      let status = $('.nav-task li.active a').text()
      _this.data.myState[status] = $(this).attr('value')
      history.replaceState({},'','?status='+$('.nav-task li.active').attr('value')+'&my='+_this.data.myState[status]) 
      _this.addtaskList(status)
    })
  },
  itemFn(){
    let _this = this
    $('body').on('click',function(){
      $('.taskdown').hide()
      $('.taskModal-state>ul').hide()
      $('.difficultylevelid>ul').hide()
      $('.typeid>div').hide()
      $('.menuList').hide()
    })
    $('body').on('click','.Progress-add',function(){
      _this.addtaskModalSchedule()
      $('.taskModal-schedule').attr('data-taskid', $('#taskModal').attr('data-taskid'))
      $('.taskModal-schedule').attr('data-processid', '')
      // $('.taskModal-schedule').show()
    })
    $('body').on('click','.Progress-item',function(){
        _this.addtaskModalSchedule()
      $('.taskModal-schedule').attr('data-taskid', $('#taskModal').attr('data-taskid'))
      $('.taskModal-schedule').attr('data-processid', $(this).attr('data-processid'))
      _this.getProgressitem($(this).attr('data-processid'))
      // $('.taskModal-schedule').show()
    })
    $('body').on('click', '.task-item', function () {

      let id = $(this).attr('id')
      let needTitle= $(this).parent().parent().find('.title-font').text()
      if(id == 'undefined'|| !id) return
      _this.taskQuery(id, needTitle)
      
    })
    $('body').on('click', '.taskdown li a.addtask', function (e) {
      $('body').addClass('coos-over-hidden')
      if ( e && e.preventDefault ) {
        e.preventDefault(); 
      }else {
        window.event.returnValue = false;
      }
      let needTitle = $(this).parent().parent().parent().parent().parent().find('.title-font').text()
        let needid = $(this).parent().parent().parent().parent().parent().attr('id')
      _this.taskModal({needTitle, needid}, 'addModal')
      $(this).parent().parent().toggle()
    })
    $("body").on('click', '.xiaicon', function (e) {
      e.stopPropagation()
      $('.taskdown').hide()
      $(this).siblings('.taskdown').toggle()
    })
  },
  tasktaskModalselet($html,modalType){
      let _this=this
    $html.find('.taskModal-state li,#difficultylevelid li').click(function(e){
      e.stopPropagation()
      $(this).parent().parent().find('span').text($(this).text())
      $(this).parent().parent().find('span').attr({'value': $(this).attr('value'), 'index': $(this).index()})
      $(this).parent().hide()
    })
    $html.find('#typeid li').click(function(e){
      e.stopPropagation()
      $(this).parent().parent().parent().find('span').text($(this).text())
      $(this).parent().parent().parent().find('span').attr({'value': $(this).attr('value'), 'index': $(this).index()})
      $(this).parent().parent().hide()

    })
    $html.on('click', '.task-menu>i',function (e) {
      e.stopPropagation()
      $('.menuList').toggle()
    })
    $html.on('click', '.menuList .delTask',function () {
      let $taskModal = $(this).parent().parent().parent().parent().parent().parent()
      let taskid = $taskModal.attr('data-taskid')
      _this.deletestatus(taskid)
      $taskModal.remove()
      $('body').removeClass('coos-over-hidden')
    })
    $html.on('click','.taskRenovate',function(){
      $('body').removeClass('coos-over-hidden')
      let needid = $('#taskModal').attr('data-needid')
      $(this).parent().parent().parent().parent().remove()
      let status = $('.nav-task li.active a').text()
      _this.needRenovate(needid,status)
    })
    $html.on('click','#cancelReviseTask',function(){
      $('body').removeClass('coos-over-hidden')
      let needid = $('#taskModal').attr('data-needid')
      $(this).parent().parent().parent().remove()
      let status = $('.nav-task li.active a').text()
      _this.needRenovate(needid,status)
    })
    $html.on('click','.taskClose',function(){
      $('body').removeClass('coos-over-hidden')
      $(this).parent().parent().parent().parent().remove()
    })
    $html.on('click','#cancelTask',function(){
      $('body').removeClass('coos-over-hidden')
      $(this).parent().parent().parent().remove()
    })
    $html.on('click','#preserveTask',function(){
      $('body').removeClass('coos-over-hidden')
      let $taskModal = $(this).parent().parent().parent()
      let taskdata = _this.getTaskdata($taskModal)
      // taskdata.Update = false
        _this.taskAddDate(taskdata, $taskModal)
    })
    $html.on('input', '#personLiable',function () {
      _this.personLiable($(this).val())
    })
    $html.on('blur', '#personLiable',function () {
      setTimeout(function(){
        if (!$('#taskModal taskModal-personLiable input').attr('name')|| $('#taskModal taskModal-personLiable input').attr('name')=="undefined"){
          $('#taskModal taskModal-personLiable input').val('')
        }
        $('.personLiable-ul').hide()
      },250)
    })
    $html.find('.copyTask').click(function () {
      let $taskModal = $(this).parent().parent().parent().parent().parent().parent()
      let taskdata = _this.getTaskdata($taskModal)
      taskdata.trustusername = $taskModal.find('#personLiable').attr('value')
      taskdata.needid = $taskModal.attr('data-needid')
      taskdata.needTitle = $taskModal.find('.demand-content a').text()
      _this.taskModal(taskdata, 'addModal')
    })
    $.fn.taskpersonLiable =  this.taskpersonLiable
    $().taskpersonLiable.init($html)
    ClassicEditor
        .create( $html.find( '#illustrateEditor' )[0], {
          toolbar: [  'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'undo', 'redo' ],
          language: 'zh-cn'
      } ).then(editor => {
        $html.data('editor', editor)
        // if (modalType == 'revise'){
        //   editor.model.document.on('change:data',function(){
        //     let taskdata = {}
        //     taskdata.description = editor.getData()
        //     taskdata.taskid =  $html.attr('data-taskid')
        //     _this.taskUpdate(taskdata)
        //   })
        // }
    })
    .catch( error => {
            console.error( error );
        } );
  },
  taskpersonLiable: {
    index: -1,
    init($html){
      this.select($html)
      this.click($html)
    },
    select ($html) {
      let _this = this
      $html.find('#personLiable').keydown(function(e){
        let $li = $(this).parent().find('.personLiable-ul li')
        if (e.keyCode == 38) {
          if(_this.index<0) {
            _this.index = $li.length-1
          }else {
            _this.index --
          }
          $li.removeClass('active')
          $li.eq(_this.index).addClass('active')
        }
        if (e.keyCode == 40) {
          if (_this.index > $li.length-1) {
            _this.index = 0
          } else {
            _this.index ++
          }
          $li.removeClass('active')
          $li.eq(_this.index).addClass('active')
        }
        if (e.keyCode == 13) {
          console.log(e.target.id)
          $li.eq(_this.index).click()
        }
      })
    },
    click ($html){
      let _this = this
      $html.find('.personLiable-ul').on('mouseover','li',function () {
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
        _this.index = $(this).index()
      })
      $html.find('.personLiable-ul').on('click', 'li', function () {
        $(this).parent().parent().find('#personLiable').attr({'name':$(this).attr('name'), 'value': $(this).text()})
        $(this).parent().parent().find('#personLiable').val($(this).text())
        $('.personLiable-ul').hide()
      })
    }
  },
  taskModalEvent ($html) {
    //自动保存事件
  },
  addProgresstime () {
    let _this = this
    let action = 'core/service/task_process/queryPageList'
    let data = {
      taskid: $('#taskModal').attr('data-taskid')
    } 
    api.POST(action,data, function(res){
      let html= ''
      let process = 0
      res.result.model1.value.forEach(el => {
        el.workdate= el.workdate?el.workdate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"):''
        html +='<div class="Progress-item" data-processid=\"'+el.processid+'\">'+
          '<div class="Progress-item-left">'+
              '<span>'+el.process+'%</span>'+
              '<span>'+el.workdate+'</span>'+
              '<span>'+(el.workhour||'')+'小时</span>'+
          '</div>'+
          '<div class="Progress-item-right"><i class="glyphicon glyphicon-menu-right"></i></div>'+
        '</div>'
        if (process < el.process){
          process = el.process
        }
      })
      $('#taskModal .Progress-List').html(html)
      $('.rateOfProgress div:last-child span').text(process+'%')
    })
  },
  taskModal (el, modalType) {
      let _this = this
      let process = 0
      $('body').addClass('coos-over-hidden')
      el.needplanendtime = this.needQueryOne(el.needid)
      let html = '<div class="taskModal '+(modalType == "addModal"?"addModal": "")+'\" id="taskModal" data-needid= \''+el.needid+'\' data-taskid = \"'+(el.taskid || '')+'\" needplanendtime= \"'+this.getTime(el.needplanendtime)+'\">'+
        '<div class="taskModal-dialog">'+
          '<div class="demand-content">'+
            '<a  href=\"'+basePath+'task/need/toView.do?&needid='+el.needid+'\" target="_blank" class="demand-title">'+
              el.needTitle+
            '</a>'+
            '<div style="display: flex;">'+
              '<div class="task-menu" style=\"display:'+(modalType == "addModal"? "none":"")+'\">'+
              '<i class="fa fa-angle-down"></i>'+
              '<ul class="menuList">'+
                '<li class="delTask"><i class="fa fa-trash-o"></i> <span>删除到回收站</span></li>'+
                '<li class="copyTask"><i class="fa fa-clipboard"></i> <span>复制任务</span></li>'+
              '</ul>'+
            '</div>'+
            '<span class=\"'+(modalType == 'addModal'? 'taskClose':'taskRenovate')+'\">×</span>'+
            '</div>'+
            
          '</div>'+
          '<div class="taskModal-contentBox">'+
          '<div class="taskModal-content">'+
            '<div class="taskModal-title">'+
              '<div class="" contenteditable="true" placeholder="任务名称" >'+(el.title|| "填写任务标题")+'</div>'+
            '</div>'+
            '<div class="taskModal-message">'+
              // this.loadTaskState(el.status)+
              '<div class="taskModal-personLiable">'+
                '<input type="text" autocomplete="off" id="personLiable" placeholder="负责人" value=\"'+(el.trustusername||'')+'\" name=\"'+(el.trustuserid||'')+'\" class="form-control-none">'+
                '<ul class="personLiable-ul" style="display:none">'+
                '</ul>'+
              '</div>'+
              '<div class="input-time">'+
                '<i class="fa fa-calendar time-icon"></i>'+
                '<input type="text" class="startTimeIput form-control-none" placeholder="任务开始时间" value=\"'+this.getTime(el.planstarttime)+'\"/>'+
              '</div>'+
              '--'+
              '<div style="margin-left: 6px;">'+
                '<i class="fa fa-calendar time-icon"></i>'+
                '<input type="text" class="endTimeIput form-control-none" placeholder="任务结束时间" value=\"'+this.getTime(el.planendtime)+'\"/>'+
              '</div>'+
            '</div>'+
            '<div class="taskModal-illustrate">'+
              '<div class="illustrate-row">'+
                '<div><span>难度</span></div>'+
                '<div>'+
                  this.loadTaskDifficulty(el.taskdifficultylevelid)+
                '</div>'+
              '</div>'+
              '<div class="illustrate-row">'+
                '<div><span>类型</span></div>'+
                '<div>'+
                  this.loadTaskType(el.type)+
                '</div>'+
              '</div>'+
              '<div class="rateOfProgress">'+
                '<div><span>进度</span></div>'+
                '<div><span>0%</span></div>'+
              '</div>'+
              '<div class="illustrate-row">'+
                '<div><span>说明</span></div>'+
                ' <textarea class="illustrate-font " id="illustrateEditor">'+(el.description || '')+'</textarea>'+
              '</div>'+
            '</div>'
          if (modalType == 'addModal'){
            html +='</div></div><div class="taskModal-footer">'+
              '<span class="cancel-btn" id="cancelTask">取消</span>'+
              '<span class="preserve-btn" id="preserveTask">保存</span>'+
            '</div>'
          } else {
            html +='<div class="ProgressListBox">'+
              '<div class="Progress-title"><i class="glyphicon glyphicon-list"></i><span>进度列表</span></div>'+
              '<div class="Progress-List">'
            el.ProgressList.forEach(elm =>{
              elm.workdate= elm.workdate?elm.workdate.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"):''
              html +='<div class="Progress-item" data-processid=\"'+elm.processid+'\">'+
                '<div class="Progress-item-left">'+
                    '<span>'+elm.process+'%</span>'+
                    '<span>'+elm.workdate+'</span>'+
                    '<span>'+(elm.workhour||'')+'小时</span>'+
                '</div>'+
                '<div class="Progress-item-right"><i class="fa fa-chevron-right"></i></div>'+
              '</div>'
              if (process < elm.process){
                process = elm.process
              }
            })
            html +='</div>'+
            '<div class="Progress-add">'+
              '<i class="glyphicon glyphicon-plus-sign"></i>'+
              '<span>填写进度</span>'+
            '</div>'+
            '</div>'+
            '</div>'+
          '</div>'+
          '<div class="taskModal-footer"><span class="cancel-btn" id="cancelReviseTask">取消</span><span class="preserve-btn" id="preserveTask">保存</span></div>'
          }
      html +='</div>'+'</div>'
    let $html = $(html)
    this.tasktaskModalselet($html, modalType)
    // if (modalType == 'revise'){
    //   this.taskModalEvent($html)
    // }
   
    var startTime = $html.find('.startTimeIput').val()
    var endTime = $html.find('.endTimeIput').val()
    let option={
      lang: 'ch', 
      step: 60,
      datepicker:true,
      timepicker:true,
      format:'Y-m-d H:i',
    }
    option.onClose = function(dp,$input){
        if(startTime != $input.val()){
          if (endTime >_this.getTime(el.needplanendtime)){
            coos.box.info('任务结束时间不能大于需求结束时间('+_this.getTime(el.needplanendtime)+')')
            return
          }
          // $input.change()
          startTime = $input.val()
        }
    }
    $html.find('.startTimeIput').datetimepicker(option)
    option.onClose = function(dp,$input){
      if(endTime != $input.val()){
        endTime = $input.val()
        if (endTime >_this.getTime(el.needplanendtime)){
          coos.box.info('任务结束时间不能大于需求结束时间('+_this.getTime(el.needplanendtime)+')')
          return
        }
        // $input.change()
      }
    }
    $html.find('.endTimeIput').datetimepicker(option)
    $html.find('.rateOfProgress div:last-child span').text(process+'%')
    if (modalType == "addModal"){
      $html.find('.taskModal-contentBox').css({'height': '400px'})
      !$html.find('.startTimeIput').val()? $html.find('.startTimeIput').val(this.Dateformat(new Date())+' 09:00'):''
      !$html.find('.endTimeIput').val()?$html.find('.endTimeIput').val(this.Dateformat(new Date())+' 18:00'): ''
    } else {
      $html.find('.taskModal-contentBox').css({'height': 'calc\(100% - ' + $('.demand-content').height() + 'px\)'})
    }
    
   
    $html.find('.time-icon').click(function() {
      $(this).siblings('input').datetimepicker('show')
    })
    $html.find('.taskModal-title div').focus(function () {
      if ($(this).text() == '填写任务标题'){
        $(this).text('')
      }
    })
    $html.find('.taskModal-title div').blur(function () {
      if ($(this).text() == ''){
        $(this).text('填写任务标题')
      }
    })
    this.getselect.init(['.taskModal-state', '.difficultylevelid', '.typeid'], $html)
    $('body').append($html)
    
  },
  delProgressdata () {
    $('#ProgressBar').slider("value", 0)
    $('#ProgressBar').find('.ui-slider-handle').html( $('#ProgressBar').slider("value"))
    $('#ProgressBar-hour').slider("value", 0)
    $('#ProgressBar-hour').find('.ui-slider-handle').html( $('#ProgressBar').slider("value") )
    $('.taskModal-schedule .ProgressBar-time input').val('')
    $('.taskModal-schedule #Progress-image').val('').change()
    $('#Progress-file').val('').change()
    $('#Progress-remark').val('')
  },
 addtaskModalSchedule () {
    var html = '<div class="taskModal-schedule"  style="z-index: 50;">  ' +
        '    <div class="schedule-dialog">  ' +
        '        <div class="schedule-top">  ' +
        '            <div class="schedule-title">填写进度</div>  ' +
        '            <span class="scheduleClose scheduleClose-btn">×</span>  ' +
        '        </div>  ' +
        '        <div class="schedule-content-box">  ' +
        '            <div class="schedule-content">  ' +
        '                <div class="ProgressBar-group">  ' +
        '                    <div class="ProgressBar-title"><span>任务进度</span><sup>*</sup></div>  ' +
        '                    <div id="ProgressBar"></div>  ' +
        '                </div>  ' +
        '                <div class="ProgressBar-group">  ' +
        '                    <div class="ProgressBar-title"><span>工作日期</span><sup>*</sup></div>  ' +
        '                    <div class="ProgressBar-time"><input type="text" placeholder="工作日期" class="form-control"/></div>  ' +
        '                </div>  ' +
        '                <div class="ProgressBar-group">  ' +
        '                    <div class="ProgressBar-title"><span>工作时长</span><sup>*</sup></div>  ' +
        '                    <div id="ProgressBar-hour"></div>  ' +
        '                </div>  ' +
        '                <div class="ProgressBar-group row">  ' +
        '                    <input label="图片" id="Progress-image" file-count="5" group-type="4" class="input-rule-group input-rule-file-image" need-addon="true" placeholder="图片">  ' +
        '                </div>  ' +
        '                <div class="ProgressBar-group row">  ' +
        '                    <textarea label="备注" id="Progress-remark" group-type="4" class="input-rule-group" placeholder="备注"></textarea>  ' +
        '                </div>  ' +
        '            </div>  ' +
        '        </div>  ' +
        '  ' +
        '        <div class="schedule-footer">  ' +
        '            <span class="scheduleClose-btn">取消</span>  ' +
        '            <span class="preserve-btn">保存</span>  ' +
        '        </div>  ' +
        '    </div>  ' +
        '</div>';
    $('body').append(html);
    task.addProgress($('.taskModal-schedule'))
     coos.element.init('.taskModal-schedule')
 },
  addProgress($html) {
    let _this = this
    $html.find('#ProgressBar').slider( {
      value: 0,
      slide: function( event, ui ) {
        event.currentTarget
      $(event.currentTarget).find('.ui-slider-handle').html( ui.value );
    }
    }).slider("pips", {
      rest : "label",
      prefix : "",
      suffix : "",
      step : 20
    })
    $html.find('#ProgressBar').find('.ui-slider-handle').html( $html.find('#ProgressBar').slider("value") )
    $html.find('#ProgressBar-hour').slider( {
      max:24,
      value: 0,
      slide: function( event, ui ) {
        event.currentTarget
      $(event.currentTarget).find('.ui-slider-handle').html( ui.value );
    }
    }).slider("pips", {
      rest : "label",
      prefix : "",
      suffix : "",
      step : 4
    })
    $html.find('#ProgressBar-hour').find('.ui-slider-handle').html( $html.find('#ProgressBar-hour').slider("value") )
    let option={"lang":"ch","datepicker":true,"timepicker":false,"format":"Y-m-d"}
    //$.datetimepicker.setLocale(option.lang);
    $html.find('.ProgressBar-time input').datetimepicker(option)
    $html.find('.scheduleClose-btn').click(function () {
      $(this).parent().parent().parent().remove()
      // _this.delProgressdata()
    })
    $html.find('.preserve-btn').click(function () {
      // $(this).parent().parent().parent().hide()
      let processid = $('.taskModal-schedule').attr('data-processid')
      let data={
        Update: false
      }
      if (processid){
        data.Update = true
        data.processid = processid
      }
      _this.postProgress(data)
    })
    return $html
  },
  loadTitle (dataTask, status) {
    let _this= this
    let titleHTml = ''
    console.log(dataTask)
    dataTask.forEach(element => {
      titleHTml += '<li>'+
      '<div class="list-item" id=\''+element.needid+'\'>'+
        '<div class="item-title">'+
          '<div>'+
            '<div class="title-font">'+
              element.needtitle+
            '</div>'+
            '<span class="item-state">'+status+'</span>'+
          '</div>'+
          '<div class="dropdown-task" >'+
            '<i class="fa fa-chevron-down xiaicon" id="dropdownMenu1" style=\"'+(element.needid? "":"display:none")+'\"></i>'+
            '<ul class="dropdown-menu dropdown-menu-right taskdown" aria-labelledby="dropdownMenu1">'+
              '<li><a href="#" class="addtask"><i class="fa fa-pencil"></i>追加任务</a></li>'+
              '<li><a target="_blank" href=\"'+basePath+'task/need/toView.do?&needid='+element.needid+'\"><i class="fa fa-eye"></i>查看需求</a></li>'+
            '</ul>'+
          '</div>'+
        '</div>'+
      '<div class="task-list" >'
      element.tasks.forEach(el => {
        titleHTml +='<div class="task-item" id=\''+el.taskid+'\'>'+
            '<div class="task-title">'+
              '<span>'+el.title+'</span>'+
              '<div>'+
                '<span class="">'+(el.allworkhour||'0')+'小时</span>'+
                '<span class="">'+(el.currentprocess||'0')+'%</span>'+
              '</div>'+
            '</div>'+
            '<div class="task-state">'+
              '<!--<span>'+(el.tasktypename||'')+'</span>-->'+
              '<span>'+(el.trustusername||'')+'</span>'+
            '</div>'+
          '<div class="task-time">'+
            '<span>'+_this.getTime(el.planstarttime)+'--'+_this.getTime(el.planendtime)+'</span>'+
          '</div>'+
        '</div>'
      })
      if(!element.tasks.length){
        titleHTml += '<div class="task-item">'+
        '<div class="task-title">'+
          '<span>暂无任务</span>'+
          '<div>'+
            '<span class="">0小时</span>'+
            '<span class="">0%</span>'+
          '</div>'+
        '</div>'+
        '<div class="task-state">'+
        '</div>'+
      '<div class="task-time">'+
      '</div>'+
    '</div>'
      }
      titleHTml +='</div>'+
        '</div></li>'
    });
    return titleHTml
  },
  addtask (tasks, needid) {
    let _this=this
    let html = ''
    tasks.forEach(el => {
      html +='<div class="task-item" style="width: 100%;" id=\''+el.taskid+'\'>'+
          '<div class="task-title">'+
            '<span>'+el.title+'</span>'+
            '<div>'+
              '<span class="">'+(el.allworkhour||'0')+'小时</span>'+
              '<span class="">'+(el.currentprocess||'0')+'%</span>'+
            '</div>'+
          '</div>'+
          '<div class="task-state">'+
            '<span>'+(el.trustusername||'')+'</span>'+
          '</div>'+
        '<div class="task-time">'+
          '<span>'+_this.getTime(el.planstarttime)+'--'+_this.getTime(el.planendtime)+'</span>'+
        '</div>'+
      '</div>'
    })
    $('#'+needid).find('.task-list').html(html)
  },
  loadTaskState (status) {
    // let html = '<select class="taskModal-state">'+
    // '<option value="">请选择</option>'
    // for ( key in  this.data.taskState ) {
    //   if (status == key) {
    //     html += '<option value=\"'+key+'\" selected>'+this.data.taskState[key]+'</option>'
    //   } else {
    //     html += '<option value=\"'+key+'\">'+this.data.taskState[key]+'</option>'
    //   }
    // }
    // html += '</select>'
    
     let i=-1
     let j = 0
     let li = ''
     for ( key in  this.data.taskState ) {
       i++
      if (status == key) {
        li += '<li class="active" value=\"'+key+'\">'+this.data.taskState[key]+'</li>'
        j = i
      } else {
        li += '<li value=\"'+key+'\">'+this.data.taskState[key]+'</li>'
      }
    }
    let html = '<div class="taskModal-state">'+
     '<span value=\"'+status+'\" index=\"'+j+'\">'+(this.data.taskState[status]? this.data.taskState[status]:'请选择')+'</span><i class="fa fa-angle-down"></i>'+
     '<ul class="stateList">' +li+'</ul>'+
    '</div>'
    return html
  },
  loadTaskDifficulty (taskdifficultylevelid) {
    // let html = '<select id="difficultylevelid"><option value="">请选择</option>'
    // this.data.taskDifficulty.forEach( el => {
    //   if (taskdifficultylevelid == el.taskdifficultylevelid) {
    //     html += '<option value=\"'+el.taskdifficultylevelid+'\" selected>'+el.name+'</option>'
    //   } else {
    //     html += '<option value=\"'+el.taskdifficultylevelid+'\">'+el.name+'</option>'
    //   }
    // })
    // html +=' </select>'
    let li = ''
    let j = 0
    let taskDifficultyname = '请选择'
    this.data.taskDifficulty.forEach( (el,i) => {
        if (taskdifficultylevelid == el.taskdifficultylevelid) {
          li += '<li value=\"'+el.taskdifficultylevelid+'\" class="active">'+el.name+'</li>'
          taskDifficultyname = el.name
          j = i
        } else {
          li += '<li value=\"'+el.taskdifficultylevelid+'\">'+el.name+'</li>'
        }
      })
      let html ='<div id="difficultylevelid" class="difficultylevelid">'+
          '<span index=\"'+j+'\" value=\"'+(taskdifficultylevelid || '')+'\">'+taskDifficultyname+'</span><i class="fa fa-angle-down"></i>'+
          '<ul class="difficultylevelList select_task">'+ li+
        '</ul>'+
      '</div>'
    return html
  },
  loadTaskType (tasktypeid) {
    // let html = '<select id="typeid"><option value="">请选择</option>'
    // this.data.taskType.forEach(el => {
    //   if (tasktypeid == el.tasktypeid){
    //     html += '<option value=\"'+el.tasktypeid+'\" name=\"'+el.name+'\" selected>'+el.name+'</option>'
    //   } else {
    //     html += '<option value=\"'+el.tasktypeid+'\" name=\"'+el.name+'\">'+el.name+'</option>'
    //   }
    // })
    // html += '</select>'
    let li = ''
    let j=0
    let tasktypename='请选择'
    this.data.taskType.forEach((el,i) => {
        if (tasktypeid == el.tasktypeid){
          li += '<li value=\"'+el.tasktypeid+'\" name=\"'+el.name+'\" class="active">'+el.name+'</li>'
          tasktypename = el.name
          j = i
        } else {
          li += '<li value=\"'+el.tasktypeid+'\" name=\"'+el.name+'\">'+el.name+'</li>'
        }
      })
    let html ='<div id="typeid" class="typeid ">'+
      '<span index=\"'+j+'\" value=\"'+(tasktypeid || '')+'\">'+tasktypename+'</span><i class="fa fa-angle-down"></i>'+
      '<div class="tasktypeList-box select_task">'+
        '<ul class="tasktypeList">'+li+'</ul>'+
      '</div>'+
      
    '</div>'
    return html
  },
  layout () {
    _this = this
		var colNum = 3//parseInt( $('.list').width() / nodeWidth )
    var colSumHeight = [];
    // if ($('.list').width() <= 700) {
    //   colNum = 1
    // } else if ($('.list').width() > 700 && $('.list').width() <= 1050){
    //   colNum = 2
    // } else if($('.list').width() > 1050 && $('.list').width() <= 1400){
    //   colNum = 3
    // } else if($('.list').width() > 1400) {
    //   colNum = 4
    // }($('.list').width()/colNum-40)+'px'
    this.data.taskWidth = 100/3+'%' 
    // $('.task-item').css('width', 'calc('+this.data.taskWidth+' - 40px)')
    $('.list>li').css('width', 'calc('+this.data.taskWidth+' - 20px)')
    $('.task-item').css('width', '100%')
    // $('.title-font').css({'maxWidth': 'calc(100% - 65px)'})
    var nodeWidth = $(".list>li").outerWidth(true)
		for (var i=0;i<colNum;i++) {
			colSumHeight.push(0);
    }
    $(".list>li").each(function(){
      var $cur = $(this),
        idx = 0,
        minSumHeight = colSumHeight[0];

      // 获取到solSumHeight中的最小高度
      for (var i=0;i<colSumHeight.length;i++) {
        if (minSumHeight > colSumHeight[i]) {
          minSumHeight = colSumHeight[i];
          idx = i;
        }
      }

      // 设置各个item的css属性
      $cur.css({
        left: nodeWidth*idx,
        top: minSumHeight
      })

      // 更新solSumHeight
      colSumHeight[idx] = colSumHeight[idx] + $cur.outerHeight(true);
    })
    let maxSumHeight = 0
    for (var i=0;i<colSumHeight.length;i++) {
      if (maxSumHeight < colSumHeight[i]) {
        maxSumHeight = colSumHeight[i];
      }
    }
    $('.list').css({'height': maxSumHeight+'px'})
    $(window).off('resize').on("resize", function(){
      // _this.layout()
		})
  },
  getTime (time) {
    return (time? time.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5"): '')
  },
  Dateformat (date) {
    let Month = date.getMonth()+1
    let day = date.getDate()
    Month = Month < 10? '0'+Month: Month;
    day = day < 10? '0'+day:day;
    return date.getFullYear()+'-'+Month+'-'+day
  },
  getselect: {
    index: 0,
    dom: '',
    init(doms, $html) {
      doms.forEach(el => {
        this.listShow($html.find(el));
        this.liClick($html.find(el).find('li'));
      })
      this.getkeyup()
    },
    listShow (dom) {
      let _this = this
      dom.click(function (e) {
        e.stopPropagation()
        // '.'+$(this).attr('class') != _this.dom?_this.dom == ".typeid"? $(_this.dom+'>div').hide():$(_this.dom).find('ul').hide():'';
        if ($(this).find('.select_task').css('display') !== 'none') {
          $('.select_task').hide()
        } else{
          $('.select_task').hide()
          $(this).find('.select_task').toggle()
        }
        // if(!$(this).find('.tasktypeList-box').length){
        //   $(this).find('ul').show()
        // } else{
          
        // }
        if ($(this).find('.select_task').css('display') != 'none') {
          _this.dom =  this
          $(_this.dom).find('li').removeClass('active')
          let j= parseInt($(_this.dom).find('span').attr('index'))
          _this.index = j
          $(_this.dom).find('li').eq(_this.index).addClass('active')
        } else {
          _this.dom ==  ''
        }
      })
      dom.find('li').mouseover(function () {
        $(this).siblings().removeClass('active')
        $(this).addClass('active')
        _this.index = $(this).index()
      })
      // $(dom+' ul li').click(function (e) {
      //   e.stopPropagation()
      //   $(this).parent().parent().find('span').text($(this).text())
      //   $(this).parent().parent().find('span').attr({'value': $(this).attr('value'), 'index': _this.index})
      //   $(this).parent().hide()
      // })
    },
    liClick($li) {
      let _this = this
      $li.click(function () {
        _this.index = $(this).index()
        $(this).parent().parent().find('span').attr({
          'value': $(this).attr('value'),
          'index': $(this).index()
        })
        $(this).parent().parent().find('span').text($(this).text())
        $(this).parent().hide()
      })
    },
    getkeyup () {
      let _this = this
      $(document).keydown(function (e) {
        let $li = $(_this.dom).find('li')
        if (e.keyCode == 38){
          if (_this.index<0) {
            _this.index = $li.length-1
            $li.removeClass('active')
            $li.eq(_this.index).addClass('active')
          } else {
            _this.index --
            $li.removeClass('active')
            $li.eq(_this.index).addClass('active')
          }
          return false
        }
        if(e.keyCode == 40){
          if(_this.index > $li.length-1) {
            _this.index = 0
            $li.removeClass('active')
            $li.eq(_this.index).addClass('active')
          }else {
            _this.index ++
            $li.removeClass('active')
            $li.eq(_this.index).addClass('active')
          }
          return false
        }
        if(e.keyCode == 13) {
          if($li.eq(_this.index).attr('class') == 'active'){
            // $(_this.dom).find('span').text($li.eq(_this.index).text())
            // $(_this.dom).find('span').attr({'value': $li.eq(_this.index).attr('value'), 'index': _this.index})
            // $(_this.dom).find('ul').hide()
            if(e.target.id != 'personLiable'){
              $li.eq(_this.index).click()
            }
          }
        }
      })

    }
  }

}