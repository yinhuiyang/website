(function() {
	app.report = app.report || new Object();

	app.report.initData = function(map) {
		app.report.initUsers(map);
		app.report.initBugProgress(map);
		app.report.initBug(map);
		app.report.initTaskProgress(map);
		app.report.initTask(map);
		app.report.initNeed(map);
		app.report.initVersion(map);
		app.report.initProject(map);
		app.report.initGroups(map);
		app.report.initGroupNeeds(map);
		app.report.initGroupVersions(map);
	};
	app.report.getGroupNeedWork = function(group, need, map, user_temp) {
		var work = {
			task_workhour : 0,
			bug_workhour : 0,
			user_temp : user_temp || {},
			bug_workhour_internal : 0,
			bug_workhour_external : 0
		};
		$(map.group_users_map[group.groupid]).each(function(index, user) {
			if (work.user_temp[user.userid]) {
				return;
			}
			work.user_temp[user.userid] = true;
			if (user.need_task_workhour && user.need_task_workhour[need.needid]) {
				work.task_workhour += user.need_task_workhour[need.needid];

			}
			if (user.need_bug_workhour && user.need_bug_workhour[need.needid]) {
				work.bug_workhour += user.need_bug_workhour[need.needid];
				work.bug_workhour_internal += user.need_bug_workhour_internal[need.needid];
				work.bug_workhour_external += user.need_bug_workhour_external[need.needid];

			}
		});
		return work;
	};
	app.report.initGroupNeeds = function(map) {
		var group_needs_map = {};
		var need_groups_map = {};
		map.group_needs_map = group_needs_map;
		map.need_groups_map = need_groups_map;
		$(map.groups).each(function(index, group) {
			group_needs_map[group.groupid] = group_needs_map[group.groupid] || [];
			var needs = group_needs_map[group.groupid];
			var users = map.group_users_map[group.groupid];
			$(users).each(function(index, user) {
				$(user.needids).each(function(index, needid) {
					var need = map.need_map[needid];
					if (needs.indexOf(need) < 0) {
						needs.push(need);
					}
					need_groups_map[needid] = need_groups_map[needid] || [];
					var groups = need_groups_map[needid];
					if (groups.indexOf(group) < 0) {
						groups.push(group);
					}
				});
			});
		});

	};
	app.report.initGroupVersions = function(map) {
		var group_versions_map = {};
		var version_groups_map = {};
		map.group_versions_map = group_versions_map;
		map.version_groups_map = version_groups_map;
		$(map.groups).each(function(index, group) {
			group_versions_map[group.groupid] = group_versions_map[group.groupid] || [];
			var versions = group_versions_map[group.groupid];
			var users = map.group_users_map[group.groupid];
			$(users).each(function(index, user) {
				$(user.versionids).each(function(index, versionid) {
					var version = map.version_map[versionid];
					if (versions.indexOf(version) < 0) {
						versions.push(version);
					}

					version_groups_map[versionid] = version_groups_map[versionid] || [];

					var groups = version_groups_map[versionid];
					if (groups.indexOf(group) < 0) {
						groups.push(group);
					}
				});
			});

		});

	};
	app.report.initUsers = function(map) {
		var cache = {};
		var user_map = {};
		map.group_users_map = cache;
		map.user_map = user_map;
		$(map.users).each(function(index, user) {
			user_map[user.userid] = user;
			user.workhour = 0;
			user.task_workhour = 0;
			user.bug_workhour = 0;
			user.task_count = 0;
			user.need_count = 0;
			user.bug_count = 0;
			user.bug_count_internal = 0;
			user.bug_count_external = 0;
			user.bug_workhour_internal = 0;
			user.bug_workhour_external = 0;
			if (user.groupids) {
				$(user.groupids).each(function(index, groupid) {
					cache[groupid] = cache[groupid] || [];
					cache[groupid].push(user);
				});
			}
		});
	};
	var fullParentGroups = function(group, map, groups) {
		groups = groups || [];
		if (!group) {
			return groups;
		}
		$(map.groups).each(function(index, g) {
			if (g.groupid == group.parentid && g.groupid != group.groupid) {
				fullParentGroups(g, map, groups);
				groups.push(g);
			}
		});
		return groups;
	};
	app.report.initGroups = function(map) {
		var cache = {};
		$(map.groups).each(function(index, group) {
			var parentGroups = fullParentGroups(group, map);
			var title = '';
			$(parentGroups).each(function(index, parentGroup) {
				title += '' + parentGroup.name + '/';
			});
			title += '' + group.name;
			if (parentGroups && parentGroups.length > 0) {
				group.subtitle = parentGroups[parentGroups.length - 1].name + '/' + group.name;
			}
			group.title = title;
			group.workhour = 0;
			group.task_workhour = 0;
			group.bug_workhour = 0;
			group.task_count = 0;
			group.need_count = 0;
			group.bug_count = 0;
			group.bug_count_internal = 0;
			group.bug_count_external = 0;
			group.bug_workhour_internal = 0;
			group.bug_workhour_external = 0;
			group.bug_user_count = 0;
			var users = map.group_users_map[group.groupid] || [];
			group.user_count = users.length;
			$(users).each(function(index, user) {
				if (coos.isNumber(user.workhour)) {
					group.workhour += Number(user.workhour);
				}
				if (coos.isNumber(user.need_count)) {
					group.need_count += Number(user.need_count);
				}
				if (coos.isNumber(user.task_workhour)) {
					group.task_workhour += Number(user.task_workhour);
				}
				if (coos.isNumber(user.task_count)) {
					group.task_count += Number(user.task_count);
				}
				if (coos.isNumber(user.bug_workhour)) {
					group.bug_workhour += Number(user.bug_workhour);
				}
				if (coos.isNumber(user.bug_workhour_internal)) {
					group.bug_workhour_internal += Number(user.bug_workhour_internal);
				}
				if (coos.isNumber(user.bug_workhour_external)) {
					group.bug_workhour_external += Number(user.bug_workhour_external);
					if (user.bug_workhour_external > 0) {
						group.bug_user_count++;
					}
				}
				if (coos.isNumber(user.bug_count)) {
					group.bug_count += Number(user.bug_count);
				}
				if (coos.isNumber(user.bug_count_internal)) {
					group.bug_count_internal += Number(user.bug_count_internal);
				}
				if (coos.isNumber(user.bug_count_external)) {
					group.bug_count_external += Number(user.bug_count_external);
				}
			});
			group.workhour = group.task_workhour + group.bug_workhour;
		});
	};
	app.report.initProject = function(map) {
		var project_map = {};
		map.project_map = project_map;
		map.projects = map.projects || [];
		$(map.projects).each(function(index, project) {
			project_map[project.projectid] = project;
			project.workhour = 0;
			project.user_map = {};
			project.task_workhour = 0;
			project.task_user_map = {};
			project.bug_workhour = 0;
			project.bug_user_map = {};
			var versions = map.project_versions_map[project.projectid] || [];
			project.version_count = versions.length;
			project.task_count = 0;
			project.need_count = 0;
			project.bug_count = 0;
			project.bug_count_internal = 0;
			project.bug_count_external = 0;
			project.bug_workhour_internal = 0;
			project.bug_workhour_external = 0;
			project.bug_user_map_internal = {};
			project.bug_user_map_external = {};
			$(versions).each(function(index, version) {
				if (coos.isNumber(version.workhour)) {
					project.workhour += Number(version.workhour);
				}

				if (coos.isNumber(version.need_count)) {
					project.need_count += Number(version.need_count);
				}
				if (coos.isNumber(version.task_workhour)) {
					project.task_workhour += Number(version.task_workhour);
				}
				if (coos.isNumber(version.task_count)) {
					project.task_count += Number(version.task_count);
				}
				if (coos.isNumber(version.bug_workhour)) {
					project.bug_workhour += Number(version.bug_workhour);
				}
				project.bug_workhour_internal += Number(version.bug_workhour_internal);
				project.bug_workhour_external += Number(version.bug_workhour_external);
				if (coos.isNumber(version.bug_count)) {
					project.bug_count += Number(version.bug_count);
				}
				if (coos.isNumber(version.bug_count_internal)) {
					project.bug_count_internal += Number(version.bug_count_internal);
				}
				if (coos.isNumber(version.bug_count_external)) {
					project.bug_count_external += Number(version.bug_count_external);
				}
				$.extend(true, project.task_user_map, version.task_user_map);
				$.extend(true, project.bug_user_map, version.bug_user_map);

				$.extend(true, project.bug_user_map_internal, version.bug_user_map_internal);
				$.extend(true, project.bug_user_map_external, version.bug_user_map_external);
			});
			project.task_user_count = Object.keys(project.task_user_map).length;
			project.bug_user_count = Object.keys(project.bug_user_map).length;
			project.bug_user_count_internal = Object.keys(project.bug_user_map_internal).length;
			project.bug_user_count_external = Object.keys(project.bug_user_map_external).length;
			project.user_count = project.task_user_count + project.bug_user_count;
		});
	};
	app.report.initVersion = function(map) {
		var cache = {};
		var version_map = {};
		map.project_versions_map = cache;
		map.version_map = version_map;
		$(map.versions).each(function(index, version) {
			version_map[version.versionid] = version;
			if (version.projectid) {
				cache[version.projectid] = cache[version.projectid] || [];
				cache[version.projectid].push(version);
			}
			version.workhour = 0;
			version.user_map = {};
			version.task_workhour = 0;
			version.task_user_map = {};
			version.bug_workhour = 0;
			version.bug_user_map = {};
			var needs = map.version_needs_map[version.versionid] || [];
			version.need_count = needs.length;
			version.task_count = 0;
			version.bug_count = 0;
			version.bug_count_internal = 0;
			version.bug_count_external = 0;
			version.bug_workhour_internal = 0;
			version.bug_workhour_external = 0;
			version.bug_user_map_internal = {};
			version.bug_user_map_external = {};
			$(needs).each(function(index, need) {
				if (coos.isNumber(need.workhour)) {
					version.workhour += Number(need.workhour);
				}
				if (coos.isNumber(need.task_workhour)) {
					version.task_workhour += Number(need.task_workhour);
				}
				if (coos.isNumber(need.task_count)) {
					version.task_count += Number(need.task_count);
				}
				if (coos.isNumber(need.bug_workhour)) {
					version.bug_workhour += Number(need.bug_workhour);
				}
				version.bug_workhour_internal += Number(need.bug_workhour_internal);
				version.bug_workhour_external += Number(need.bug_workhour_external);
				if (coos.isNumber(need.bug_count)) {
					version.bug_count += Number(need.bug_count);
				}
				if (coos.isNumber(need.bug_count_internal)) {
					version.bug_count_internal += Number(need.bug_count_internal);
				}
				if (coos.isNumber(need.bug_count_external)) {
					version.bug_count_external += Number(need.bug_count_external);
				}
				$.extend(true, version.task_user_map, need.task_user_map);
				$.extend(true, version.bug_user_map, need.bug_user_map);

				$.extend(true, version.bug_user_map_internal, need.bug_user_map_internal);
				$.extend(true, version.bug_user_map_external, need.bug_user_map_external);
			});
			version.task_user_count = Object.keys(version.task_user_map).length;
			version.bug_user_count = Object.keys(version.bug_user_map).length;
			version.bug_user_count_internal = Object.keys(version.bug_user_map_internal).length;
			version.bug_user_count_external = Object.keys(version.bug_user_map_external).length;
			version.user_count = version.task_user_count + version.bug_user_count;
		});

	};
	app.report.initNeed = function(map) {
		var cache = {};
		var need_map = {};
		map.version_needs_map = cache;
		map.need_map = need_map;
		$(map.needs).each(function(index, need) {
			need_map[need.needid] = need;
			if (need.versionid) {
				cache[need.versionid] = cache[need.versionid] || [];
				cache[need.versionid].push(need);
			}
			need.task_workhour = 0;
			need.task_user_map = {};
			var tasks = map.need_tasks_map[need.needid] || [];
			need.task_count = tasks.length;
			$(tasks).each(function(index, task) {
				if (coos.isNumber(task.workhour)) {
					need.task_workhour += Number(task.workhour);
				}
				if (!coos.isEmpty(task.trustuserid)) {
					need.task_user_map[task.trustuserid] = task.trustuserid;
				}
			});
			need.task_user_count = Object.keys(need.task_user_map).length;

			need.bug_workhour = 0;
			need.bug_workhour_internal = 0;
			need.bug_workhour_external = 0;
			need.bug_user_map = {};
			need.bug_user_map_internal = {};
			need.bug_user_map_external = {};
			var bugs = map.need_bugs_map[need.needid] || [];
			need.bug_count = 0;
			need.bug_count_internal = 0;
			need.bug_count_external = 0;
			$(bugs).each(function(index, bug) {
				need.bug_workhour += Number(bug.workhour);
				need.bug_workhour_internal += Number(bug.workhour_internal);
				need.bug_workhour_external += Number(bug.workhour_external);
				if (bug.forinternal) {
					need.bug_count_internal++;
				} else {
					need.bug_count_external++;
				}
				$.extend(true, need.bug_user_map, bug.user_map);
				$.extend(true, need.bug_user_map_internal, bug.user_map_internal);
				$.extend(true, need.bug_user_map_external, bug.user_map_external);
			});
			need.bug_user_count_internal = Object.keys(need.bug_user_map_internal).length;
			need.bug_user_count_external = Object.keys(need.bug_user_map_external).length;
			need.bug_user_count = Object.keys(need.bug_user_map).length;

			need.workhour = need.bug_workhour + need.task_workhour;
			need.user_count = need.bug_user_count + need.task_user_count;
		});

	};
	app.report.initTask = function(map) {
		var cache = {};
		map.need_tasks_map = cache;
		$(map.tasks).each(function(index, task) {
			if (task.needid) {
				cache[task.needid] = cache[task.needid] || [];
				cache[task.needid].push(task);
			}
			task.workhour = 0;
			var progresss = map.task_progresss_map[task.taskid] || [];
			task.progress_count = progresss.length;
			$(progresss).each(function(index, progress) {
				if (coos.isNumber(progress.workhour)) {
					task.workhour += Number(progress.workhour);
				}
			});

			if (!coos.isEmpty(task.trustuserid) && map.user_map[task.trustuserid]) {
				var user = map.user_map[task.trustuserid];
				user.task_workhour += task.workhour;
				user.workhour += task.workhour;
				user.task_count += 1;

				user.needids = user.needids || [];
				var needids = user.needids;
				if (needids.indexOf(task.needid) < 0) {
					needids.push(task.needid);
					user.need_count = needids.length;
				}
				user.versionids = user.versionids || [];
				var versionids = user.versionids;
				if (versionids.indexOf(task.versionid) < 0) {
					versionids.push(task.versionid);
					user.version_count = versionids.length;
				}

				user.task_workhour = user.task_workhour || {};
				user.task_workhour[task.taskid] = user.task_workhour[task.taskid] || 0;
				user.task_workhour[task.taskid] += task.workhour;

				user.need_task_workhour = user.need_task_workhour || {};
				user.need_task_workhour[task.needid] = user.need_task_workhour[task.needid] || 0;
				user.need_task_workhour[task.needid] += task.workhour;

				user.version_task_workhour = user.version_task_workhour || {};
				user.version_task_workhour[task.versionid] = user.version_task_workhour[task.versionid] || 0;
				user.version_task_workhour[task.versionid] += task.workhour;

			}
		});

	};
	app.report.initTaskProgress = function(map) {
		var cache = {};
		map.task_progresss_map = cache;
		$(map.task_progresss).each(function(index, progress) {
			if (progress.taskid) {
				cache[progress.taskid] = cache[progress.taskid] || [];
				cache[progress.taskid].push(progress);
			}
		});
	};
	app.report.initBug = function(map) {
		var cache = {};
		var version_bugs_map = {};
		map.need_bugs_map = cache;
		map.version_bugs_map = version_bugs_map;
		$(map.bugs).each(function(index, bug) {
			if (bug.bugsource == 0) {
				bug.forinternal = true;
			} else {
				bug.forinternal = false;
			}
			if (bug.needid) {
				cache[bug.needid] = cache[bug.needid] || [];
				cache[bug.needid].push(bug);
			}
			if (bug.versionid) {
				version_bugs_map[bug.versionid] = version_bugs_map[bug.versionid] || [];
				version_bugs_map[bug.versionid].push(bug);
			}
			bug.workhour = 0;
			bug.workhour_internal = 0;
			bug.workhour_external = 0;
			var progresss = map.bug_progresss_map[bug.bugid] || [];
			bug.progress_count = progresss.length;

			var internal_us = [];
			var external_us = [];
			bug.user_map = {};
			$(progresss).each(function(index, progress) {
				if (coos.isNumber(progress.workhour)) {
					progress.workhour = Number(progress.workhour);
					bug.workhour += progress.workhour;
					if (bug.forinternal) {
						bug.workhour_internal += progress.workhour;
					} else {
						bug.workhour_external += progress.workhour;
					}
					if (!coos.isEmpty(progress.createuserid) && map.user_map[progress.createuserid]) {
						bug.user_map[progress.createuserid] = progress.createuserid;

						var user = map.user_map[progress.createuserid];
						user.bug_workhour += progress.workhour;
						if (bug.forinternal) {
							internal_us[progress.createuserid] = progress.createuserid;
							user.bug_workhour_internal += progress.workhour;
						} else {
							external_us[progress.createuserid] = progress.createuserid;
							user.bug_workhour_external += progress.workhour;
						}

					}
				}
			});
			bug.user_map_internal = internal_us;
			bug.user_map_external = external_us;
			if (!coos.isEmpty(bug.ownuserid) && map.user_map[bug.ownuserid]) {
				var user = map.user_map[bug.ownuserid];
				user.bug_count += 1;
				if (bug.forinternal) {
					user.bug_count_internal += 1;
				} else {
					user.bug_count_external += 1;
				}
				user.needids = user.needids || [];
				var needids = user.needids;
				if (needids.indexOf(bug.needid) < 0) {
					needids.push(bug.needid);
					user.need_count = needids.length;
				}

				user.versionids = user.versionids || [];
				var versionids = user.versionids;
				if (versionids.indexOf(bug.versionid) < 0) {
					versionids.push(bug.versionid);
					user.version_count = versionids.length;
				}

				user.need_bug_workhour = user.need_bug_workhour || {};
				user.need_bug_workhour_internal = user.need_bug_workhour_internal || {};
				user.need_bug_workhour_external = user.need_bug_workhour_external || {};

				user.need_bug_workhour[bug.needid] = user.need_bug_workhour[bug.needid] || 0;
				user.need_bug_workhour_internal[bug.needid] = user.need_bug_workhour_internal[bug.needid] || 0;
				user.need_bug_workhour_external[bug.needid] = user.need_bug_workhour_external[bug.needid] || 0;

				user.need_bug_workhour[bug.needid] += bug.workhour;
				if (bug.forinternal) {
					user.need_bug_workhour_internal[bug.needid] += bug.workhour;
				} else {
					user.need_bug_workhour_external[bug.needid] += bug.workhour;
				}

				user.version_bug_workhour = user.version_bug_workhour || {};
				user.version_bug_workhour_internal = user.version_bug_workhour_internal || {};
				user.version_bug_workhour_external = user.version_bug_workhour_external || {};

				user.version_bug_workhour[bug.versionid] = user.version_bug_workhour[bug.versionid] || 0;
				user.version_bug_workhour_internal[bug.versionid] = user.version_bug_workhour_internal[bug.versionid] || 0;
				user.version_bug_workhour_external[bug.versionid] = user.version_bug_workhour_external[bug.versionid] || 0;

				user.version_bug_workhour[bug.versionid] += bug.workhour;
				if (bug.forinternal) {
					user.version_bug_workhour_internal[bug.versionid] += bug.workhour;
				} else {
					user.version_bug_workhour_external[bug.versionid] += bug.workhour;
				}
			}
		});

	};
	app.report.initBugProgress = function(map) {
		var cache = {};
		map.bug_progresss_map = cache;
		$(map.bug_progresss).each(function(index, progress) {
			if (progress.bugid && progress.createuserid) {
				cache[progress.bugid] = cache[progress.bugid] || [];
				cache[progress.bugid].push(progress);
			}
		});
	};

	app.report.sery_workhour = function() {
		return {
			name : '工时',
			type : 'bar',
			stack : '工时',
			label : {
				normal : {
					show : true,
					position : 'right'

				}
			},
			data : [],
			pushData : function(value, data) {
				if (value) {
					value = parseInt(value);
				}
				var d = {
					value : value,
					data : data,
					label : {
						formatter : function(arg1) {
							var res = arg1.value;
							if (res < 0) {
								res = -res;
							}
							return res + 'h';
						}
					}
				}
				this.data.push(d);
			}
		}
	};
	app.report.sery_error_workhour = function() {
		return {
			name : '工时（缺陷）',
			type : 'bar',
			stack : '工时',
			label : {
				normal : {
					show : true,
					position : 'left'
				}
			},
			data : [],
			pushData : function(value, data) {
				if (value) {
					value = -parseInt(value);
				}
				var d = {
					value : value,
					data : data,
					label : {
						formatter : function(arg1) {
							var res = arg1.value;
							if (res < 0) {
								res = -res;
							}
							return res + 'h';
						}
					}
				}
				this.data.push(d);
			}
		}
	};
	app.report.sery_need = function() {
		return {
			name : '需求数',
			type : 'bar',
			stack : '数量',
			label : {
				normal : {
					show : true,
					position : 'right'
				}
			},
			data : [],
			pushData : function(value, data) {
				if (value) {
					value = parseInt(value);
				}
				var d = {
					value : value,
					data : data,
					label : {
						formatter : function(arg1) {
							var res = arg1.value;
							if (res < 0) {
								res = -res;
							}
							return res + '（个需求）';
						}
					}
				}
				this.data.push(d);
			}
		}
	};
	app.report.sery_task = function() {
		return {
			name : '任务数',
			type : 'bar',
			stack : '数量',
			label : {
				normal : {
					show : true,
					position : 'right'
				}
			},
			data : [],
			pushData : function(value, data) {
				if (value) {
					value = parseInt(value);
				}
				var d = {
					value : value,
					data : data,
					label : {
						formatter : function(arg1) {
							var res = arg1.value;
							if (res < 0) {
								res = -res;
							}
							return res + '（个任务）';
						}
					}
				}
				this.data.push(d);
			}
		}
	};
	app.report.sery_bug = function() {
		return {
			name : '缺陷数',
			type : 'bar',
			stack : '数量',
			label : {
				normal : {
					show : true,
					position : 'left'
				}
			},
			data : [],
			pushData : function(value, data) {
				if (value) {
					value = -parseInt(value);
				}
				var d = {
					value : value,
					data : data,
					label : {
						formatter : function(arg1) {
							var res = arg1.value;
							if (res < 0) {
								res = -res;
							}
							return res + '（个缺陷）';
						}
					}
				}
				this.data.push(d);
			}
		}
	};
	app.report.sery_user = function() {
		return {
			name : '人力',
			stack : '人力',
			type : 'bar',
			label : {
				normal : {
					show : true,
					position : 'right'
				}
			},
			data : [],
			pushData : function(value, data) {
				if (value) {
					value = parseInt(value);
				}
				var d = {
					value : value,
					data : data,
					label : {
						formatter : function(arg1) {
							var res = arg1.value;
							if (res < 0) {
								res = -res;
							}
							return res + '（个人）';
						}
					}
				}
				this.data.push(d);
			}
		}
	};
	app.report.sery_error_user = function() {
		return {
			name : '人力（缺陷）',
			type : 'bar',
			stack : '人力',
			label : {
				normal : {
					show : true,
					position : 'left'
				}
			},
			data : [],
			pushData : function(value, data) {
				if (value) {
					value = -parseInt(value);
				}
				var d = {
					value : value,
					data : data,
					label : {
						formatter : function(arg1) {
							var res = arg1.value;
							if (res < 0) {
								res = -res;
							}
							return res + '（个人）';
						}
					}
				}
				this.data.push(d);
			}
		}
	};

	app.report.baseFormatter = function(params) {
		var res = '<div><p>' + params[0].name + '</p></div>';
		for (var i = 0; i < params.length; i++) {
			var param = params[i];
			if (param.data != null && param.value != null) {
				var value = param.value;
				var seriesName = param.seriesName;
				if (value < 0) {
					value = -value;
				}
				var s = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + params[i].color + ';"></span>';
				res += '<p style="">' + s + '' + seriesName + '：' + value + '</p>';
			}
		}
		return res;
	};
})();