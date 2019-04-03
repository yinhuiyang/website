$(function(){
   var html = '<div class="taskModal-schedule"  style="display:none;z-index: 50;">  ' +
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
//    $('body').append(html);
//    task.addProgress($('.taskModal-schedule'))
//     coos.element.init('.taskModal-schedule')
});