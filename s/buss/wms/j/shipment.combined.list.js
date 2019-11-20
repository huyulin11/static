import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";

let params = {
	pagId: 'paging',
	jsonColumn: 'value',
	columns: [{
		colkey: "key",
		name: "托盘号",
	}, {
		colkey: "name",
		name: "目的地",
	}, {
		colkey: "company",
		name: "订单号",
		hide: true,
	}, {
		colkey: "value",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column, json) {
			let status = json.status;
			if (status) {
				return gv.get("ACS_STATUS", status) + gf.rowDisplay(rowdata);
			}
			return "--空--";
		}
	}, {
		colkey: "value",
		name: "货物",
		renderData: function (rowindex, data, rowdata, column, json) {
			let items = json.items;
			if (items) {
				let itemArr = [];
				for (let item of items) {
					itemArr.push(item.su);
				}
				return itemArr.join(',');
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
		data: { "TABLE_KEY": "COMBINED_TU_INFO" }
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
	url: `/shipment/main/startPcs.shtml`,
	id: "startPcs", name: "上PCS", class: "btn-primary",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		gf.ajax(this.url, { tu: cbox }, "json");
	},
}, {
	url: `/shipment/main/overPcs.shtml`,
	id: "overPcs", name: "出PCS", class: "btn-primary",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		gf.ajax(this.url, { tu: cbox }, "json");
	},
}, {
	url: `/shipment/main/overAll.shtml`,
	id: "overAll", name: "结束运输", class: "btn-primary",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		gf.ajax(this.url, { tu: cbox }, "json");
	},
}, {
	url: `/app/conf/bjjkhuirui/deleteBySure.shtml`,
	id: "deleteSure", name: "确认撤销", class: "btn-danger",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		gf.ajax(this.url, { key: cbox, TABLE_KEY: "COMBINED_TU_INFO" }, "json");
	},
}];
gf.bindBtns("div.doc-buttons", tempBtns);