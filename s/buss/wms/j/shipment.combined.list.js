import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { initPaperOp } from "/s/buss/wms/j/base/wms.paper.op.js";

let params = {
	pagId: 'paging',
	columns: [{
		colkey: "key",
		name: "托盘号",
	}, {
		colkey: "value",
		name: "货物",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) {
				return "--空--";
			}
			data = JSON.parse(data);
			let items = data.items;
			if (items) {
				return items;
			}
			return "--空--";
		}
	}],
	jsonUrl: '/app/conf/findByPage.shtml',
	checkbox: true,
	serNumber: true
}

export var init = function () {
	params = Object.assign(params, {
		data: {
			"TABLE_KEY": "COMBINED_TU_INFO"
		}
	});

	window.datagrid = dataGrid(params);
}

$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
});
let tempBtns = [{
	url: `/app/conf/send.shtml`,
	id: "add", name: "下达任务", class: "btn-primary",
	bind: function () {
		layer.msg("待完善");
	},
}];
gf.bindBtns("div.doc-buttons", tempBtns);