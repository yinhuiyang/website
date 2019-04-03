(function() {
	app.report.group = app.report.group || new Object();

	app.report.group.view = function(group, map) {
		var $box = $('<div class="coos-box coos-box-window" style="position: absolute;"/>');
		$box.attr('style', 'background: white;padding: 40px 30px;overflow: auto;');
		var $close = $('<div class=" coos-btn coos-green coos-btn-link coos-close-gtt-btn">关闭</div>');
		$close.attr('style', 'position: absolute;z-index: 1;right: 16px;top: 16px;');
		$close.click(function() {
			$box.remove();
			$('body').removeClass('coos-over-hidden');
		});
		$box.append($close);
		var $selector = $('<div class="coos-row"/>');
		$box.append($selector);
		$('body').append($box);
		$('body').addClass('coos-over-hidden');
		app.report.group.buildTabView(group, map, $selector);
	};
	app.report.group.buildTabView = function(group, map, $box) {
		var $tab = $('<div class="coos-tab coos-tab-no-bd"/>');
		$box.append($tab);

		var $btns = $('<ul class="coos-tab-buttons" />');
		$tab.append($btns);
		var $spans = $('<div class="coos-tab-spans" />');
		$tab.append($spans);

		$btns.append('<li coos-target=".report-group-user" class="active"><a>组内人员消耗</a></li>');
		var $span = $('<div class="report-group-user coos-tab-span active" />');
		$spans.append($span);
		var $groupUserView = $('<div class="coos-row"/>');
		$span.append($groupUserView);
		$btns.find('li:last').click(function() {
			$spans.find('.report-group-user').addClass('active');
			app.report.group.buildGroupUserView(group, map, $groupUserView);
		});

		$btns.append('<li coos-target=".report-group-need" class="active"><a>组参与需求消耗</a></li>');
		var $span = $('<div class="report-group-need coos-tab-span active" />');
		$spans.append($span);
		var $groupNeedView = $('<div class="coos-row"/>');
		$span.append($groupNeedView);
		$btns.find('li:last').click(function() {
			$spans.find('.report-group-need').addClass('active');
			app.report.group.buildGroupNeedView(group, map, $groupNeedView);
		});

		$btns.find('li:first').click();

	};
	app.report.group.buildGroupUserView = function(group, map, $box) {
		var users = map.group_users_map[group.groupid];

		// 按工时从大到小
		users.sort(function(a, b) {
			return a.workhour - b.workhour;
		});
		var series = [];
		var sery_workhour = app.report.sery_workhour();
		series.push(sery_workhour);
		var sery_error_workhour = app.report.sery_error_workhour();
		series.push(sery_error_workhour);
		var sery_task = app.report.sery_task();
		series.push(sery_task);
		var sery_bug = app.report.sery_bug();
		series.push(sery_bug);
		var yData = [];
		$(users).each(function(index, user) {
			var name = user.username;
			yData.push(name);

			sery_workhour.pushData(user.task_workhour + user.bug_workhour_internal);
			sery_error_workhour.pushData(user.bug_workhour_external);
			sery_task.pushData(user.task_count);
			sery_bug.pushData(user.bug_count_external);
		});

		var min = -200;
		var max = 200;
		$(series).each(function(index, one) {
			$(one.data).each(function(index, data) {
				if (data.value) {
					if (data.value < min) {
						min = data.value;
					}
					if (data.value > max) {
						max = data.value;
					}
				}
			});
		});
		var options = {
			title : {
				text : group.subtitle + '组人员工时/人力统计',
				subtext : '数据以进度数据为查询基础' + '（' + map.startdate + '-' + map.enddate + '）',
				x : 'left'
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter : app.report.baseFormatter
			},
			legend : {
				data : [ '工时', '人力', '工时（缺陷）', '人力（缺陷）', '任务数', '缺陷数' ]
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : [ {
				min : min,
				max : max,
				type : 'value'
			} ],
			yAxis : [ {
				type : 'category',
				axisTick : {
					show : false
				},
				data : yData
			} ],
			series : series
		};

		if (window.projectViewChart) {
			window.projectViewChart.dispose();
		}
		$box.css('height', yData.length * 80 + 100);

		window.projectViewChart = echarts.init($box[0]);
		window.projectViewChart.setOption(options);
	};
	app.report.group.buildGroupNeedView = function(g, map, $box) {
		var needs = map.group_needs_map[g.groupid];

		// 按工时从大到小
		needs.sort(function(a, b) {
			return a.workhour - b.workhour;
		});
		var legendData = [ '工时', '工时（缺陷）' ];
		var series = [];
		var sery_workhour = app.report.sery_workhour();
		series.push(sery_workhour);
		var sery_error_workhour = app.report.sery_error_workhour();
		series.push(sery_error_workhour);
		var yData = [];
		var group_sery_map = {};
		var group_sery_error_map = {};

		$(needs).each(function(index, need) {
			var name = need.title;
			if (map.version_map[need.versionid]) {
				name = map.version_map[need.versionid].title + '/' + name;
			}
			if (map.project_map[need.projectid]) {
				name = map.project_map[need.projectid].name + '/' + name;
			}
			need.status = need.status || 0;
			if (need.status == 0) {
				name += '（规划中）';
			} else if (need.status == 1) {
				name += '（启动）';
			} else if (need.status == 8) {
				name += '（完成）';
			} else if (need.status == 9) {
				name += '（上线）';
			} else {
				name += '（进行中）';
			}
			yData.push(name);

			var groups = map.need_groups_map[need.needid];
			$(groups).each(function(index, group) {
				if (group.groupid != g.groupid) {
					return;
				}
				// legendData.push(group.subtitle + '（工时）');
				// legendData.push(group.subtitle + '（缺陷）');

				var sery1 = group_sery_map[group.groupid] || app.report.sery_workhour();
				sery1.name = group.subtitle + '（工时）';
				sery1.stack = group.subtitle;

				group_sery_map[group.groupid] = sery1;
				if (series.indexOf(sery1) < 0) {
					series.push(sery1);
				}

				var sery2 = group_sery_error_map[group.groupid] || app.report.sery_error_workhour();
				sery2.name = group.subtitle + '（缺陷）';
				sery2.stack = group.subtitle;
				group_sery_error_map[group.groupid] = sery2;
				if (series.indexOf(sery2) < 0) {
					series.push(sery2);
				}

			});

		});
		$(needs).each(function(needIndex, need) {

			sery_workhour.pushData(need.task_workhour);
			sery_error_workhour.pushData(need.bug_workhour + need.bug_workhour_internal);

			var groups = map.need_groups_map[need.needid];

			var user_temp = {};

			$(groups).each(function(index, group) {
				if (group.groupid != g.groupid) {
					return;
				}

				var sery1 = group_sery_map[group.groupid];
				for (var i = 0; i < needIndex; i++) {
					if (sery1.data.length <= i) {
						sery1.pushData(null);
					}
				}
				var work = app.report.getGroupNeedWork(group, need, map, user_temp);
				sery1.pushData(work.task_workhour + work.bug_workhour_internal);

				var sery2 = group_sery_error_map[group.groupid];

				for (var i = 0; i < needIndex; i++) {
					if (sery2.data.length <= i) {
						sery2.pushData(null);
					}
				}

				sery2.pushData(work.bug_workhour_external);

			});
		});
		var groupsize = Object.keys(group_sery_map).length;

		var min = -200;
		var max = 200;
		$(series).each(function(index, one) {
			$(one.data).each(function(index, data) {
				if (data.value) {
					if (data.value < min) {
						min = data.value;
					}
					if (data.value > max) {
						max = data.value;
					}
				}
			});
		});
		var options = {
			title : {
				text : g.subtitle + '需求工时/人力统计',
				subtext : '数据以进度数据为查询基础' + '（' + map.startdate + '-' + map.enddate + '）',
				x : 'left'
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : { // 坐标轴指示器，坐标轴触发有效
					type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter : app.report.baseFormatter
			},
			legend : {
				data : legendData
			},
			grid : {
				left : '3%',
				right : '4%',
				bottom : '3%',
				containLabel : true
			},
			xAxis : [ {
				min : min,
				max : max,
				type : 'value'
			} ],
			yAxis : [ {
				type : 'category',
				axisTick : {
					show : false
				},
				data : yData
			} ],
			series : series
		};

		if (window.projectViewChart) {
			window.projectViewChart.dispose();
		}
		$box.css('height', yData.length * (40 + (groupsize * 20)) + 150);

		window.projectViewChart = echarts.init($box[0]);
		window.projectViewChart.setOption(options);
	};
})();