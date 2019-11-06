import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import "./shipment.main.detail.edit.seq.js";
import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
let _status = gf.urlParam("status");
let _detailstatus = gf.urlParam("detailstatus");
let _type = gf.urlParam("type");
let _pick = gf.urlParam("PICK");
let _warehouse = gf.urlParam("warehouse");

let _columns = [{
	colkey: "id",
	name: "id",
	hide: true,
}, {
	colkey: "warehouse",
	name: "仓库",
	renderData: function (rowindex, data, rowdata, column) {
		if (!data) return "--空--";
		return gv.get("WAREHOUSE", data);
	}
}, {
	colkey: "paperid",
	name: "单号"
}, {
	colkey: "company",
	name: "TO"
}, {
	colkey: "name",
	name: function (rowindex, data, rowdata, column) {
		switch (localStorage.projectKey) {
			case "CSY_DAJ": return "出入口";
			case "BJJK_HUIRUI": return "目的地";
			default: return "name";
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
	name: "货位号"
}, {
	colkey: "detailstatus",
	name: "明细状态",
	renderData: function (rowindex, data, rowdata, column) {
		return gf.getStatusDesc(rowindex, data, rowdata, column);
	}
}, {
	colkey: "userdef4",
	name: "TU",
	renderData: function (rowindex, data, rowdata, column) {
		if (rowdata.detailstatus == "COMBINED" || rowdata.detailstatus == "START_TRANS" || rowdata.detailstatus == "4")
			return data;
		return "";
	}
}, {
	colkey: "sequence",
	name: "执行优先级",
	renderData: function (rowindex, data, rowdata, column) {
		if (data >= 3) {
			$(`tr[d-tree='${rowdata.dtee}']`).css("color", "orange");
		} else if (data >= 2) {
			$(`tr[d-tree='${rowdata.dtee}']`).css("color", "blue");
		}
		if (rowdata.delflag != "1" && (rowdata.detailstatus != "4")) {
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;"
				+ "<a class='editSeq'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
		return data;
	}
}];

if (["PICKED_COLD", "PICKED_NORMAL", "COMBINE"].includes(_type)) {
	_columns = [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "company",
		name: "任务信息",
		renderData: function (rowindex, data, rowdata, column) {
			return `状态：${gf.getStatusDesc(rowindex, rowdata.detailstatus, rowdata, column)}<br/>
			TO：${rowdata.company}<br/>
			出库单：${rowdata.paperid}<br/>
			仓库：${gv.get("WAREHOUSE", rowdata.warehouse)}<br/>
			货位号：${rowdata.userdef3}`;
		}
	}, {
		colkey: "name",
		name: function (rowindex, data, rowdata, column) {
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return "出入口";
				case "BJJK_HUIRUI": return "目的地";
				default: return "name";
			}
		},
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.sequence >= 3) {
				$(`tr[d-tree='${rowdata.dtee}']`).css("color", "orange");
			} else if (rowdata.sequence >= 2) {
				$(`tr[d-tree='${rowdata.dtee}']`).css("color", "blue");
			}
			switch (localStorage.projectKey) {
				case "CSY_DAJ": return gv.get("ACS_CACHE_CABLE", data);
				case "BJJK_HUIRUI": return data;
				default: return "name";
			}
		}
	}, {
		colkey: "item",
		name: "SU"
		// }, {
		// 	colkey: "item",
		// 	name: "出库",
		// 	renderData: function (rowindex, data, rowdata, column) {
		// 		return `<button type="button" class="stockout btn marR10 btn-info" data-company='${rowdata.company}' 
		// 	data-item='${rowdata.item}'>登记出库</button>`;
		// 	}
	}];
}

if (!["PRIORITY", "PICKED_COLD", "PICKED_NORMAL", "COMBINE"].find((a) => { return a == _type; }))
	_columns.push({
		colkey: "updatetime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
				+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
		}
	});


let params = {
	pagId: 'paging',
	columns: _columns,
	jsonUrl: '/shipment/main/findWithDetail.shtml',
	checkbox: true,
	serNumber: true
}

export var init = function () {
	if (!params.data) params.data = {};
	if (_status) {
		params.data["shipmentMainFormMap.status"] = _status;
	}
	if (_type) {
		params.data["shipmentMainFormMap.type"] = _type;
	}
	if (_detailstatus) {
		params.data["shipmentMainFormMap.detailstatus"] = _detailstatus;
	}
	if (_warehouse) {
		params.data["shipmentMainFormMap.warehouse"] = _warehouse;
	} else if (_pick) {
		params.data["shipmentMainFormMap.PICK"] = _pick;
		params.data["setting"] = localStorage.PICKED_SETTING;
		params.data["settingType"] = localStorage.PICKED_TYPE;
	}
	if (_type) {
		initPaperOp("shipment", _type);
		$("html").addClass("frame");
	} else {
		if (!_pick) {
			$("#searchForm").show();
		}
		initPaperOp("shipment", "DETAIL");
	}

	window.datagrid = dataGrid(params);
	renderAll();
}

$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
});

$("#export").on("click", function () {
	window.location.href = '/shipment/main/download.shtml' + '?' + $("#searchForm").serialize();
});

$("html").delegate(".stockout", "click", function () {
	let company = $(this).data("company"), item = $(this).data("item");
	window.location.href = `/s/buss/wms/rf/h/rf.picking.html?warehouse=2&company=${company}&item=${item}`;
});