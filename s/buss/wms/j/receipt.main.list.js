import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { findAlloc } from "/s/buss/wms/j/receipt.main.fun.js";

let _receipttype = gf.urlParam("receipttype");

let cols = [{
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
		if (!data) return "--空--";
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
	hide: function () {
		switch (localStorage.projectKey) {
			case "CSY_DAJ": return false;
			case "BJJK_HUIRUI": return true;
			default: return true;
		}
	},
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
}];

if (localStorage.projectKey == "BJJK_HUIRUI") {
	cols = cols.concat({
		colkey: "targetAlloc",
		name: "目标货位",
		renderData: function (rowindex, data, rowdata, column) {
			return `<span class='targetAlloc' data-paperid='${rowdata.paperid}'></span>`;
		}
	});
}

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: cols,
	jsonUrl: `/receipt/main/find.shtml?receipttype=${_receipttype}`,
	checkbox: true,
	serNumber: true,
	callback: function () {
		$(".targetAlloc").each(function () {
			let that = this;
			findAlloc($(that).data("paperid"), function (info) {
				$(that).html(info);
			});
		});
	}
});
$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
});

initPaperOp("receipt");