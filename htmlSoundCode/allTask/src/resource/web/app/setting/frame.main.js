(function() {
	"use strict";
	var menus = [];

	var menu = {};
	menu.menuid = "000";
	menu.name = "首页";
	menu.servletpath = "/core/setting/index/toIndex";
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = "001";
	menu.name = "系统维护";
	menus[menus.length] = menu;

	var menu = {};
	menu.menuid = "010";
	menu.parentid = "001";
	menu.name = "升级项目";
	menu.servletpath = "/core/setting/upgrade/toIndex";
	menus[menus.length] = menu;

	var thisTheme = coos.frame.theme.getTheme('MANAGER', 'STYLE-2');

	thisTheme.header.config.title = "系统运维";
	thisTheme.header.config.buttons = [];

	thisTheme.config.menuplaces = "BODY";

	coos.frame.init({
		project : {
			title : "系统运维平台",
			themes : [ thisTheme ]
		},
		menus : menus
	});
})();