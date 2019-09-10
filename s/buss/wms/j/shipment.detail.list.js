import { urlSearcher } from "/s/j/tool/urlSearcher.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

var paperid = urlSearcher.param("shipmentMainFormMap.paperid");
window.datagrid = dataGrid({
	pagId: 'paging',
	l_column: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "paperid",
		name: "单号"
	}, {
		colkey: "userdef1",
		name: "货位"
	}, {
		colkey: "sequence",
		name: "次序",
	}, {
		colkey: "updatetime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
				+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: '/shipment/detail/findByPage.shtml?shipmentDetailFormMap.paperid=' + paperid,
	checkbox: true,
	serNumber: true
});
$("#search").on("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serialize();// 初始化传参数
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#addTask").click("click", function () {
	addTask();
});
$("#editTask").click("click", function () {
	editTask();
});
$("#delTask").click("click", function () {
	delTask();
});
$("#permissions").click("click", function () {
	permissions();
});

function editTask() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: ["600px", "80%"],
		content: '/s/buss/editUI.html?id=' + cbox
	});
}
function addTask() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: gv.globalLayerArea,
		content: '/s/buss/h/addDairyTaskUI.html'
	});
}
function delTask() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/shipment/detail/deleteEntity.shtml';
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