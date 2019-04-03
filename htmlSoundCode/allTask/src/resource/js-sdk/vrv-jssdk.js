/**
 * Created by Administrator on 2016/7/18.
 */
var VERSION = '1.8.5';
var vrv = vrv || {};
vrv.android = {};
vrv.jssdk = {};
vrv.util = {};
vrv._init = {};
vrv._ready = {};
vrv.callpc = {};
vrv.callH5 = {};
vrv._ready.fn = {};
vrv.android = {
    callback: function (fname, uuid, args) {
        try {
            if (vrv._init.debug) {
                alert(fname + ":" + args);
            }
            var fn = vrv.util.getSuccess(uuid);
            if (typeof fn == "function") {
                fn.call(this, JSON.parse(args));
            }
        } catch (e) {
            alert(e.message);
        }
    },
    takePhoto: function (opt) {
        android.takePhoto(vrv.util.pre(opt));
    },
    getUnreadMessage: function (opt) {
        android.getUnreadMessage(vrv.util.pre(opt));
    },
    getAccountInfo: function (opt) {
        android.getUserInfo(vrv.util.pre(opt));
    },
    sendMessage: function (opt) {
        android.sendMessage(vrv.util.pre(opt));
    },
    portraitUrl: function (opt) {
        android.portraitUrl(vrv.util.pre(opt));
    },
    getUserName: function (opt) {
        android.getUserName(vrv.util.pre(opt));
    },
    getContactList: function (opt) {
        android.getContacts(vrv.util.pre(opt));
    },
    getLocalFiles: function (opt) {
        opt = vrv.util.addSize(opt);
        android.getLocalFiles(vrv.util.pre(opt));
    },
    getGroupList: function (opt) {
        android.getGroupsInfo(vrv.util.pre(opt));
    },
    getLocalPhotos: function (opt) {
        opt = vrv.util.addSize(opt);
        android.getLocalPhotos(vrv.util.pre(opt));
    },
    getPosition: function (opt) {
        android.getPosition(vrv.util.pre(opt));
    },
    showNavigationBar: function (opt) {
        android.showNavigationBar(vrv.util.pre(opt));
    },
    getInfoWithSweep: function (opt) {
        android.getInfoWithSweep(vrv.util.pre(opt));
    },
    getOrganization: function (opt) {
        android.getOrganization(vrv.util.pre(opt));
    },
    closeView: function (opt) {
        android.closeView(vrv.util.pre(opt));
    },
    getLanguage: function (opt) {
        android.getLanguage(vrv.util.pre(opt));
    },
    getVersionMark: function (opt) {
        android.getVersionMark(vrv.util.pre(opt));
    },
    copyTextToPaste: function (opt) {
        android.copyTextToPaste(vrv.util.pre(opt));
    },
    chatByUserID: function (opt) {
        android.chatByUserID(vrv.util.pre(opt));
    },
    getGroupMembers: function (opt) {
        android.getGroupMembers(vrv.util.pre(opt));
    },
    openFileURL: function (opt) {
        android.openFileURL(vrv.util.pre(opt));
    },
    openImageURL: function (opt) {
        android.openImageURL(vrv.util.pre(opt));
    },
    openChat: function (opt) {
        android.openChat(vrv.util.pre(opt));
    },
    /**
     * 打开豆豆音频p2p单聊
     */
    openAudioCall: function (opt) {
        android.openAudioCall(vrv.util.pre(opt));
    },
    /**
     *  打开豆豆视频p2p单聊
     */
    openVideoCall: function (opt) {
        android.openVideoCall(vrv.util.pre(opt));
    },
    /**
     *  打开视频会议
     *  vendor 厂商
     *  users 成员列表
     *  extend 扩展信息
     */
    openVideoCallVendor: function (opt) {
        android.openVideoCallVendor(vrv.util.pre(opt));
    },
    getUserIdMap: function (opt) {
        android.getUserIdMap(vrv.util.pre(opt));
    },
    createGroup: function (opt) {
        android.createGroup(vrv.util.pre(opt));
    },
    deleteGroup: function (opt) {
        android.deleteGroup(vrv.util.pre(opt));
    },

    getOAuthCode: function (opt) {
        android.getOAuthCode(vrv.util.pre(opt));
    },
    getVersion: function (a) {
        a.success({
            'version': VERSION,
            'platform': 'android'
        });
    }
};

vrv.ios = {
    register: function () {
        vrv.util.fromIOS('registerMessageNotice');
    },
    callback: function (fname, uuid, args) {
        if (vrv._init.debug) {
            alert(fname + ":" + args);
        }
        var fn = vrv.util.getSuccess(uuid);
        if (typeof fn == "function") {
            fn.call(this, JSON.parse(args));
        }
    },
    takePhoto: function (opt) {
        vrv.util.callIOS('takePhoto', opt);
    },
    getUnreadMessage: function (opt) {
        vrv.util.callIOS('getUnreadMessage', opt);
    },
    getAccountInfo: function (opt) {
        vrv.util.callIOS('getUserInfo', opt);
    },
    sendMessage: function (opt) {
        vrv.util.callIOS('sendMessage', opt);
    },
    portraitUrl: function (opt) {
        vrv.util.callIOS('portraitUrl', opt);
    },
    getUserName: function (opt) {
        vrv.util.callIOS('getUserName', opt);
    },
    getContactList: function (opt) {
        vrv.util.callIOS('getContacts', opt);
    },
    getLocalFiles: function (opt) {
        opt = vrv.util.addSize(opt);
        vrv.util.callIOS('getLocalFiles', opt);
    },
    getGroupList: function (opt) {
        vrv.util.callIOS('getGroupsInfo', opt);
    },
    getLocalPhotos: function (opt) {
        opt = vrv.util.addSize(opt);
        vrv.util.callIOS('getLocalPhotos', opt);
    },
    getPosition: function (opt) {
        vrv.util.callIOS('getPosition', opt);
    },
    showNavigationBar: function (opt) {
        vrv.util.callIOS('showNavigationBar', opt);
    },
    getInfoWithSweep: function (opt) {
        vrv.util.callIOS('getInfoWithSweep', opt);
    },
    getOrganization: function (opt) {
        vrv.util.callIOS('getOrganization', opt);
    },
    closeView: function (opt) {
        vrv.util.callIOS('closeView', opt);
    },
    getLanguage: function (opt) {
        vrv.util.callIOS('getLanguage', opt);
    },
    getVersionMark: function (opt) {
        vrv.util.callIOS('getVersionMark', opt);
    },
    copyTextToPaste: function (opt) {
        vrv.util.callIOS('copyTextToPaste', opt);
    },
    chatByUserID: function (opt) {
        vrv.util.callIOS('chatByUserID', opt);
    },
    getGroupMembers: function (opt) {
        vrv.util.callIOS('getGroupMembers', opt);
    },
    openFileURL: function (opt) {
        vrv.util.callIOS('openFileURL', opt);
    },
    openImageURL: function (opt) {
        vrv.util.callIOS('openImageURL', opt);
    },
    getVersion: function (a) {
        a.success({
            'version': VERSION,
            'platform': 'ios'
        });
    },
    openChat: function (opt) {
        vrv.util.callIOS('openChat', opt);
    },
    createGroup: function (opt) {
        vrv.util.callIOS('createGroup', opt);
    },
    deleteGroup: function (opt) {
        vrv.util.callIOS('deleteGroup', opt);
    },
    /**
     * 打开豆豆音频p2p单聊
     */
    openAudioCall: function (opt) {
        vrv.util.callIOS('openAudioCall', opt);
    },
    /**
     *  打开豆豆视频p2p单聊
     */
    openVideoCall: function (opt) {
        vrv.util.callIOS('openVideoCall', opt);
    },
    /**
     *  打开视频会议
     *  vendor 厂商
     *  users 成员列表
     *  extend 扩展信息
     */
    openVideoCallVendor: function (opt) {
        vrv.util.callIOS('openVideoCallVendor', opt);
    },
    getOAuthCode: function (opt) {
        vrv.util.callIOS('getOAuthCode', opt);
    },
    getUserIdMap: function (opt) {
        vrv.util.callIOS('getUserIdMap', opt);
    },
    callPhone: function (opt) {
        vrv.util.callIOS('callPhone', opt);
    },
    scanQrCode: function (opt) {
        vrv.util.callIOS('scanQrCode', opt);
    },
    shareTo: function (opt) {
        vrv.util.callIOS('shareTo', opt);
    },
    downloadFile: function (opt) {
        vrv.util.callIOS('downloadFile', opt);
    },
    speech2Text: function (opt) {
        vrv.util.callIOS('speech2Text', opt);
    }
};
vrv.h5 = {
    callback: function (a) {
        var content = JSON.parse(a).content;
        var fn;
        if ((JSON.parse(a).functionName) === 'registerMessageNotice') {
            fn = vrv.util._success[JSON.parse(a).uuid];
        } else {
            fn = vrv.util.getSuccess(JSON.parse(a).uuid);
        }
        "function" == typeof fn && fn.call(this, content)
    },
    takePhoto: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('takePhoto', a));
    },
    getUnreadMessage: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getUnreadMessage', a));
    },
    getAccountInfo: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getAccountInfo', a));
    },
    sendMessage: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('sendMessage', a));
    },
    portraitUrl: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('portraitUrl', a));
    },
    getUserName: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getUserName', a));
    },
    getContactList: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getContactList', a));
    },
    getLocalFiles: function (a) {
        a = vrv.util.addSize(a);
        vrv.callH5.send(vrv.util.makeH5Param('getLocalFiles', a));
    },
    getGroupList: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getGroupList', a));
    },
    getLocalPhotos: function (a) {
        a = vrv.util.addSize(a);
        vrv.callH5.send(vrv.util.makeH5Param('getLocalPhotos', a));
    },
    getPosition: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getPosition', a));
    },
    showNavigationBar: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('showNavigationBar', a));
    },
    getInfoWithSweep: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getInfoWithSweep', a));
    },
    getOrganization: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getOrganization', a));
    },
    closeView: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('closeView', a));
    },
    getLanguage: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getLanguage', a));
    },
    getVersionMark: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getVersionMark', a));
    },
    copyTextToPaste: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('copyTextToPaste', a));
    },
    getGroupMembers: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getGroupMembers', a));
    },
    chatByUserID: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('chatByUserID', a));
    },
    openFileURL: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('openFileURL', a));
    },
    openImageURL: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('openImageURL', a));
    },
    registerMessageNotice: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('registerMessageNotice', a));
    },
    getVersion: function (a) {
        a.success({
            'version': VERSION,
            'platform': 'pc-h5'
        });
    },
    openChat: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('openChat', a));
    },
    createGroup: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('createGroup', a));
    },
    deleteGroup: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('deleteGroup', a));
    },
    /**
     * 打开豆豆音频p2p单聊
     */
    openAudioCall: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('openAudioCall', a));
    },
    /**
     *  打开豆豆视频p2p单聊
     */
    openVideoCall: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('openVideoCall', a));
    },
    /**
     *  打开视频会议
     *  vendor 厂商
     *  users 成员列表
     *  extend 扩展信息
     */
    openVideoCallVendor: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('openVideoCallVendor', a));
    },
    getOAuthCode: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getOAuthCode', a));
    },
    getUserIdMap: function (a) {
        vrv.callH5.send(vrv.util.makeH5Param('getUserIdMap', a));
    }
};
vrv.pc = {
    callback: function (a, b, d) {
        try {
            vrv._init.debug && alert(a + ":" + d);
            var c;
            if (a === 'registerMessageNotice') {
                c = vrv.util._success[JSON.parse(b).uuid];
            } else {
                c = vrv.util.getSuccess(JSON.parse(b).uuid);
            }
            "function" == typeof c && c.call(this, JSON.parse(d))
        } catch (e) {
            alert(e.message)
        }
    },
    takePhoto: function (a) {
        vrv.callpc.takePhoto('takePhoto', vrv.util.pre(a))
    },
    getUnreadMessage: function (a) {
        vrv.callpc.getUnreadMessage('getUnreadMessage', vrv.util.pre(a))
    },
    getAccountInfo: function (a) {
        a.functionName = 'getAccountInfo';
        vrv.callpc.getAccountInfo(JSON.stringify(a), vrv.util.pre(a))
    },
    sendMessage: function (a) {
        vrv.callpc.sendMessage('sendMessage', vrv.util.pre(a))
    },
    portraitUrl: function (a) {
        vrv.callpc.portraitUrl('portraitUrl', vrv.util.pre(a))
    },
    getUserName: function (a) {
        vrv.callpc.getUserName('getUserName', vrv.util.pre(a))
    },
    getContactList: function (a) {
        vrv.callpc.getContactList('getContactList', vrv.util.pre(a))
    },
    getLocalFiles: function (a) {
        a = vrv.util.addSize(a);
        vrv.callpc.getLocalFiles('getLocalFiles', vrv.util.pre(a))
    },
    getGroupList: function (a) {
        vrv.callpc.getGroupList('getGroupList', vrv.util.pre(a))
    },
    getLocalPhotos: function (a) {
        a = vrv.util.addSize(a);
        vrv.callpc.getLocalPhotos('getLocalPhotos', vrv.util.pre(a))
    },
    getPosition: function (a) {
        vrv.callpc.getPosition('getPosition', vrv.util.pre(a))
    },
    showNavigationBar: function (a) {
        vrv.callpc.showNavigationBar('showNavigationBar', vrv.util.pre(a))
    },
    getInfoWithSweep: function (a) {
        vrv.callpc.getInfoWithSweep('getInfoWithSweep', vrv.util.pre(a))
    },
    getOrganization: function (a) {
        vrv.callpc.getOrganization('getOrganization', vrv.util.pre(a))
    },
    closeView: function (a) {
        vrv.callpc.closeView('closeView', vrv.util.pre(a))
    },
    getLanguage: function (a) {
        vrv.callpc.getLanguage('getLanguage', vrv.util.pre(a))
    },
    getVersionMark: function (a) {
        vrv.callpc.getVersionMark('getVersionMark', vrv.util.pre(a))
    },
    copyTextToPaste: function (a) {
        vrv.callpc.copyTextToPaste('copyTextToPaste', vrv.util.pre(a))
    },
    getGroupMembers: function (a) {
        vrv.callpc.getGroupMembers('getGroupMembers', vrv.util.pre(a))
    },
    chatByUserID: function (a) {
        vrv.callpc.chatByUserID('chatByUserID', vrv.util.pre(a))
    },
    openFileURL: function (a) {
        vrv.callpc.openFileURL('openFileURL', vrv.util.pre(a))
    },
    openImageURL: function (a) {
        vrv.callpc.openImageURL('openImageURL', vrv.util.pre(a))
    },
    registerMessageNotice: function (a) {
        vrv.callpc.registerMessageNotice('registerMessageNotice', vrv.util.pre(a))
    },
    getVersion: function (a) {
        a.success({
            'version': VERSION,
            'platform': 'pc'
        });
    },
    openChat: function (a) {
        vrv.callpc.openChat('openChat', JSON.stringify(a), vrv.util.pre(a));
    },
    createGroup: function (a) {
        vrv.callpc.createGroup('createGroup', JSON.stringify(a), vrv.util.pre(a));
    },
    deleteGroup: function (a) {
        vrv.callpc.deleteGroup('deleteGroup', JSON.stringify(a), vrv.util.pre(a));
    },
    /**
     * 打开豆豆音频p2p单聊
     */
    openAudioCall: function (a) {
        vrv.callpc.openAudioCall('openAudioCall', JSON.stringify(a), vrv.util.pre(a));
    },
    /**
     *  打开豆豆视频p2p单聊
     */
    openVideoCall: function (a) {
        vrv.callpc.openVideoCall('openVideoCall', JSON.stringify(a), vrv.util.pre(a));
    },
    /**
     *  打开视频会议
     *  vendor 厂商
     *  users 成员列表
     *  extend 扩展信息
     */
    openVideoCallVendor: function (a) {
        vrv.callpc.openVideoCallVendor('openVideoCallVendor', JSON.stringify(a), vrv.util.pre(a));
    },
    getOAuthCode: function (a) {
        vrv.callpc.getOAuthCode('getOAuthCode', JSON.stringify(a), vrv.util.pre(a));
    },
    getUserIdMap: function (a) {
        vrv.callpc.getUserIdMap('getUserIdMap', JSON.stringify(a), vrv.util.pre(a));
    },
    scanQrCode: function (opt) {
        vrv.callpc.scanQrCode('scanQrCode', JSON.stringify(a), vrv.util.pre(a));
    },
    shareTo: function (opt) {
        vrv.callpc.shareTo('shareTo', JSON.stringify(a), vrv.util.pre(a));
    }
};
vrv.util.makeH5Param = function (functionName, param) {
    var obj = JSON.parse(vrv.util.pre(param));
    obj.functionName = functionName;
    return JSON.stringify(obj);
};
vrv.util.addSize = function (opt) {
    return vrv.util.setDefault(opt, [{
        type: "number",
        key: "size",
        val: 10,
        min: 1,
        max: 15
    }]);
};

vrv.util._success = {};

vrv.util.putSuccess = function (uuid, callbackFn) {
    if (callbackFn && typeof callbackFn == 'function') {
        vrv.util._success[uuid] = callbackFn;
    }
};
vrv.util.getSuccess = function (uuid) {
    var fn = vrv.util._success[uuid];
    delete vrv.util._success[uuid];
    return fn;
};


vrv.util.formatParams = function (params) {
    if (!params) {
        params = {};
    }
    if (params.constructor !== Object) {
        params = {};
    }
    params.uuid = vrv.util.uuid();
    var obj = {
        p: JSON.stringify(params),
        uuid: params.uuid
    };
    return obj;
};

vrv.util.setDefault = function (obj, defaults) {
    if (!obj) {
        obj = {};
    }
    if (obj.constructor !== Object) {
        obj = {};
    }
    for (var i in defaults) {
        var d = defaults[i];
        if (typeof obj[d.key] != d.type) {
            obj[d.key] = d.val;
        }
        if (obj[d.key] > d.max || obj[d.key] < d.min) {
            obj[d.key] = d.val;
        }
    }
    return obj;
}

vrv.util.pre = function (opt) {
    var obj = vrv.util.formatParams(opt);
    if (opt) {
        vrv.util.putSuccess(obj.uuid, opt.success);
    }
    return obj.p;
};
vrv.util.callIOS = function (fname, opt) {
    var obj = vrv.util.formatParams(opt);
    var successFun = opt.success;

    var fun = function (res) {
        if (vrv._init.debug) {
            alert(fname + ":" + JSON.stringify(res));
        }
        successFun(res);
    }
    delete opt.success;
    if (navigator.userAgent.toLowerCase().indexOf("imlinkdood") != -1) {
        if (vrv.ios.bridge != null) {
            vrv.ios.bridge.callHandler(fname, opt, fun)
        } else {
            window.WebViewJavascriptBridge.callHandler(fname, opt, fun);
        }
    } else {
        vrv.ios.bridge.callHandler(fname, opt, fun)
    }
};
vrv.util.fromIOS = function (fname) {
    var fun = function (res, responseCallback) {
        if (vrv._init.debug) {
            alert(fname + ":" + JSON.stringify(res));
        }
        // successFun(res);
        var responseData = {
            'success': 'true'
        }
        responseCallback(responseData)
    }
    if (navigator.userAgent.toLowerCase().indexOf("imlinkdood") != -1) {
        window.WebViewJavascriptBridge.registerHandler(fname, fun);
    } else {
        vrv.ios.bridge.registerHandler(fname, fun)
    }
};
vrv.util.uuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
};

vrv.init = function (options) {
    //添加是否初始化的标识，防止再次初始化
    if (vrv._init.inited) {
        return;
    }
    vrv._init.inited = true;
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("imlinkdood") != -1) {
        function connectSdkBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe)
            }, 0)
        }
        connectSdkBridge(function (bridge) {
            vrv.ios.register(); // 注册监听
            vrv.ios.bridge = bridge;
            if (typeof vrv._ready.fn == 'function') {
                vrv._ready.fn.call(this);
            } else {
                vrv._ready.r = true;
            }
        });
        vrv.jssdk = vrv.ios
    } else if (agent.indexOf('android') != -1) {
        vrv.jssdk = vrv.android;
        if (typeof vrv._ready.fn == 'function') {
            vrv._ready.fn.call(this);
        } else {
            vrv._ready.r = true;
        }
    } else if (agent.indexOf('iphone') != -1) {
        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge);
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady',
                    function () {
                        callback(WebViewJavascriptBridge);
                    },
                    false
                );
            }
        }
        connectWebViewJavascriptBridge(function (bridge) { //
            bridge.init(function (message, responseCallback) {
                var data = {
                    'Javascript Responds': 'Wee!'
                }
                responseCallback(data)
            });
            vrv.ios.bridge = bridge;
            if (typeof vrv._ready.fn == 'function') {
                vrv._ready.fn.call(this);
            } else {
                vrv._ready.r = true;
            }
        });
        vrv.jssdk = vrv.ios;
    } else if (agent.indexOf('electron') != -1) {
        var ws = new WebSocket("ws://localhost:9001");
        vrv.callH5 = ws;
        ws.onmessage = function (e) {//后台返回消息的时候触发
            vrv.h5.callback(e.data);
        };
        vrv.jssdk = vrv.h5;
        ws.onopen = function (e) {
            if (typeof vrv._ready.fn == 'function') {
                vrv._ready.fn.call(this);
            } else {
                vrv._ready.r = true;
            }

        }
    } else if (agent.indexOf('qtwebengine') != -1) {
        new QWebChannel(qt.webChannelTransport, function (channel) {
            vrv.callpc = channel.objects.content;
            vrv.callpc.callback.connect(function (fname, uuid, args) {
                vrv.pc.callback(fname, uuid, args);
            });
            // var version = {version: VERSION};
            // vrv.callpc.setJssdkVersion(JSON.stringify(version));
            if (typeof vrv._ready.fn == 'function') {
                vrv._ready.fn.call(this);
            } else {
                vrv._ready.r = true;
            }
        });
        vrv.jssdk = vrv.pc;
    }
    if (options && options.constructor == Object) {
        vrv._init = options;
    }
};


vrv.ready = function (fn) {
    if (typeof fn == 'function') {
        if (vrv._ready.r) {
            fn.call(this);
        } else {
            vrv._ready.fn = fn;
        }
    }
};

"use strict";

var QWebChannelMessageTypes = {
    signal: 1,
    propertyUpdate: 2,
    init: 3,
    idle: 4,
    debug: 5,
    invokeMethod: 6,
    connectToSignal: 7,
    disconnectFromSignal: 8,
    setProperty: 9,
    response: 10,
};

var QWebChannel = function (transport, initCallback) {
    if (typeof transport !== "object" || typeof transport.send !== "function") {
        console.error("The QWebChannel expects a transport object with a send function and onmessage callback property." +
            " Given is: transport: " + typeof (transport) + ", transport.send: " + typeof (transport.send));
        return;
    }

    var channel = this;
    this.transport = transport;

    this.send = function (data) {
        if (typeof (data) !== "string") {
            data = JSON.stringify(data);
        }
        channel.transport.send(data);
    }

    this.transport.onmessage = function (message) {
        var data = message.data;
        if (typeof data === "string") {
            data = JSON.parse(data);
        }
        switch (data.type) {
            case QWebChannelMessageTypes.signal:
                channel.handleSignal(data);
                break;
            case QWebChannelMessageTypes.response:
                channel.handleResponse(data);
                break;
            case QWebChannelMessageTypes.propertyUpdate:
                channel.handlePropertyUpdate(data);
                break;
            default:
                console.error("invalid message received:", message.data);
                break;
        }
    }

    this.execCallbacks = {};
    this.execId = 0;
    this.exec = function (data, callback) {
        if (!callback) {
            // if no callback is given, send directly
            channel.send(data);
            return;
        }
        if (channel.execId === Number.MAX_VALUE) {
            // wrap
            channel.execId = Number.MIN_VALUE;
        }
        if (data.hasOwnProperty("id")) {
            console.error("Cannot exec message with property id: " + JSON.stringify(data));
            return;
        }
        data.id = channel.execId++;
        channel.execCallbacks[data.id] = callback;
        channel.send(data);
    };

    this.objects = {};

    this.handleSignal = function (message) {
        var object = channel.objects[message.object];
        if (object) {
            object.signalEmitted(message.signal, message.args);
        } else {
            console.warn("Unhandled signal: " + message.object + "::" + message.signal);
        }
    }

    this.handleResponse = function (message) {
        if (!message.hasOwnProperty("id")) {
            console.error("Invalid response message received: ", JSON.stringify(message));
            return;
        }
        channel.execCallbacks[message.id](message.data);
        delete channel.execCallbacks[message.id];
    }

    this.handlePropertyUpdate = function (message) {
        for (var i in message.data) {
            var data = message.data[i];
            var object = channel.objects[data.object];
            if (object) {
                object.propertyUpdate(data.signals, data.properties);
            } else {
                console.warn("Unhandled property update: " + data.object + "::" + data.signal);
            }
        }
        channel.exec({
            type: QWebChannelMessageTypes.idle
        });
    }

    this.debug = function (message) {
        channel.send({
            type: QWebChannelMessageTypes.debug,
            data: message
        });
    };

    channel.exec({
        type: QWebChannelMessageTypes.init
    }, function (data) {
        for (var objectName in data) {
            var object = new QObject(objectName, data[objectName], channel);
        }
        // now unwrap properties, which might reference other registered objects
        for (var objectName in channel.objects) {
            channel.objects[objectName].unwrapProperties();
        }
        if (initCallback) {
            initCallback(channel);
        }
        channel.exec({
            type: QWebChannelMessageTypes.idle
        });
    });
};

function QObject(name, data, webChannel) {
    this.__id__ = name;
    webChannel.objects[name] = this;

    // List of callbacks that get invoked upon signal emission
    this.__objectSignals__ = {};

    // Cache of all properties, updated when a notify signal is emitted
    this.__propertyCache__ = {};

    var object = this;

    // ----------------------------------------------------------------------

    this.unwrapQObject = function (response) {
        if (response instanceof Array) {
            // support list of objects
            var ret = new Array(response.length);
            for (var i = 0; i < response.length; ++i) {
                ret[i] = object.unwrapQObject(response[i]);
            }
            return ret;
        }
        if (!response ||
            !response["__QObject*__"] ||
            response.id === undefined) {
            return response;
        }

        var objectId = response.id;
        if (webChannel.objects[objectId])
            return webChannel.objects[objectId];

        if (!response.data) {
            console.error("Cannot unwrap unknown QObject " + objectId + " without data.");
            return;
        }

        var qObject = new QObject(objectId, response.data, webChannel);
        qObject.destroyed.connect(function () {
            if (webChannel.objects[objectId] === qObject) {
                delete webChannel.objects[objectId];
                // reset the now deleted QObject to an empty {} object
                // just assigning {} though would not have the desired effect, but the
                // below also ensures all external references will see the empty map
                // NOTE: this detour is necessary to workaround QTBUG-40021
                var propertyNames = [];
                for (var propertyName in qObject) {
                    propertyNames.push(propertyName);
                }
                for (var idx in propertyNames) {
                    delete qObject[propertyNames[idx]];
                }
            }
        });
        // here we are already initialized, and thus must directly unwrap the properties
        qObject.unwrapProperties();
        return qObject;
    }

    this.unwrapProperties = function () {
        for (var propertyIdx in object.__propertyCache__) {
            object.__propertyCache__[propertyIdx] = object.unwrapQObject(object.__propertyCache__[propertyIdx]);
        }
    }

    function addSignal(signalData, isPropertyNotifySignal) {
        var signalName = signalData[0];
        var signalIndex = signalData[1];
        object[signalName] = {
            connect: function (callback) {
                if (typeof (callback) !== "function") {
                    console.error("Bad callback given to connect to signal " + signalName);
                    return;
                }

                object.__objectSignals__[signalIndex] = object.__objectSignals__[signalIndex] || [];
                object.__objectSignals__[signalIndex].push(callback);

                if (!isPropertyNotifySignal && signalName !== "destroyed") {
                    // only required for "pure" signals, handled separately for properties in propertyUpdate
                    // also note that we always get notified about the destroyed signal
                    webChannel.exec({
                        type: QWebChannelMessageTypes.connectToSignal,
                        object: object.__id__,
                        signal: signalIndex
                    });
                }
            },
            disconnect: function (callback) {
                if (typeof (callback) !== "function") {
                    console.error("Bad callback given to disconnect from signal " + signalName);
                    return;
                }
                object.__objectSignals__[signalIndex] = object.__objectSignals__[signalIndex] || [];
                var idx = object.__objectSignals__[signalIndex].indexOf(callback);
                if (idx === -1) {
                    console.error("Cannot find connection of signal " + signalName + " to " + callback.name);
                    return;
                }
                object.__objectSignals__[signalIndex].splice(idx, 1);
                if (!isPropertyNotifySignal && object.__objectSignals__[signalIndex].length === 0) {
                    // only required for "pure" signals, handled separately for properties in propertyUpdate
                    webChannel.exec({
                        type: QWebChannelMessageTypes.disconnectFromSignal,
                        object: object.__id__,
                        signal: signalIndex
                    });
                }
            }
        };
    }

    /**
     * Invokes all callbacks for the given signalname. Also works for property notify callbacks.
     */
    function invokeSignalCallbacks(signalName, signalArgs) {
        var connections = object.__objectSignals__[signalName];
        if (connections) {
            connections.forEach(function (callback) {
                callback.apply(callback, signalArgs);
            });
        }
    }

    this.propertyUpdate = function (signals, propertyMap) {
        // update property cache
        for (var propertyIndex in propertyMap) {
            var propertyValue = propertyMap[propertyIndex];
            object.__propertyCache__[propertyIndex] = propertyValue;
        }

        for (var signalName in signals) {
            // Invoke all callbacks, as signalEmitted() does not. This ensures the
            // property cache is updated before the callbacks are invoked.
            invokeSignalCallbacks(signalName, signals[signalName]);
        }
    }

    this.signalEmitted = function (signalName, signalArgs) {
        invokeSignalCallbacks(signalName, signalArgs);
    }

    function addMethod(methodData) {
        var methodName = methodData[0];
        var methodIdx = methodData[1];
        object[methodName] = function () {
            var args = [];
            var callback;
            for (var i = 0; i < arguments.length; ++i) {
                if (typeof arguments[i] === "function")
                    callback = arguments[i];
                else
                    args.push(arguments[i]);
            }

            webChannel.exec({
                "type": QWebChannelMessageTypes.invokeMethod,
                "object": object.__id__,
                "method": methodIdx,
                "args": args
            }, function (response) {
                if (response !== undefined) {
                    var result = object.unwrapQObject(response);
                    if (callback) {
                        (callback)(result);
                    }
                }
            });
        };
    }

    function bindGetterSetter(propertyInfo) {
        var propertyIndex = propertyInfo[0];
        var propertyName = propertyInfo[1];
        var notifySignalData = propertyInfo[2];
        // initialize property cache with current value
        // NOTE: if this is an object, it is not directly unwrapped as it might
        // reference other QObject that we do not know yet
        object.__propertyCache__[propertyIndex] = propertyInfo[3];

        if (notifySignalData) {
            if (notifySignalData[0] === 1) {
                // signal name is optimized away, reconstruct the actual name
                notifySignalData[0] = propertyName + "Changed";
            }
            addSignal(notifySignalData, true);
        }

        Object.defineProperty(object, propertyName, {
            configurable: true,
            get: function () {
                var propertyValue = object.__propertyCache__[propertyIndex];
                if (propertyValue === undefined) {
                    // This shouldn't happen
                    console.warn("Undefined value in property cache for property \"" + propertyName + "\" in object " + object.__id__);
                }
                return propertyValue;
            },
            set: function (value) {
                if (value === undefined) {
                    console.warn("Property setter for " + propertyName + " called with undefined value!");
                    return;
                }
                object.__propertyCache__[propertyIndex] = value;
                webChannel.exec({
                    "type": QWebChannelMessageTypes.setProperty,
                    "object": object.__id__,
                    "property": propertyIndex,
                    "value": value
                });
            }
        });

    }

    // ----------------------------------------------------------------------

    data.methods.forEach(addMethod);

    data.properties.forEach(bindGetterSetter);

    data.signals.forEach(function (signal) {
        addSignal(signal, false);
    });

    for (var name in data.enums) {
        object[name] = data.enums[name];
    }
}

//required for use with nodejs
if (typeof module === 'object') {
    module.exports = {
        QWebChannel: QWebChannel
    };
}
