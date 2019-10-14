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
		name: "单号"
	}, {
		colkey: "sourcewh",
		name: "源仓库",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) {
				return "--空--";
			}
			return gv.get("WAREHOUSE", data);
		}
	}, {
		colkey: "targetwh",
		name: "目标仓库",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) {
				return "--空--";
			}
			return gv.get("WAREHOUSE", data);
		}
	}, {
		colkey: "totallines",
		name: "明细数"
	}, {
		colkey: "totalqty",
		name: "货物数"
	}, {
		colkey: "name",
		name: "交接点",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("ACS_CACHE_CABLE", data);
		}
	}, {
		colkey: "status",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == 1) {
				$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dedede");
				return "已删除";
			} else {
				if (data == 3) {
					$("tr[d-tree='" + rowdata.dtee + "']").css("color", "red");
				}
			}
			return gv.get("ACS_STATUS", data);
		}
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
$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
});

initPaperOp("transfer");