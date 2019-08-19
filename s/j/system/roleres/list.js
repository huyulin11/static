$(function () {
	window.datagrid = lyGrid({
		id: 'paging',
		l_column: [{
			colkey: "resId",
			name: "资源编号",
			renderData: function (rowindex, data, rowdata, column) {
				return gv.getRes(data);
			}
		}, {
			colkey: "roleId",
			name: "角色编号",
			renderData: function (rowindex, data, rowdata, column) {
				return gv.getRole(data);
			}
		}],
		jsonUrl: '/roleres/findByPage.shtml',
		checkbox: true
	});
	$("#search").click("click", function () {// 绑定查询按扭
		var searchParams = serializeObject($("#searchForm"));// 初始化传参数
		window.datagrid.setOptions({
			data: searchParams
		});
	});
	$("#addRole").click("click", function () {
		addRole();
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
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: globalLayerArea,
		content: '/roleres/editUI.shtml?id=' + cbox
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
		area: globalLayerArea,
		content: url
	});
}
function addRole() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: globalLayerArea,
		content: '/roleres/addUI.shtml'
	});
}
function delRole() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/roleres/deleteEntity.shtml';
		var s = CommnUtil.ajax(url, {
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