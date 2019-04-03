(function() {
	coos.page.pushLoadCallback(function() {
		app.user.init();
	});
	app.user = {
		init : function() {

			$('.addUserBtn').unbind('click').click(function() {
				app.user.window({
					userid : coos.getRandomNumber()
				});
			});
		},
		window : function(userData) {
			var data = userData;

			app.createModelWindow('编辑用户', 'user', userData, '', function(data) {
				var action = "/core/user/save.do";
				coos.POST(action, data, 'json', function(o) {
					var status = o.data;
					if (status.errcode == 0) {
						app.user.initList();
					} else {
						coos.box.info(status.errmsg);
					}
				});
			}, {
				height : 600
			}, function($model) {

			});

		},
		load : function(recordid, callback) {
			var action = "/core/user/get.do";
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
			var action = "/core/user/getList.do";

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

			app.user.loadList(function(datas) {
				$(datas).each(function(index, one) {
					var $buttons = [];
					var $updateBtn = $('<a class="coos-btn coos-btn-xs coos-bd-yellow coos-yellow mgr-5 " >修改</a>');
					$updateBtn.click(function() {
						app.user.load(one.userid, function(data) {
							app.user.window(data);
						});
					});
					$buttons[$buttons.length] = $updateBtn;
					var $deleteBtn = $('<a class="coos-btn coos-btn-xs coos-bd-red coos-red  mgr-5" >删除</a>');
					$deleteBtn.click(function() {
						coos.box.confirm("确认执行本次操作，将无法恢复！", function() {
							var action = "/core/user/delete.do";
							var data = {};
							data.recordid = one.userid;
							coos.POST(action, data, 'json', function(o) {
								var status = o.data;
								if (status.errcode === 0) {
									app.user.initList();
								} else {
									coos.box.info(status.errmsg);
								}
							});
						}, function() {
						});
					});
					$buttons[$buttons.length] = $deleteBtn;

					var $updatePasswordBtn = $('<a class="coos-btn coos-btn-xs coos-bd-red coos-red  " >重置密码</a>');
					$updatePasswordBtn.click(function() {
						coos.box.confirm("确认执行本次操作，将无法恢复！", function() {
							var action = "/core/user/updatePassword.do";
							var data = {};
							data.recordid = one.userid;
							data.type = "RESET";
							coos.POST(action, data, 'json', function(o) {
								var status = o.data;
								if (status.errcode === 0) {
									coos.box.info("操作成功");
									app.user.initList();
								} else {
									coos.box.info(status.errmsg);
								}
							});
						}, function() {
						});
					});
					$buttons[$buttons.length] = $updatePasswordBtn;

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
					label : '手机',
					name : 'phone'
				}, {
					label : '邮箱',
					name : 'email'
				} ];
				config.datas = datas;
				var $table = app.createDataTable(config);
				$('.user-table').empty().append($table);
				if (callback) {
					callback(status.result);
				}
			});

		}
	};

}());
