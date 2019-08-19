$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
			colkey: "dictype",
			name: "类型",
		}, {
			colkey: "remark",
			name: "说明",
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
		}, {
			name: "操作",
			renderData: function (data, rowdata, rowindex, column) {
				var btns = "<button type='button' class='btn btn-info marR10 detail' data-dictype='"
					+ rowindex.dictype + "'>明细</button>";
				btns += "&nbsp;&nbsp;";
				btns += "<button type='button' class='btn btn-info marR10 mgr' data-dictype='"
					+ rowindex.dictype + "'>维护</button>";
				return btns;
			}
		}],
		jsonUrl: '/sys/dic/type/findByPage.shtml',
		checkbox: true,
		checkValue: "dictype",
		serNumber: true
	});
	$("#search").on("click", function () {// 绑定查询按扭
		var searchParams = $("#searchForm").serialize();// 初始化传参数
		window.datagrid.setOptions({
			data: searchParams
		});
	});
	$("#add").on("click", function () {
		add();
	});

	$("html").delegate("button.detail", "click", function () {
		var dictype = $(this).data("dictype");
		detail(dictype);
	});

	$("html").delegate("button.mgr", "click", function () {
		var dictype = $(this).data("dictype");
		mgr(dictype);
	});

	$("#del").on("click", function () {
		del();
	});
	$("#permissions").on("click", function () {
		permissions();
	});
});

function mgr(dictype) {
	localStorage.setItem("dictype", dictype);
	window.pageii = layer.open({
		title: "明细",
		type: 2,
		area: ["600px", "80%"],
		content: '/s/buss/sys/dic/h/sysDicAddUI.html?dictype=' + dictype
	});
}

function detail(dictype) {
	localStorage.setItem("dictype", dictype);
	window.pageii = layer.open({
		title: "明细",
		type: 2,
		area: ["600px", "80%"],
		content: '/s/buss/sys/dic/h/sysDicEditUI.html?dictype=' + dictype
	});
}

function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/sys/dic/h/sysDicAddUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/sys/dic/type/deleteEntity.shtml';
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