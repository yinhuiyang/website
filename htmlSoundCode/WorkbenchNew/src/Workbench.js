! function a(o, r, c) {
	function l(t, e) {
		if (!r[t]) {
			if (!o[t]) {
				var n = "function" == typeof require && require;
				if (!e && n) return n(t, !0);
				if (d) return d(t, !0);
				var i = new Error("Cannot find module '" + t + "'");
				throw i.code = "MODULE_NOT_FOUND", i
			}
			var s = r[t] = {
				exports: {}
			};
			o[t][0].call(s.exports, function(e) {
				return l(o[t][1][e] || e)
			}, s, s.exports, a, o, r, c)
		}
		return r[t].exports
	}
	for (var d = "function" == typeof require && require, e = 0; e < c.length; e++) l(c[e]);
	return l
}({
	1: [function(require, module, exports) {
		"use strict";
		var t = require("./pageView.js"),
			e = require("./nav.js"),
			n = require("./getlist.js"),
			i = require("./data.js"),
			s = {
				init: function() {
					e(n), this.pageView(), n()
				},
				getdata: function() {
					i.pageView.disable(), console.log(i.pageView.getParams()), i.pageView.pageIndex = i.pageView.getParams().page,
						i.allPage = i.pageView.getParams().page, n()
				},
				pageView: function() {
					var e = new t(".pagination", {
						defaultSize: 5,
						onChange: this.getdata
					});
					i.pageView = e
				}
			};
		window.Workbench = s
	}, {
		"./data.js": 5,
		"./getlist.js": 9,
		"./nav.js": 13,
		"./pageView.js": 14
	}],
	2: [function(require, module, exports) {
		"use strict";
		module.exports.getFavouriteProjects = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("index/getFavouriteProjects.do", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.getAllProjects = function(e) {
			var t = require("./tool.js"),
				n = {};
			return e.pagesize = 5, t.POST("index/getAllProjects.do", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.getMyCreateProjects = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("index/getMyCreateProjects.do", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.insert = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project/insert", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.projectQueryOne = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project/queryOne", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.projectupdate = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project/update", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.getTaskStatusList = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("task/alltask/getTaskStatusList.do", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.versionQueryOne = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_version/queryOne", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.versionInsert = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_version/insert", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.versionUpdate = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_version/update", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.addFavourite = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project_favourite/insert", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.delFavourite = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project_favourite/delete", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.delversion = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_version/delete", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.queryAuthGroup = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project/group/queryAuthGroup", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.updateAuthGroup = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project/group/updateAuthGroup", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.projectdelete = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("core/service/task_project/delete", e, function(e) {
				n = e
			}, !0), n
		}, module.exports.getTotalCount = function(e) {
			var t = require("./tool.js"),
				n = {};
			return t.POST("index/getTotalCount.do", e, function(e) {
				n = e
			}, !0), n
		}
	}, {
		"./tool.js": 17
	}],
	3: [function(require, module, exports) {
		"use strict";
		module.exports = function() {
			var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
				i = require("./data.js"),
				s = require("./api.js").updateAuthGroup,
				e = $(
					'\n  <div class="Workbench-dialog">\n    <div class="dialog-content">\n      <div class="dialog-title">\n        <span>授权</span>\n        <div style="display:flex">\n          <span class="delDialog">×</span>\n        </div>\n      </div>\n      <div class="dialog-section">\n        <div class="dialog-form">\n          <div class="addAuth"></div>\n        </div>\n      </div>\n      <div class="dialog-footer">\n        <span class="btn-default" id="delDialog">取消</span>\n        <span class="btn-default btn-preserve" id="preserve">保存</span>\n      </div>\n    </div>\n  </div>'
				),
				a = {
					checkedIds: []
				};
			$(n.checkeddata.value).each(function(e, t) {
				a.checkedIds[a.checkedIds.length] = t.groupid
			}), a.property = {
				id: "groupid",
				parentid: "parentid",
				text: "name"
			}, a.openHalfCheck = !0, a.hasCheckbox = !0, a.datas = n.list.value, a.treeUlHeight = "auto", a.content = e.find(
				".addAuth"), i.TreeConfig = coos.tree(a), e.find(".delDialog, #delDialog").click(function() {
				$("body").removeClass("coos-over-hidden"), "取消" == $(this).text() ? $(this).parent().parent().parent().remove() :
					$(this).parent().parent().parent().parent().remove()
			}), e.find(".btn-preserve").click(function() {
				var e = i.TreeConfig.getCheckedDatas(),
					t = {
						group_checkeddatastr: JSON.stringify(e.checkedDatas),
						group_checkeddeletedatastr: JSON.stringify(e.checkedDeleteDatas),
						projectid: n.projectid
					};
				$("body").removeClass("coos-over-hidden"), s(t), $(this).parent().parent().parent().remove()
			}), $("body").append(e)
		}
	}, {
		"./api.js": 2,
		"./data.js": 5
	}],
	4: [function(require, module, exports) {
		"use strict";
		var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" :
				typeof e
		};
		module.exports = function() {
			var o = Object.prototype.hasOwnProperty;

			function r(e) {
				return "object" === (void 0 === e ? "undefined" : t(e))
			}

			function c(e) {
				return "function" == typeof e
			}
			return function(e) {
				if (r(e)) {
					var t, n = r(e) && e.instanceMembers || {},
						i = r(e) && e.staticMembers || {},
						s = r(e) && c(e.extend) && e.extend;
					for (t in i) o.call(i, t) && (a[t] = i[t]);
					for (t in s && (a.prototype = function(e) {
							var t = {};
							for (var n in e) o.call(e, n) && (t[n] = e[n]);
							return t
						}(s.prototype)), n) o.call(n, t) && (a.prototype[t] = s && c(n[t]) && c(s.prototype[t]) ? function(n, i) {
						return function() {
							var e = this.base;
							this.base = s.prototype[n];
							var t = i.apply(this, arguments);
							return this.base = e, t
						}
					}(t, n[t]) : n[t]);
					return a.prototype.constructor = a
				}

				function a() {
					s && (this.baseProto = s.prototype), c(this.init) && this.init.apply(this, arguments)
				}
				console.log("Class options must be an valid object instance!")
			}
		}()
	}, {}],
	5: [function(require, module, exports) {
		"use strict";
		module.exports = {
			pageView: {},
			typeProject: 0,
			favouritePage: 1,
			allPage: 1,
			myPage: 1,
			searchtitle: "",
			TreeConfig: {}
		}
	}, {}],
	6: [function(require, module, exports) {
		"use strict";
		var t;
		module.exports = (t = require("./class.js")({
			instanceMembers: {
				init: function(e) {
					this._jqObject = e && e instanceof $ && e || $({})
				},
				destroy: function() {
					this._jqObject.off(), this._jqObject = void 0
				}
			}
		}), ["on", "one", "off", "trigger"].forEach(function(e) {
			t.prototype[e] = function() {
				return $.fn[e].apply(this._jqObject, arguments)
			}
		}), t)
	}, {
		"./class.js": 4
	}],
	7: [function(require, module, exports) {
		"use strict";
		module.exports = function(e) {
			return e ? e.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5") : ""
		}
	}, {}],
	8: [function(require, module, exports) {
		"use strict";
		module.exports = function() {
			var t = (0, require("./api.js").getTotalCount)().data.result;
			$(".Workbench-section .nav-links li").each(function(e) {
				0 == e ? $(this).find("span").text("(" + t.favouriteCount + ")") : 1 == e ? $(this).find("span").text("(" + t
					.participationCount + ")") : 2 == e && $(this).find("span").text("(" + t.createCount + ")")
			})
		}
	}, {
		"./api.js": 2
	}],
	9: [function(require, module, exports) {
		"use strict";
		module.exports = function() {
			var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "",
				t = require("./data"),
				n = require("./list.js"),
				i = require("./api"),
				s = i.getFavouriteProjects,
				a = i.getAllProjects,
				o = i.getMyCreateProjects;
			if ("星标项目" == (e = e || $(".Workbench-section .nav-links li.active").find("a").text())) t.typeProject = 0, $(
				".gl-pagination").hide(), n(s({
				searchtitle: t.searchtitle
			}));
			else if ("所有参与项目" == e) {
				t.typeProject = 1, $(".gl-pagination").show();
				var r = a({
					currentpage: t.allPage,
					searchtitle: t.searchtitle
				});
				t.pageView.refresh(r.data.result.totalcount), t.pageView.enable(), n(r)
			} else t.typeProject = 0, $(".gl-pagination").hide(), n(o({
				searchtitle: t.searchtitle
			}))
		}
	}, {
		"./api": 2,
		"./data": 5,
		"./list.js": 12
	}],
	10: [function(require, module, exports) {
		"use strict";
		module.exports = function() {
			var e = "";
			switch (0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : "") {
				case "0":
					e = "规划中";
					break;
				case "1":
					e = "启动";
					break;
				case "2":
					e = "进行中";
					break;
				case "8":
					e = "完成";
					break;
				case "9":
					e = "上线";
					break;
				default:
					e = ""
			}
			return e
		}
	}, {}],
	11: [function(require, module, exports) {
		"use strict";
		module.exports = function(e, t, n, i) {
			var s = require("./getTime.js"),
				a = require("./getstatus.js"),
				o = "",
				r = 2;
			r = 2 == e && 2 < t.length ? 2 : t.length;
			for (var c = 0; c < r; c++) o +=
				'<li>\n      <div>\n        <a class="version-number" href="toVersion.do?versionid=' + t[c].versionid + '">' +
				t[c].title + '</a>\n        <span class="time">' + s(t[c].planonlinetime) +
				'</span>\n        <span class="status ' + ("8" == t[c].status || "9" == t[c].status ? "coos-green" : "") +
				'" >' + a(t[c].status) + '</span>\n        <a class="a-link version-pencil" data-versionid="' + t[c].versionid +
				'" ' + ("1" == n ? "" : 'style="display: none;"') +
				'><i class="fa fa-pencil"></i></a>\n        <a class="a-link versionDel" \n        data-versionid="' + t[c].versionid +
				'"\n        data-versionname="' + i + t[c].title + '"\n        ' + ("1" == n ? "" : 'style="display: none;"') +
				'><i class="fa fa-trash-o"></i></a>\n      </div>\n    </li>';
			return o
		}
	}, {
		"./getTime.js": 7,
		"./getstatus.js": 10
	}],
	12: [function(require, module, exports) {
		"use strict";
		module.exports = function(i) {
			var n = require("./project.js"),
				s = require("./getversion.js"),
				a = require("./version.js"),
				o = require("./authorize.js"),
				e = require("./api.js"),
				r = e.projectQueryOne,
				c = e.versionQueryOne,
				t = e.addFavourite,
				l = e.delFavourite,
				d = e.delversion,
				p = e.queryAuthGroup,
				u = e.projectdelete,
				v = require("./getlist.js"),
				f = require("./getTotalCount.js"),
				h = "";
			i.data.result.projects.forEach(function(e, t) {
					h += '\n  <div class="project-item">\n    <div class="number">\n      <span>' + (t + 1) +
						'</span>\n    </div>\n    <div class="item-right">\n      <div class="item-title">' + (e.projectname || e.name ||
							"") + " | " + e.projectcode +
						'</div>\n     \x3c!--<div class="item-illustrate">项目说明项目说明项目说明项目说明</div> --\x3e\n      <div class="version">\n        <ul class="version-list">\n          ' +
						s(2, e.versions, i.data.result.showAddVersionButton, e.projectname || e.name || "") +
						'\n        </ul>\n        <div class="version-manage">\n          ' + ("星标项目" == $(
								".Workbench-section .nav-links li.active").find("a").text() || e.favouriteid ?
							'<a class="a-link delFavourite" data-favouriteid="' + e.favouriteid + '"><i class="fa fa-star"></i></a>' :
							'<a class="a-link addFavourite" data-projectid="' + e.projectid + '"><i class="fa fa-star-o"></i></a>') +
						'\n          <a class="a-link project-pencil" \n            data-projectid="' + e.projectid +
						'" \n            ' + ("1" == i.data.result.showAddPojectButton && "我创建的" == $(
							".Workbench-section .nav-links li.active").find("a").text() ? "" : 'style="display: none;"') +
						'>\n            <i class="fa fa-pencil"></i>\n          </a>\n          <a class="a-link projectDel"\n          data-projectid="' +
						e.projectid + '" \n          data-projectname="' + (e.projectname || e.name || "") + '"\n          ' + ("1" ==
							i.data.result.showAddPojectButton && "我创建的" == $(".Workbench-section .nav-links li.active").find("a").text() ?
							"" : 'style="display: none;"') +
						'><i class="fa fa-trash-o"></i></a>\n          <a class="addPower" \n            data-projectid="' + e.projectid +
						'" \n            ' + ("1" == i.data.result.showAddPojectButton && "我创建的" == $(
							".Workbench-section .nav-links li.active").find("a").text() ? "" : 'style="display: none;"') +
						'>\n            授权\n          </a>\n          <a class="addversion" data-projectid="' + e.projectid + '" ' +
						("1" == i.data.result.showAddVersionButton ? "" : 'style="display: none;"') +
						'>添加版本</a>\n        </div>\n      </div>\n      <div class="open" ' + (2 < e.versions.length ? "" :
							'style="display: none;"') + ">\n        <a data-obj='" + JSON.stringify(e.versions) +
						'\' class="openMore">展开更多</a>\n      </div>\n    </div>\n  </div>'
				}), i.data.result.projects.length || (h = '<div class="projects0">暂无项目</div>'), $(".Workbench .list").html(h),
				$(".openMore").click(function(e) {
					e.preventDefault();
					var t = JSON.parse($(this).attr("data-obj")),
						n = $(this).parent().parent().find(".item-title").text();
					"展开更多" == $(this).text() ? ($(this).text("收起更多"), $(this).parent().parent().find(".version-list").html(s(0, t,
						i.data.result.showAddVersionButton, n))) : ($(this).text("展开更多"), $(this).parent().parent().find(
						".version-list").html(s(2, t, i.data.result.showAddVersionButton, n)))
				}), $(".project-item .project-pencil").click(function(e) {
					e.preventDefault(), $("body").addClass("coos-over-hidden");
					var t = r({
						projectid: $(this).attr("data-projectid")
					});
					n(t.result.data.value)
				}), $(".version .addversion").click(function(e) {
					e.preventDefault(), $("body").addClass("coos-over-hidden"), a({
						projectid: $(this).attr("data-projectid")
					})
				}), $(".version .addPower").click(function(e) {
					e.preventDefault(), $("body").addClass("coos-over-hidden");
					var t = p({
						projectid: $(this).attr("data-projectid")
					}).result;
					t.projectid = $(this).attr("data-projectid"), o(t)
				}), $(".version-list").on("click", ".version-pencil", function(e) {
					e.preventDefault(), $("body").addClass("coos-over-hidden");
					var t = {
							versionid: $(this).attr("data-versionid")
						},
						n = c(t).result.data.value;
					n.versionid = t.versionid, a(n)
				}), $(".version-manage").on("click", ".projectDel", function(e) {
					e.preventDefault(), $("body").addClass("coos-over-hidden");
					var t = {
							projectid: $(this).attr("data-projectid")
						},
						n = $(this).attr("data-projectname");
					coos.box.confirm("是否删除“" + n + "”项目", function() {
						20001 == u(t).errcode ? coos.box.confirm("当前数据在需求表有关联数据, 是否确定删除？", function() {
							t.forciblyremove = !0, u(t), v(), f(), $("body").removeClass("coos-over-hidden")
						}) : (v(), f(), $("body").removeClass("coos-over-hidden"))
					})
				}), $(".version-list").on("click", ".versionDel", function(e) {
					e.preventDefault(), $("body").addClass("coos-over-hidden");
					var t = {
						versionid: $(this).attr("data-versionid")
					};
					coos.box.confirm("是否删除" + $(this).attr("data-versionname") + "版本", function() {
						20001 == d(t).errcode ? coos.box.confirm("当前数据在需求表有关联数据, 是否确定删除？", function() {
							t.forciblyremove = !0, d(t), v(), $("body").removeClass("coos-over-hidden")
						}) : (v(), $("body").removeClass("coos-over-hidden"))
					})
				}), $(".version-manage").on("click", ".addFavourite", function() {
					var e = $(this).attr("data-projectid");
					t({
						projectid: e
					}), v(), f()
				}), $(".version-manage").on("click", ".delFavourite", function() {
					var e = $(this).attr("data-favouriteid");
					l({
						favouriteid: e
					}), v(), f()
				})
		}
	}, {
		"./api.js": 2,
		"./authorize.js": 3,
		"./getTotalCount.js": 8,
		"./getlist.js": 9,
		"./getversion.js": 11,
		"./project.js": 15,
		"./version.js": 18
	}],
	13: [function(require, module, exports) {
		"use strict";
		module.exports = function() {
			var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : function() {},
				n = require("./project.js"),
				i = require("./data.js");
			$(".Workbench-section .nav-links li").click(function() {
				$(".Workbench-section .nav-links li").removeClass("active"), $(this).addClass("active"), $(
					".nav-controls .nameFiltering").val(""), i.searchtitle = "", t($(this).find("a").text())
			}), $(".Workbench-section .CreateProject a").click(function(e) {
				e.preventDefault(), $("body").addClass("coos-over-hidden"), n()
			}), $(".Workbench-section .nameFiltering").keydown(function(e) {
				13 == e.keyCode && (i.searchtitle = $(this).val(), "所有参与项目" == $(".Workbench-section .nav-links li.active").find(
					"a").text() && (i.allPage = 1, i.pageView.pageIndex = 1), t())
			})
		}
	}, {
		"./data.js": 5,
		"./project.js": 15
	}],
	14: [function(require, module, exports) {
		"use strict";
		var e, t, n;
		module.exports = (e = require("./class.js"), t = require("./eventBase.js"), n = {
			defaultIndex: 1,
			defaultSize: 10,
			pageIndexName: "page",
			pageSizeName: "page_size",
			onChange: $.noop,
			onInit: $.noop,
			allowActiveClick: !0,
			middlePageItems: 4,
			frontPageItems: 3,
			backPageItems: 2,
			ellipseText: "...",
			prevText: "上一页",
			nextText: "下一页",
			prevDisplay: !0,
			nextDisplay: !0,
			firstText: "首页",
			lastText: "尾页",
			firstDisplay: !1,
			lastDisplay: !1
		}, e({
			instanceMembers: {
				init: function(e, t) {
					var n = this.$element = $(e),
						i = this.options = this.getOptions(t);
					this.base(n), this.reset(), this.refresh(0), this.enable(), "function" == typeof i.onChange && this.on(
						"pageViewChange", $.proxy(i.onChange, this)), "function" == typeof i.onInit && this.on("pageViewInit", $.proxy(
						i.onInit, this)), this.bindEvents(), n.data("pageView", this), this.trigger("pageViewInit")
				},
				getOptions: function(e) {
					var t = this.getDefaults(),
						n = $.extend({}, t, this.$element.data() || {}, e),
						i = {};
					for (var s in t) Object.prototype.hasOwnProperty.call(t, s) && (i[s] = n[s]);
					return i
				},
				getDefaults: function() {
					return n
				},
				bindEvents: function() {
					var t = this,
						i = this.options,
						e = this.$element,
						s = function(e) {
							t.disabled || (t.pageIndex = e, t.trigger("pageViewChange"))
						};
					i.firstDisplay && e.on("click", ".first:not(.disabled) a", function(e) {
						e.preventDefault(), s(1)
					}), i.lastDisplay && e.on("click", ".last:not(.disabled) a", function(e) {
						e.preventDefault(), s(t.data.pages)
					}), i.prevDisplay && e.on("click", ".prev:not(.disabled) a", function(e) {
						e.preventDefault(), s(t.pageIndex - 1)
					}), i.nextDisplay && e.on("click", ".next:not(.disabled) a", function(e) {
						e.preventDefault(), s(t.pageIndex + 1)
					}), e.on("click", ".page a", function(e) {
						e.preventDefault();
						var t = $(this),
							n = !0;
						t.parent().hasClass("active") && !i.allowActiveClick && (n = !1), n && s(parseInt($.trim(t.text())))
					})
				},
				_setup: function(e) {
					var t = this.data = {},
						n = t.pageIndex = this.pageIndex,
						i = t.pageSize = this.pageSize;
					t.total = e;
					var s = t.pages = parseInt(Math.floor(0 == e ? 1 : e % i == 0 ? e / i : e / i + 1));
					t.start = 0 == e ? 0 : (n - 1) * i + 1, t.end = 0 == e ? 0 : n == s ? e : i * n, t.first = 1 == n, t.last =
						n == s
				},
				reset: function() {
					this.pageIndex = this.options.defaultIndex, this.pageSize = this.options.defaultSize
				},
				getParams: function() {
					var e = {};
					return e[this.options.pageIndexName] = this.pageIndex, e[this.options.pageSizeName] = this.pageSize, e
				},
				refresh: function(e) {
					this._setup(e), this.render(e)
				},
				render: function(e) {
					var t = this.data,
						n = this.options;
					if (n.defaultSize > e) this.$element.html("");
					else {
						var i = [];
						n.firstDisplay && i.push(['<li class="first ', t.first ? "disabled" : "", '"><a href="javascript:;">', n.firstText,
							"</a></li>"
						].join("")), n.prevDisplay && i.push(['<li class="prev ', t.first ? "disabled" : "",
							'"><a href="javascript:;">', n.prevText, "</a></li>"
						].join(""));
						var s = function(e, t) {
							var n = Math.ceil(t.middlePageItems / 2),
								i = e.pages,
								s = i - t.middlePageItems;
							return [e.pageIndex > n ? Math.max(Math.min(e.pageIndex - n, s), 0) : 0, e.pageIndex > n ? Math.min(e.pageIndex +
								n, i) : Math.min(t.middlePageItems, i)]
						}(t, n);
						if (0 < s[0] && 0 < n.frontPageItems) {
							for (var a = Math.min(n.frontPageItems, s[0]), o = 0; o < a; o++) r(o);
							n.frontPageItems < s[0] && n.ellipseText && c()
						}
						for (o = s[0]; o < s[1]; o++) r(o);
						if (s[1] < t.pages && 0 < n.backPageItems)
							for (t.pages - n.backPageItems > s[1] && n.ellipseText && c(), o = Math.max(t.pages - n.backPageItems, s[
									1]); o < t.pages; o++) r(o);
						n.nextDisplay && i.push(['<li class="next ', t.last ? "disabled" : "", '"><a href="javascript:;">', n.nextText,
							"</a></li>"
						].join("")), n.lastDisplay && i.push(['<li class="last ', t.last ? "disabled" : "",
							'"><a href="javascript:;">', n.lastText, "</a></li>"
						].join("")), this.$element.html(i.join(""))
					}

					function r(e) {
						e += 1, i.push(['<li class="page ', e == t.pageIndex ? "active" : "", '"><a href="javascript:;">', e,
							"</a></li>"
						].join(""))
					}

					function c() {
						i.push(['<li class="page page_ell', '"><span>', n.ellipseText, "</span></li>"].join(""))
					}
				},
				enable: function() {
					this.disabled = !1, this.$element.removeClass("disabled")
				},
				disable: function() {
					this.disabled = !0, this.$element.addClass("disabled")
				}
			},
			extend: t,
			staticMembers: {
				DEFAULTS: n,
				createElement: function() {
					return $('<ul class="page_view"></ul>')
				}
			}
		}))
	}, {
		"./class.js": 4,
		"./eventBase.js": 6
	}],
	15: [function(require, module, exports) {
		"use strict";
		module.exports = function() {
			var n = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
				e = require("./api.js"),
				i = e.insert,
				s = e.projectupdate,
				a = require("./getlist.js"),
				o = require("./getTotalCount.js"),
				t = $(
					'\n  <div class="Workbench-dialog">\n    <div class="dialog-content">\n      <div class="dialog-title">\n        <span>' +
					(n.projectid ? "修改项目" : "添加项目") +
					'</span>\n        <div style="display:flex">\n          <span class="delDialog">×</span>\n        </div>\n      </div>\n      <div class="dialog-section">\n        <div class="dialog-form addproject">\n          <div class="form-label">名称:<sup>*</sup></div>\n          <div  class="form-input"><input type="text" class="project-title" value="' +
					(n.name || "") +
					'" placeholder="项目名称"></div>\n          <div class="form-label">项目编号:<sup>*</sup></div>\n          <div class="form-input"><input type="text" class="project-number" value="' +
					(n.projectcode || "") +
					'" placeholder="项目编号"></div>\n        </div>\n      </div>\n      <div class="dialog-footer">\n        <span class="btn-default" id="delDialog">取消</span>\n        <span class="btn-default btn-preserve" id="preserve">保存</span>\n      </div>\n    </div>\n  </div> '
				);
			t.find(".delDialog,#delDialog").click(function() {
				$("body").removeClass("coos-over-hidden"), "取消" == $(this).text() ? $(this).parent().parent().parent().remove() :
					$(this).parent().parent().parent().parent().remove()
			}), t.find("#preserve").click(function() {
				var e = {
					name: $(".dialog-section .project-title").val(),
					projectcode: $(".dialog-section .project-number").val()
				};
				if (e.name)
					if (e.projectcode) {
						if (n.projectid) {
							if (e.projectid = n.projectid, 1e4 == (t = s(e)).errcode) return void coos.box.info(t.errmsg);
							$("body").removeClass("coos-over-hidden"), $(this).parent().parent().parent().remove()
						} else {
							var t = i(e);
							if (o(), 1e4 == t.errcode) return void coos.box.info(t.errmsg);
							$("body").removeClass("coos-over-hidden"), $(this).parent().parent().parent().remove(), $(
								".Workbench-section .nav-links li").removeClass("active"), $(".Workbench-section .nav-links li").eq(2).addClass(
								"active")
						}
						a()
					} else coos.box.info("项目编号不能为空");
				else coos.box.info("项目名称不能为空")
			}), $("body").append(t)
		}
	}, {
		"./api.js": 2,
		"./getTotalCount.js": 8,
		"./getlist.js": 9
	}],
	16: [function(require, module, exports) {
		"use strict";
		module.exports = {
			dom: "",
			index: 0,
			init: function(e, t) {
				var n = this;
				e.forEach(function(e) {
					n.listShow(t.find(e)), n.liClick(t.find(e).find("li"))
				}), this.getkeyup()
			},
			listShow: function(e) {
				var n = this;
				e.click(function(e) {
					if (e.stopPropagation(), "none" !== $(this).find(".select-chaozuo").css("display")) $(".select-chaozuo").hide(),
						n.dom = "";
					else {
						$(".select-chaozuo").hide(), $(this).find(".select-chaozuo").toggle(), n.dom = this, $(n.dom).find("li").removeClass(
							"active");
						var t = parseInt($(n.dom).find("span").attr("index"));
						n.index = t, $(n.dom).find("li").eq(n.index).addClass("active")
					}
				}), e.find("li").mouseover(function() {
					$(this).siblings().removeClass("active"), $(this).addClass("active"), n.index = $(this).index()
				})
			},
			liClick: function(e) {
				var t = this;
				e.click(function(e) {
					e.stopPropagation(), t.index = $(this).index(), $(this).parent().parent().find("span").attr({
						value: $(this).attr("value"),
						index: $(this).index()
					}), $(this).parent().parent().find("span").text($(this).text()), $(this).parent().hide()
				})
			},
			getkeyup: function() {
				var n = this;
				$(document).keydown(function(e) {
					var t = $(n.dom).find("li");
					return 38 == e.keyCode ? (n.index < 0 ? n.index = t.length - 1 : n.index--, t.removeClass("active"), t.eq(n
						.index).addClass("active"), !1) : 40 == e.keyCode ? (n.index > t.length - 1 ? n.index = 0 : n.index++, t.removeClass(
						"active"), t.eq(n.index).addClass("active"), !1) : void(13 == e.keyCode && "active" == t.eq(n.index).attr(
						"class") && "personLiable" != e.target.id && t.eq(n.index).click())
				})
			}
		}
	}, {}],
	17: [function(require, module, exports) {
		"use strict";
		module.exports = {
			baseURL: coos.basePath,
			POST: function(e, t, n, i, s, a) {
				var o = this.baseURL + e;
				i = i || !1, (i = "true") && (i = !0), (i = "false") && (i = !1), a = a || "json", $.ajax({
					url: o,
					data: t,
					type: "post",
					dataType: a,
					async: i,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
					},
					beforeSend: function() {},
					success: function(e) {
						n && "function" == typeof n && n(e)
					},
					complete: function(e, t) {},
					error: function(e, t, n) {
						s && "function" == typeof s && s(e, t, n)
					}
				})
			}
		}
	}, {}],
	18: [function(require, module, exports) {
		"use strict";
		module.exports = function() {
			var i = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
				e = require("./select.js"),
				t = require("./api.js"),
				n = t.versionInsert,
				s = t.getTaskStatusList,
				a = t.versionUpdate,
				o = require("./getlist.js"),
				r = require("./getstatus.js"),
				c = require("./getTime.js"),
				l =
				'\n  <div class="Workbench-dialog">\n    <div class="dialog-content">\n      <div class="dialog-title">\n        <span>添加版本</span>\n        <div style="display:flex">\n          <span class="delDialog">×</span>\n        </div>\n      </div>\n      <div class="dialog-section">\n        <div class="dialog-form">\n          <div class="version-group">\n            <div class="version-item-title">\n              <span>版本名称</span>\n              <sup>*</sup>\n            </div>\n            <div class="version-title version-group-input">\n              <input type="text" class="form-control" id="versionName" placeholder="版本名称" value="' +
				(i.title || "") +
				'">\n            </div>\n          </div>\n          <div class="version-group">\n              <div class="version-item-title">\n                <span>状态</span>\n                <sup>*</sup>\n              </div>\n              <div class="version-group-input">\n                <div class="status select-group form-control">\n                    <span value="' +
				i.status + '" index="" id="versionStatus">' + (r(i.status) || "请选择") +
				'</span>\n                    <i class="fa fa-angle-down"></i>\n                    <ul class="selectList select-chaozuo" style="display: none;">\n                      ' +
				function() {
					var e = s().data.result,
						t = "";
					for (var n in e) t += '<li value="' + n + '" class="' + (i.status == n ? "active" : "") + '">' + e[n] +
						"</li>";
					return t
				}() +
				'\n                    </ul>\n                </div>\n              </div>\n            </div>\n          <div class="version-group">\n              <div class="version-item-title">\n                <span>计划上线时间</span>\n                <sup>*</sup>\n              </div>\n              <div class="version-time version-group-input">\n                <input type="text" class="form-control" id="createTime" placeholder="计划上线时间" value="' +
				c(i.planonlinetime) +
				'">\n              </div>\n            </div>\n          <div>\n            <input label="附件" id="versionFile" value="' +
				(i.file || "") +
				'" group-type="4" value="" class="input-rule-group input-rule-file" need-addon="true" placeholder="附件" file-count="5" cannull="true">\n          </div>\n          <div>\n            <textarea label="说明" id="versionRemark" value="' +
				(i.description || "") +
				'" group-type="4" class="input-rule-group" placeholder="说明" cannull="true"></textarea>\n          </div>\n        </div>\n      </div>\n      <div class="dialog-footer">\n        <span class="btn-default" id="delDialog">取消</span>\n        <span class="btn-default btn-preserve">保存</span>\n      </div>\n    </div>\n  </div>',
				d = $(l);
			e.init([".select-group"], d);
			d.find("#createTime").datetimepicker({
				lang: "ch",
				step: 60,
				datepicker: !0,
				timepicker: !0,
				format: "Y-m-d H:i"
			}), d.find(".delDialog, #delDialog").click(function() {
				$("body").removeClass("coos-over-hidden"), "取消" == $(this).text() ? $(this).parent().parent().parent().remove() :
					$(this).parent().parent().parent().parent().remove()
			}), d.find(".btn-preserve").click(function() {
				var e = {
					projectid: i.projectid,
					title: $("#versionName").val(),
					status: $("#versionStatus").attr("value"),
					planonlinetime: $("#createTime").val(),
					file: $("#versionFile").val(),
					description: $("#versionRemark").val()
				};
				e.title ? e.status ? e.planonlinetime ? (i.versionid ? (e.versionid = i.versionid, a(e), $("body").removeClass(
						"coos-over-hidden"), $(this).parent().parent().parent().remove()) : (n(e), $("body").removeClass(
						"coos-over-hidden"), $(this).parent().parent().parent().remove(), a(e)), o()) : coos.box.info("计划上线时间不能为空") :
					coos.box.info("状态未选择") : coos.box.info("版本名称不能为空")
			}), $("body").append(d), coos.element.init(".defect-dialog")
		}
	}, {
		"./api.js": 2,
		"./getTime.js": 7,
		"./getlist.js": 9,
		"./getstatus.js": 10,
		"./select.js": 16
	}]
}, {}, [1]);
//# sourceMappingURL=Workbench.js.map
