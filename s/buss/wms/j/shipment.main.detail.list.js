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
	name: "转移单号"
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
}, {
	colkey: "sequence",
	name: "执行优先级",
}];

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
				case "BJJK_HUIRUI": return "目的地";
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
	}, {
		colkey: "status",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("ACS_STATUS", data) + gf.rowDisplay(rowdata);
		}
	},];
}

if (["PRIORITY", "PRODUCT"].includes(_type)) {
	_columns.push({
		colkey: "userdef4",
		name: "TU",
		renderData: function (rowindex, data, rowdata, column) {
			if (["COMBINING", "ON_PCS", "OVER_PCS", "OVER"].includes(rowdata.status))
				return data;
			return "";
		}
	});
	_columns.push({
		colkey: "sequence",
		name: "执行优先级",
	});
	_columns.push({
		colkey: "userdef1",
		name: "顺序",
		defaultVal: 0
	});
}

if (["UDF"].includes(_type)) {
	_columns.push({
		colkey: "userdef1",
		name: "顺序",
		renderData: function (rowindex, data, rowdata, column) {
			let col = {
				name: "顺序", key: "userdef1", notnull: true, type: "input",
			};
			let json = { id: rowdata.id };
			let btnStr = `<button type="button" class="edit btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
			let html = getInput(col, { value: data, width: '50%' });
			return html[0].outerHTML + btnStr;
		}
	});

	$("#paging").delegate(".edit", "click", function (e) {
		let id = $(this).data("id");
		let target = $(this).parent("td").find("input").val();
		if (!target || isNaN(target) || target < 0 || target >= 100) {
			gf.layerMsg("提交内容应为大于0小于100的数值！");
			return;
		}
		if (window.confirm(`是否要将该数据的顺序值改为${target}？`)) {
			gf.doAjax({
				url: `/shipment/main/editSeqDetail.shtml`,
				data: { id: id, sequence: target }
			});
		}
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
	jsonUrl: '/shipment/main/findWithDetail.shtml',
	checkbox: true,
	searchInInit: !["PRIORITY", "PRODUCT"].includes(_type),
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
                <span>产线名称:</span>
                <input id="product" name="product" value='${localStorage.currentSearchProduct ? localStorage.currentSearchProduct : ""}'>
            </label>`
		);
		$("#searchForm").find("div.search-group").append(searchHtml);
	} else {
		$("#searchForm").find("div.search-group").append(searchHtml).append(exportHtml);
	}
	$("#searchForm").show();
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
	}
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
	if (["PRIORITY", "PRODUCT"].includes(_type)) {
		if (localStorage.currentSearchProduct) doSearch();
	}
}

let doSearch = function () {
	var searchParams = $("#searchForm").serialize();

	if (["PRIORITY", "PRODUCT"].includes(_type)) {
		let product = $("#product").val();
		if (!product) {
			gf.layerMsg("需指定查询数据的产线名称！");
			return;
		}
		localStorage.currentSearchProduct = product;
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
	window.location.href = '/shipment/main/download.shtml' + '?' + $("#searchForm").serialize();
});

$("html").delegate(".stockout", "click", function () {
	let company = $(this).data("company"), item = $(this).data("item");
	window.location.href = `/s/buss/wms/rf/h/rf.picking.html?warehouse=2&company=${company}&item=${item}`;
});