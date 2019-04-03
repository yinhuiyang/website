(function() {
	coos.page.pushLoadCallback(function() {
		app.group.init();
	});
	app.group = {
		init : function() {
			$('.addGroupBtn').unbind('click').click(function() {
				app.group.window({
					groupid : coos.getRandomNumber()
				});
			});
			$('.addUserRoleBtn').addClass('coos-disabled');
			$('.addUserGroupBtn').unbind('click').click(function() {
				var groupid = $(this).attr('groupid');
				app.group.initNotInUserList({
					groupid : groupid
				});
			});
		},
		window : function(groupData) {
			var data = groupData;
			app.group.loadList(function(groups) {

				var $parentids = $('.group-form-model').find('[name=parentid]');
				$($parentids).each(function(index, $parentid) {
					$parentid = $($parentid);
					$parentids.empty();
					$parentids.append('<option value="">请选择</option>');
					$(groups).each(function(index, group) {
						if (group.groupid != groupData.groupid) {
							$parentid.append('<option value="' + group.groupid + '">' + group.name + '</option>');
						}
					});
				});
				app.createModelWindow('编辑组', 'group', groupData, '', function(data) {
					var action = "/core/group/save.do";
					coos.POST(action, data, 'json', function(o) {
						var status = o.data;
						if (status.errcode == 0) {
							app.group.initList();
						} else {
							coos.box.info(status.errmsg);
						}
					});
				}, {
					height : 600
				}, function($model) {

				});
			});

		},
		load : function(recordid, callback) {
			var action = "/core/group/get.do";
			var data = {};
			data.recordid = recordid;
			coos.POST(action, data, 'json', function(o) {
				var status = o.data;
				if (status.errcode == 0) {
					if (callback) {
						callback(status.result);
					}
				} else {
					console.log(status.errmsg);
				}
			});

		},
		loadList : function(callback) {
			var action = "/core/group/getList.do";

			var data = {};
			coos.POST(action, data, 'json', function(o) {
				var status = o.data;
				if (status.errcode == 0) {
					var datas = status.result;
					callback && callback(datas);
				}
			});
		},
		initList : function(callback) {

			app.group.loadList(function(list) {
				var datas = [];
				// datas.push({
				// id : -1,
				// text : "全部"
				// });
				$(list).each(function(index, one) {
					var data = {};
					data.id = one.groupid;
					data.parentid = one.parentid;
					data.text = one.name;
					data.data = one;
					datas.push(data);
				});
				var treeConfig = {};
				var buttons = [];
				var button = {
					html : '<a class="coos-btn coos-btn-xs coos-bd-green coos-green " ><i class="fa fa-plus"> </i></a>',
					onClick : function(one) {
						var parentid = null;
						if (one.id != -1) {
							parentid = one.id;
						}
						app.group.window({
							groupid : coos.getRandomNumber(),
							parentid : parentid
						});
					}
				};
				buttons.push(button);
				var button = {
					html : '<a class="coos-btn coos-btn-xs coos-bd-yellow coos-yellow " ><i class="fa fa-edit"> </i></a>',
					showrule : "data.id!=-1",
					onClick : function(one) {
						app.group.load(one.id, function(data) {
							app.group.window(data);
						});
					}
				};
				buttons.push(button);

				var button = {
					html : '<a class="coos-btn coos-btn-xs coos-bd-red coos-red  " ><i class="fa fa-remove"> </i></a>',
					showrule : "data.id!=-1",
					onClick : function(one) {
						coos.box.confirm("确认执行本次操作，将无法恢复！", function() {
							var action = "/core/group/delete.do";
							var data = {};
							data.recordid = one.id;
							coos.POST(action, data, 'json', function(o) {
								var status = o.data;
								if (status.errcode === 0) {
									app.group.initList();
								} else {
									coos.box.info(status.errmsg);
								}
							});
						}, function() {
						});
					}
				};
				buttons.push(button);
				treeConfig.datas = datas;
				treeConfig.buttons = buttons;
				// treeConfig.topid = "-1";
				treeConfig.treeUlHeight = "auto";
				treeConfig.content = $(".group-table");
				$(".group-table").empty();
				treeConfig.onClick = function($li, data) {
					app.group.groupTree.$tree.find('li.active').removeClass('active');
					$li.addClass('active');
					$('.addUserRoleBtn').removeClass('coos-disabled');
					$('.addUserGroupBtn').attr('groupid', data.id);
					app.group.initUserList(data.data);
				};
				app.group.groupTree = coos.tree(treeConfig);
				app.group.groupTree.$tree.find('.tree-row-content:first').click();
				if (callback) {
					callback(status.result);
				}
			});

		}
	};

	app.group.loadUser = function(group, callback, findnotin) {
		var action = "/core/group/getUserList.do";

		var data = {};
		data.groupid = group.groupid;
		data.findnotin = findnotin || false;
		coos.POST(action, data, 'json', function(o) {
			var status = o.data;
			if (status.errcode == 0) {
				var datas = status.result;
				callback && callback(datas);
			}
		});
	};
	app.group.initUserList = function(group, callback) {
		app.group.loadUser(group, function(datas) {
			$(datas).each(function(index, one) {
				if (one.isleader) {
					one.isleadertext = "是";
				} else {
					one.isleadertext = "否";
				}
				var $buttons = [];
				var $deleteBtn = $('<a class="coos-btn coos-btn-xs coos-bd-red coos-red  mgr-5" >删除</a>');
				$deleteBtn.click(function() {
					coos.box.confirm("确认执行本次操作，将无法恢复！", function() {
						var action = "/core/group/deleteUserGroup.do";
						var data = {};
						data.userid = one.userid;
						data.groupid = group.groupid;
						coos.POST(action, data, 'json', function(o) {
							var status = o.data;
							if (status.errcode === 0) {
								app.group.initUserList(group, callback);
							} else {
								coos.box.info(status.errmsg);
							}
						});
					}, function() {
					});
				});
				$buttons[$buttons.length] = $deleteBtn;

				var $setLeaderBtn = $('<a class="coos-btn coos-btn-xs coos-bd-yellow coos-yellow  mgr-5" >设为组长</a>');
				if (one.isleader) {
					$setLeaderBtn = $('<a class="coos-btn coos-btn-xs coos-bd-red coos-red  mgr-5" >移除组长</a>');
				}
				$setLeaderBtn.click(function() {
					var action = "/core/group/updateLeaderStatus.do";
					var data = {};
					data.userid = one.userid;
					data.isleader = !one.isleader;
					data.groupid = group.groupid;
					coos.POST(action, data, 'json', function(o) {
						var status = o.data;
						if (status.errcode === 0) {
							app.group.initUserList(group, callback);
						} else {
							coos.box.info(status.errmsg);
						}
					});
				});
				$buttons[$buttons.length] = $setLeaderBtn;

				one.$buttons = $buttons;
			});
			var config = {};
			config.titles = [ {
				label : '用户名称',
				name : 'username'
			}, {
				label : '登录名称',
				name : 'loginname'
			}, {
				label : '组长',
				name : 'isleadertext'
			} ];
			config.datas = datas;
			var $table = app.createDataTable(config);
			$('.group-user-table').empty().append($table);
			if (callback) {
				callback(status.result);
			}
		});
	};

	app.group.initNotInUserList = function(group, callback) {
		app.group.loadUser(group, function(datas) {
			$(datas).each(function(index, one) {
				var $buttons = [];
				var $deleteBtn = $('<a class="coos-btn coos-btn-xs coos-bd-red coos-red  mgr-5" >添加</a>');
				$deleteBtn.click(function() {
					var $btn = $(this);
					var action = "/core/group/addUserGroup.do";
					var data = {};
					data.userid = one.userid;
					data.groupid = group.groupid;
					coos.POST(action, data, 'json', function(o) {
						var status = o.data;
						if (status.errcode === 0) {
							$btn.addClass('coos-disabled');
							app.group.initUserList(group, callback);
						} else {
							coos.box.info(status.errmsg);
						}
					});
				});
				$buttons[$buttons.length] = $deleteBtn;

				one.$buttons = $buttons;
			});
			var config = {};
			config.titles = [ {
				label : '用户名称',
				name : 'username'
			}, {
				label : '登录名称',
				name : 'loginname'
			} ];
			config.datas = datas;
			var $table = app.createDataTable(config);
			var w = app.createModelWindow('选择用户', $table, null, '', function(data) {

			}, {
				height : 600
			}, function($model) {

			});
			w.$model.find('.coos-box-button:first').remove();
			if (callback) {
				callback(status.result);
			}
		}, true);
	};

}());
