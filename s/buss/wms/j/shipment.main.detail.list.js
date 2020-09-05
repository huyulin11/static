import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import "./shipment.main.detail.edit.seq.js";
import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { findTransferDetailObj } from "/s/buss/wms/j/transfer.main.fun.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

let _status = gf.urlParam("status");
let _detailstatus = gf.urlParam("detailstatus");
let _type = gf.urlParam("type");
let _pick = gf.urlParam("PICK");
let _warehouse = gf.urlParam("warehouse");

if (!["PRIORITY", "PICKED_COLD", "PICKED_NORMAL", "COMBINE", "COMBINED", "PICKING"].includes(_type)) {
	$("div.doc-buttons").append(`<span>选中查看日志</span><input type="checkbox" id="showTransLog" title="选中查看日志" ${localStorage.showTransLog ? "checked" : ""}>`);
}
$('div.doc-buttons').delegate("input:checkbox#showTransLog", "change", function (e) {
	if (this.checked) {
		localStorage.showTransLog = true;
	} else {
		localStorage.showTransLog = "";
	}
	location.reload();
});


let _columns = [{
	colkey: "id",
	name: "id",
	hide: true,
}, {
	colkey: "relationid",
	name: "relationid",
	hide: true,
}, {
	colkey: "warehouse",
	name: "仓库",
	renderData: function (rowindex, data, rowdata, column) {
		if (!data) return "--空--";
		return gv.get("WAREHOUSE", data);
	}
}, {
	colkey: "orderid",
	name: "订单号"
}, {
	colkey: "paperid",
	name: "单号",
	hide: true,
}, {
	colkey: "A",
	name: "TO",
}, {
	name: "物料号",
	colkey: "B",
}, {
	name: "批号",
	colkey: "D",
}, {
	colkey: "company",
	name: "单号"
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
	}
}, {
	colkey: "mainstatus",
	name: "单据状态",
	hide: function () { return !gf.isPc() },
	renderData: function (rowindex, data, rowdata, column) {
		return gv.get("ACS_STATUS", data) + gf.rowDisplay(rowdata);
	},
}, {
	colkey: "item",
	name: "SU"
}, {
	colkey: "userdef3",
	name: "货位号"
}, {
	colkey: "status",
	name: "明细状态",
	renderData: function (rowindex, data, rowdata, column) {
		return gv.get("ACS_STATUS", data) + gf.rowDisplay(rowdata);
	}
}, {
	colkey: "userdef4",
	name: "TU",
	renderData: function (rowindex, data, rowdata, column) {
		if (["COMBINING", "ON_PCS", "OVER_PCS", "OVER"].includes(rowdata.status))
			return data;
		return "";
	}
}];

if (localStorage.showTransLog) {
	_columns.push({
		colkey: "CRETATE.OPERATOR",
		jsonColumn: "operator",
		name: "下达人",
		defaultVal: '--'
	}, {
			colkey: "CRETATE.TIME",
			jsonColumn: "operator",
			name: "下达时间",
			defaultVal: '--'
		}, {
			colkey: "PICKING.OPERATOR",
			jsonColumn: "operator",
			name: "拣配人",
			defaultVal: '--'
		}, {
			colkey: "PICKING.TIME",
			jsonColumn: "operator",
			name: "拣配时间",
			defaultVal: '--'
		}, {
			colkey: "COMBINING.OPERATOR",
			jsonColumn: "operator",
			name: "组盘人",
			defaultVal: '--'
		}, {
			colkey: "COMBINING.TIME",
			jsonColumn: "operator",
			name: "组盘时间",
			defaultVal: '--'
		}, {
			colkey: "ON_PCS.TIME",
			jsonColumn: "operator",
			name: "上PCS时间",
			defaultVal: '--'
		}, {
			colkey: "OVER_PCS.TIME",
			jsonColumn: "operator",
			name: "出PCS时间",
			defaultVal: '--'
		}, {
			colkey: "OVER.TIME",
			jsonColumn: "operator",
			name: "到达产线时间",
			defaultVal: '--'
		});
}

if (["PRIORITY", "PICKED_COLD", "PICKED_NORMAL", "COMBINE", "PRODUCT"].includes(_type)) {
	_columns = [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "relationid",
		name: "relationid",
		hide: true,
	}, {
		colkey: "company",
		name: "货位号",
		renderData: function (rowindex, data, rowdata, column) {
			return `${rowdata.userdef3}`;
		}
	}, {
		name: "TO",
		colkey: "A",
	}, {
		name: "转移量",
		colkey: "I",
	}, {
		name: "单位",
		colkey: "F",
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
				case "BJJK_HUIRUI": return data + gf.rowDisplay(rowdata);
				default: return "name";
			}
		}
	}, {
		colkey: "item",
		name: "SU"
	}];
}

if (["PICKED_COLD", "PRODUCT"].includes(_type)) {
	_columns.push({
		colkey: "status",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("ACS_STATUS", data) + gf.rowDisplay(rowdata);
		}
	});
}

if (["PRIORITY", "PRODUCT"].includes(_type)) {
	_columns.push({
		colkey: "C",
		name: "物料名称",
		hide: !gf.isPc(),
	}, {
			colkey: "userdef4",
			name: "TU",
			hide: !gf.isPc(),
			renderData: function (rowindex, data, rowdata, column) {
				if (["COMBINING", "ON_PCS", "OVER_PCS", "OVER"].includes(rowdata.status))
					return data;
				return "";
			}
		});
}

_columns.push({
	colkey: "sequence",
	name: "优先级",
});

if (sessionStorage.editSeq && ["PRIORITY"].includes(_type)) {
	_columns.push({
		colkey: "userdef1",
		name: "顺序设置",
		renderData: function (rowindex, data, rowdata, column) {
			let col = {
				name: "顺序", key: "seq", notnull: true, type: "input", id: rowdata.id,
			};
			data = data || "0";
			let html = getInput(col, { value: data, width: '50%', class: "editSeqDiv", }, rowdata);
			return html;
		}
	});
	$("#paging").delegate(".editSeqDiv", "blur", function (e) {
		let that = this;
		var json = {
			"sequence": 1
		};
		let target = $(that).val();
		json.company = $(that).data("company");
		json.item = $(that).data("item");
		json.userdef4 = $(that).data("userdef4");
		if ($(that).data("userdef1") == target) {
			return;
		}
		if (!target || isNaN(target) || target < 0 || target >= 100) {
			gf.layerMsg("提交内容应为大于0小于100的数值！");
			return;
		}
		json.detailSeq = target;
		json.type = "BY_SU";
		gf.ajax(`/shipment/util/editSeq.shtml`, json, "json", function (data) {
			layer.msg(data.msg ? data.msg : "保存成功！");
			$(that).data("userdef1", target);
		});
	});
} else {
	_columns.push({
		colkey: "userdef1",
		name: "顺序",
		defaultVal: 0
	});
}

if (!["PRIORITY", "PICKED_COLD", "PICKED_NORMAL", "COMBINE", "PRODUCT"].includes(_type))
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
	id: "relationid",
	columns: _columns,
	jsonUrl: '/shipment/util/findWithDetail.shtml',
	checkbox: true,
	searchInInit: false,
	serNumber: true,
	callback: function () {
		let keys = $(".relationid").map(function () { return $(this).html() }).get().join(":");
		findTransferDetailObj(keys, function (info) {
			info.some(function (item) {
				let json = JSON.parse(item.value);
				for (let col in json) {
					$(`tr[data-key='${item.key}']`).find(`td.${col}`).html(json[col]);
				}
			});
		});
	}
}

var initSearch = function () {
	let searchHtml = '<a class="btn btn-default" id="search">查询</a>';
	let exportHtml = '<a class="btn btn-default" id="export">导出</a>';
	if (["PRIORITY", "PRODUCT"].includes(_type)) {
		$("#searchForm").find("div.search-group").html(
			`<label>
                <span>产线:</span>
                <input id="product" name="product" value='${localStorage.currentSearchProduct ? localStorage.currentSearchProduct : ""}'>
            </label>`
		);
		$("#searchForm").find("div.search-group").append(searchHtml);
	} else {
		$("#searchForm").find("div.search-group").append(searchHtml).append(exportHtml);
	}
	$("#searchForm").show();
}

var initParams = function (tempParams) {
	if (!tempParams) tempParams = {};
	if (_status) {
		tempParams["shipmentMainFormMap.status"] = _status;
	}
	if (_type) {
		tempParams["shipmentMainFormMap.type"] = _type;
	}
	if (_detailstatus) {
		tempParams["shipmentMainFormMap.detailstatus"] = _detailstatus;
	}
	if (_warehouse) {
		tempParams["shipmentMainFormMap.warehouse"] = _warehouse;
	} else if (_pick) {
		tempParams["shipmentMainFormMap.PICK"] = _pick;
	}
}

export var init = function () {
	initParams(params.data);
	if (_type) {
		initPaperOp("shipment", _type);
		$("html").addClass("frame");
		if (["PRIORITY", "PRODUCT"].includes(_type)) {
			initSearch();
		}
	} else {
		if (!_pick) {
			initSearch();
		}
		initPaperOp("shipment", "DETAIL");
	}

	window.datagrid = dataGrid(params);
	renderAll();
	doSearch();
}

let doSearch = function () {
	var searchParams = $("#searchForm").serializeObject();
	initParams(searchParams);
	if (["PRIORITY", "PRODUCT"].includes(_type)) {
		let product = $("#product").val();
		if (!product) {
			// gf.layerMsg("需指定查询数据的产线名称！");
			// return;
		}
		// localStorage.currentSearchProduct = product;
	}

	window.datagrid.setOptions({
		data: searchParams
	});
}
$("#searchForm").delegate("#search", "click", function () {
	doSearch();
});

$("#searchForm").on("submit", function () {
	doSearch();
	return false;
});

$("#searchForm").delegate("#export", "click", function () {
	window.location.href = '/shipment/util/download.shtml' + '?' + $("#searchForm").serialize();
});

$("html").delegate(".stockout", "click", function () {
	let company = $(this).data("company"), item = $(this).data("item");
	window.location.href = `/s/buss/wms/rf/h/rf.picking.html?warehouse=2&company=${company}&item=${item}`;
});