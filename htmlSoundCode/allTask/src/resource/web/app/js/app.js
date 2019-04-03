(function() {
	window.app = window.app || {};
	app.init = function() {
	};

	app.createModelWindow = function(title, type, data, url, callback, config, viewInitedCallback) {
		config = config || {};
		var formWindow = null;
		title = coos.isEmpty(title) ? "编辑" : title;
		data = data || {};
		var $model = $(type);
		if (coos.isString(type)) {
			$model = $($('.' + type + '-form-model').html());
		}
		config.title = title;
		config.width = config.width || 700;
		config.html = $model;
		var buttons = [];
		buttons[buttons.length] = {
			className : "coos-bg-green coos-white",
			label : "保存",
			bindEnterKey : true,
			callback : function() {

				var data = coos.form.validate($form);
				if (coos.isEmpty(url)) {
					callback && callback(data);
					formWindow.remove();
				} else {
					var action = url;
					coos.POST(action, data, 'json', function(o) {
						var status = o.data;
						if (status.errcode == 0) {
							coos.box.info('保存成功！');
							callback && callback(status.result);
							formWindow.remove();
						} else {
							coos.box.info(status.errmsg);
						}
					}, false);
				}
			}
		};
		config.buttons = buttons;
		config.cancelCallback = function() {
			formWindow.remove();
		};
		formWindow = coos.box.window(config);
		formWindow.show();
		if (viewInitedCallback) {
			viewInitedCallback(formWindow.$model);
		}
		var $form = formWindow.$model;
		if (!coos.isEmpty(config.form)) {
			$form = formWindow.$model.find(config.form);
		}
		coos.form.clear($form);
		coos.form.full($form, data);
		return formWindow;
	};
	app.createDataTable = function(config) {
		var titles = config.titles;
		var datas = config.datas;
		var idname = config.idname;
		var checkedIds = config.checkedIds;
		var viewpageindex = config.viewpageindex;
		var viewrecordid = config.viewrecordid ? [ config.viewrecordid ] : [];
		var $table = $('<table class="coos-table element-rule-data-tables  "></table>');
		var $thead = $('<thead class=""></thead>');
		$table.append($thead);
		var $theadtr = $('<tr class=""></tr>');
		$thead.append($theadtr);
		var $tbody = $('<tbody class=""></tbody>');
		$table.append($tbody);
		$theadtr.append('<th style="border-bottom: none;">序号</th>');
		$(titles).each(function(index, title) {
			$theadtr.append('<th style="border-bottom: none;">' + title.label + '</th>');
		});
		$theadtr.append('<th style="border-bottom: none;">操作</th>');
		var radioName = 'radio_' + coos.getNumber();
		var checkboxName = 'checkbox_' + coos.getNumber();
		var viewrowindex = 0;
		$(datas).each(function(index, data) {
			var $tbodytr = $('<tr class=""></tr>');
			$tbody.append($tbodytr);
			var $td = $('<td></td>');
			$(viewrecordid).each(function(i, id) {
				if (data[idname] == id) {
					viewrowindex = index;
				}
			});
			$tbodytr.append($td);
			if (config.hasRadio) {
				var $input = $('<input type="radio" name="' + radioName + '" class="one-radio mglr-5 mgt-5 float-left" />');
				$input.data('data', data);

				if (checkedIds && idname) {
					$(checkedIds).each(function(i, checkedId) {
						if (data[idname] == checkedId) {
							$input.attr('checked', 'checked');
							if (viewrecordid == null || viewrecordid.length == 0) {
								viewrowindex = index;
							}
						}
					});
				}
				$td.append($input);
			}
			if (config.hasCheckbox) {
				var $input = $('<input type="checkbox" name="' + checkboxName + '" class="one-checkbox mglr-5 mgt-5 float-left" />');
				$input.data('data', data);
				$td.append($input);
				if (checkedIds && idname) {
					$(checkedIds).each(function(i, checkedId) {
						if (data[idname] == checkedId) {
							$input.attr('checked', 'checked');
							if (viewrecordid == null || viewrecordid.length == 0) {
								viewrowindex = index;
							}
						}
					});
				}
			}
			$td.append((index + 1));

			if (config.hasRadio || config.hasCheckbox) {
				$tbodytr.css('cursor', 'pointer');
				$tbodytr.click(function(e) {
					if (e.target.tagName != 'INPUT') {
						$(this).find('input').click();
					}
				});
			}

			$(titles).each(function(index, title) {
				var name = title.name;
				var color = title.color;
				var onClick = title.onClick;
				var value = data[name];
				var $td = $('<td></td>');
				if (!coos.isEmpty(color)) {
					$td.addClass('coos-' + color);
				}
				if (onClick) {
					$td.addClass('coos-pointer');
					$td.click(function() {
						onClick(data);
					});
				}
				$tbodytr.append($td)
				$td.append(value);
			});
			var $buttontd = $('<td></td>');
			$tbodytr.append($buttontd)
			$(data.$buttons).each(function(index, $button) {
				$buttontd.append($button);
			});
		});
		$table.attr('viewrowindex', viewrowindex + 1);
		if (viewpageindex) {
			$table.attr('viewpageindex', viewpageindex);
		}
		return $table;

	};
	$(function() {

		$('html').on('click', '.doLogoutBtn', function() {
			var data = {};
			var action = 'core/login/doLogout.do';

			coos.POST(action, data, 'json', function(o) {

				var status = o.data;
				// 登录成功
				if (status.errcode == 0) {
					if (!coos.isEmpty(THIS_PROJECT.afterlogouttourl)) {
						if (window.parent && window.parent.dev) {
							coos.toUrl('/core/index/toIndex.do');
						} else {
							coos.toUrl(THIS_PROJECT.afterlogouttourl);
						}
					} else {
						window.location.reload();
					}
				} else {
					coos.box.info(status.errmsg);
				}
			});
		});
		$('html').on('click', '.toUpdatePasswordBtn', function() {
			var data = {};
			var action = 'core/user/toUpdatePassword.do';

			coos.toAction({
				action : action,
				data : data
			});
		});
	});
}());