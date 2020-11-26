import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

var paperid = gf.urlParam("inventoryMainFormMap.paperid");
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
		colkey: "supplier",
		name: "供应商"
	}, {
		colkey: "item",
		name: "货物类型"
	}, {
		colkey: "lot",
		name: "批次号"
	}, {
		colkey: "userdef1",
		name: "货位"
	}, {
		colkey: "sequence",
		name: "次序",
	}, {
		colkey: "updatetime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
				+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: '/inventory/detail/findByPage.shtml?inventoryDetailFormMap.paperid=' + paperid,
	checkbox: true,
	serNumber: true
});