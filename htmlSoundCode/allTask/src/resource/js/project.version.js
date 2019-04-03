(function() {
	var app = window.app || {};
	window.app = app;

	app.project = app.project || {};
	app.project.count = app.project.count || {};

	app.project.count.init = function() {
		$('.project-count-form [name="projectid"]').change(function() {
			var projectid = this.value;
			if (coos.isEmpty(projectid)) {
				return;
			}
			app.project.buildCountView();
			coos.plugin.add({
				flot_pie : {
					js : [ "resource/plugins/flot/jquery.flot.js", "resource/plugins/flot/jquery.flot.pie.js" ],
					css : []
				}
			});

			coos.plugin.load('flot_pie', function() {
				app.project.initVersion(projectid);
			});
		});
	};
	var $list_view = null;
	var $count_view_1 = null;
	var $count_view_2 = null;
	var $count_view_3 = null;
	app.project.buildCountView = function() {
		$('.version-count-view').empty();
		$('.list-view').remove();
		$list_view = $('<div class="list-view pdlr-10" ></div>');
		$('.version-count-view').append($list_view);

		$('.count-view-list').remove();
		var $count_list = $('<div class="count-view-list" ></div>');
		$('.version-count-view').append($count_list);

		var $one = $('<div class="count-view-one" ></div>');
		$count_view_1 = $('<div class="count-view" ><div class="count-loading" >数据加载中，请稍等！</div></div>');
		$one.append($count_view_1);
		$one.append('<div class="count-title" >项目版本需求占比</div>');
		$count_list.append($one);

		var $one = $('<div class="count-view-one" ></div>');
		$count_view_2 = $('<div class="count-view" ><div class="count-loading" >数据加载中，请稍等！</div></div>');
		$one.append($count_view_2);
		$one.append('<div class="count-title" >项目版本任务占比</div>');
		$count_list.append($one);

		var $one = $('<div class="count-view-one" ></div>');
		$count_view_3 = $('<div class="count-view" ><div class="count-loading" >数据加载中，请稍等！</div></div>');
		$one.append($count_view_3);
		$one.append('<div class="count-title" >项目版本人力占比</div>');
		$count_list.append($one);

	};
	app.project.initVersion = function(projectid) {
		app.project.loadVersionList(projectid, function(versions) {
			app.project.loadNeedList(projectid, null, function(needs) {
				$(versions).each(function(index, version) {
					var ns = [];
					var need_count = 0;
					var need_success_count = 0;
					$(needs).each(function(index, need) {
						if (need.versionid == version.versionid) {
							need_count++;
							if (need.status >= 8) {
								need_success_count++;
							}
							ns.push(need);
						}
					});
					version.planonlinetime_str = coos.date.formatDatetime(version.planonlinetime);

					var status_str = app.status_map[version.status];

					version.status_str = status_str;
					version.needs = ns;
					version.need_count = need_count;
					version.need_success_count = need_success_count;
					version.need_count_str = '<span class="coos-green pdlr-5">' + need_success_count + '</span>/<span  class=" pdlr-5 coos-yellow">' + need_count + '</span>';
				});

				app.project.loadTaskByNeeds(needs, function() {
					var datas = [];

					$(versions).each(function(index, version) {
						var data = {};

						var version_task_count = 0;
						var version_task_success_count = 0;
						var version_tasks = [];
						$(version.needs).each(function(index, need) {
							var tasks = [];
							$(need.tasks).each(function(index, task) {
								tasks.push(task);
								version_tasks.push(task);
							});
							need.tasks = tasks;

							need.planonlinetime_str = coos.date.formatDatetime(need.planonlinetime);
							need.status_str = app.status_map[need.status];
							var task_count = tasks.length;
							var task_success_count = 0;
							var task_delay_count = 0;
							var now_date = new Date();
							$(tasks).each(function(index, task) {
								if (task.status >= 8) {
									task_success_count++;
								} else {
									var planendtime = task.planendtime;

									var planenddate = new Date(coos.date.formatDatetime(planendtime));
									if (planenddate.getTime() <= now_date.getTime()) {
										task_delay_count++;
									}
								}
								var last_task_time = version.last_task_time || version.planonlinetime || task.planendtime || task.endtime;

								if (last_task_time) {
									if (task.planendtime && last_task_time < task.planendtime) {
										last_task_time = task.planendtime;
									}
									if (task.endtime && last_task_time < task.endtime) {
										last_task_time = task.endtime;
									}
									version.last_task_time = last_task_time;
								}
								var first_task_time = version.first_task_time || task.starttime || version.createtime;

								if (first_task_time) {
									if (task.starttime && last_task_time < task.starttime) {
										first_task_time = task.starttime;
									}
									version.first_task_time = first_task_time;
								}
							});
							version_task_success_count += task_success_count;
							need.task_count = task_count;
							need.task_delay_count = task_delay_count;
							need.task_success_count = task_success_count;
							need.task_no_success_count = task_count - task_success_count;

						});
						version_task_count = version_tasks.length;
						version.task_count = version_task_count;
						version.task_success_count = version_task_success_count;
						version.task_no_success_count = version_task_count - version_task_success_count;
						version.tasks = version_tasks;
						version.task_count_str = '<span class="coos-green pdlr-5">' + version_task_success_count + '</span>/<span  class=" pdlr-5 coos-yellow">' + version_task_count + '</span>';
					});
					app.project.initVersionView(versions);
					app.project.initVersionCountView(versions);
					app.project.initVersionTaskCountView(versions);
					app.project.initVersionTaskUserCountView(versions);
				});
			});
		});
	};
	app.project.initVersionView = function(versions) {
		$(versions).each(function(index, version) {
			var $viewBtn = $('<div class="coos-btn coos-btn-xs coos-green coos-bd-green">查看</div>')
			$viewBtn.click(function() {
				var needs = version.needs;

				var $table = app.createDataTable({
					titles : [ {
						label : '需求',
						name : 'title'
					}, {
						label : '计划上线时间',
						name : 'planonlinetime_str'
					}, {
						label : '状态',
						name : 'status_str'
					}, {
						label : '总任务',
						name : 'task_count'
					}, {
						label : '已完成',
						name : 'task_success_count'
					}, {
						label : '未完成',
						name : 'task_no_success_count'
					}, {
						label : '延期未完成任务',
						name : 'task_delay_count'
					} ],
					datas : needs
				});
				$table.find('thead tr th:last').remove();
				$table.find('tbody tr').each(function(index, tr) {
					$(tr).find('td:last').remove();
				});

				var $html = $('<div class="coos-col-12"/>');
				$html.css('min-height', '500px');
				$html.append($table);
				var w = coos.box.window({
					title : "版本需求列表",
					html : $html,
					width : 800
				});
				w.show();
			});

			var $countBtn = $('<div class=" mgl-5 coos-btn coos-btn-xs coos-yellow coos-bd-yellow">燃尽图</div>')
			$countBtn.click(function() {
				var options = getBurnMap(version);

				var $count_view = $('<div style="width: 900px;height: 450px;"/>')

				var $html = $('<div class="coos-col-12"/>');
				$html.append($count_view);

				var w = coos.box.window({
					title : "版本任务燃尽图",
					html : $html,
					width : 920
				});

				w.show();

				if (window.myChart) {
					window.myChart.dispose();
				}
				var myChart = echarts.init($count_view[0]);
				window.myChart = myChart;
				myChart.setOption(options);
			});
			version.$buttons = [ $viewBtn, $countBtn ];
		});
		var $table = app.createDataTable({
			titles : [ {
				label : '版本',
				name : 'title'
			}, {
				label : '计划上线时间',
				name : 'planonlinetime_str'
			}, {
				label : '状态',
				name : 'status_str'
			}, {
				label : '已完成需求/需求总数',
				name : 'need_count_str'
			}, {
				label : '已完成任务/任务总数',
				name : 'task_count_str'
			} ],
			datas : versions
		});
		$list_view.append($table);
	};
	app.project.initVersionCountView = function(versions) {
		var datas = [];
		var all_count = 0;
		$(versions).each(function(index, version) {
			var data = {};
			var need_count = version.needs.length;
			all_count += need_count;
			data.need_count = need_count;
			data.version_title = version.title;
			datas.push(data);
		});

		$(datas).each(function(index, data) {
			var need_count = data.need_count;
			data.data = Math.floor(100 * need_count / all_count);
			data.label = data.version_title + (" ( " + need_count + "个 / " + data.data + "% )");
		});

		app.project.initCountView($count_view_1, datas);
	};
	app.project.initVersionTaskCountView = function(versions) {

		var datas = [];
		var all_count = 0;
		$(versions).each(function(index, version) {
			var data = {};
			data.task_count = version.task_count;
			all_count += data.task_count;
			data.version_title = version.title;
			datas.push(data);
		});
		$(datas).each(function(index, data) {
			var task_count = data.task_count;
			data.data = Math.floor(100 * task_count / all_count);
			data.label = data.version_title + (" ( " + task_count + "个 / " + data.data + "% )");
		});
		app.project.initCountView($count_view_2, datas);

	};
	app.project.initVersionTaskUserCountView = function(versions) {
		var datas = [];
		var all_count = 0;
		var all_user = {};
		$(versions).each(function(index, version) {
			var data = {};
			var trustuser_count = 0;
			var version_user = {};
			$(version.tasks).each(function(index, task) {
				version_user[task.trustuserid] = task.trustuserid;
				all_user[task.trustuserid] = task.trustuserid;
			});
			trustuser_count = getObjectSize(version_user);
			data.trustuser_count = trustuser_count;
			data.version_title = version.title;
			datas.push(data);
		});
		all_count = getObjectSize(all_user);
		$(datas).each(function(index, data) {
			var trustuser_count = data.trustuser_count;
			data.data = Math.floor(100 * trustuser_count / all_count);
			data.label = data.version_title + (" ( " + trustuser_count + "人 / " + data.data + "% )");
		});
		app.project.initCountView($count_view_3, datas);
	};
	function getObjectSize(obj) {
		var count = 0;
		for ( var i in obj) {
			count++;
		}
		return count;
	}
	app.project.initCountView = function($count_view, datas) {
		$.plot($count_view, datas, {
			series : {
				pie : {
					show : true,
					radius : 0.9,
					label : {
						show : false,
						radius : 0.6,
						formatter : function(arg1, arg2) {
							var span = ('<span class="coos-white">' + arg1 + '</span>');
							return span;
						}
					}
				}
			},
			legend : {
				show : true
			}
		});
	};

	app.project.loadVersionList = function(projectid, callback) {
		app.loadDataFromService("/manager/project/version/queryList.do", {
			projectid : projectid
		}, callback);
	};
	app.project.loadNeedList = function(projectid, versionid, callback) {
		app.loadDataFromService("/manager/project/version/queryNeedList.do", {
			projectid : projectid,
			versionid : versionid
		}, callback);
	};
	app.project.loadNeedTaskList = function(needid, callback) {
		app.loadDataFromService("/manager/project/version/queryTaskList.do", {
			needid : needid
		}, callback);
	};
	app.project.loadTaskByNeeds = function(needs, callback) {
		var successcount = 0;
		$(needs).each(function(index, need) {
			app.project.loadTaskByNeedid(need.needid, function(tasks) {
				need.tasks = tasks;
				successcount++;
				if (successcount == needs.length) {
					callback && callback();
				}
			});
		});

	};
	app.project.loadTaskByNeedid = function(needid, callback) {
		app.project.loadNeedTaskList(needid, function(tasks) {

			callback && callback(tasks);

		});

	};

	app.loadDataFromService = function(aciton, data, callback) {
		coos.POST(aciton, data, 'json', function(o) {
			if (o.data.errcode == 0) {
				var result = o.data.result || [];
				callback && callback(result);
			} else {
				coos.box.info(o.data.errmsg);
			}
		})
	};

	function getBurnMap(version) {
		var starttime = version.first_task_time || version.starttime || version.createtime;
		var last_task_time = version.last_task_time || version.planonlinetime;
		var start = getDateByDatetime(starttime);
		var last_task_date = getDateByDatetime(last_task_time);
		var dates = [];
		while ((last_task_date.getTime() - start.getTime()) >= 0) {
			dates.push(coos.date.format(start, 'yyyyMMdd'));
			start.setDate(start.getDate() + 1);
		}
		var date_map = {};
		$(dates).each(function(index, date) {
			var date_need_count = 0;
			var date_need_finish_count = 0;
			var date_need_plan_finish_count = 0;
			var date_task_count = 0;
			var date_task_finish_count = 0;
			var date_task_plan_finish_count = 0;
			$(version.needs).each(function(index, need) {
				var starttime = need.starttime || need.createtime;
				if (starttime && starttime.indexOf(date) == 0) {
					date_need_count++;
				}
				var endtime = need.endtime;
				if (endtime && endtime.indexOf(date) == 0) {
					date_need_finish_count++;
				}
				var planonlinetime = need.planonlinetime || endtime || starttime;
				if (planonlinetime && planonlinetime.indexOf(date) == 0) {
					date_need_plan_finish_count++;
				}

				$(need.tasks).each(function(index, task) {
					var starttime = task.starttime || task.createtime;
					if (starttime && starttime.indexOf(date) == 0) {
						date_task_count++;
					}
					var endtime = task.endtime;
					if (endtime && endtime.indexOf(date) == 0) {
						date_task_finish_count++;
					}

					var planendtime = task.planendtime || endtime || starttime;
					if (planendtime && planendtime.indexOf(date) == 0) {
						date_task_plan_finish_count++;
					}
				});
			});
			date_map[date] = {
				date_need_count : date_need_count,
				date_need_finish_count : date_need_finish_count,
				date_need_plan_finish_count : date_need_plan_finish_count,
				date_task_count : date_task_count,
				date_task_finish_count : date_task_finish_count,
				date_task_plan_finish_count : date_task_plan_finish_count
			};
		});

		var map_x = [ 0 ];
		var task_y = [ version.task_count ];
		var plan_task_y = [ version.task_count ];
		var need_y = [ version.need_count ];
		var plan_need_y = [ version.need_count ];
		var surplus_task = version.task_count;
		var surplus_plan_task = version.task_count;
		var surplus_need = version.need_count;
		var surplus_plan_need = version.need_count;

		for ( var date in date_map) {
			map_x.push(date.substring(0, 4) + '-' + date.substring(4, 6) + '-' + date.substring(6, 8));
			var count = date_map[date];
			var surplus_need = surplus_need - count.date_need_finish_count;
			need_y.push(surplus_need);

			surplus_plan_need = surplus_plan_need - count.date_need_plan_finish_count;
			plan_need_y.push(surplus_plan_need);

			surplus_task = surplus_task - count.date_task_finish_count;
			task_y.push(surplus_task);

			surplus_plan_task = surplus_plan_task - count.date_task_plan_finish_count;
			plan_task_y.push(surplus_plan_task);
		}

		var options = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'cross',
					label : {
						backgroundColor : '#6a7985'
					}
				}
			},
			toolbox : {
				feature : {
					saveAsImage : {}
				}
			},
			xAxis : {
				type : 'category',
				data : map_x
			},
			legend : {
				data : [ "实际剩余任务", "计划剩余任务", "实际剩余需求", "计划剩余需求" ]
			},
			yAxis : {
				type : 'value'
			},
			series : [ {
				name : '实际剩余任务',
				data : task_y,
				type : 'line',
				smooth : true
			}, {
				name : '计划剩余任务',
				data : plan_task_y,
				type : 'line',
				smooth : true
			}, {
				name : '实际剩余需求',
				data : need_y,
				type : 'line',
				smooth : true
			}, {
				name : '计划剩余需求',

				data : plan_need_y,
				type : 'line',
				smooth : true

			} ]

		};
		return options;

		console.log(date_map);
		console.log(map_x);
		console.log(task_y);
		console.log(need_y);

	}

	function getDateByDatetime(datetime) {
		if (datetime) {
			datetime = datetime.replace(/-/g, '');
			datetime = datetime.replace(/:/g, '');
			datetime = datetime.replace(/ /g, '');
			datetime = datetime.replace(/\//g, '');
			if (datetime.length == 8) {
				datetime = datetime + "0000";
			}
			if (datetime.length == 10) {
				datetime = datetime + "00";
			}
			if (datetime.length >= 12) {
				return new Date(datetime.substring(0, 4), datetime.substring(4, 6) - 1, datetime.substring(6, 8), datetime.substring(8, 10), datetime.substring(10, 12));
			}
		}

	}
})();