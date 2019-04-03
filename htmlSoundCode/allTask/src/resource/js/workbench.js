(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function () {
    var hasOwn = Object.prototype.hasOwnProperty;

    //用来判断是否为Object的实例
    function isObject(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
    }

    //用来判断是否为Function的实例
    function isFunction(f) {
        return typeof f === 'function';
    }

    //简单复制
    function copy(source) {
        var target = {};
        for (var i in source) {
            if (hasOwn.call(source, i)) {
                target[i] = source[i];
            }
        }
        return target;
    }

    function ClassBuilder(options) {
        if (!isObject(options)) {
            console.log('Class options must be an valid object instance!');
            return;
        }

        var instanceMembers = isObject(options) && options.instanceMembers || {},
            staticMembers = isObject(options) && options.staticMembers || {},
            extend = isObject(options) && isFunction(options.extend) && options.extend,
            prop;

        //表示要构建的类的构造函数
        function TargetClass() {
            if (extend) {
                //如果有要继承的父类
                //就在每个实例中添加baseProto属性，以便实例内部可以通过这个属性访问到父类的原型
                //因为copy函数导致原型链断裂，无法通过原型链访问到父类的原型
                this.baseProto = extend.prototype;
            }
            if (isFunction(this.init)) {
                this.init.apply(this, arguments);
            }
        }

        //添加静态成员，这段代码需在原型设置的前面执行，避免staticMembers中包含prototype属性，覆盖类的原型
        for (prop in staticMembers) {
            if (hasOwn.call(staticMembers, prop)) {
                TargetClass[prop] = staticMembers[prop];
            }
        }

        //如果有要继承的父类，先把父类的实例方法都复制过来
        extend && (TargetClass.prototype = copy(extend.prototype));

        //添加实例方法
        for (prop in instanceMembers) {

            if (hasOwn.call(instanceMembers, prop)) {

                //如果有要继承的父类，且在父类的原型上存在当前实例方法同名的方法
                if (extend && isFunction(instanceMembers[prop]) && isFunction(extend.prototype[prop])) {
                    TargetClass.prototype[prop] = function (name, func) {
                        return function () {
                            //记录实例原有的this.base的值
                            var old = this.base;
                            //将实例的this.base指向父类的原型的同名方法
                            this.base = extend.prototype[name];
                            //调用子类自身定义的实例方法，也就是func参数传递进来的函数
                            var ret = func.apply(this, arguments);
                            //还原实例原有的this.base的值
                            this.base = old;
                            return ret;
                        };
                    }(prop, instanceMembers[prop]);
                } else {
                    TargetClass.prototype[prop] = instanceMembers[prop];
                }
            }
        }

        TargetClass.prototype.constructor = TargetClass;

        return TargetClass;
    }

    return ClassBuilder;
}();
},{}],2:[function(require,module,exports){
module.exports = function () {
    var Class = require('./class.js');
    /**
     * 这个基类可以让普通的类具备jquery对象的事件管理能力
     */
    var EventBase = Class({
        instanceMembers: {
            init: function init(_jqObject) {
                this._jqObject = _jqObject && _jqObject instanceof $ && _jqObject || $({});
            },
            destroy: function destroy() {
                this._jqObject.off();
                this._jqObject = undefined;
            }
        }
    });

    //通过统一的代理，添加on, one, off, trigger这几个原型方法
    ['on', 'one', 'off', 'trigger'].forEach(function (method) {
        EventBase.prototype[method] = function () {
            return $.fn[method].apply(this._jqObject, arguments);
        };
    });

    return EventBase;
}();
},{"./class.js":1}],3:[function(require,module,exports){
var PageView = require('./pageView.js');
// api.baseURL = 'http://localhost:8000/api/'
// var basePath = 'http://192.168.81.17:8081/vrv.task/'
var Workbench = {
  init: function init() {
    this.PageViewinit();
    this.elementfn();
  },

  data: {
    pageView: {},
    favourite: true,
    favouritePage: 1,
    allPage: 1,
    searchProjectName: ''
  },
  elementfn: function elementfn() {
    var _this = this;
    $('.nav-links li').click(function () {
      $('.nav-links li').removeClass('active');
      $(this).addClass('active');
      $('.nav-controls .nameFiltering').val('');
      if (_this.data.searchProjectName !== '') {
        _this.data.searchProjectName = '';
        _this.data.favourite ? _this.data.favouritePage = 1 : _this.data.allPage = 1;
      }
      if ($(this).find('a').text() == '星标项目') {
        _this.data.favourite = true;
        _this.data.pageView.pageIndex = _this.data.favouritePage; // 分页组件到当前页
        _this.favouritePageList(_this.data.favouritePage, '');
      } else {
        _this.data.favourite = false;
        _this.data.pageView.pageIndex = _this.data.allPage;
        _this.queryList(_this.data.allPage, '');
      }
    });
    $('body').on('click', '.asterisk i', function () {
      var del = $(this).attr('class').indexOf('fa-star-o') < 0;
      var versionid = $(this).attr('data-versionid');
      var projectid = $(this).attr('data-projectid');
      var Params = { versionid: versionid, projectid: projectid };
      if (del) {
        _this.delFavourite(Params);
      } else {
        _this.addFavourite(Params);
      }
      console.log(del);
    });
    $('.nav-controls .nameFiltering').keydown(function (e) {
      if (!e) e = window.event;
      if ((e.keyCode || e.which) == 13) {
        _this.data.searchProjectName = $(this).val();
        _this.data.pageView.pageIndex = 1;
        if (_this.data.favourite) {
          _this.favouritePageList(1, _this.data.searchProjectName);
        } else {
          _this.queryList(1, _this.data.searchProjectName);
        }
      }
    });
  },
  pageView: function pageView() {
    var _this = this;
    var pageView = new PageView('.pagination', {
      defaultSize: 10,
      onChange: _this.getData.bind(_this)
    });
    this.data.pageView = pageView;
  },
  getData: function getData() {
    this.data.pageView.disable();
    var Params = this.data.pageView.getParams();
    if (this.data.favourite) {
      this.favouritePageList(Params.page, this.data.searchProjectName);
      this.data.favouritePage = Params.page;
    } else {
      this.queryList(Params.page, this.data.searchProjectName);
      this.data.allPage = Params.page;
    }
  },
  PageViewinit: function PageViewinit() {
    this.pageView();
    this.getData();
  },
  favouritePageList: function favouritePageList(page, version_projectname) {
    var _this = this;
    var action = 'core/service/task_version/favouritePageList';
    var data = {
      pagesize: 10,
      currentpage: page,
      version_projectname: version_projectname
    };
    api.POST(action, data, function (res) {
      _this.list(res);
      _this.data.pageView.refresh(res.result.model1.totalcount);
      _this.data.pageView.enable();
    });
  },
  queryList: function queryList(page, version_projectname) {
    var _this = this;
    var action = 'core/service/task_version/queryList';
    var data = {
      pagesize: 10,
      currentpage: page,
      version_projectname: version_projectname
    };
    api.POST(action, data, function (res) {
      _this.list(res);
      _this.data.pageView.refresh(res.result.model1.totalcount, _this.data.allPage);
      _this.data.pageView.enable();
    });
  },
  addFavourite: function addFavourite(Params) {
    var _this = this;
    var action = 'index/addFavourite.do';
    var data = {
      versionid: Params.versionid,
      projectid: Params.projectid
    };
    api.POST(action, data, function (res) {
      if (_this.data.favourite) {
        _this.favouritePageList(_this.data.favouritePage, _this.data.searchProjectName);
      } else {
        _this.queryList(_this.data.allPage, _this.data.searchProjectName);
      }
    });
  },
  delFavourite: function delFavourite(Params) {
    var _this = this;
    var action = 'index/deleteFavourite.do';
    var data = {
      versionid: Params.versionid
    };
    api.POST(action, data, function (res) {
      if (_this.data.favourite) {
        _this.favouritePageList(_this.data.favouritePage, _this.data.searchProjectName);
      } else {
        _this.queryList(_this.data.allPage, _this.data.searchProjectName);
      }
    });
  },
  getstatus: function getstatus(status) {
    switch (status) {
      case '0':
        return '规划中';
      case '1':
        return '启动';
      case '2':
        return '进行中';
      case '8':
        return '完成';
      case '9':
        return '上线';
      default:
        return '上线';
    }
  },
  item: function item(dataItem, i) {
    var html = '<li class="project-row">\n    <div class="index-s40">\n      <span>' + (i + 1) + '</span>\n    </div>\n    <div class="project-details">\n      <h3>\n        <a class="project" href="' + basePath + 'index/toVersion.do?versionid=' + dataItem.versionid + '">\n          <span class="project-name">\n            ' + dataItem.version_projectname + '\n          </span>\n        </a>\n      </h3>\n    </div>\n    <div class="controls">\n      <div class="asterisk">\n        <i class="fa ' + (this.data.favourite ? 'fa-star' : dataItem.isfavourite == '0' ? 'fa-star-o' : 'fa-star') + '" data-versionid="' + dataItem.versionid + '" data-projectid="' + dataItem.projectid + '"></i>\n      </div>\n      <div class="status">\n        <div><span>' + this.getstatus(dataItem.status) + '</span></div>\n        <div><span>' + this.getTime(dataItem.planonlinetime) + '</span></div>\n      </div>\n    </div>\n  </li>';
    return html;
  },
  list: function list(res) {
    var _this2 = this;

    var listHtml = '';
    res.result.model1.value.forEach(function (el, i) {
      listHtml += _this2.item(el, i);
    });

    if (!res.result.model1.value.length) {
      listHtml = '<li class="noData">你还没有给任何项目加注星标</li>';
    }
    $('.projects-list').html(listHtml);
  },
  getTime: function getTime(time) {
    return time ? time.replace(/^(\d{4})(\d{2})(\d{2})(\d{0,2})(\d{0,2})(\d{0,2})/, "$1-$2-$3 $4:$5") : '';
  }
};
window.Workbench = Workbench;
},{"./pageView.js":4}],4:[function(require,module,exports){
module.exports = function () {
    var Class = require('./class.js');
    var EventBase = require('./eventBase.js');

    var DEFAULTS = {
        defaultIndex: 1, //默认页
        defaultSize: 10, //默认分页大小
        pageIndexName: 'page', //分页参数名称
        pageSizeName: 'page_size', //分页大小参数名称
        onChange: $.noop, //分页改变或分页大小改变时的回调
        onInit: $.noop, //初始化完毕的回调
        allowActiveClick: true, //控制当前页是否允许重复点击刷新
        middlePageItems: 4, //中间连续部分显示的分页项
        frontPageItems: 3, //分页起始部分最多显示3个分页项，否则就会出现省略分页项
        backPageItems: 2, //分页结束部分最多显示2个分页项，否则就会出现省略分页项
        ellipseText: '...', //中间省略部分的文本
        prevText: '上一页',
        nextText: '下一页',
        prevDisplay: true, //是否显示上一页按钮
        nextDisplay: true, //是否显示下一页按钮
        firstText: '首页',
        lastText: '尾页',
        firstDisplay: false, //是否显示首页按钮
        lastDisplay: false //是否显示尾页按钮
    };

    /**
     * 获取连续部分的起止索引
     */
    function getInterval(data, opts) {
        var ne_half = Math.ceil(opts.middlePageItems / 2);
        var np = data.pages;
        var upper_limit = np - opts.middlePageItems;
        var start = data.pageIndex > ne_half ? Math.max(Math.min(data.pageIndex - ne_half, upper_limit), 0) : 0;
        var end = data.pageIndex > ne_half ? Math.min(data.pageIndex + ne_half, np) : Math.min(opts.middlePageItems, np);
        return [start, end];
    }

    var PageView = Class({
        instanceMembers: {
            init: function init(element, options) {
                var $element = this.$element = $(element);
                var opts = this.options = this.getOptions(options);

                //初始化
                this.base($element);
                this.reset();
                this.refresh(0);

                //enable跟disable的作用在于外部使用pageView的时候，通常是在ajax的场景里面
                //所以提供启用禁用的功能，方便外部控制pageView组件是否能响应用户的操作
                //尤其是用户有重复操作等行为时
                this.enable();

                if (typeof opts.onChange === 'function') {
                    this.on('pageViewChange', $.proxy(opts.onChange, this));
                }

                if (typeof opts.onInit === 'function') {
                    this.on('pageViewInit', $.proxy(opts.onInit, this));
                }

                //子类可在这里面处理分页点击及分页大小改变的事件
                this.bindEvents();

                $element.data('pageView', this);

                this.trigger('pageViewInit');
            },
            getOptions: function getOptions(options) {
                var defaults = this.getDefaults(),
                    _opts = $.extend({}, defaults, this.$element.data() || {}, options),
                    opts = {};

                //保证返回的对象内容项始终与当前类定义的DEFAULTS的内容项保持一致
                for (var i in defaults) {
                    if (Object.prototype.hasOwnProperty.call(defaults, i)) {
                        opts[i] = _opts[i];
                    }
                }

                return opts;
            },
            getDefaults: function getDefaults() {
                return DEFAULTS;
            },
            bindEvents: function bindEvents() {
                var that = this,
                    opts = this.options,
                    $element = this.$element;

                var pageIndexChange = function pageIndexChange(pageIndex) {
                    if (that.disabled) return;

                    that.pageIndex = pageIndex;

                    that.trigger('pageViewChange');
                };

                //首页
                opts.firstDisplay && $element.on('click', '.first:not(.disabled) a', function (e) {
                    e.preventDefault();
                    pageIndexChange(1);
                });

                //末页
                opts.lastDisplay && $element.on('click', '.last:not(.disabled) a', function (e) {
                    e.preventDefault();
                    pageIndexChange(that.data.pages);
                });

                //上一页
                opts.prevDisplay && $element.on('click', '.prev:not(.disabled) a', function (e) {
                    e.preventDefault();
                    pageIndexChange(that.pageIndex - 1);
                });

                //下一页
                opts.nextDisplay && $element.on('click', '.next:not(.disabled) a', function (e) {
                    e.preventDefault();
                    pageIndexChange(that.pageIndex + 1);
                });

                //具体页
                $element.on('click', '.page a', function (e) {
                    e.preventDefault();

                    var $this = $(this),
                        callback = true;

                    if ($this.parent().hasClass('active') && !opts.allowActiveClick) {
                        callback = false;
                    }

                    callback && pageIndexChange(parseInt($.trim($this.text())), $this);
                });
            },
            _setup: function _setup(total) {
                //分页信息对象，可用于渲染UI
                var data = this.data = {};

                //当前页
                var pageIndex = data.pageIndex = this.pageIndex;
                //分页大小
                var pageSize = data.pageSize = this.pageSize;
                //总记录数
                data.total = total;
                //总页数
                var pages = data.pages = parseInt(Math.floor(total == 0 ? 1 : total % pageSize == 0 ? total / pageSize : total / pageSize + 1));

                //当前页的记录范围
                data.start = total == 0 ? 0 : (pageIndex - 1) * pageSize + 1;
                data.end = total == 0 ? 0 : pageIndex == pages ? total : pageSize * pageIndex;

                //是否为第一页，是否为最后一页
                data.first = pageIndex == 1;
                data.last = pageIndex == pages;
            },
            reset: function reset() {
                this.pageIndex = this.options.defaultIndex;
                this.pageSize = this.options.defaultSize;
            },
            //获取分页参数
            getParams: function getParams() {
                var p = {};
                p[this.options.pageIndexName] = this.pageIndex;
                p[this.options.pageSizeName] = this.pageSize;
                return p;
            },
            //传递一个记录总数来刷新分页状态
            refresh: function refresh(total) {
                this._setup(total);
                this.render(total);
            },
            //子类需覆盖此方法，呈现分页UI
            render: function render(total) {
                // if (currentpage){
                //     this.data.pageIndex = currentpage
                //   }
                var data = this.data,
                    opts = this.options;
                if (opts.defaultSize > total) {
                    this.$element.html('');
                    return;
                }
                var html = [];

                //首页
                opts.firstDisplay && html.push(['<li class="first ', data.first ? 'disabled' : '', '"><a href="javascript:;">', opts.firstText, '</a></li>'].join(''));

                //上一页
                opts.prevDisplay && html.push(['<li class="prev ', data.first ? 'disabled' : '', '"><a href="javascript:;">', opts.prevText, '</a></li>'].join(''));

                function appendItem(page) {
                    page = page + 1;

                    html.push(['<li class="page ', page == data.pageIndex ? 'active' : '', '"><a href="javascript:;">', page, '</a></li>'].join(''));
                }

                function appendEllItem() {
                    html.push(['<li class="page page_ell', '"><span>', opts.ellipseText, '</span></li>'].join(''));
                }

                var interval = getInterval(data, opts);

                // 产生起始点
                if (interval[0] > 0 && opts.frontPageItems > 0) {
                    var end = Math.min(opts.frontPageItems, interval[0]);
                    for (var i = 0; i < end; i++) {
                        appendItem(i);
                    }
                    if (opts.frontPageItems < interval[0] && opts.ellipseText) {
                        appendEllItem();
                    }
                }

                // 产生内部的些链接
                for (var i = interval[0]; i < interval[1]; i++) {
                    appendItem(i);
                }

                // 产生结束点
                if (interval[1] < data.pages && opts.backPageItems > 0) {
                    if (data.pages - opts.backPageItems > interval[1] && opts.ellipseText) {
                        appendEllItem();
                    }
                    var begin = Math.max(data.pages - opts.backPageItems, interval[1]);
                    for (var i = begin; i < data.pages; i++) {
                        appendItem(i);
                    }
                }

                //下一页
                opts.nextDisplay && html.push(['<li class="next ', data.last ? 'disabled' : '', '"><a href="javascript:;">', opts.nextText, '</a></li>'].join(''));

                //尾页
                opts.lastDisplay && html.push(['<li class="last ', data.last ? 'disabled' : '', '"><a href="javascript:;">', opts.lastText, '</a></li>'].join(''));

                this.$element.html(html.join(''));
            },
            //启用
            enable: function enable() {
                this.disabled = false;
                this.$element.removeClass('disabled');
            },
            //禁用
            disable: function disable() {
                this.disabled = true;
                this.$element.addClass('disabled');
            }
        },
        extend: EventBase,
        staticMembers: {
            DEFAULTS: DEFAULTS,
            createElement: function createElement() {
                return $('<ul class="page_view"></ul>');
            }
        }
    });

    return PageView;
}();
},{"./class.js":1,"./eventBase.js":2}]},{},[3]);
