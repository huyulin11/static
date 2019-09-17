import { gf } from "/s/buss/g/j/g.f.js";

window.datagrid = dataGrid({
	id: 'paging',
	l_column: [{
		colkey: "innerno",
		name: "内部流转号"
	}, {
		colkey: "reservno",
		name: "预约单号"
	}, {
		colkey: "usercode",
		name: "客户编号"
	}, {
		colkey: "deposittime",
		name: "受理时间",
		renderData: function (rowindex, data, rowdata, column) {
			if (data == "") { return ""; }
			return new Date(data).format("yyyy-MM-dd hh:mm:ss");
		}
	}, {
		colkey: "name",
		name: "用户姓名"
	}, {
		colkey: "amount",
		name: "数量"
	}, {
		colkey: "ownid",
		name: "角色编号",
	}],
	jsonUrl: '/deposit/mgr/findByPage.shtml',
	checkbox: true
});
$("#search").click("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serialize();// 初始化传参数
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#editRole").click("click", function () {
	editRole();
});
$("#delRole").click("click", function () {
	delRole();
});
$("#permissions").click("click", function () {
	permissions();
});
});
function editRole() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	pageii = layer.open({
		title: "编辑",
		type: 2,
		area: ["600px", "60%"],
		content: '/deposit/editUI.shtml?id=' + cbox
	});
}
function permissions() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("请选择一个对象！");
		return;
	}
	var url = '/resources/permissions.shtml?roleId=' + cbox;
	window.pageii = layer.open({
		title: "分配权限",
		type: 2,
		area: ["700px", "60%"],
		content: url
	});
}
function addRole() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: ["600px", "60%"],
		content: '/deposit/addUI.shtml'
	});
}
function delRole() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/deposit/deleteEntity.shtml';
		var s = gf.ajax(url, {
			ids: cbox.join(",")
		}, "json");
		if (s.code >= 0) {
			layer.msg('删除成功');
			window.datagrid.loadData();
		} else {
			layer.msg('删除失败' + s.msg);
		}
	});
}
