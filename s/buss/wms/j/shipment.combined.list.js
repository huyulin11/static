import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";

let params = {
	pagId: 'paging',
	columns: [{
		colkey: "key",
		name: "托盘号",
	}, {
		colkey: "value",
		name: "目的地",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) return "--空--";
			data = JSON.parse(data);
			return data.name;
		}
	}, {
		colkey: "value",
		name: "订单号",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) return "--空--";
			data = JSON.parse(data);
			return data.company ? data.company : "";
		}
	}, {
		colkey: "value",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			let delflag = "";
			if (rowdata.delflag == 2) {
				delflag = "-已提请撤销";
				$(`tr[d-tree='${rowdata.dtee}']`).css("color", "red");
			}
			if (!data) return "--空--";
			data = JSON.parse(data);
			let status = data.status;
			if (status) {
				return gv.get("ACS_STATUS", status) + delflag;
			}
			return "--空--";
		}
	}, {
		colkey: "value",
		name: "货物",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) return "--空--";
			data = JSON.parse(data);
			let items = data.items;
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
	url: `/shipment/main/startTransfer.shtml`,
	id: "startTransfer", name: "开始运输", class: "btn-primary",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		gf.ajax(this.url, { tu: cbox }, "json");
	},
}, {
	url: `/shipment/main/overTransfer.shtml`,
	id: "overTransfer", name: "结束运输", class: "btn-primary",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		gf.ajax(this.url, { tu: cbox }, "json");
	},
}, {
	url: `/app/conf/deleteBySure.shtml`,
	id: "deleteSure", name: "确认撤销", class: "btn-danger",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		gf.ajax(this.url, { key: cbox, TABLE_KEY: "COMBINED_TU_INFO" }, "json");
	},
}];
gf.bindBtns("div.doc-buttons", tempBtns);