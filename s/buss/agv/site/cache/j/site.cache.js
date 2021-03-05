import { dataGrid } from "/s/j/kf.grid.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";

let params = {
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true
	}, {
		colkey: "key",
		name: "站点路径"
	}, {
		colkey: "value",
		name: "缓存指令",
		renderData: function (rowindex, data, rowdata, column) {
			let value = JSON.parse(data).acts;
			let json = { acts: value };
			return JSON.stringify(json);
		}
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
	window.pageii = gflayer.open({
		title: "新增",
		type: 2,
		content: '/s/buss/agv/site/cache/h/site.cache.add.html'
	});
}

function del() {
	var cbox = gf.checkOnlyOne("key");
	if (!cbox) { return; }
	layer.confirm('删除成功后需重启服务器方可生效，是否删除？', function (index) {
		var url = '/app/conf/del.shtml';
		gf.ajax(url, { "table": "FANCY_CACHE_CONF", key: JSON.stringify(cbox) }, "json");
	});
}

function refresh() {
	window.datagrid.loadData();
}

$("#search").on("click", function () { doSearch(); });
$("#add").click("click", function () { add(); });
$("#del").click("click", function () { del(); });
$("#refresh").click("click", function () { refresh(); });
