import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

let _table, _searchHtml;
let _params = {
    pagId: 'paging',
    jsonColumn: 'value',
    checkValue: "key",
    columns: [{
        colkey: "key",
        name: "键",
    }, {
        colkey: "value",
        name: "值",
    }],
    jsonUrl: '/app/conf/findByPage.shtml',
    checkbox: true,
    searchInInit: false,
    serNumber: true,
}

let doSearch = function () {
    var searchParams = $("#searchForm").serializeObject();
    window.datagrid.setOptions({
        data: Object.assign(searchParams, { "TABLE_KEY": _table })
    });
}

export let tempBtns = [{
    id: "refresh", name: "刷新", class: "btn-info",
    bind: function () {
        window.datagrid.loadData();
    }
}];

export var initConfList = function (table, params, searchHtml) {
    _table = table;
    _searchHtml = searchHtml;
    Object.assign(_params, params, {
        data: { "TABLE_KEY": _table }
    });
    window.datagrid = dataGrid(_params);
    $("#searchForm").delegate("#search", "click", function () {
        doSearch();
    });
    if (_searchHtml) {
        let searchHtml = '<a class="btn btn-default" id="search">查询</a>';
        $("#searchForm").find("div.search-group").html(_searchHtml);
        $("#searchForm").find("div.search-group").append(searchHtml).parents("form").show();
    }
    gf.bindBtns("div.doc-buttons", tempBtns);
    doSearch();
}