(function() {
	"use strict";
	var config = {
		page : {
			single : true,
			animation : false
		},
		action : {
			toIndex : CORE_CONFIG.project.toIndex,
			toLogin : CORE_CONFIG.project.toLogin,
			doLogin : CORE_CONFIG.project.doLogin,
			doUpload : CORE_CONFIG.project.doUpload,
			error : {
				404 : CORE_CONFIG.project.to404,
				500 : CORE_CONFIG.project.to500,
				toNoAccess : CORE_CONFIG.project.toNoAccess,
				toNotOnline : CORE_CONFIG.project.toNotOnline
			}
		},
		resourcePath : CORE_RESOURCE_JSON_PATH,
		server : {
			fileServerUrl : fileServerUrl
		},
		images : {
			loading : basePath + "/resource/coos/images/image/loading.gif",
			noimg : basePath + "/resource/coos/images/image/noimage.png",
			notfindimg : basePath + "/resource/coos/images/image/notfindimage.png",
			clickupload : basePath + "/resource/coos/images/image/clickupload.png"
		}
	};
	coos.initConfig(config);
	var loadAppResource = function() {
		if (coos.isEmpty(APP_RESOURCE_JSON_PATH)) {
			return;
		}
		window.setTimeout(function() {
			coos.cover.showLoading();
		}, 1);
		var action = APP_RESOURCE_JSON_PATH;
		var data = {};
		coos.POST(action, data, 'json', function(data) {
			var file = data.file;
			var jsfiles = file.js;
			var cssfiles = file.css;
			cssfiles = cssfiles == null ? [] : cssfiles;
			for (var i = 0; i < cssfiles.length; i++) {
				var cssfile = cssfiles[i];
				var src = cssfile.src;
				if (!src || src == '')
					continue;
				if (src.indexOf('http') != 0)
					src = basePath + src;
				document.write("<link href='" + src + "' rev='stylesheet' media ='screen' rel='stylesheet' type='text/css'>");
			}
			jsfiles = jsfiles == null ? [] : jsfiles;
			for (var i = 0; i < jsfiles.length; i++) {
				var jsfile = jsfiles[i];
				var src = jsfile.src;
				if (!src || src == '')
					continue;
				if (src.indexOf('http') != 0)
					src = basePath + src;
				document.write("<script type='text/javascript' src='" + src + "'></script>");
			}
			coos.cover.hideLoading();
		}, false);
	}
	loadAppResource();
})();