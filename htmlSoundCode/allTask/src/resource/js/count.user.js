(function() {
	app.count = app.count || new Object();

	app.count.user = new Object();

	app.count.user.initGroup = function(data) {
		if (!coos.isEmpty(data.groupid) && !coos.isEmpty(data.startdate) && !coos.isEmpty(data.enddate)) {
			if (data.groupid != -1) {
				var action = '/manager/user/task/count.do';
				coos.POST(action, data, 'json', function(result) {
					var status = result.data;
					if (status.errcode == 0) {
						app.count.user.initGroupUser(status.result);
					} else {
						coos.box.info(status.errmsg);
					}
				});
			}
		}
	};
	app.count.user.initGroupUser = function(users) {
		$('.count-view-label').empty();
		$('.count-view').empty().append('<div class="coos-yellow text-center mg-30">请选择人员，这里将呈现人员任务统计信息！</div>');

		// 清空数据
		$("#tbodyId").empty();

		if (users == null || users.length == 0) {
			$("#tbodyId").append("<tr><td colspan='7' class='text-center'>暂无匹配数据</td></tr>");
		}

		// 获取当前时间
		var nowdate = new Date();

		$(users).each(function(index, user) {

			var name = user.username;

			var join_project_version = {};
			// 当前任务数
			var task_count = 0;
			// 已完成任务数
			var task_success_count = 0;
			// 延期任务数
			var task_delay_count = 0;
			var tasks = [];
			if (user.tasks) {
				$(user.tasks).each(function(index, task) {
					if (task.type == '100' || task.type=='200' || task.type=='300' ||task.type=='400') {
						return;
					}
					tasks.push(task);
				});

			}
			task_count = tasks.length;
			$(tasks).each(function(index, task) {
				join_project_version[task.projectname + "-->" + task.versionname] = "";
				if (task.status && task.status >= 8) {
					task_success_count++;
				}
				var planendtime = task.planendtime;
				if (task.planstarttime && planendtime) {
					var planenddate = getDateByDatetime(planendtime);
					if (task.status && task.status < 8 && planenddate.getTime() < nowdate.getTime()) {

						task_delay_count++;
					}
				}
			});
			// console.log(length);
			var join_project_version_names = "";
			for ( var join_project_version_name in join_project_version) {
				join_project_version_names += join_project_version_name + ",";
			}

			var $tr = $('<tr/>');
			$tr.attr('recordid', user.userid);
			$tr.addClass('one coos-pointer');
			$tr.append('<td>' + name + '</td>');
			$tr.append('<td>' + join_project_version_names + '</td>');
			$tr.append('<td>' + task_count + '</td>');
			$tr.append('<td>' + task_success_count + '</td>');
			$tr.append('<td>' + (task_count - task_success_count) + '</td>');
			$tr.append('<td>' + task_delay_count + '</td>');
			var $btnTd = $('<td class="btn-td"></td>');
			$tr.append($btnTd);

			$("#tbodyId").append($tr);

			var $viewBtn = $('<a class="coos-btn coos-btn-xs coos-bd-yellow coos-yellow toActionBtn">查看</a>');
			$btnTd.append($viewBtn);
			$viewBtn.click(function() {
				var $form = $('.search-form');
				var data = coos.form.validate($form);
				data.userid = user.userid;
				app.count.user.doSearchUserTaskCount(data);
			});

			var $ganttBtn = $('<a class="coos-btn coos-btn-xs coos-bd-green coos-green mgl-5 gtt-btn " userid="' + user.userid + '">甘特图</a>');

			$btnTd.append($ganttBtn);
			$ganttBtn.click(function() {
				var $box = $('<div class="coos-box coos-box-window"/>');
				$box.attr('style', 'background: white;padding: 40px 30px;overflow: auto;');
				var $close = $('<div class=" coos-btn coos-green coos-btn-link coos-close-gtt-btn">关闭</div>');
				$close.attr('style', 'position: absolute;z-index: 1;right: 16px;top: 16px;');
				$close.click(function() {
					$box.remove();
					$('body').removeClass('coos-over-hidden');
				});
				$box.append($close);
				var $selector = $('<div class="gantt"/>');
				$box.append($selector);
				$('body').append($box);
				$('body').addClass('coos-over-hidden');
				app.task.gantt.init(tasks, $selector, function() {
					var $spacer = $selector.find('.leftPanel .spacer:first');
					if ($spacer.length < 1) {
						$('.coos-close-gtt-btn').click();
						return;
					}
					var $select = $('<select class="input-rule-select parameter input-rule-group"></select>');
					$(users).each(function(index, user) {
						$select.append('<option value="' + user.userid + '">' + user.username + '</option>');
					});
					$spacer.append($select);
					coos.element.init($spacer);
					$select.val(user.userid);
					$select.change(function() {
						$('.coos-close-gtt-btn').click();
						$('[userid="' + this.value + '"].gtt-btn').click();
					});
				});

			});

			$tr.click(function(e) {
				e = e || window.event;
				if ($(e.target).closest('.btn-td').length > 0) {
					return;
				}
				var $form = $('.search-form');
				var data = coos.form.validate($form);
				data.userid = user.userid;
				app.count.user.doSearchUserTaskCount(data);
			});
		});
		if (users != null && users.length > 0) {
			var $form = $('.search-form');
			var data = coos.form.validate($form);
			data.userid = users[0].userid;
			app.count.user.doSearchUserTaskCount(data);
		}
	};

	app.count.user.doSearchUserTaskCount = function(data) {
		if (!coos.isEmpty(data.userid) && !coos.isEmpty(data.startdate) && !coos.isEmpty(data.enddate)) {
			if (data.userid != -1) {
				$("tr.one").removeClass("coos-green");
				$("[recordid='" + data.userid + "'].one").addClass("coos-green");
				app.count.user.queryUserTaskProcesss(data, function(result) {
					initCountView(data, result);
				});
			}
		}
	};
	app.count.user.queryUserTaskProcesss = function(data, callback) {
		if (!coos.isEmpty(data.userid) && !coos.isEmpty(data.startdate) && !coos.isEmpty(data.enddate)) {
			if (data.userid != -1) {
				var action = '/manager/user/task/countTask.do';
				coos.POST(action, data, 'json', function(result) {
					var status = result.data;
					if (status.errcode == 0) {
						callback && callback(status.result);
					} else {
						coos.box.info(status.errmsg);
					}
				});
			}
		}
	};

	// export task excel

	var initCountView = function(data, list) {

		var date_map = {};
		var startdate = data.startdate;
		var enddate = data.enddate;
		startdate = startdate.replace(/(\D)/g, "");
		enddate = enddate.replace(/(\D)/g, "");
		startdate = new Date(startdate.substring(0, 4), startdate.substring(4, 6) - 1, startdate.substring(6, 8));
		enddate = new Date(enddate.substring(0, 4), enddate.substring(4, 6) - 1, enddate.substring(6, 8));
		while ((enddate.getTime() - startdate.getTime()) >= 0) {
			date_map[coos.date.format(startdate, 'yyyyMMdd')] = [];
			startdate.setDate(startdate.getDate() + 1);
		}

		$(list).each(function(index, one) {
			var workdate = one.workdate;
			if (!coos.isEmpty(workdate)) {
				var workdate = workdate.substring(0, 8);
				date_map[workdate] = date_map[workdate] || [];
				date_map[workdate].push(one);
			}
		});
		initChartistView(date_map);

	}

	var initChartistView = function(date_map, show_id) {
		var work_hours = [];
		var task_hours_map = {};
		var maxhour = 9;
		var date_map_index = 0;
		var x_ticks = [];
		for ( var date in date_map) {
			var ps = date_map[date];
			var this_date = date;
			this_date = coos.date.formatDatetime(this_date);
			x_ticks.push([ date_map_index, this_date ]);
			var work_hour = 0;
			var taskid = null;
			var tasktitle = null;
			var task_hour = null;
			if (ps.length > 0) {
				$(ps).each(function(index, one) {
					var hour = Number(one.workhour || 0);
					work_hour += hour;
					taskid = one.taskid;
					tasktitle = one.tasktitle;
					task_hour = one.taskid;
					var process = one.process;
					if (taskid != null) {
						var task_hours = task_hours_map[taskid] || {};
						task_hours.name = tasktitle;
						task_hours.id = taskid;
						var data = task_hours.data || [];
						if (data.length > date_map_index) {
							hour = hour + data[date_map_index][1];
						}
						// 是否是延期
						var isDelay = false;
						// 是否提前
						var isAhead = false;
						// 任务计划开始时间和进度开始时间比对

						if (!one.taskplanstarttime) {
							one.taskplanstarttime = one.taskplanendtime;
						}
						if (!one.taskplanendtime) {
							one.taskplanendtime = one.taskplanstarttime;
						}
						if (one.taskplanstarttime && one.workdate) {
							if (one.workdate.substring(0, 8) < one.taskplanstarttime.substring(0, 8)) {
								isAhead = true;
							}
						}
						// 任务计划结束时间和进度结束时间比对
						if (one.taskplanendtime && one.workdate) {
							if (one.workdate.substring(0, 8) > one.taskplanendtime.substring(0, 8)) {
								isDelay = true;
							}
						}
						task_hours.isAhead = isAhead;
						task_hours.isDelay = isDelay;
						data[date_map_index] = [ date_map_index, hour, process, one ];
						task_hours.data = data;
						task_hours_map[taskid] = task_hours;
					}
				});
				if (work_hour > 0) {
					work_hour = work_hour;
				}
			}
			maxhour = maxhour < work_hour ? work_hour : maxhour;
			work_hours.push([ date_map_index, work_hour ]);
			date_map_index++;
		}
		var series = [];

		series.push({
			id : 0,
			name : '工作耗时',
			data : work_hours
		});
		for ( var taskid in task_hours_map) {
			var task_hours = task_hours_map[taskid];
			series.push(task_hours);
		}

		var $view_label = $('.count-view-label');
		$view_label.empty();
		$view_label.append('显示或隐藏：')
		$view_label.hide();

		$(series).each(function(index, serie) {
			var $label = $('<a class="coos-btn coos-btn-xs coos-btn-link chooseLabelBtn">' + serie.name + '</a>');
			if (serie.isAhead) {
				serie.name += '（提前进行';
				// $label.append('<span class="coos-green">（提前进行）</span>');
			}
			if (serie.isDelay) {
				serie.name += '（延期）';
				// $label.append('<span class="coos-red">（延期）</span>');
			}
			var id = serie.id;
			var active = false;
			if (show_id == null || show_id.indexOf(id + ',') >= 0) {
				active = true;
				$label.addClass('active');
			} else {
				active = false;
			}
			$label.click(function() {
				if (show_id != null && active) {
					show_id = null;
				} else {
					show_id = id + ",";
				}
				initChartistView(date_map, show_id);
			});
			$view_label.append($label);
		});
		var $count_view = $('.count-view');

		var x_data = [];
		$(x_ticks).each(function(index, x_tick) {
			x_data[index] = x_tick[1];
		});

		var labels = [];
		$(series).each(function(index, serie) {
			var old_data = serie.data;
			serie.type = 'bar';
			if (serie.id == 0) {
				serie.type = 'line';
			} else {
				// serie.barGap = '-100%';
				// serie.barCategoryGap = '40%';
				serie.label = {
					normal : {
						show : true,
						rotate : 90,
						align : 'left',
						verticalAlign : 'middle',
						position : 'insideBottom',
						distance : 0,
						formatter : function(arg1) {
							var seriesIndex = arg1.seriesIndex;
							var dataIndex = arg1.dataIndex;
							if (arg1.data != 0 && series[seriesIndex] && series[seriesIndex].old_data[dataIndex]) {
								if (series[seriesIndex].old_data[dataIndex].length > 2) {
									return "  " + arg1.data + "h / " + series[seriesIndex].old_data[dataIndex][2] + "%";
								}
							}
							return null;
						},
						rich : {
							name : {
								textBorderColor : '#fff'
							}
						}
					}
				};
			}
			labels.push(serie.name);
			var new_data = [];
			$(x_data).each(function(index) {
				if (serie.data[index] == null) {
					new_data[index] = null;

				} else {
					new_data[index] = serie.data[index][1];
				}
			});

			serie.old_data = old_data;
			serie.data = new_data;
		});
		function formatTooltipInfo(info) {
			var chars = info.split("");
			var lineSize = 30;
			var line = Math.ceil(chars.length / lineSize);
			var lastIndex = -1;
			var res = "";
			for (var i = 0; i < line; i++) {
				if (i > 0) {
					res += '<span style="padding-left:57px;"></span>'
				}
				for (var n = 0; n < lineSize; n++) {
					lastIndex++;
					if (chars.length > lastIndex) {
						res += chars[lastIndex];
					} else {
						break;
					}
				}
				res += '<br/>';
			}
			return res;
		}
		var options = {
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					type : 'shadow'
				},
				formatter : function(params) {
					var res = '<div><p>' + params[0].name + '</p></div>';
					for (var i = 0; i < params.length; i++) {
						if (params[i].data != null && params[i].data != 0) {
							var seriesIndex = params[i].seriesIndex;
							var dataIndex = params[i].dataIndex;
							var p = null;
							var needtitle;
							if (series[seriesIndex] && series[seriesIndex].old_data[dataIndex]) {
								if (series[seriesIndex].old_data[dataIndex].length > 2) {
									p = series[seriesIndex].old_data[dataIndex][2] + "%";
									if (series[seriesIndex].old_data[dataIndex].length > 3) {
										needtitle = series[seriesIndex].old_data[dataIndex][3].needtitle;
									}
								}
							}
							var s = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';

							var showStr = s;
							if (needtitle != null) {
								showStr += '需求：' + formatTooltipInfo(needtitle) + '<span style="padding-left:15px;"></span>';
							}
							var tasktitle = params[i].seriesName;
							showStr += '任务：' + formatTooltipInfo(tasktitle) + '';
							showStr += '<span style="padding-left:15px;"></span>耗时：' + params[i].data + 'h<span style="padding-left:15px;"></span>';
							if (p != null) {
								res += '<p style="">' + showStr + '进度：' + p + '</p>';
							} else {
								res += '<p style="">' + showStr + '</p>';
							}

						}
					}
					return res;
				}
			},
			legend : {
				data : labels
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				axisTick : {
					show : false
				},
				data : x_data
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			dataZoom : [ {
				type : 'inside'
			} ],
			series : series
		};
		if (window.myChart) {
			window.myChart.dispose();
		}
		$count_view.css('padding-top', '20px');

		var myChart = echarts.init($count_view[0]);
		window.myChart = myChart;
		myChart.setOption(options);
		return;

		var $p = $.plot($count_view, count_datas, {
			xaxis : {
				ticks : x_ticks
			},
			yaxis : {
				min : 0
			},
			grid : {
				hoverable : true
			},
			pan : {
				interactive : true
			},
			legend : {
				position : "sw",
				show : true
			}
		});
		var colors = $p.getOptions().colors;
		$view_label.find(".chooseLabelBtn").each(function(index, label) {
			$(label).css("color", colors[index]);
		});
		window.$p = $p;
		$('#tooltip').remove();
		$("<div id='tooltip'></div>").css({
			position : "absolute",
			display : "none",
			border : "1px solid #fdd",
			padding : "2px",
			"background-color" : "#fee",
			opacity : 0.80
		}).appendTo("body");

		$count_view.bind("plothover", function(event, pos, item) {
			if (item) {
				var x = item.datapoint[0], y = item.datapoint[1];
				var label = item.series.label;
				var html = '';
				if (label == '工作耗时') {
					html = label + '：' + y + "小时";
				} else {
					html = '任务：' + label + '<br>耗时：' + y + "小时";
					var data = item.series.data[item.dataIndex];
					var p = 0;
					if (data.length > 2) {
						p = data[2].process;
					}

					html += '<br/>进度：' + p + '%';
				}
				$("#tooltip").html(html).css({
					top : item.pageY + 5,
					left : item.pageX + 5
				}).fadeIn(200);
			} else {
				$("#tooltip").hide();
			}
		});
		return;
	};
})();
function getDateByDatetime(datetime) {
	if (datetime) {
		datetime = datetime.replace(/-/g, '');
		datetime = datetime.replace(/:/g, '');
		datetime = datetime.replace(/ /g, '');
		datetime = datetime.replace(/\//g, '');
	}
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