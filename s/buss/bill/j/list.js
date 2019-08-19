$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
			colkey: "id",
			name: "id",
			hide: true,
		}, {
			colkey: "occurdate",
			name: "发生日期"
		}, {
			colkey: "species",
			name: "类别"
		}, {
			colkey: "amount",
			name: "金额",
		}, {
			colkey: "createtime",
			name: "记录时间",
			renderData: function (rowindex, data, rowdata, column) {
				return new Date(data).format("yyyy-MM-dd hh:mm:ss");
			}
		}, {
			colkey: "remarks",
			name: "说明",
		}],
		jsonUrl: '/bill/findByPage.shtml',
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
		content: '/s/buss/bill/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/bill/h/addDairyBillUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/bill/deleteEntity.shtml';
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