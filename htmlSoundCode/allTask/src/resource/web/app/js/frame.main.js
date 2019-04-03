(function() {
	if (window.parent && window.parent.dev) {
		window.parent.dev.frame.onload(window);
	}
	"use strict";
	var menus = [];

	// var menu = {};
	// menu.name = "HOME";
	// menu.servletpath = CORE_CONFIG.project.toIndex;
	// menus[menus.length] = menu;

	$(THIS_MENUS).each(function(index, menu) {
		menus[menus.length] = menu;
	});
	var thisTheme = coos.frame.theme.getTheme('MANAGER', 'STYLE-1');
	// thisTheme.header.config.title = "";

	var header_buttons = [];
	$(THIS_PROJECT.staticvalues).each(function(index, staticvalue) {
		if (staticvalue.staticname == 'USER_INFO') {
			header_buttons.push({
				icon : 'fa fa-power-off',
				label : "登录",
				type : "LOGIN",
				showrule : "USER_INFO == null"
			});
		}
	});
	if (THIS_USER) {
		if (coos.isEmpty(THIS_USER.username)) {
			THIS_USER.username = THIS_USER.loginname;
		}
		if (coos.isEmpty(THIS_USER.username)) {
			THIS_USER.username = THIS_USER.email;
		}
		if (coos.isEmpty(THIS_USER.username)) {
			THIS_USER.username = THIS_USER.phone;
		}
		header_buttons.push({
			icon : 'fa fa-user',
			type : "USER",
			showrule : "USER_INFO != null",
			childbuttons : [ {
				label : "修改密码",
				type : "UPDATE-PASSWORD"
			}, {
				label : "退出",
				type : "LOGOUT"
			} ]
		});
	}

	coos.config.action.toLogin = "core/login/toLogin.do";

	var frame = coos.frame.init({
		project : THIS_PROJECT,
		menus : menus,
		user : THIS_USER,
		header_buttons : header_buttons
	});
	var $selecttab = $('<ul class="coos-select-tab"></ul>');
	frame.$header.find('.coos-header-right').append($selecttab);
	$.get(coos.url.format('/core/selecttab/getList.data'), function(result) {
		var status = result.data || {};
		if (status.errcode == 0) {
			var list = status.result;
			appendSelecttab(list);
		}
	});
	var $header = frame.$header;

	function appendSelecttab(list) {
		$selecttab.empty();
		$(list).each(function(index, one) {
			var selecttabtextname = one.selecttabtextname;
			var selecttabvaluename = one.selecttabvaluename;
			var cacheselectedname = one.cacheselectedname;
			var cachedataname = one.cachedataname;
			var selected = one.selected;
			var $li = $('<li />');
			if (selected == null) {
				$li.append('<a >暂无数据</a>');
			} else {
				$li.append('<a >' + selected[selecttabtextname] + '</a>');
			}

			$.get(coos.url.format('/core/selecttab/getOptions.data?cachedataname=' + cachedataname), function(result) {
				var status = result.data || {};
				var options;
				if (status.errcode == 0) {
					options = status.result;
				}
				if (options != null && options.length > 0) {
					$li.find('a').append('&nbsp;<span class="coos-caret"></span>');
					$li.find('a').addClass('coos-dropdown-toggle');
					var $subUl = $('<ul class="coos-dropdown-menu coos-dropdown-menu-right"/>');
					$li.append($subUl);
					$subUl.append('<li><input placeholder="请输入检索"/></li>');
					$subUl.find('input').bind('input', function() {
						var $texts = $subUl.find('li[text]');
						var value = $(this).val();
						if (coos.isEmpty(value)) {
							$texts.show();
						} else {
							$texts.hide();
							$($texts).each(function(index, $text) {
								$text = $($text);
								var text = $text.attr('text');
								if (text.toUpperCase().indexOf(value.toUpperCase()) >= 0) {
									$text.show();
								}
							});
						}
					});

					$(options).each(function(index, option) {
						var $li = $('<li />');
						$li.append('<a >' + option[selecttabtextname] + '</a>');
						$li.attr('text', option[selecttabtextname]);
						var active = false;
						if (selected != null) {
							if (option[selecttabvaluename] == selected[selecttabvaluename]) {
								active = true;
							}
						}
						if (active) {
							$li.addClass('active');
						} else {
							var $btn = $('<div class="coos-btn coos-btn-xs coos-green coos-bd-green">切换</div>');
							$li.find('a').append($btn);
							$btn.click(function() {
								var data = {};
								data.cacheselectedname = cacheselectedname;
								data.data = JSON.stringify(option);
								var action = '/core/selecttab/changeSelected.data';
								coos.POST(action, data, 'json', function() {
									window.location.reload();
								});
							});
						}
						$subUl.append($li);
					});
					$subUl.css('min-width', $subUl.width());
					$subUl.find('li').click(function(e) {
						return false;
					});
				}
			});
			$selecttab.append($li);
		});
	}
})();