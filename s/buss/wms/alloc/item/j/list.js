$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
			colkey: "id",
			name: "货位ID",
			hide: false,
		}, {
			colkey: "text",
			name: "货位名称",
			renderData: function (rowindex, data, rowdata, column) {
				if (rowdata.delflag == "1") {
					return data;
				}
				return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<a class='editAllocName'><img src='/s/i/edit.png'/></a>" + "</div>";
			}
		}, {
			colkey: "sitename",
			name: "对应站点",
			renderData: function (rowindex, data, rowdata, column) {
				if (rowdata.delflag == "1") {
					return data;
				}
				return "<div class='changable'>" + "<span>" + data
					+ "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<a class='editSite'><img src='/s/i/edit.png'/></a>" + "</div>";
			}
		}, {
			colkey: "armactname",
			name: "对应PLC动作",
			renderData: function (rowindex, data, rowdata, column) {
				if (rowdata.delflag == "1") {
					return data;
				}
				return "<div class='changable'>" + "<span>" + data
					+ "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<a class='editArmact'><img src='/s/i/edit.png'/></a>" + "</div>";
			}
		}, {
			colkey: "status",
			name: "货位状态",
			renderData: function (rowindex, data, rowdata, column) {
				if (rowdata.delflag == "1") {
					$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
					return "已删除";
				}
				return gv.get("ALLOC_ITEM_STATUS", data);
			}
		}],
		jsonUrl: '/alloc/item/findByPage.shtml',
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
		content: '/s/buss/wms/alloc/item/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/wms/alloc/item/h/allocItemAddUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/alloc/item/deleteEntity.shtml';
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