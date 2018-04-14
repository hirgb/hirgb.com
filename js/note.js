var $$ = mdui.JQ,
    version = '1.0',
    name = 'new document',
    option = null,
    option_tmp = null,
    data = null,
    view_data = [],
    mychart = null,
    previous_node = {
        node: null,
        parent_node: null,
        node_array_index: 0
    },
    current_node = {
        node: null,
        node_index_tmp: 0,
        parent_node: null,
        node_floor: [],
        node_array_index: 0,
        reset: function() {
            this.node = null;
            this.node_index_tmp = 0;
            this.parent_node = null;
            this.node_floor = [];
            this.node_array_index = 0;
        }
    },
    option_basic_tree = {
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            backgroundColor: '#333'
        },
        series: [{
            type: 'tree',
            data: [{
                name: 'root',
                children: [{
                        name: 'children'
                    },
                    {
                        name: 'children'
                    }
                ]
            }],
            top: '2%',
            left: '2%',
            bottom: '2%',
            right: '20%',
            symbolSize: 12,
            label: {
                normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left',
                    fontSize: 16
                }
            },
            emphasis: {
                label: {}
            },
            leaves: {
                label: {
                    normal: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                }
            },
            initialTreeDepth: 10,
            expandAndCollapse: true,
            animationDuration: 0,
            animationDurationUpdate: 300
        }]
    };

function docInit() {
    if (mychart) {
        mychart.clear();
    }
    $('.action-btn').css('display', 'none');
    $('#option-editor').val('');
    name = 'new document';
    option = null;
    option_tmp = null;
    data = null;
    view_data = [];
    mychart = null;

    previous_node.node = null;
    previous_node.parent_node = null;
    previous_node.node_array_index = 0;

    current_node.node = null;
    current_node.node_index_tmp = 0;
    current_node.parent_node = null;
    current_node.node_floor = [];
    current_node.node_array_index = 0;
}

function createNote(act) {
    switch (act) {
        case 'create-basic-tree':
            option = option_basic_tree;
        default:
            $('#doc-title').text(name);
            $('.action-btn').css('display', 'block');
            dataHandle(option);
            break;
    }
}

function myImport() {
    var selectedFile = document.getElementById("import-file").files[0];
    name = selectedFile.name;
    $('#doc-title').text(name);

    var reader = new FileReader();
    reader.readAsText(selectedFile);

    reader.onload = function() {
        option = optionOptimize(JSON.parse(this.result).option);
        dataHandle(option);
        $('.action-btn').css('display', 'block');
    }
}

function dataHandle() {
    data = option.series[0].data;
    view_data[0] = data[0];
    option.series[0].data = [];
    $('#option-editor').val(format(JSON.stringify(option)));
    display(option, view_data, true, true);
}

//writer
function doSave(value, type, name) {
    var blob;
    if (typeof window.Blob == "function") {
        blob = new Blob([value], {
            type: type
        });
    } else {
        var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(value);
        blob = bb.getBlob(type);
    }
    var URL = window.URL || window.webkitURL;
    var bloburl = URL.createObjectURL(blob);
    var anchor = document.createElement('a');
    if ('download' in anchor) {
        anchor.style.visibility = 'hidden';
        anchor.href = bloburl;
        anchor.download = name;
        document.body.appendChild(anchor);
        var evt = document.createEvent('MouseEvents');
        evt.initEvent('click', true, true);
        anchor.dispatchEvent(evt);
        document.body.removeChild(anchor);
    } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, name);
    } else {
        location.href = bloburl;
    }
}

function Save() {
    if (option) {
        option.series[0].data = data;
        mdui.prompt('Please confirm file name:', 'SAVE', function(value) {
            if (value) {
                var file = {
                    version: version,
                    option: option
                };
                //doSave(JSON.stringify(file).replace(/\n|\r\n/g, "<br>"), 'text/xml', confirm_name);
                doSave(JSON.stringify(file), 'text/xml', value);
            } else {
                mdui.alert('You have not input a file name!');
            }
        }, function(value) {}, {
            defaultValue: name
        });
    } else {
        mdui.alert('You have not write anything!');
    }
}

function display(option, view_data, bind = true, refresh = true) {
    if (mychart && refresh) {
        mychart.clear();
    }
    mychart = echarts.init(document.getElementById('mycanvas'));
    echarts.util.each(data.children, function(datum, index) {
        index % 2 === 0 && (datum.collapsed = true);
    });
    if (!view_data) {
        view_data = data;
    }
    option.series[0].data = view_data;
    mychart.setOption(option);
    if (bind) {
        bindEvents();
    }
}

function bindEvents() {

    //display current node's name
    if (mychart) {
        mychart.on('click', function(e) {
            if (current_node.node) {
                previous_node.node = current_node.node;
                previous_node.parent_node = current_node.parent_node;
                previous_node.node_array_index = current_node.node_array_index;
            }
            current_node.reset();
            findNode(view_data, e.dataIndex);
            current_node.parent_node = current_node.node_floor.slice(-1)[0];
            console.log(current_node.node_array_index);
            $('#node-name').val(current_node.node.name);
        });
    }

    //save
    $('#save').on('click', Save);

    //shutdown
    $('#shutdown').on('click', function() {
        if (mychart) {
            mdui.confirm('请确认已保存所有更改，否则将无法恢复工作。确认关闭？', '关闭文档', function(o) {
                docInit();
            });
        }
    });

    //modify node's name
    $('#node-name').on('keyup', function(e) {
        if (e.keyCode == 13 && $('#node-name').val()) {
            if (current_node.node) {
                current_node.node.name = $('#node-name').val();
                display(option, view_data, false);
                //				current_node.reset();
                $('#node-name').val(current_node.node.name);
            }
        }
    });

    //create a new node
    $('#new-node').on('click', function() {
        if (current_node.node) {
            mdui.prompt('Please input node name:', 'New node', function(value) {
                if (value) {
                    var newNode = {};
                    newNode.name = value;
                    if (typeof(current_node.node.children) == 'undefined') {
                        current_node.node.children = [];
                    }
                    current_node.node.children.push(newNode);
                    display(option, view_data, false, false);
                    $('#node-name').val(current_node.node.name);
                }
            }, function() {});
        } else {
            mdui.snackbar({
                message: 'Please select a node!',
                timeout: 2000,
                position: 'top'
            });
        }
    });

    //new brother node
    $('#new-brother-node').on('click', function() {
        if (current_node.node && current_node.parent_node) {
            mdui.prompt('Please input node name:', 'New node', function(value) {
                if (value) {
                    var newNode = {};
                    newNode.name = value;
                    current_node.parent_node.children.splice(current_node.node_array_index, 0, newNode);
                    display(option, view_data, false, false);
                } else {
                    mdui.snackbar({
                        message: 'Nothing!',
                        timeout: 2000,
                        position: 'top'
                    });
                }
            });
        } else {
            mdui.snackbar({
                message: 'Current node is null or it has not a parent node!',
                timeout: 2000,
                position: 'top'
            });
        }
    });

    //delete current node
    $('#delete-node').on('click', function() {
        if (current_node.node) {
            mdui.alert('Do you confirm to delete this node [' + current_node.node.name + '] ?', 'ALERT', function() {
                current_node.parent_node.children.splice(current_node.node_array_index, 1);
                display(option, view_data, false);
                current_node.reset();
                $('#node-name').val('');
            });
        }
    });

    //clip a node
    $('#clip').on('click', function() {
        if (previous_node.node && previous_node.node !== current_node.node && previous_node.parent_node !== current_node.node) {
            mdui.confirm('Are you sure to clip node [' + previous_node.node.name + '] to [' + current_node.node.name + ']', 'CLIP', function() {
                if (typeof(current_node.node.children) == "undefined") {
                    current_node.node.children = [];
                }
                current_node.node.children.push(previous_node.node);
                previous_node.parent_node.children.splice(previous_node.node_array_index, 1);
                display(option, view_data, false);
            });
        }
    });

    //copy a node
    $('#copy').on('click', function() {
        if (previous_node.node && previous_node.node !== current_node.node) {
            mdui.confirm('Are you sure to copy node [' + previous_node.node.name + '] to [' + current_node.node.name + ']', 'COPY', function() {
                if (typeof(current_node.node.children) == "undefined") {
                    current_node.node.children = [];
                }
                current_node.node.children.push(previous_node.node);
                display(option, view_data, false);
            });
        }
    });

    //order-swip
    $('#order-swip').on('click', function() {
        if (previous_node.node && previous_node.node !== current_node.node) {
            mdui.confirm('Are you sure to swip node position [' + previous_node.node.name + '] and [' + current_node.node.name + '] ?', 'SWIP', function() {
                [previous_node.parent_node.children[previous_node.node_array_index], current_node.parent_node.children[current_node.node_array_index]] = [current_node.parent_node.children[current_node.node_array_index], previous_node.parent_node.children[previous_node.node_array_index]];
                display(option, view_data, false);
            });
        }
    });

    //node-view
    $('#node-view').on('click', function() {
        if (current_node.node) {
            view_data[0] = current_node.node;
            display(option, view_data, false, true);
        } else {
            mdui.snackbar({
                message: 'Please select a node!',
                timeout: 2000,
                position: 'top'
            });
        }
    });

    //restore view
    $('#restore-view').on('click', function() {
        if (data) {
            view_data[0] = data[0];
            display(option, view_data, false, true);
        }
    });

    //view option
    $('#view-option').on('click', function() {
        if ($('#option-editor').val() && JSON.parse($('#option-editor').val())) {
            option_tmp = JSON.parse($('#option-editor').val());

            display(optionOptimize(option_tmp), data, false, true);
        } else {
            mdui.snackbar({
                message: 'Option error!',
                timeout: 2000,
                position: 'top'
            });
        }
    });

    //save option
    $('#save-option').on('click', function() {
        if ($('#option-editor').val() && JSON.parse($('#option-editor').val())) {
            option_tmp = JSON.parse($('#option-editor').val());
            option.series[0].data = [];
            option = option_tmp;
            display(optionOptimize(option), data, false, true);
        } else {
            mdui.snackbar({
                message: 'Option error!',
                timeout: 2000,
                position: 'top'
            });
        }
    });

    //restore option
    $('#restore-option').on('click', function() {
        option.series[0].data = [];
        $('#option-editor').val(format(JSON.stringify(option)));
    });
}

function findNode(data_tmp, data_index) {
    for (var i = 0; i < data_tmp.length; i++) {
        current_node.node_index_tmp++;
        if (current_node.node_index_tmp == data_index) {
            current_node.node = data_tmp[i];
            current_node.node_array_index = i;
            break;
        }
        if (current_node.node_index_tmp < data_index) {
            if (typeof(data_tmp[i].children) != "undefined" && data_tmp[i].children.length > 0) {
                current_node.node_floor.push(data_tmp[i]);
                findNode(data_tmp[i].children, data_index);
            }
        }
    }
    if (!current_node.node) {
        current_node.node_floor.pop();
    }
}

function clearCharts() {
    mychart.clear();
    name = 'new document';
    option = null;
    data = null;
    view_data = [];
    mychart = null;
}

function optionOptimize(option, optimize = true) {
    if (optimize) {
        if (option.tooltip) {
            option.tooltip.formatter = function(param) {
                var name = param.name;
                var str_tmp = '';
                if (name.length > 20) {
                    for (var i = 0; i < name.length; i++) {
                        if (i % 20 === 0 && i > 0) {
                            str_tmp += '<br>' + name[i];
                        } else {
                            str_tmp += name[i];
                        }
                    }
                } else {
                    str_tmp = name;
                }
                return str_tmp;
            };
        }
        //		if(option.series[0].emphasis && option.series[0].emphasis.label) {
        //			option.series[0].emphasis.label.formatter = function(param) {
        //				var name = param.name;
        //				var str_tmp = '';
        //				if(name.length > 20) {
        //					for(var i = 0; i < name.length; i++) {
        //						if(i % 20 === 0) {
        //							str_tmp += '\n' + name[i];
        //						} else {
        //							str_tmp += name[i];
        //						}
        //					}
        //				} else {
        //					str_tmp = name;
        //				}
        //				return str_tmp;
        //			};
        //		}
        if (option.series[0].label && option.series[0].label.normal) {
            option.series[0].label.normal.formatter = function(param) {
                var name = param.name;
                var str_tmp = '';
                if (name.length > 20) {
                    str_tmp = name.slice(0, 18) + '...';
                } else {
                    str_tmp = name;
                }
                return str_tmp;
            };
        }
    }
    return option;
}
//json format
function format(txt, compress /*是否为压缩模式*/ ) { /* 格式化JSON源码(对象转换为JSON文本) */
    var indentChar = '    ';
    if (/^\s*$/.test(txt)) {
        //alert('数据为空,无法格式化! ');
        return;
    }
    try {
        var data = eval('(' + txt + ')');
    } catch (e) {
        alert('数据源语法错误,格式化失败! 错误信息: ' + e.description, 'err');
        return;
    };
    var draw = [],
        last = false,
        This = this,
        line = compress ? '' : '\n',
        nodeCount = 0,
        maxDepth = 0;

    var notify = function(name, value, isLast, indent /*缩进*/ , formObj) {
        nodeCount++; /*节点计数*/
        for (var i = 0, tab = ''; i < indent; i++) tab += indentChar; /* 缩进HTML */
        tab = compress ? '' : tab; /*压缩模式忽略缩进*/
        maxDepth = ++indent; /*缩进递增并记录*/
        if (value && value.constructor == Array) { /*处理数组*/
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + '[' + line); /*缩进'[' 然后换行*/
            for (var i = 0; i < value.length; i++)
                notify(i, value[i], i == value.length - 1, indent, false);
            draw.push(tab + ']' + (isLast ? line : (',' + line))); /*缩进']'换行,若非尾元素则添加逗号*/
        } else if (value && typeof value == 'object') { /*处理对象*/
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + '{' + line); /*缩进'{' 然后换行*/
            var len = 0,
                i = 0;
            for (var key in value) len++;
            for (var key in value) notify(key, value[key], ++i == len, indent, true);
            draw.push(tab + '}' + (isLast ? line : (',' + line))); /*缩进'}'换行,若非尾元素则添加逗号*/
        } else {
            if (typeof value == 'string') value = '"' + value + '"';
            draw.push(tab + (formObj ? ('"' + name + '":') : '') + value + (isLast ? '' : ',') + line);
        };
    };
    var isLast = true,
        indent = 0;
    notify('', data, isLast, indent, false);
    return draw.join('');
}
//param:str <string> like '00000001' into array[0,0,0,1]
function splitIntoArray(str) {
    var a = [];
    for (var i = 0; i < str.length; i += 2) {
        var t = str.slice(i, i + 2);
        a.push(parseInt(t));
    }
    return a;
}

//generate a new node index
//param: index <str> current node index
//return: <str> new node index
function newNodeIndex(index) {
    var newIndex = '';
    var i = 0;
    if (current_node && typeof(current_node.children) != "undefined") {
        i = current_node.children.length;
    }

    if (i >= 10) {
        if (i >= 100) {
            mdui.alert('The node number can not biger than 99', function() {
                return false;
            });
        }
        newIndex = index + i.toString();
    } else {
        newIndex = index + '0' + i.toString();
    }

    return newIndex;
}
