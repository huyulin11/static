$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
			colkey: "id",
			name: "id",
			hide: true,
		}, {
			colkey: "paperid",
			name: "入库单号"
		}, {
			colkey: "totallines",
			name: "入库数量"
		}, {
			colkey: "name",
			name: "入库点",
			renderData: function (rowindex, data, rowdata, column) {
				return gv.get("ACS_CACHE_CABLE", data);
			}
		}, {
			colkey: "status",
			name: "状态",
			renderData: function (rowindex, data, rowdata, column) {
				if (rowdata.delflag == 1) {
					$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dedede");
					return "已删除";
				} else {
					if (data == 3) {
						$("tr[d-tree='" + rowdata.dtee + "']").css("color", "red");
					}
				}
				return gv.get("ACS_STATUS", data);
			}
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
		}, {
			name: "操作",
			renderData: function (data, rowdata, rowindex, column) {
				var btns = "<button type='button' class='btn btn-info marR10 detail' data-paperid='"
					+ rowindex.paperid + "'>明细</button>";
				if (rowdata.delflag != 1) {
					if (rowindex.status == 1) {
						btns = "<button type='button' class='btn btn-info marR10 execute' data-id='"
							+ rowindex.id + "'>下达到AGV</button>" + "&nbsp;&nbsp;" + btns;
					}
				}
				return btns;
			}
		}],
		jsonUrl: '/receipt/main/find.shtml',
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
	$("#info").on("click", "button.detail", function () {
		detail($(this).data("paperid"));
	});
	$("#info").on("click", "button.execute", function () {
		execute($(this).data("id"));
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
		content: '/s/buss/receipt/main/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增-输入需要取入档案的所在货位名称",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/wms/receipt/main/h/receiptMainInfoAddUI.html'
	});
}
function detail(paperid) {
	window.pageii = layer.open({
		title: "入库单明细",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/wms/receipt/detail/h/receiptDetailInfoOfOne.html?receiptMainFormMap.paperid=' + paperid
	});
}

function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/receipt/main/deleteEntity.shtml';
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

function execute(id) {
	layer.confirm('是否下达此单到AGV执行？（此动作不可撤回）', function (index) {
		var url = '/receipt/main/execute.shtml';
		var s = CommnUtil.ajax(url, {
			id: id
		}, "json");
		if (s == "success") {
			layer.msg('成功下达到AGV！');
			window.datagrid.loadData();
		} else {
			layer.msg('下达失败！' + s);
		}
	});
}