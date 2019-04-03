(function() {
	coos.page.pushLoadCallback(function() {
		app.menu.init();
	});
	app.menu = {
		init : function() {

		},
		loadList : function(callback) {
			var action = "core/menu/getList.do";

			var data = {};
			coos.POST(action, data, 'json', function(o) {
				var status = o.data;
				if (status.errcode == 0) {
					var datas = status.result;
					datas = datas || [];
					callback && callback(datas);
				}
			});
		}
	};

}());
