(function(window) {
    var commen = {
        version: '0.0.2',
        //client is a function that check the platform.
        //return a object includes system, engine, browser
        clientCheck: function() {

            //rendering engines
            var engine = {
                ie: 0,
                gecko: 0,
                webkit: 0,
                khtml: 0,
                opera: 0,

                //complete version
                ver: null
            };

            //browsers
            var browser = {

                //browsers
                ie: 0,
                firefox: 0,
                safari: 0,
                konq: 0,
                opera: 0,
                chrome: 0,

                //specific version
                ver: null
            };


            //platform/device/OS
            var system = {
                win: false,
                mac: false,
                x11: false,

                //mobile devices
                iphone: false,
                ipod: false,
                ipad: false,
                ios: false,
                android: false,
                nokiaN: false,
                winMobile: false,

                //game systems
                wii: false,
                ps: false
            };

            //detect rendering engines/browsers
            var ua = navigator.userAgent;
            if (window.opera) {
                engine.ver = browser.ver = window.opera.version();
                engine.opera = browser.opera = parseFloat(engine.ver);
            } else if (/AppleWebKit\/(\S+)/.test(ua)) {
                engine.ver = RegExp["$1"];
                engine.webkit = parseFloat(engine.ver);

                //figure out if it's Chrome or Safari
                if (/Chrome\/(\S+)/.test(ua)) {
                    browser.ver = RegExp["$1"];
                    browser.chrome = parseFloat(browser.ver);
                } else if (/Version\/(\S+)/.test(ua)) {
                    browser.ver = RegExp["$1"];
                    browser.safari = parseFloat(browser.ver);
                } else {
                    //approximate version
                    var safariVersion = 1;
                    if (engine.webkit < 100) {
                        safariVersion = 1;
                    } else if (engine.webkit < 312) {
                        safariVersion = 1.2;
                    } else if (engine.webkit < 412) {
                        safariVersion = 1.3;
                    } else {
                        safariVersion = 2;
                    }

                    browser.safari = browser.ver = safariVersion;
                }
            } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
                engine.ver = browser.ver = RegExp["$1"];
                engine.khtml = browser.konq = parseFloat(engine.ver);
            } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
                engine.ver = RegExp["$1"];
                engine.gecko = parseFloat(engine.ver);

                //determine if it's Firefox
                if (/Firefox\/(\S+)/.test(ua)) {
                    browser.ver = RegExp["$1"];
                    browser.firefox = parseFloat(browser.ver);
                }
            } else if (/MSIE ([^;]+)/.test(ua)) {
                engine.ver = browser.ver = RegExp["$1"];
                engine.ie = browser.ie = parseFloat(engine.ver);
            }

            //detect browsers
            browser.ie = engine.ie;
            browser.opera = engine.opera;


            //detect platform
            var p = navigator.platform;
            system.win = p.indexOf("Win") == 0;
            system.mac = p.indexOf("Mac") == 0;
            system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

            //detect windows operating systems
            if (system.win) {
                if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)) {
                    if (RegExp["$1"] == "NT") {
                        switch (RegExp["$2"]) {
                            case "5.0":
                                system.win = "2000";
                                break;
                            case "5.1":
                                system.win = "XP";
                                break;
                            case "6.0":
                                system.win = "Vista";
                                break;
                            case "6.1":
                                system.win = "7";
                                break;
                            default:
                                system.win = "NT";
                                break;
                        }
                    } else if (RegExp["$1"] == "9x") {
                        system.win = "ME";
                    } else {
                        system.win = RegExp["$1"];
                    }
                }
            }

            //mobile devices
            system.iphone = ua.indexOf("iPhone") > -1;
            system.ipod = ua.indexOf("iPod") > -1;
            system.ipad = ua.indexOf("iPad") > -1;
            system.nokiaN = ua.indexOf("NokiaN") > -1;

            //windows mobile
            if (system.win == "CE") {
                system.winMobile = system.win;
            } else if (system.win == "Ph") {
                if (/Windows Phone OS (\d+.\d+)/.test(ua)) {;
                    system.win = "Phone";
                    system.winMobile = parseFloat(RegExp["$1"]);
                }
            }


            //determine iOS version
            if (system.mac && ua.indexOf("Mobile") > -1) {
                if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)) {
                    system.ios = parseFloat(RegExp.$1.replace("_", "."));
                } else {
                    system.ios = 2; //can't really detect - so guess
                }
            }

            //determine Android version
            if (/Android (\d+\.\d+)/.test(ua)) {
                system.android = parseFloat(RegExp.$1);
            }

            //gaming systems
            system.wii = ua.indexOf("Wii") > -1;
            system.ps = /playstation/i.test(ua);

            //return it
            return {
                engine: engine,
                browser: browser,
                system: system
            };

        },
        envChecker: {
            /*localStorageSupport is a function to check that
             * the browser localStorageSupport case.
             * return bool
             */
            localStorageSupport: function() {
                return !!window.localStorage;
            },
            //get current url params.
            getUrlParam: function() {
                var paramArray = window.location.search.substr(1).split('&');
                var obj = {};
                for (var i = 0; i < paramArray.length; i++) {
                    obj[paramArray[i].split('=')[0]] = paramArray[i].split('=')[1];
                }
                return obj;
            }
        },
        docer: {
            loadScript: function(url, idd = '', func = '') {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
                if (idd != '') script.id = idd;
                document.head.appendChild(script);
                if (func != '') script.onload = func;
            }
        },
        /*eventManage is a operate set that manage document event.
         */
        eventManager: {
            addHandler: function(element, type, handler) {
                if (element.addEventListener) {
                    element.addEventListener(type, handler, false);
                } else if (element.attachEvent) {
                    element.attachEvent("on" + type, handler);
                } else {
                    element["on" + type] = handler;
                }
            },
            removeHandler: function(element, type, handler) {
                if (element.removeEventListener) {
                    element.removeEventListener(type, handler, false);
                } else if (element.detachEvent) {
                    element.detachEvent("on" + type, handler, false);
                } else {
                    element["on" + type] = null;
                }
            },
            getEvent: function(event) {
                return event ? event : window.event;
            },
            getTarget: function(event) {
                return event.target || event.srcElement;
            },
            preventDefault: function(event) {
                if (event.preventDefault) {
                    event.preventDefault();
                } else {
                    event.returnValue = false;
                }
            },
            stopPropagation: function(event) {
                if (event.stopPropagation) {
                    event.stopPropagation();
                } else {
                    event.cancelBubble = true;
                }
            }

        },
        /*cookie is a operate set that operate cookies.
         */
        cookieManager: {
            get: function(cname) {
                var name = cname + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1);
                    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                }
                return "";
            },
            set: function(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + "; " + expires;
            },
            remove: function(name) {
                var d = new Date();
                d.setTime(d.getTime() - 1);
                var expires = "expires=" + d.toUTCString();
                document.cookie = name + "='';" + expires + "; path = /";
            }
        },
        timer: {
            //get current date.
            today: function(flag) {
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let join = flag ? flag : '';
                return '' + year + join + month + join + day;
            },
            getTimeWithJoin: function(flag) {
                var t = new Date();
                if (typeof(flag) == 'number') {
                    t.setTime(t.getTime() + (flag * 24 * 60 * 60 * 1000));
                    return t;
                } else if (typeof(flag) == 'string') {
                    switch (flag) {
                        case 'year':
                            return t.getFullYear();
                            break;
                        case 'month':
                            return (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1);
                            break;
                        case 'day':
                            return (t.getDate()) < 10 ? '0' + (t.getDate()) : (t.getDate());
                            break;
                        case 'inweek':
                            return t.getDay();
                            break;
                        case 'hour':
                            return t.getHours();
                            break;
                        case 'minute':
                            return t.getMinutes();
                            break;
                        case 'second':
                            return t.getSeconds();
                            break;
                        case 'millisecond':
                            return t.getMilliseconds();
                            break;
                        default:
                            return t;
                            break;
                    }
                } else {
                    return t;
                }
            },
            //******************************
            //将 Date 转化为指定格式的String
            //月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用1-2个占位符，
            //年(y)可以用1-4个占位符，毫秒(S)只能用1个占位符(是1-3位的数字)
            //例子：
            //timeFormat("yyyy-MM-dd hh:mm:ss.S") => 2006-07-02 08:09:04.423
            //timeFormat("yyyy-M-d h:m:s.S") => 2006-7-2 8:9:4.18
            //******************************
            getTimeWithFormat: function(fmt, flag) {
                var t = new Date();
                if (typeof(flag) == 'number') {
                    t.setTime(t.getTime() + (flag * 24 * 60 * 60 * 1000));
                }
                var o = {
                    "M+": t.getMonth() + 1, //月份
                    "d+": t.getDate(), //日
                    "h+": t.getHours(), //小时
                    "m+": t.getMinutes(), //分
                    "s+": t.getSeconds(), //秒
                    "q+": Math.floor((t.getMonth() + 3) / 3), //季度
                    "S": t.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            }
        },
    };
    window.Z = commen;
}(window));
