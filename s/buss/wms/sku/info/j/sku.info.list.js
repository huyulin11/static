import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "SKU编号",
		hide: false,
	}, {
		colkey: "name",
		name: "SKU名称",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editSkuName'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}, {
		colkey: "type",
		name: "SKU类型",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editSkuType'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}],
	jsonUrl: '/sku/info/findByPage.shtml',
	checkbox: true,
	serNumber: true
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
		gf.layerMsg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: ["600px", "80%"],
		content: '/s/buss/wms/sku/info/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/s/buss/wms/sku/info/h/skuInfoAddUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		gf.layerMsg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/sku/info/deleteEntity.shtml';
		gf.ajax(url, {
			ids: cbox.join(":")
		}, "json");
	});
}