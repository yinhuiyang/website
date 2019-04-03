(function () {
    var app = window.app || {};
    window.app = app;
    app.status_map = {
        '0': '<span class="coos-grey">规划中</span>',
        '1': '<span class="coos-blue">开始</span>',
        '2': '<span class="coos-yellow">进行中</span>',
        '8': '<span class="coos-green">完成</span>',
        '9': '<span class="coos-green">上线</span>'
    };
    app.initMyTask = function (versionid) {
        var $flag = $('[coos-target=".tab-span-my-task"] .coos-flag');
        var $tbody = $('.tab-span-my-task tbody');
        $tbody.empty();
        if ($flag.length > 0) {
            var action = "/data/getMyTask.do";
            var data = {};
            data.versionid = versionid;
            coos.POST(action, data, 'json', function (o) {
                var status = o.data;
                var tasks = [];
                $(status.result.needs).each(function (index, task) {
                    tasks.push(task);
                });
                $(status.result.tasks).each(function (index, task) {
                    tasks.push(task);
                });

                $flag.html(tasks.length);

                if (tasks.length == 0) {
                    $tbody.append('<tr class="is-no-data-tr"><td colspan="4" class="text-center">暂无匹配数据</td></tr>');
                } else {
                    $(tasks).each(function (index, one) {
                        var $tr = $('<tr></tr>');
                        $tr.append('<td>' + one.needtitle + '</td>');
                        $tr.append('<td>' + one.title + '</td>');
                        $tr.append('<td>' + app.status_map[one.needstatus] + '</td>');
                        var $td = $('<td></td>');
                        $tr.append($td);
                        $td.append('<a class="coos-btn coos-btn-xs mgr-5 coos-bd-yellow coos-yellow toActionBtn" toaction="task/need/toView.do?needid=' + one.needid + '">需求详情</a>');
                        $td.append('<a class="coos-btn coos-btn-xs mgr-5 coos-bd-yellow coos-yellow getAnnexBtn" needid="' + one.needid + '" versionid="' + one.versionid + '">附件</a>');
                        $td.append('<a class="coos-btn coos-btn-xs mgr-5 coos-bd-yellow coos-yellow toActionBtn" toaction="task/alltask/toIndex.do?status='+one.needstatus+'&needid=' + one.needid + '">任务</a>');
                        $td.append('<a class="coos-btn coos-btn-xs mgr-5 coos-bd-yellow coos-yellow toActionBtn complete" messageid="' + one.messageid + '">完成</a>');

                        $tbody.append($tr);
                    });
                }
            });
        }
    };
})();
var inited = false;
$(function () {
    var $view_model = $('.task_annex_view');
    if ($view_model.length == 0) {
        return;
    }
    if (inited) {
        return;
    }
    inited = true;

    var createInput = function () {
        return $('<input label="" name="test" label-size="0" type="hidden" isreadonly="true" class="input-rule-group input-rule-file" need-addon="true" placeholder="暂无附件" file-count="10">');
    }
    var getView = function (map) {
        var $view = $view_model.clone();
        var versions = map.version;
        $(versions).each(function (index, one) {
            var $one = createInput();
            $one.val(one.file);
            $view.find('.for-version').append($one);
        });
        for (var key in map) {
            var list = map[key];
            var fromname = "";
            if (key == 'need') {
                fromname = "产品";
            } else if (key == 'uiue') {
                fromname = "UI/UE";
            } else if (key == 'develop') {
                fromname = "研发";
            } else if (key == 'test') {
                fromname = "测试";
            } else {
                continue;
            }
            $(list).each(function (index, one) {
                if (!coos.isEmpty(one.images)) {
                    var $one = createInput();
                    $one.val(one.images);
                    $one.removeClass('input-rule-file');
                    $one.addClass('input-rule-file-image');
                    $one.attr('label-size', 2);
                    $one.attr('group-type', 4);
                    $one.attr('label', '' + one.tasktitle + '<span class="coos-green pdlr-10">[' + one.tasktypename + ']</span>' + '图片');
                    $view.find('.for-' + key).append($one);
                }
                if (!coos.isEmpty(one.file)) {
                    var $one = createInput();
                    $one.val(one.file);
                    $one.attr('label-size', 2);
                    $one.attr('group-type', 4);
                    $one.attr('label', '' + one.tasktitle + '<span class="coos-green pdlr-10">[' + one.tasktypename + ']</span>' + '附件');
                    $view.find('.for-' + key).append($one);
                }

            });
        }
        $view.find('.for-list').each(function (index, one) {
            var $one = $(one);
            if ($one.children().length == 0) {
                $one.append('<div class="text-center pd-10 ">暂无附件</div>')
            }
        });
        $view.show();
        coos.element.init($view);
        return $view;

    }

    // 防止事件重复绑定
    if (!window.TASK_EVENT_BINDED) {
        window.TASK_EVENT_BINDED = true;
        $('html').on('click', '.complete', function () {
            var messageid = $(this).attr('messageid');
            coos.box.confirm('确认完成？',
                function () {

                    var action = "/index/completeNeed.do";
                    var data = {};
                    data.messageid = messageid;
                    coos.POST(action, data, 'json', function (o) {
                        var status = o.data;
                        if (status.errcode == 0) {
                            location.reload();
                        } else {
                            coos.box.alert(status.errmsg);
                        }
                    });
                });

        });
        $('html').on('click', '.getAnnexBtn', function () {
            var needid = $(this).attr('needid');
            var versionid = $(this).attr('versionid');
            var action = "/index/getAnnex.do";
            var data = {};
            data.needid = needid;
            data.versionid = versionid;
            coos.POST(action, data, 'json', function (o) {
                var status = o.data;
                if (status.errcode == 0) {
                    var map = status.result;
                    var config = {};
                    config.title = "附件下载";
                    config.width = 1100;
                    var $html = getView(map);
                    config.html = $html;
                    var w = coos.box.window(config);
                    w.show();
                } else {
                    coos.box.alert(status.errmsg);
                }
            });
        });
    }
});