import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "paperid",
		name: "盘点单号"
	}, {
		colkey: "totallines",
		name: "盘点数量"
	}, {
		colkey: "inventorytype",
		name: "盘点类型",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("WMS_INVENTORY_TYPE", data);
		}
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
	jsonUrl: '/inventory/main/findByPage.shtml',
	checkbox: true,
	serNumber: true
});

$("#search").on("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serialize();// 初始化传参数
	window.datagrid.setOptions({
		data: searchParams
	});
});

initPaperOp("inventory");