import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "whid",
		name: "仓库",
		renderData: function (rowindex, data, rowdata, column) {
			var whId = "";
			whId = (data ? gv.get("WAREHOUSE", data) : "");
			return "<div class='changable'>" + "<span>" + whId + "</span>" + "</div>";
		}
	}, {
		colkey: "text",
		name: "货位名称",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "</div>";
		}
	}, {
		colkey: "num",
		name: "数量",
		hide: true,
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return "--";
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "</div>";
		}
	}, {
		colkey: "txm",
		name: "SU",
	}, {
		colkey: "skuId",
		name: "货物种类",
		hide: function () { return localStorage.projectKey == 'BJJK_HUIRUI'; },
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return "--";
			}
			var data = sku.value(data);
			return "<div class='changable'>" + "<span>" + data + "</span>" + "</div>";
		}
	}, {
		colkey: "status",
		name: "货位状态",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
				return "已删除";
			}
			return gv.get("ALLOC_ITEM_STATUS", data);
		}
		// }, {
		// 	colkey: "json",
		// 	name: "明细",
		// 	renderData: function (rowindex, data, rowdata, column) {
		// 		if (!data) { return ""; }
		// 		let details = "";
		// 		let json = JSON.parse(data);
		// 		for (let item of json.items) {
		// 			details += `SU:${item.SU},TU:${item.TU}<br/>`;
		// 		}
		// 		return details;
		// 	}
	}],
	jsonUrl: '/alloc/item/findWithTxm.shtml?allocItemFormMap.inStock=true',
	checkbox: false,
	serNumber: true
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

$("#export").on("click", function () {
	window.location.href = '/alloc/item/download.shtml?allocItemFormMap.inStock=true' + '&' + $("#searchForm").serialize();
});