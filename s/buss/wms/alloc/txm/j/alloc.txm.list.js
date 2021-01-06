import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { dataGrid } from "/s/j/kf.grid.js";

let _type = gf.urlParam("type");
let _jsonUrl = '/alloc/txm/findByPage.shtml';
let _alloc = gf.urlParam("alloc");
if (_alloc) {
	_jsonUrl += `?allocTxmFormMap.alloc=${_alloc}`;
} else {
	$(".panel-heading").removeClass("hidden");
}
let tempBtns = [{
	url: `/s/buss/wms/alloc/txm/h/allocTxmAddUI.html${_alloc ? "?alloc=" + _alloc : ""}`,
	id: "add", name: `增加`, class: "btn-primary", hide: true,
	bind: function () {
		gflayer.open({
			title: `${this.name}SU${_alloc ? "（货位:" + _alloc + "）" : ""}`,
			type: 2,
			content: this.url
		});
	},
}, {
	url: `/s/buss/wms/rf/h/rf.receipt.html${_alloc ? "?alloc=" + _alloc : ""}`,
	id: "toReceipt", name: `发起入库`, class: "btn-primary", hide: true,
	bind: function () {
		window.location.href = this.url;
	},
}, {
	id: "del", name: "删除", class: "btn-danger", hide: true,
	bind: function () {
		var txm = gf.checkOnlyOne("txm");
		var alloc = gf.checkOnlyOne("alloc");
		if (!txm) { return; }
		layer.confirm(`是否${this.name}${txm}？`, function (index) {
			gf.ajax(`/alloc/txm/deleteEntity.shtml`, { txm: txm, alloc: alloc }, "json", function (s) {
				gflayer.msg(s.msg);
				window.datagrid.loadData();
			});
		});
	},
}];
gfbtn.bindByRes("div.doc-buttons", tempBtns);

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "txm",
		name: "SU",
		hide: false,
	}, {
		colkey: "alloc",
		name: "货位",
		hide: false,
	}, {
		colkey: "num",
		name: "数量",
		hide: false,
	}, {
		colkey: "place",
		name: "位置",
		hide: true,
	}, {
		colkey: "name",
		name: "货物名称",
		renderData: function (rowindex, data, rowdata, column) {
			return data + gf.rowDisplay(rowdata);
		},
		hide: true,
	}, {
		colkey: "skuid",
		name: "SKU（货物类型）",
		renderData: function (rowindex, data, rowdata, column) {
			let val = sku.value(data);
			if (!val) return "无对应值" + data;
			return val;
		},
		hide: true,
	}, {
		colkey: "num",
		name: "数量",
		hide: true,
	}],
	jsonUrl: _jsonUrl,
	checkbox: false,
	serNumber: true
});
$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#edit").click("click", function () {
	edit();
});
function edit() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		gflayer.msg("只能选中一个");
		return;
	}
	window.pageii = gflayer.open({
		title: "编辑",
		type: 2,
		content: '/s/buss/wms/alloc/txm/editUI.html?id=' + cbox
	});
}