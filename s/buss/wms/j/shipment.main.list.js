import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";

let params = {
	pagId: 'paging',
	l_column: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "paperid",
		name: "单号"
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
			var btns = "";
			if (data == 3) {
				$(`tr[d-tree='${rowdata.dtee}]`).css("color", "red");
			}
			if (rowdata.delflag == 1) {
				$(`tr[d-tree='${rowdata.dtee}']`).css("color", "#dedede");
				btns = "-已删除";
			}
			btns = gv.get("ACS_STATUS", data) + btns;
			return btns;
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
	let choosedStatus = gf.urlParam("status");
	if (choosedStatus) {
		$("html").addClass("frame");
		$("#searchForm").hide();
		$(".doc-buttons").hide();
		params = Object.assign(params, {
			data: {
				"shipmentMainFormMap.status": choosedStatus,
				"shipmentMainFormMap.delflag": 0
			}
		});
		params.l_column = params.l_column.concat({
			colkey: "updatetime",
			name: "操作",
			renderData: function (rowindex, data, rowdata, column) {
				if (rowdata.delflag == "1") {
					return "";
				}
				var btns = "";
				btns += `<button type='button' class='btn btn-info marR10 mgr' 
							data-dictype='${ rowdata.dictype}'>接单</button>`;
				return btns;
			}
		});
	}

	window.datagrid = dataGrid(params);
}

$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
});

initPaperOp("shipment");