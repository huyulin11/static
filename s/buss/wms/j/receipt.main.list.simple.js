import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";

let cols = [{
	colkey: "id",
	name: "id",
	hide: true,
}, {
	colkey: "paperid",
	name: "单号"
}, {
	colkey: "item",
	name: "货物类型",
	renderData: function (rowindex, data, rowdata, column) {
		return sku.value(data);
	}
}, {
	colkey: "itemcount",
	name: "货物数"
}, {
	colkey: "status",
	name: "状态",
	renderData: function (rowindex, data, rowdata, column) {
		return gv.get("ACS_STATUS", data);
	}
}, {
	name: "操作",
	renderData: function (rowindex, data, rowdata, column) {
		if (rowdata.delflag == "1") {
			return "";
		}
		var btns = "";
		btns += `<button type='button' class='btn btn-info marR10 exe' 
		data-id='${rowdata.id}'>处理</button>`;
		return btns;
	}
}];

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: cols,
	jsonUrl: `/receipt/util/findWithDetail.shtml?mainstatus=TOSEND&detailstatus=NEW:TOSEND:EXECUTING`,
	checkbox: true,
	serNumber: true,
	simple: true,
	refreshTime: 5000,
});

let doSearch = function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
}

$("#search").on("click", function () {
	doSearch();
});

$("#searchForm").on("submit", function () {
	doSearch();
	return false;
});

$("#paging").delegate("button.exe", "click", function () {
	let id = $(this).data("id");
	window.location.href = `/s/buss/wms/h/receiptDetailExe.html?detailid=${id}`;
});

initPaperOp("receipt");