import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	l_column: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "skuId",
		name: "SKU编号",
	}, {
		colkey: "lapName",
		name: "取货地点",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editLapName'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}, {
		colkey: "inUesd",
		name: "是否在用",
		hide: true,
	}, {
		colkey: "environment",
		name: "环境",
		hide: true,
	}, {
		colkey: "name",
		name: "SKU名称",
	}, {
		colkey: "delflag",
		name: "是否删除",
		renderData: function (rowindex, data, rowdata, column) {
			if (data == "1") {
				$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
				return "已删除";
			} else {
				return "正常使用";
			}
		}
	}],
	jsonUrl: '/agv/lap/findByPage.shtml',
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
$("#del").click("click", function () {
	del();
});
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/s/buss/agv/lap/h/agvlapAddUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/agv/lap/deleteEntity.shtml';
		var s = gf.ajax(url, {
			ids: cbox.join(",")
		}, "json");
		if (s == "success") {
			layer.msg('删除成功');
			window.datagrid.loadData();
		} else {
			layer.msg('删除失败');
		}
	});
}