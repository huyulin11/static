import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { findAllocObj } from "/s/buss/wms/j/receipt.main.fun.js";

let _receipttype = gf.urlParam("receipttype");

let cols = [{
	colkey: "id",
	name: "id",
	hide: true,
}, {
	colkey: "paperid",
	name: "单号"
}, {
	colkey: "totallines",
	name: "明细数"
}, {
	colkey: "totalqty",
	name: "货物数"
}, {
	colkey: "status",
	name: "状态",
	renderData: function (rowindex, data, rowdata, column) {
		gf.rowDisplay(rowdata);
		return gv.get("ACS_STATUS", data);
	}
}];

if (localStorage.projectKey == "BJJK_HUIRUI") {
	cols = cols.concat({
		colkey: "targetAlloc",
		name: "目标货位",
	});
}

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: cols,
	jsonUrl: `/receipt/main/find.shtml?receipttype=${_receipttype}`,
	checkbox: true,
	serNumber: true,
	simple: true,
	refreshTime: 5000,
	callback: function () {
		let keys = $(".targetAlloc").map(function () { return $(this).parents("tr").find(".paperid").html() }).get().join(":");
		findAllocObj(keys, function (info) {
			$(".targetAlloc").each(function () {
				let that = this;
				info.some(function (item) {
					if (item.key == $(that).parents("tr").find(".paperid").html()) {
						$(that).html(item.value);
						return true;
					}
				});
			});
		});
	}
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

initPaperOp("receipt");