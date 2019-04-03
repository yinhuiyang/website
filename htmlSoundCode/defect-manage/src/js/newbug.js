var data= require('./data.js');
var state= require('./nav.js');
var getlist = require('./getlist.js');
var { getBugStatusList, getBugLevelList, getBugSourceList, queryOne, getQualityLevel, getPriorityLevel } = require('./api.js');
var dialog = require('./dialog.js');
var defect = {
  defectInit() {
    this.bodyFn();
    setTimeout(function () {
      getlist();
      state(getlist, data);
    }, 500);
    $('body').click(function () {
      $('.select-chaozuo').hide()
    })
  },
  init() {
    // coos.basePath = 'http://localhost:8000/api/';
    try {
      data.bugStatus = getBugStatusList().data.result;
      data.bugLevel = getBugLevelList().data.result;
      data.bugSource = getBugSourceList().data.result;
      data.qualityLevel=getQualityLevel().result.model1.value;
      data.priorityLevel=getPriorityLevel().result.model1.value;
    } catch (error) {
      console.log('未登录', error);
    }
  },
  bodyFn() {
    $('body').click(function () {
      $('.dropDownBox').hide();
    })
  },
  dialog (res={}) {
    let paramet = {}
    if (!res.bugid){
      paramet = {
        needid: res.needid ||'',
        task_need_title: res.task_need_title || '',
        addDefect: true
      }
    }else{
      paramet = queryOne({bugid: res.bugid}).result.model1.value
    }
    dialog(paramet);
  }
};
window.defect = defect;
