var data = require('./data.js');
var nav = require('./nav.js');
var load= require('./load.js');
var dialog = require('./dialog.js');
var { getTaskStatusList, taskDifficulty, getTaskTypeList, taskQuery } = require('./api.js');
// coos.basePath = 'http://localhost:8080/api/';

window.task = {
  init () {
    getTaskStatusList().then((res => {
      if (res.data) {
        data.taskState = res.data.result;
      } 
    }))
    taskDifficulty().then(res => {
      if(res.result) {
        data.taskDifficulty = res.result.model1.value;
      }
    })
    getTaskTypeList().then(res => {
      if (res.data){
        data.taskType = res.data.result;
      }
    })
    this.bodyFn();
  },
  taskInit () {
    nav();
    load().init();
  },
  bodyFn () {
    $('body').on('click',function(){
      $('.taskdown').hide()
      $('.taskModal-state>ul').hide()
      $('.difficultylevelid>ul').hide()
      $('.typeid>div').hide()
      $('.menuList').hide()
    })
  },
  dialog({needid, needTitle, addModal=false, taskid=""}) {
    if (addModal){
      dialog({needid, needTitle, addModal})
    } else {
      taskQuery({taskid}).then(res => {
        res.result.model1.value.needTitle = needTitle
        $('body').addClass('coos-over-hidden')
        dialog(res.result.model1.value)
      })
    }
  }
}