import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
renderAll();

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "orderid",
		name: "订单号"
	}, {
		colkey: "paperid",
		name: "单号",
		hide: true,
	}, {
		colkey: "sourcewh",
		name: "源仓库",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) return "--空--";
			return gv.get("WAREHOUSE", data);
		},
		hide: function (rowindex, data, rowdata, column) {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return false;
				case "BJJK_HUIRUI": return true;
				default: return true;
			}
		},
	}, {
		colkey: "targetwh",
		name: "目标仓库",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) return "--空--";
			return gv.get("WAREHOUSE", data);
		},
		hide: function (rowindex, data, rowdata, column) {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return false;
				case "BJJK_HUIRUI": return true;
				default: return true;
			}
		},
	}, {
		colkey: "totallines",
		name: "明细数"
	}, {
		colkey: "totalqty",
		name: "货物数",
		hide: true,
	}, {
		colkey: "name",
		name: function (rowindex, data, rowdata, column) {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return "出入口";
				case "BJJK_HUIRUI": return "产线";
				default: return "name";
			}
		},
		renderData: function (rowindex, data, rowdata, column) {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return gv.get("ACS_CACHE_CABLE", data);
				case "BJJK_HUIRUI": return data;
				default: return "name";
			}
		},
	}, {
		colkey: "status",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("ACS_STATUS", data) + gf.rowDisplay(rowdata);
		}
	}, {
		colkey: "CRETATE.OPERATOR",
		jsonColumn: "operator",
		name: "导入人",
	}, {
		colkey: "updatetime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
				+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: '/transfer/main/find.shtml',
	checkbox: true,
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

initPaperOp("transfer");