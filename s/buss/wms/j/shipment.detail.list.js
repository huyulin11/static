import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

var paperid = gf.urlParam("shipmentMainFormMap.paperid");
window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "paperid",
		name: "单号"
	}, {
		colkey: "userdef1",
		name: "货位",
		hide: function () {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return false;
				case "BJJK_HUIRUI": return true;
				default: return true;
			}
		},
	}, {
		colkey: "item",
		name: "SU"
	}, {
		colkey: "userdef3",
		name: "货位号"
	}, {
		colkey: "sequence",
		name: "次序",
	}, {
		colkey: "status",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			return gf.getStatusDesc(rowindex, data, rowdata, column);
		}
	}, {
		colkey: "updatetime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
				+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: '/shipment/detail/findByPage.shtml?shipmentDetailFormMap.paperid=' + paperid,
	checkbox: true,
	serNumber: true
});