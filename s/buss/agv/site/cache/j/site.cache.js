import { dataGrid } from "/s/j/kf.grid.js";

let params = {
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true
	}, {
		colkey: "key",
		name: "站点"

	}, {
		colkey: "value",
		name: "指令"
	}, {
		colkey: "updatetime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: `/app/conf/findByPage.shtml`,
	checkbox: true,
	serNumber: true
}

export var init = function () {
	params = Object.assign(params, {
		data: { "TABLE_KEY": "FANCY_CACHE_CONF" }
	});
	window.datagrid = dataGrid(params);
}

let doSearch = function () {
	var searchParams = $("#searchForm").serializeObject();
	window.datagrid.setOptions({
		data: Object.assign(searchParams, { "TABLE_KEY": "FANCY_CACHE_CONF" })
	});
}

function add() {
	window.pageii = gf.layerOpen({
		title: "新增",
		type: 2,
		content: '/s/buss/agv/site/cache/h/site.cache.add.html'
	});
}

function refresh() {
	window.datagrid.loadData();
}

$("#search").on("click", function () {
	doSearch();
});

$("#add").click("click", function () {
	add();
});

$("#refresh").click("click", function () {
	refresh();
});
