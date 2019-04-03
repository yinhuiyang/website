(function() {

	app.task = app.task || new Object();

	app.task.gantt = new Object();

	app.task.gantt.init = function(tasks, $selector, callback) {
		queryTaskProcesss(tasks, function(processs) {
			build(tasks, processs, $selector, callback);
		});
	};

	function queryTaskProcesss(tasks, callback) {
		var taskids = "";
		if (tasks.length > 0) {
			$(tasks).each(function(index, task) {
				task.taskid = (task.taskid || task.developid || task.uiueid || task.testid);
				if (!task.planstarttime) {
					return;
				}
				taskids += "," + task.taskid;
			});
			if (taskids.length > 0) {
				taskids = taskids.substring(1);
				var data = {};
				data.taskids = taskids;
				var action = '/data/queryTaskProcess.do';
				coos.POST(action, data, 'json', function(result) {
					var status = result.data;
					if (status.errcode == 0) {
						callback && callback(status.result);
					} else {
						coos.box.info(status.errmsg);
						callback && callback([]);
					}
				});
			}
		} else {
			callback && callback([]);
		}

	}

	function getTag(date) {
		if (date.getData && date.getDay() == 6 || date.getDay() == 7) {
			return "<span>日</span>";
		}
		return "";
	}

	function formatSources(sources) {
		return;
		$(sources).each(function(index, source) {
			if (source.values.length > 0) {
				var startDate = source.values[0].fromDate;
				var endDate = source.values[0].endDate;

				$(source.values).each(function(index, value) {
					if (index == 0) {
						return;
					}
					// 判断
				});
			}
		});
	}
	function getNewDateStr(datetime) {
		datetime = coos.date.formatDatetime(datetime);
		datetime = datetime.replace(/-/g, "/");

		return "Date.parse('" + datetime + "')";

	}

	function build(tasks, processs, $selector, callback) {
		if (tasks.length < 1) {
			coos.box.alert('暂无任务数据');

			return;
		}
		var sources = [];
		var nowdate = new Date();

		var rootSource = {};
		rootSource.name = "汇总";
		rootSource.desc = "总耗时";
		var firstRootData = {
			label : ""
		};
		var rootDatas = [ firstRootData ];
		if (processs == null || processs.length == 0) {
			rootDatas = [];
		}
		var workDateWorkHourMap = {};
		rootSource.values = rootDatas;
		sources.push(rootSource);
		$(tasks).each(function(index, task) {
			if (!task.planstarttime) {
				return;
			}
			var source = {};
			source.name = task.needtitle;
			source.desc = task.title;

			var values = [];
			var value = {};

			var formDataStr = getNewDateStr(task.planstarttime);
			var toDataStr = getNewDateStr(task.planendtime || task.planstarttime);
			value.from = "/Date(" + formDataStr + ")/";
			value.fromDate = getDateByDatetime(task.planstarttime);
			value.to = "/Date(" + toDataStr + ")/";
			value.toDate = getDateByDatetime(task.planendtime || task.planstarttime);

			if (task.status == null || task.status == '0') {
				value.label = '';
				value.customClass = "bg-grey";
			} else if (task.status == '1') {
				value.label = '';
				value.customClass = "bg-blue";
			} else if (task.status == '2') {
				value.label = '';
				value.customClass = "bg-yellow";

			} else if (task.status == '8' || task.status == '9') {
				value.label = '';
				value.customClass = "bg-green";
			}
			var planstartdate = getDateByDatetime(task.planstarttime);
			var planenddate = getDateByDatetime(task.planendtime);
			if (task.status && task.status < 8) {
				if (planenddate.getTime() < nowdate.getTime()) {
					value.label += '';
					value.customClass = "bg-red";
				}
			}
			values.push(value);
			var workhour = 0;
			var process = 0;
			var pcustomClass = value.customClass;
			$(processs).each(function(index, process) {
				if (task.taskid == process.taskid && process.workdate) {
					var value = {};
					var startDataStr = getNewDateStr(process.workdate + ' 09:00');
					var endDataStr = getNewDateStr(process.workdate + ' 18:00');
					var workdate = getDateByDatetime(process.workdate);
					var cacheMap = workDateWorkHourMap[process.workdate];
					if (cacheMap == null) {
						cacheMap = {};
						cacheMap.workhour = Number(process.workhour);
						cacheMap.index = rootDatas.length;
						rootDatas.push({
							from : "/Date(" + startDataStr + ")/",
							fromDate : workdate,
							to : "/Date(" + endDataStr + ")/",
							toDate : workdate
						});
						workDateWorkHourMap[process.workdate] = cacheMap;
					} else {
						cacheMap.workhour += Number(process.workhour);
					}
					rootDatas[cacheMap.index].label = cacheMap.workhour;
					if (cacheMap.workhour > 15) {
						rootDatas[cacheMap.index].customClass = "bg-red";
					} else if (cacheMap.workhour < 8) {
						rootDatas[cacheMap.index].customClass = "bg-yellow";
					} else {
						rootDatas[cacheMap.index].customClass = "bg-green";
					}
					if (firstRootData.fromDate == null) {
						firstRootData.from = "/Date(" + startDataStr + ")/";
						firstRootData.fromDate = workdate;
						firstRootData.to = "/Date(" + endDataStr + ")/";
						firstRootData.toDate = workdate;
					} else {
						if (firstRootData.fromDate.getTime() > workdate.getTime()) {
							firstRootData.from = "/Date(" + startDataStr + ")/";
							firstRootData.fromDate = workdate;
						}
						if (firstRootData.toDate.getTime() < workdate.getTime()) {
							firstRootData.to = "/Date(" + endDataStr + ")/";
							firstRootData.toDate = workdate;
						}
					}

					// var from = workdate.getTime();
					// var to = workdate.getTime();

					value.from = "/Date(" + startDataStr + ")/";
					value.fromDate = workdate;
					value.to = "/Date(" + endDataStr + ")/";
					value.toDate = workdate;
					value.label = process.process;
					if (workdate.getTime() < planenddate.getTime()) {
						value.customClass = "bg-green";
					} else {
						value.customClass = "bg-red";
					}
					values.push(value);
				}
			});
			source.values = values;
			sources.push(source);
		});
		formatSources(sources);
		$selector.gantt({
			source : sources,
			navigate : "scroll",
			months : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
			dow : [ '日', '一', '二', '三', '四', '五', '六' ],
			scale : "days",
			maxScale : "days",
			minScale : "days",
			itemsPerPage : 40,
			onItemClick : function(data) {
				// alert("Item clicked - show some details");
			},
			onAddClick : function(dt, rowId) {
				// alert("Empty space clicked - add an item!");
			},
			onRender : function() {
				if (window.console && typeof console.log === "function") {
					console.log("chart rendered");
				}
				callback && callback();
			}
		});

	}

})();