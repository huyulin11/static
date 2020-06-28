import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";
import { findAllocObj } from "/s/buss/wms/j/receipt.main.fun.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";

let cols = [{
	colkey: "id",
	name: "id",
	hide: true,
}, {
	colkey: "paperid",
	name: "单号"
}, {
	colkey: "item",
	name: "货物类型",
	renderData: function (rowindex, data, rowdata, column) {
		return sku.value(data);
	}
}, {
	colkey: "itemcount",
	name: "货物数"
}, {
	colkey: "status",
	name: "状态",
	renderData: function (rowindex, data, rowdata, column) {
		return gv.get("ACS_STATUS", data);
	}
}, {
	name: "操作",
	renderData: function (rowindex, data, rowdata, column) {
		if (rowdata.delflag == "1") {
			return "";
		}
		var btns = "";
		btns += `<button type='button' class='btn btn-info marR10 exe' 
		data-id='${rowdata.id}'>处理</button>`;
		return btns;
	}
}];

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: cols,
	jsonUrl: `/receipt/util/findWithDetail.shtml?mainstatus=TOSEND&detailstatus=NEW:TOSEND:EXECUTING`,
	checkbox: true,
	serNumber: true,
	simple: true,
	// refreshTime: 5000,
	callback: function () {
		let keys = $(".targetAlloc").map(function () { return $(this).parents("tr").find(".paperid").html() }).get().join(":");
		findAllocObj(keys, function (info) {
			$(".targetAlloc").each(function () {
				let that = this;
				info.some(function (item) {
					if (item.key == $(that).parents("tr").find(".paperid").html()) {
						$(that).html(item.value);
						return true;
					}
				});
			});
		});
	}
});

let doSearch = function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
}

$("#search").on("click", function () {
	doSearch();
});

$("#searchForm").on("submit", function () {
	doSearch();
	return false;
});

$("#paging").delegate("button.exe", "click", function () {
	let id = $(this).data("id");
	window.location.href = `/s/buss/wms/h/receiptDetailExe.html?detailid=${id}`;
	// window.pageii = layer.open({
	// 	title: '入库任务执行',
	// 	type: 2,
	// 	area: ['50%', '90%'],
	// 	// skin: 'layui-layer-rim',
	// 	content: `/s/buss/wms/h/receiptDetailExe.html?detailid=${id}`,
	// });

	// if (window.confirm("确定执行该任务？")) {
	// 	gf.doAjax({
	// 		url: `/receipt/util/addReceiptTask.shtml`,
	// 		data: { detailid: id },
	// 		success: function (data) {
	// 			alert(data);
	// 		}
	// 	});
	// }
});

initPaperOp("receipt");