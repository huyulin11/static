$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
			colkey: "id",
			name: "id",
			hide: true,
		}, {
			colkey: "siteid",
			name: "前一站点"
		}, {
			colkey: "side",
			name: "方向",
			renderData: function (rowindex, data, rowdata, column) {
				if (data == "1") {
					return "左转";
				}
				return "右转";
			}
		}, {
			colkey: "nextid",
			name: "后一站点"
		}, {
			colkey: "delflag",
			name: "数据状态",
			renderData: function (rowindex, data, rowdata, column) {
				if (rowdata.delflag == "1") {
					$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
					return "已删除";
				}
				return "正常使用";
			}
		}],
		jsonUrl: '/tasksitelogic/findByPage.shtml',
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
		content: '/s/buss/site/logic/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/agv/site/logic/h/addLogicUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/tasksitelogic/deleteEntity.shtml';
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