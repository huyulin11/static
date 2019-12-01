import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	id: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true
	}, {
		colkey: "name",
		name: "菜单名称",
		align: 'left'
	}, {
		colkey: "type",
		name: "菜单类型",
		width: "70px",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("MENU_TYPE", data);
		}
	}, {
		colkey: "resKey",
		name: "唯一KEY"
	}, {
		colkey: "resUrl",
		name: "URL地址"
	}, {
		colkey: "ishide",
		name: "是否隐藏",
		renderData: function (rowindex, data, rowdata, column) {
			if (data == "0") {
				return "否";
			} else if (data == "1") {
				return "是";
			}
		}
	}, {
		colkey: "description",
		width: "100px",
		name: "备注"
	}],
	jsonUrl: '/resources/treelists.shtml',
	checkbox: true,
	usePage: false,
	records: "treelists",
	treeGrid: {
		type: 1,
		tree: true,
		name: 'name',
		id: "id",
		pid: "parentId"
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

$("#addFun").click("click", function () {
	addFun();
});
$("#editFun").click("click", function () {
	editFun();
});
$("#delFun").click("click", function () {
	delFun();
});
$("#dataGridUp").click("click", function () {// 上移
	var jsonUrl = '/background/resources/sortUpdate.shtml';
	window.datagrid.dataGridUp(jsonUrl);
});
$("#dataGridDown").click("click", function () {// 下移
	var jsonUrl = '/background/resources/sortUpdate.shtml';
	window.datagrid.dataGridDown(jsonUrl);
});

function editFun() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/resources/editUI.shtml?id=' + cbox
	});
}
function addFun() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/resources/addUI.shtml'
	});
}
function delFun() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/resources/deleteEntity.shtml';
		gf.ajax(url, {
			ids: cbox.join(":")
		}, "json");
	});
}
