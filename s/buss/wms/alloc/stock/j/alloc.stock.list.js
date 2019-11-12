import { sku } from "/s/buss/wms/sku/wms.sku.js";
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
		name: "库位数量",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return "--";
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "</div>";
		}
	}, {
		colkey: "skuId",
		name: "货物种类",
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
	jsonUrl: '/alloc/item/findByPage.shtml?allocItemFormMap.inStock=true',
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