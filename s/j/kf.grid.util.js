var _defaultConf = {
    columns: [],
    pagId: 'paging', // 加载表格存放位置的ID
    width: '100%', // 表格高度
    height: '100%', // 表格宽度
    theadHeight: '28px', // 表格的thead高度
    tbodyHeight: '27px',// 表格body的每一行高度
    jsonUrl: '', // 访问后台地址
    jsonColumn: 'json',
    isFixed: false,//是否固定表头
    usePage: true,
    serNumber: false,// 是否显示序号
    records: 'records',// 分页数据
    pageNow: 'pageNow',// 当前页码 或 当前第几页a
    totalPages: 'pageCount',// 总页数
    totalRecords: 'rowCount',// 总记录数
    pagecode: '10',// 分页时，最多显示几个页码
    async: true, // 默认为同步
    data: '', // 发送给后台的数据 是json数据 例如{nama:"a",age:"100"}....
    pageSize: 40, // 每页显示多少条数据
    checkbox: false,// 是否显示复选框
    checkone: true,// 复选框仅能选择一个
    searchInInit: true,// 是否显示复选框
    checkValue: 'id', // 当checkbox为true时，需要设置存放checkbox的值字段 默认存放字段id的值
    treeGrid: {
        type: 1, //1 表示后台已经处理好父类带children集合 2 表示没有处理,由前端处理树形式
        tree: false,// 是否显示树
        name: 'name',// 以哪个字段 的树形式 如果是多个 name,key
        id: "id",
        pid: "pid"
    },
    callback: function () { }
};

var renderFun = function (obj, rowindex, data, rowdata, clm, json) {
    if (obj.renderData) {
        let rtn = obj.renderData(rowindex, data, rowdata, clm, json);
        if (rtn instanceof jQuery) { return rtn[0].outerHTML; } else { return rtn; };
    }

    if (data === 0 || data === true || data === false) {
        return data;
    }

    if (data) {
        return data;
    }

    if (json[obj.colkey]) {
        return json[obj.colkey];
    }
    let keys = obj.colkey.split(".");
    if (keys && json) {
        let item = json;
        let target;
        try {
            keys.forEach(function (i, y) {
                item = item[i];
                if (item) {
                    if (y == keys.length - 1) {
                        target = item;
                        return;
                    }
                    if (typeof item == 'string') {
                        item = JSON.parse(item);
                    }
                } else {
                    return;
                }
            });
        } catch (error) {
        }
        if (target) return target;
    }
    return obj.defaultVal == undefined ? "" : obj.defaultVal;
}

var restoreBgColor = function (tr) {
    for (var i = 0; i < tr.childNodes.length; i++) {
        tr.childNodes[i].style.backgroundColor = "";
    }
};
var setBgColor = function (tr) {
    for (var i = 0; i < tr.childNodes.length; i++) {
        tr.childNodes[i].style.backgroundColor = "#D4D4D4";
    }
};

var getChkBox = function (tr) {
    return tr.cells[1].firstChild;

};

var chkOneClick = function () {
    var evt = arguments[0] || window.event;
    var chkbox = evt.srcElement || evt.target;
    var tr = chkbox.parentNode.parentNode;
    chkbox.checked ? setBgColor(tr) : restoreBgColor(tr);
    if (_conf.checkone && chkbox.checked) {
        let that = this;
        $("#" + _conf.pagId).find(":checkbox:checked").each((item, obj) => {
            if ($(that).val() != $(obj).val()) {
                $(obj).trigger("click");
            }
        });
    }
};

var chkAllClick = function () {
    var evt = arguments[0] || window.event;
    var chkbox = evt.srcElement || evt.target;
    var checkboxes = $("#" + chkbox.attributes.pagId.value + " input[_l_key='checkbox']");
    if (chkbox.checked) {
        checkboxes.prop('checked', true);
    } else {
        checkboxes.prop('checked', false);
    }
    checkboxes.each(function () {
        var tr = this.parentNode.parentNode;
        var chkbox = getChkBox(tr);
        if (chkbox.checked) {
            setBgColor(tr);
        } else {
            restoreBgColor(tr);
        }
    });
}

var renderChkbox = (rowdata, cid, pid) => {
    var chkbox = tag("INPUT");
    chkbox.type = "checkbox";
    for (let v in rowdata) { if (rowdata[v]) chkbox.setAttribute("data-" + v, rowdata[v]); };
    chkbox.setAttribute("data-" + "cid", _getValueByName(rowdata, cid));
    chkbox.setAttribute("pid", _getValueByName(rowdata, pid));
    chkbox.setAttribute("_l_key", "checkbox");
    chkbox.value = _getValueByName(rowdata, _conf.checkValue);
    $(chkbox).on("click", chkOneClick);
    return chkbox;
}

var renderAllChkbox = () => {
    var chkbox = tag("INPUT");
    chkbox.type = "checkbox";
    chkbox.setAttribute("pagId", _conf.pagId);
    $(chkbox).on("click", chkAllClick);
    return chkbox;
}

var _getValueByName = function (data, name) {
    if (!data || !name)
        return null;
    if (name.indexOf('.') == -1) {
        return data[name];
    } else {
        try {
            return new Function("data", "return data." + name + ";")(data);
        } catch (e) {
            return null;
        }
    }
};

var fixhead = function () {
    for (var i = 0; i <= $('.t_table .pp-list tr:last').find('td:last').index(); i++) {
        $('.pp-list th').eq(i).css('width', ($('.t_table .pp-list tr:last').find('td').eq(i).width()) + 2);
    }
};

var tag = function (tag) {
    return document.createElement(tag);
};

var name = function (oneColumn) {
    if (typeof oneColumn.name == "string") return oneColumn.name;
    if (typeof oneColumn.name == "function") return oneColumn.name();
    return "";
}

var hide = function (oneColumn) {
    return gf.yesOrNo(oneColumn.hide);
}

var _fieldModel = {
    colkey: null,
    name: null,
    height: 'auto',
    align: 'center',
    hide: false,
    renderData: null,
};

var _conf;
var _confTreeGrid;
var _columns;

var checkItem = function (rowdata) {
    if (_conf.checkItem) return _conf.checkItem(rowdata);
    return _conf.checkbox;
}

let _flag = false;
var jsonRequest = function (conf, callback) {
    if (_flag) return;
    _flag = true;
    $.ajax({
        type: 'POST',
        async: conf.async,
        data: conf.data,
        url: conf.jsonUrl,
        dataType: 'json',
        success: function (jsonDatas) {
            if (jsonDatas) { callback(jsonDatas); }
            _flag = false;
        },
        error: function (msg) {
            console.log(msg);
            _flag = false;
            layer.msg("数据错误！请检查网络或权限配置！");
        }
    });
};

let _focusCss = "text-align:center; vertical-align: middle;";
let _hideCss = "display: none;";

let hideNumber = function (th) {
    th.setAttribute("style", _focusCss + ((!_conf.serNumber) ? _hideCss : ""));
}
let hideCheckbox = function (th) {
    th.setAttribute("style", _focusCss + ((!_conf.checkbox) ? _hideCss : ""));
}

var initUtil = (params) => {
    _conf = $.extend(_defaultConf, params);
    _confTreeGrid = _conf.treeGrid;
    _columns = _conf.columns;
}


export {
    _defaultConf, renderFun, restoreBgColor, setBgColor, renderChkbox, renderAllChkbox, _fieldModel, _focusCss, _hideCss, hideNumber, hideCheckbox,
    _getValueByName, fixhead, tag, name, hide, _conf, _confTreeGrid, _columns, initUtil, checkItem, jsonRequest, getChkBox
};