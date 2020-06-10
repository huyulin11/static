import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";

let _type = gf.urlParam("type");
let _choosedStatus = gf.urlParam("status");
let _warehouse = gf.urlParam("warehouse");
if (_type) $("h2#thisTitle").html(unescape(_type));
else $("h2#thisTitle").html("出库管理");

let params = {
	pagId: 'paging',
	simple: true,
	refreshTime: 5000,
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "paperid",
		name: "单号"
	}, {
		colkey: "orderid",
		name: "订单",
		hide: function () { return localStorage.projectKey != "BJJK_HUIRUI"; }
	}, {
		colkey: "warehouse",
		name: "仓库",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) return "--空--";
			return gv.get("WAREHOUSE", data);
		}
	}, {
		colkey: "company",
		name: "转移单",
		hide: function () { return localStorage.projectKey != "BJJK_HUIRUI"; }
	}, {
		colkey: "name",
		name: () => {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return "出入口";
				case "BJJK_HUIRUI": return "目的地";
				default: return "name";
			}
		},
		hide: () => {
			switch (localStorage.projectKey) {
				case "CSY_DAJ":
				case "BJJK_HUIRUI": return false;
				default: return true;
			}
		},
		renderData: function (rowindex, data, rowdata, column) {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return gv.get("ACS_CACHE_CABLE", data);
				case "BJJK_HUIRUI": return data;
				default: return "name";
			}
		}
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
			return gv.get("ACS_STATUS", data) + gf.rowDisplay(rowdata);
		}
	}, {
		colkey: "updatetime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
				+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: '/shipment/main/findByPage.shtml',
	checkbox: true,
	serNumber: true
}

export var init = function () {
	params.data = {};
	params.data = Object.assign(params.data, { "shipmentMainFormMap.warehouse": _warehouse, });
	if (_choosedStatus) {
		initPaperOp("shipment", "RF");
		params.data = Object.assign(params.data, {
			"shipmentMainFormMap.status": _choosedStatus,
			"shipmentMainFormMap.delflag": 0
		});
	} else {
		$("#searchForm").show();
		initPaperOp("shipment");
	}

	window.datagrid = dataGrid(params);
}

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