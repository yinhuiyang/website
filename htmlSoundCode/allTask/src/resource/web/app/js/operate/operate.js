(function() {
	coos.page.pushLoadCallback(function() {
		app.operate.init();
	});
	app.operate = {
		init : function() {

		},
		loadList : function(callback) {
			var operate = "core/operate/getList.do";

			var data = {};
			coos.POST(operate, data, 'json', function(o) {
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
