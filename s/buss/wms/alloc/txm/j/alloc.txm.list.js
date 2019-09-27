import { gf } from "/s/buss/g/j/g.f.js";
import { sku } from "/s/buss/wms/sku/wms.sku.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	l_column: [{
		colkey: "txm",
		name: "条码",
		hide: false,
	}, {
		colkey: "alloc",
		name: "货位",
		hide: false,
	}, {
		colkey: "place",
		name: "位置",
		hide: false,
	}, {
		colkey: "name",
		name: "货物名称",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dedede");
				return data + "-已删除";
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editAllocName'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}, {
		colkey: "skuid",
		name: "SKU（货物类型）",
		renderData: function (rowindex, data, rowdata, column) {
			let val = sku.value(data);
			if (!val) return "无对应值" + data;
			return val;
		}
	}, {
		colkey: "num",
		name: "数量",
		hide: false,
	}],
	jsonUrl: '/alloc/txm/findByPage.shtml',
	checkbox: true,
	serNumber: true
});
$("#search").on("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serialize();// 初始化传参数
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#add").click("click", function () {
	add();
});
$("#edit").click("click", function () {
	edit();
});

$("#del").click("click", function () {
	del();
});
$("#permissions").click("click", function () {
	permissions();
});

function edit() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: ["600px", "80%"],
		content: '/s/buss/wms/alloc/txm/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/s/buss/wms/alloc/txm/h/allocTxmAddUI.html'
	});
}
function del() {
	var cbox = gf.checkNotNull({ dataType: 'json' });
	if (!cbox) {
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/alloc/txm/deleteEntity.shtml';
		var s = gf.ajax(url, {
			data: JSON.stringify(cbox),
			datatype: 'json'
		}, "json");
		if (s.code >= 0) {
			layer.msg('删除成功');
			window.datagrid.loadData();
		} else {
			layer.msg('删除失败' + s.msg);
		}
	});
}