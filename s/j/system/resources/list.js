$(function () {
	window.datagrid = lyGrid({
		id: 'paging',
		l_column: [{
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
			name: "描述"
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
	$("#seach").click("click", function () {// 绑定查询按扭
		var searchParams = serializeObject($("#searchForm"));
		window.datagrid.setOptions({
			data: searchParams
		});
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
	$("#lyGridUp").click("click", function () {// 上移
		var jsonUrl = '/background/resources/sortUpdate.shtml';
		window.datagrid.lyGridUp(jsonUrl);
	});
	$("#lyGridDown").click("click", function () {// 下移
		var jsonUrl = '/background/resources/sortUpdate.shtml';
		window.datagrid.lyGridDown(jsonUrl);
	});
});
function editFun() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.alert("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: globalLayerArea,
		content: '/resources/editUI.shtml?id=' + cbox
	});
}
function addFun() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: globalLayerArea,
		content: '/resources/addUI.shtml'
	});
}
function delFun() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.alert("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/resources/deleteEntity.shtml';
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