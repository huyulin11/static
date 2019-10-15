import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";

let params = {
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "warehouse",
		name: "仓库",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) {
				return "--空--";
			}
			return gv.get("WAREHOUSE", data);
		}
	}, {
		colkey: "paperid",
		name: "单号"
	}, {
		colkey: "status",
		name: "单据状态",
		renderData: function (rowindex, data, rowdata, column) {
			return gf.getStatusDesc(rowindex, data, rowdata, column);
		}
	}, {
		colkey: "item",
		name: "SU"
	}, {
		colkey: "userdef3",
		name: "TU"
	}, {
		colkey: "detailstatus",
		name: "明细状态",
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
	jsonUrl: '/shipment/main/findWithDetail.shtml',
	checkbox: true,
	serNumber: true
}

export var init = function () {
	let _status = gf.urlParam("status");
	let _type = gf.urlParam("type");
	if (_type) {
		initPaperOp("shipment", _type);
		$("html").addClass("frame");
		params = Object.assign(params, {
			data: {
				"shipmentMainFormMap.status": _status,
				"shipmentMainFormMap.delflag": 0
			}
		});
	} else {
		$("#searchForm").show();
		initPaperOp("shipment", "DETAIL");
	}

	window.datagrid = dataGrid(params);
}

$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
});