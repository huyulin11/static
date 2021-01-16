import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";
import { initConfList } from "/s/buss/g/j/template.conf.table.js";

export let init = function () {
	initConfList("CRM_TESTS", {
		checkbox: false,
		jsonColumn: 'value',
		columns: [{
			colkey: "key",
			name: "项目ID"
		}, {
			colkey: "项目名",
			name: "项目名"
		}, {
			colkey: "客户名",
			name: "客户名"
		}, {
			colkey: "位置",
			name: "位置"
		}, {
			colkey: "状态",
			name: "状态"
		}, {
			colkey: "授权状态",
			name: "授权状态",
			renderData: function (rowindex, data, rowdata, column) {
				return Math.random() > 0.5 ? "已打开" : "已关闭";
			}
		}, {
			colkey: "备注",
			name: "备注"
		}, {
			colkey: "责任人",
			name: "责任人",
			renderData: function (rowindex, data, rowdata, column) {
				return "管理员";
			}
		}],
		fenyeInTail: true,
	});
}

let tempBtns = [{
	id: "add", name: "新增", class: "btn-primary",
	bind: function () {
		window.datagrid.loadData();
	}
}, {
	id: "close", name: "关闭授权", class: "btn-danger",
	bind: function () {
		window.datagrid.loadData();
	}
}, {
	id: "open", name: "打开授权", class: "btn-danger",
	bind: function () {
		window.datagrid.loadData();
	}
}];

gfbtn.bindByRes("div.doc-buttons", tempBtns);