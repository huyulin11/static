var paperid = url.param("inventoryMainFormMap.paperid");
$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
			colkey: "id",
			name: "id",
			hide: true,
		}, {
			colkey: "paperid",
			name: "盘点单号"
		}, {
			colkey: "userdef1",
			name: "货位"
		}, {
			colkey: "sequence",
			name: "次序",
		}, {
			colkey: "updatetime",
			name: "更新时间",
			renderData: function (rowindex, data, rowdata, column) {
				return new Date(data).format("yyyy-MM-dd hh:mm:ss");
			}
		}, {
			colkey: "createtime",
			name: "创建时间",
			renderData: function (rowindex, data, rowdata, column) {
				return new Date(data).format("yyyy-MM-dd hh:mm:ss");
			}
		}],
		jsonUrl: '/inventory/detail/findByPage.shtml?inventoryDetailFormMap.paperid=' + paperid,
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
		content: '/s/buss/inventory/detail/editUI.html?id=' + cbox
	});
}
function addTask() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/inventory/detail/h/addDairyTaskUI.html'
	});
}
function delTask() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/inventory/detail/deleteEntity.shtml';
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