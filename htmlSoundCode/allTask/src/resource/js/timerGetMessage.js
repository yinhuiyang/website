// $(function () {
//     var action = coos.basePath+"core/service/task_systemmessage/count";
//     $.post(action,function (o) {
//         console.log($(".coos-select-tab"))
//         var content = $("<ul style='cursor:pointer'></ul>");
//         content.attr("id", "limessage");
//         content.attr("class", "coos-select-tab");
//         var html = "<li class='li_timermessage'>"+
//             "<i class=\"fa fa-bell-o fa-lg\"></i>"+
//             "<span class='span_timermessage'>"+o.result.model1.value.count+"</span>"+
//             "</li>";
//         content.append(html);
//         $(".coos-select-tab").after(content);
//         console.log("**********************");
//
// });
//
//
//     $('html').on('click', "#limessage", function () {
//         var action = coos.basePath+"core/service/task_systemmessage/queryList";
//         var table = "<div class=\"table-responsive\" >";
//         table+="<table class=\"coos-table\">";
//         table+="<thead>";
//         table+="<tr>";
//         table+="<th width='30px'></th><th>消息标题</th><th>消息内容</th><th>创建日期</th><th>消息类型</th>";
//         table+="</tr>";
//         table+="</thead>";
//         table+="<tbody>";
//         $.post(action,function (o) {
//             var tmpdata=o.result.model1.value;
//             if(o.errcode==0&&tmpdata.length>0){
//                 var tcount=0;
//                 while (tcount<tmpdata.length){
//                     table+="<tr onclick='readtask(\""+tmpdata[tcount].messageid+"\")'>";
//                     table+="<td>";
//                     if(tmpdata[tcount].messagereadstatus==0){
//                         table+="<i class=\"fa fa-envelope-o fa-lg\"></i>";
//                     }
//                     else{
//                         table+="<i class=\"fa fa-envelope-open-o fa-lg\"></i>";
//                     }
//
//                     table+="</td><td>"+tmpdata[tcount].messagetitle+"</td><td>"+tmpdata[tcount].messagecontent+
//                         "</td><td>"+coos.date.formatDatetime(tmpdata[tcount].createtime)
//                         +"</td><td>"+tmpdata[tcount].messagetype+"</td>";
//                     table+="</tr>";
//                     tcount+=1;
//                 }
//             }
//             table+="</tbody>";
//             table+="</table>";
//             table+="</div>";
//             var windowconfig = {};
//             windowconfig.title = "系统消息";
//             windowconfig.cancelCallback = function () {
//             };
//             windowconfig.id="window_timer";
//             windowconfig.html = $(table);
//             // windowconfig.width = "600px";
//             // windowconfig.top = "42.5px";
//             var w = coos.box.window(windowconfig);
//             w.show();
//         });
//
//     })
//
//
// })

// var task1={};
$(function () {
    task.init();
    defect.init();
    showcount();
    $('body').on('click', "#limessage", function () {
        var action = coos.basePath + "core/service/task_systemmessage/queryList";
        var table = "<div class=\"table-responsive\" >";
        table += "<table class=\"coos-table\">";
        table += "<thead>";
        table += "<tr>";
        table += "<th width='30px'></th><th>消息标题</th><th>项目名及版本名</th><th>消息内容</th><th>创建日期</th><th>消息类型</th>";
        table += "</tr>";
        table += "</thead>";
        table += "<tbody>";
        $.post(action, function (o) {


            if (o.errcode == 0) {
                var tmpdata = o.result.model1.value;
                if (tmpdata.length > 0) {


                    var tcount = 0;
                    while (tcount < tmpdata.length) {

                        var tt = JSON.stringify(tmpdata[tcount])

                        table += "<tr >";
                        table += "<td>";
                        if (tmpdata[tcount].messagereadstatus == 0) {
                            table += "<i class=\"fa fa-envelope-o fa-lg\"></i>";
                        }
                        else {
                            table += "<i class=\"fa fa-envelope-open-o fa-lg\"></i>";
                        }

                        var messagetype = "";
                        switch (tmpdata[tcount].messagetype) {
                            case "0":
                                messagetype = "需求消息";
                                break;
                            case "1":
                                messagetype = "任务消息";
                                break;
                            case "2":
                                messagetype = "缺陷消息";
                                break;
                        }

                        table += "</td><td>" + tmpdata[tcount].messagetitle + "</td>" +
                            "<td>" + tmpdata[tcount].projectname + "-" + tmpdata[tcount].versiontitle + "</td>" +
                            "<td style='cursor:pointer' onclick='readtask(" + tt + ")'>" + tmpdata[tcount].messagecontent +
                            "</td><td>" + coos.date.formatDatetime(tmpdata[tcount].createtime)
                            + "</td><td>" + messagetype + "</td>";
                        table += "</tr>";
                        tcount += 1;
                    }
                }
            }
            else {
                table += "<tr >";
                table += "<td colspan='6' style='text-align: center;'>暂无数据";
                table += "</td>";
                table += "</tr>";
            }
            table += "</tbody>";
            table += "</table>";
            table += "</div>";
            var windowconfig = {};
            windowconfig.title = "系统消息";
            windowconfig.cancelCallback = function () {
            };
            windowconfig.id = "window_timer";
            windowconfig.html = $(table);
            // windowconfig.width = "600px";
            // windowconfig.top = "42.5px";
            var w = coos.box.window(windowconfig);
            w.show();
        });

    })
    // task1 = task
})

function showcount() {

    var action = coos.basePath + "core/service/task_systemmessage/count";
    $.post(action, function (o) {
        //console.log($(".coos-select-tab"))
        var content = $("<ul style='cursor:pointer'></ul>");
        content.attr("id", "limessage");
        content.attr("class", "coos-select-tab");
        var html = "<li class='li_timermessage'>" +
            "<i class=\"fa fa-bell-o fa-lg\"></i>" +
            "<span class='span_timermessage'>" + o.result.model1.value.count + "</span>" +
            "</li>";
        content.append(html);
        $("#limessage").remove();
        $(".coos-select-tab").after(content);

        //console.log("**********************");

    });
}


function readtask(messageid) {
    if (!coos.isEmpty(messageid)) {

        var action = coos.basePath + "core/service/task_systemmessage/insertOrUpdate";
        var postdata = {};
        postdata["messageid"] = messageid.messageid;
        postdata["messagereadstatus"] = "1";
        $.post(action, postdata, function (o) {
            switch (messageid.messagetype) {
                case "0":
                    //$(".coos-box-cancel").click();
                    showcount();
                    task.dialog({needTitle: messageid.messagecontent, needid: messageid.needid, addModal: true})
                    break;
                case "1":
                    //$(".coos-box-cancel").click();
                    showcount();
                    task.dialog({taskid:messageid.taskid, needTitle:messageid.needtitle});
                    break;
                case "2":
                    //$(".coos-box-cancel").click();
                    showcount();
                    defect.dialog({bugid: messageid.bugid, task_need_title: messageid.needtitle})
                    break;
            }

        })
    }
}

setInterval('showcount()', 300000);
