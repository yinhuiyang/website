(function() {
	coos.page.pushLoadCallback(function() {
		app.role.init();
	});
	app.role = {
		init : function() {

			$('.addRoleBtn').unbind('click').click(function() {
				app.role.window({
					roleid : coos.getRandomNumber()
				});
			});
			$('.addUserRoleBtn').addClass('coos-disabled');
			$('.addUserRoleBtn').unbind('click').click(function() {
				var roleid = $(this).attr('roleid');
				app.role.initNotInUserList({
					roleid : roleid
				});
			});
		},
		window : function(roleData) {
			var data = roleData;

			app.operate.loadList(function(operates) {
				app.menu.loadList(function(menus) {
					app.createModelWindow('编辑角色', 'role', roleData, '', function(data) {
						var menuCheckedDatas = app.role.menuTree.getCheckedDatas();
						var operateCheckedDatas = app.role.operateTree.getCheckedDatas();
						data.checkedmenusstr = JSON.stringify(menuCheckedDatas.checkedDatas);
						data.checkeddeletemenusstr = JSON.stringify(menuCheckedDatas.checkedDeleteDatas);
						data.checkedoperatesstr = JSON.stringify(operateCheckedDatas.checkedDatas);
						data.checkeddeleteoperatesstr = JSON.stringify(operateCheckedDatas.checkedDeleteDatas);
						var action = "/core/role/save.do";
						coos.POST(action, data, 'json', function(o) {
							var status = o.data;
							if (status.errcode == 0) {
								app.role.initList();
							} else {
								coos.box.info(status.errmsg);
							}
						});
					}, {
						height : 600
					}, function($model) {
						var rolemenus = roleData.menus;
						var roleoperates = roleData.operates;
						var menuCheckedIds = [];
						$(rolemenus).each(function(index, rolemenu) {
							menuCheckedIds[menuCheckedIds.length] = rolemenu.menuid;
						});
						var operateCheckedIds = [];
						$(roleoperates).each(function(index, roleoperate) {
							operateCheckedIds[operateCheckedIds.length] = roleoperate.operateid;
						});
						var menuTreeConfig = {};
						menuTreeConfig.checkedIds = menuCheckedIds;
						menuTreeConfig.property = {
							id : "menuid",
							parentid : "parentid",
							text : "name"
						};
						menuTreeConfig.openHalfCheck = true;
						menuTreeConfig.hasCheckbox = true;
						menuTreeConfig.datas = menus;
						menuTreeConfig.treeUlHeight = "auto";
						menuTreeConfig.content = $model.find(".role-menu-list");
						app.role.menuTree = coos.tree(menuTreeConfig);

						var operateTreeConfig = {};
						operateTreeConfig.checkedIds = operateCheckedIds;
						operateTreeConfig.property = {
							id : "operateid",
							parentid : "parentid",
							text : "name"
						};
						operateTreeConfig.hasCheckbox = true;
						operateTreeConfig.openHalfCheck = true;
						operateTreeConfig.datas = operates;
						operateTreeConfig.treeUlHeight = "auto";
						operateTreeConfig.content = $model.find(".role-operate-list");
						app.role.operateTree = coos.tree(operateTreeConfig);

					});
				});
			});

		},
		load : function(recordid, callback) {
			var action = "/core/role/get.do";
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
			var action = "/core/role/getList.do";

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

			app.role.loadList(function(list) {
				var datas = [];
				// datas.push({
				// id : -1,
				// text : "全部"
				// });
				$(list).each(function(index, one) {
					var data = {};
					data.id = one.roleid;
					data.parentid = one.parentid;
					data.text = one.name;
					data.data = one;
					datas.push(data);
				});
				var treeConfig = {};
				var buttons = [];
				var button = {
					html : '<a class="coos-btn coos-btn-xs coos-bd-yellow coos-yellow " ><i class="fa fa-edit"> </i></a>',
					showrule : "data.id!=-1",
					onClick : function(one) {
						app.role.load(one.id, function(data) {
							app.role.window(data);
						});
					}
				};
				buttons.push(button);

				var button = {
					html : '<a class="coos-btn coos-btn-xs coos-bd-red coos-red  " ><i class="fa fa-remove"> </i></a>',
					showrule : "data.id!=-1",
					onClick : function(one) {
						coos.box.confirm("确认执行本次操作，将无法恢复！", function() {
							var action = "/core/role/delete.do";
							var data = {};
							data.recordid = one.id;
							coos.POST(action, data, 'json', function(o) {
								var status = o.data;
								if (status.errcode === 0) {
									app.role.initList();
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
				treeConfig.content = $(".role-table");
				$(".role-table").empty();
				treeConfig.onClick = function($li, data) {
					app.role.roleTree.$tree.find('li.active').removeClass('active');
					$li.addClass('active');
					$('.addUserRoleBtn').removeClass('coos-disabled');
					$('.addUserRoleBtn').attr('roleid', data.id);
					app.role.initUserList(data.data);
				};
				app.role.roleTree = coos.tree(treeConfig);
				app.role.roleTree.$tree.find('.tree-row-content:first').click();
				if (callback) {
					callback(status.result);
				}
				if (callback) {
					callback(status.result);
				}
			});

		}
	};

	app.role.loadUser = function(role, callback, findnotin) {
		var action = "/core/role/getUserList.do";

		var data = {};
		data.roleid = role.roleid;
		data.findnotin = findnotin || false;
		coos.POST(action, data, 'json', function(o) {
			var status = o.data;
			if (status.errcode == 0) {
				var datas = status.result;
				callback && callback(datas);
			}
		});
	};
	app.role.initUserList = function(role, callback) {
		app.role.loadUser(role, function(datas) {
			$(datas).each(function(index, one) {
				var $buttons = [];
				var $deleteBtn = $('<a class="coos-btn coos-btn-xs coos-bd-red coos-red  mgr-5" >删除</a>');
				$deleteBtn.click(function() {
					coos.box.confirm("确认执行本次操作，将无法恢复！", function() {
						var action = "/core/role/deleteUserRole.do";
						var data = {};
						data.userid = one.userid;
						data.roleid = role.roleid;
						coos.POST(action, data, 'json', function(o) {
							var status = o.data;
							if (status.errcode === 0) {
								app.role.initUserList(role, callback);
							} else {
								coos.box.info(status.errmsg);
							}
						});
					}, function() {
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
			$('.role-user-table').empty().append($table);
			if (callback) {
				callback(status.result);
			}
		});
	};

	app.role.initNotInUserList = function(role, callback) {
		app.role.loadUser(role, function(datas) {
			$(datas).each(function(index, one) {
				var $buttons = [];
				var $deleteBtn = $('<a class="coos-btn coos-btn-xs coos-bd-red coos-red  mgr-5" >添加</a>');
				$deleteBtn.click(function() {
					var $btn = $(this);
					var action = "/core/role/addUserRole.do";
					var data = {};
					data.userid = one.userid;
					data.roleid = role.roleid;
					coos.POST(action, data, 'json', function(o) {
						var status = o.data;
						if (status.errcode === 0) {
							$btn.addClass('coos-disabled');
							app.role.initUserList(role, callback);
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
