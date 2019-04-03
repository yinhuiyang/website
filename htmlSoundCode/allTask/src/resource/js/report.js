(function() {
	app.report = app.report || new Object();

	app.report.doCount = function(data, $box) {
		$box.empty();
		$box.append('<div class="coos-yellow text-center ">数据加载中，请稍后...</div>');
		if (!coos.isEmpty(data.startdate) && !coos.isEmpty(data.enddate)) {
			var action = '/report/count.do';
			coos.POST(action, data, 'json', function(result) {
				var status = result.data;
				if (status.errcode == 0) {
					var map = status.result || {};
					map.startdate = data.startdate;
					map.enddate = data.enddate;
					app.report.view(status.result, $box);
				} else {
					coos.box.info(status.errmsg);
				}
			});
		}
	};
	app.report.exportUserWorkhour = function(data) {
		if (!coos.isEmpty(data.startdate) && !coos.isEmpty(data.enddate)) {
			var action = '/report/exportUserWorkhour.do';
			coos.toUrl(action, data);
		}
	};
	app.report.view = function(map, $box) {

		app.report.initData(map);
		$box.empty();

		var $tab = $('<div class="coos-tab coos-tab-no-bd"/>');
		$box.append($tab);

		var $btns = $('<ul class="coos-tab-buttons" />');
		$tab.append($btns);
		var $spans = $('<div class="coos-tab-spans" />');
		$tab.append($spans);

		$btns.append('<li coos-target=".report-base" class="active"><a>总览</a></li>');
		var $span = $('<div class="report-base coos-tab-span active" />');
		$spans.append($span);
		var $baseView = $('<div class="coos-row"/>');
		$span.append($baseView);
		$btns.find('li:last').click(function() {
			$spans.find('.report-base').addClass('active');
			app.report.buildBaseView(map, $baseView);
		});

		$btns.append('<li coos-target=".report-project" class=""><a>项目</a></li>');
		var $span = $('<div class="report-project coos-tab-span " />');
		$spans.append($span);
		var $projectView = $('<div class="coos-row"/>');
		$span.append($projectView);
		$btns.find('li:last').click(function() {
			$spans.find('.report-project').addClass('active');
			app.report.buildProjectView(map, $projectView);
		});

		$btns.append('<li coos-target=".report-version" class=""><a>项目版本</a></li>');
		var $span = $('<div class="report-version coos-tab-span " />');
		$spans.append($span);
		var $projectVersionView = $('<div class="coos-row"/>');
		$span.append($projectVersionView);
		$btns.find('li:last').click(function() {
			$spans.find('.report-version').addClass('active');
			app.report.buildProjectVersionView(map, $projectVersionView);
		});

		$btns.append('<li coos-target=".report-project-contrast" class=""><a>项目消耗对比</a></li>');
		var $span = $('<div class="report-project-contrast coos-tab-span " />');
		$spans.append($span);
		var $projectContrastView = $('<div class="coos-row"/>');
		$projectContrastView.append('<div class="coos-yellow text-center ">暂未开放，敬请关注</div>')
		$span.append($projectContrastView);
		$btns.find('li:last').click(function() {
			$spans.find('.report-project-contrast').addClass('active');
			app.report.buildProjectContrastView(map, $projectContrastView);
		});

		$btns.append('<li coos-target=".report-group" class=""><a>各组消耗对比</a></li>');
		var $span = $('<div class="report-group coos-tab-span " />');
		$spans.append($span);
		var $groupView = $('<div class="coos-row"/>');
		$groupView.append('<div class="coos-yellow text-center ">暂未开放，敬请关注</div>')
		$span.append($groupView);
		$btns.find('li:last').click(function() {
			$spans.find('.report-group').addClass('active');
			app.report.buildGroupView(map, $groupView);
		});

		$btns.find('li:first').click();
	};

	app.report.buildProjectVersionView = function(map, $box) {

		// 按工时从大到小
		map.projects.sort(function(a, b) {
			return a.workhour - b.workhour;
		});
		var series = [];
		var sery_workhour = app.report.sery_workhour();
		series.push(sery_workhour);
		var sery_error_workhour = app.report.sery_error_workhour();
		series.push(sery_error_workhour);
		var sery_need = app.report.sery_need();
		series.push(sery_need);
		var sery_bug = app.report.sery_bug();
		series.push(sery_bug);
		var sery_user = app.report.sery_user();
		series.push(sery_user);
		var sery_error_user = app.report.sery_error_user();
		series.push(sery_error_user);
		var yData = [];
		$(map.projects).each(function(index, project) {
			var versions = map.project_versions_map[project.projectid];
			$(versions).each(function(index, version) {
				var name = project.name + '/' + version.title;
				yData.push(name);

				sery_workhour.pushData(version.task_workhour + version.bug_workhour_internal, version);
				sery_error_workhour.pushData(version.bug_workhour_external, version);
				sery_need.pushData(version.need_count, version);
				sery_bug.pushData(version.bug_count_external, version);
				sery_user.pushData(version.task_user_count, version);
				sery_error_user.pushData(version.bug_user_count_external, version);

			});
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
				text : '项目版本工时/人力统计',
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
				data : [ '工时', '人力', '工时（缺陷）', '人力（缺陷）', '需求数', '缺陷数' ]
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

		if (window.projectVersionViewChart) {
			window.projectVersionViewChart.dispose();
		}
		$box.css('height', yData.length * 80 + 100);

		window.projectVersionViewChart = echarts.init($box[0]);
		window.projectVersionViewChart.setOption(options);
		window.projectVersionViewChart.on('click', function(params) {
			if (params && params.data && params.data.data) {
				app.report.need.viewVersion(params.data.data, map);
			}
		});
	};

	app.report.buildProjectView = function(map, $box) {

		// 按工时从大到小
		map.projects.sort(function(a, b) {
			return a.workhour - b.workhour;
		});
		var series = [];
		var sery_workhour = app.report.sery_workhour();
		series.push(sery_workhour);
		var sery_error_workhour = app.report.sery_error_workhour();
		series.push(sery_error_workhour);
		var sery_need = app.report.sery_need();
		series.push(sery_need);
		var sery_bug = app.report.sery_bug();
		series.push(sery_bug);
		var sery_user = app.report.sery_user();
		series.push(sery_user);
		var sery_error_user = app.report.sery_error_user();
		series.push(sery_error_user);
		var yData = [];
		$(map.projects).each(function(index, project) {
			var name = project.name;
			yData.push(name);

			sery_workhour.pushData(project.task_workhour + project.bug_workhour_internal);
			sery_error_workhour.pushData(project.bug_workhour_external);
			sery_need.pushData(project.need_count);
			sery_bug.pushData(project.bug_count_external);
			sery_user.pushData(project.task_user_count);
			sery_error_user.pushData(project.bug_user_count_external);
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
				text : '项目工时/人力统计',
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
				data : [ '工时', '人力', '工时（缺陷）', '人力（缺陷）', '需求数', '缺陷数' ]
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
	app.report.buildGroupView = function(map, $box) {

		// 按工时从大到小
		map.groups.sort(function(a, b) {
			return a.workhour - b.workhour;
		});
		var series = [];
		var sery_workhour = app.report.sery_workhour();
		series.push(sery_workhour);
		var sery_error_workhour = app.report.sery_error_workhour();
		series.push(sery_error_workhour);
		var sery_need = app.report.sery_need();
		series.push(sery_need);
		var sery_bug = app.report.sery_bug();
		series.push(sery_bug);
		var sery_user = app.report.sery_user();
		series.push(sery_user);
		var sery_error_user = app.report.sery_error_user();
		series.push(sery_error_user);

		var yData = [];
		$(map.groups).each(function(index, group) {
			if (group.task_workhour == 0 && group.need_count == 0) {
				return;
			}
			var name = group.subtitle;
			yData.push(name);
			sery_workhour.pushData(group.task_workhour + group.bug_workhour_internal, group);
			sery_error_workhour.pushData(group.bug_workhour_external, group);
			sery_need.pushData(group.need_count, group);
			sery_bug.pushData(group.bug_count_external, group);
			sery_user.pushData(group.user_count, group);
			sery_error_user.pushData(group.bug_user_count_external, group);

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
				text : '小组工时/人力统计',
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
				data : [ '工时', '工时（缺陷）', '人力', '人力（缺陷）', '需求数', '缺陷数' ]
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

		if (window.groupViewChart) {
			window.groupViewChart.dispose();
		}
		$box.css('height', yData.length * 80 + 100);

		window.groupViewChart = echarts.init($box[0]);
		window.groupViewChart.setOption(options);
		window.groupViewChart.on('click', function(params) {
			if (params && params.data && params.data.data) {
				app.report.group.view(params.data.data, map);
			}
		});
	};
	var getColors = function() {
		var colors = [ '#C23531', '#2F4554', '#61A0A8', '#D48265', '#91C7AE', '#749F83', '#CA8622', '#BDA29A', '#6E7074', '#546570', '#C4CCD3' ];
		var colorList = [ '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',

		'#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',

		'#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'

		];
		$(colorList).each(function(index, color) {
			if (colors.indexOf(color) < 0) {
				colors.push(color);
			}
		});
		return colors;
	};
	var colors = getColors();
	var getColor = function(dataIndex) {
		var count = colors.length - 1;
		var index = dataIndex;
		if (dataIndex > count) {
			index = dataIndex % count;
		}
		return colors[index];
	};
	app.report.buildProjectContrastView = function(map, $box) {
		$box.empty();

		// 按工时从大到小
		map.projects.sort(function(a, b) {
			return b.workhour - a.workhour;
		});
		var goups = [ {
			name : 'workhour',
			label : '工时'
		}, {
			name : 'user_count',
			label : '人力'
		} ];
		$(goups).each(function(index, group) {
			var label = group.label;
			var legendData = [];
			var data = [];
			var bugData = [];
			var selected = {};
			$(map.projects).each(function(index, project) {
				var name = project.name;
				legendData.push(name);
				selected[name] = index < 10;
				var count = 0;
				var bug_count = 0;

				if (group.name == 'workhour') {
					count = project.task_workhour + project.bug_workhour_internal;
					bug_count = project.bug_workhour_external;
				} else if (group.name == 'user_count') {
					count = project.task_user_count;
					bug_count = project.bug_user_count_external;
				}

				data.push({
					value : count,
					name : name
				});
				bugData.push({
					value : bug_count,
					name : name
				});
			});

			var options = {
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b}: {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					x : 'left',
					data : legendData,
					selected : selected
				},
				series : [ {
					name : label + '（缺陷）',
					type : 'pie',
					selectedMode : 'single',
					radius : [ 0, '30%' ],
					label : {
						normal : {
							show : false,
							position : 'center'
						}
					},
					labelLine : {
						normal : {
							show : false
						}
					},
					itemStyle : {
						normal : {
							color : function(params) {
								return getColor(params.dataIndex);
							}
						}
					},
					data : bugData
				}, {
					name : label + '',
					type : 'pie',
					radius : [ '40%', '55%' ],
					itemStyle : {
						normal : {
							color : function(params) {
								return getColor(params.dataIndex);
							}
						}
					},
					data : data
				} ]
			};

			if (window[id]) {
				window[id].dispose();
			}

			var $view = $('<div class="coos-row mgt-20"/>');
			$box.append($view);
			var id = 'project-contrast-' + group.name + '-chart';
			$view.css('height', 800);

			window[id] = echarts.init($view[0]);
			window[id].setOption(options);
		});
	};
	app.report.buildBaseView = function(map, $box) {
		$box.empty();

		var goups = [ {
			name : 'workhour',
			label : '工时'
		}, {
			name : 'user_count',
			label : '人力'
		} ]
		$(goups).each(function(index, group) {
			var count = 0;
			var error_count = 0;
			$(map.projects).each(function(index, project) {
				if (group.name == 'workhour') {
					count += project.task_workhour + project.bug_workhour_internal;
					error_count += project.bug_workhour_external;
				} else if (group.name == 'user_count') {
					count += project.task_user_count;
					error_count += project.bug_user_count_external;
				}
			});
			count = parseInt(count);
			error_count = parseInt(error_count);

			var options = {
				title : {
					text : group.label + '统计',
					subtext : '数据以进度数据为查询基础',
					x : 'center'
				},
				tooltip : {
					trigger : 'item',
					formatter : "{a} <br/>{b} : {c} ({d}%)"
				},
				legend : {
					orient : 'vertical',
					left : 'left',
					data : [ group.label, group.label + '（缺陷）' ]
				},
				series : [ {
					name : group.label + '统计',
					type : 'pie',
					radius : '55%',
					center : [ '50%', '60%' ],
					data : [ {
						value : count,
						name : group.label
					}, {
						value : error_count,
						name : group.label + '（缺陷）'
					} ]
				} ]
			};

			if (window[id]) {
				window[id].dispose();
			}

			var $view = $('<div class="coos-row mgt-20"/>');
			$box.append($view);
			var id = 'base-' + group.name + '-chart';
			$view.css('height', 300);

			window[id] = echarts.init($view[0]);
			window[id].setOption(options);
		});
	};
})();