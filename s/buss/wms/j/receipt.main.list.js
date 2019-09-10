import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

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
		colkey: "warehouse",
		name: "仓库",
		renderData: function (rowindex, data, rowdata, column) {
			if (!data) {
				return "默认仓";
			}
			return gv.get("WAREHOUSE", data);
		}
	}, {
		colkey: "totallines",
		name: "明细数"
	}, {
		colkey: "totalqty",
		name: "货物数"
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
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
				+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
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

$("html").undelegate("button.detail", "click");
$("html").delegate("button.detail", "click", function () {
	detail($(this).data("paperid"));
});

$("html").undelegate("button.execute", "click");
$("html").delegate("button.execute", "click", function () {
	execute($(this).data("id"));
});
$("#permissions").click("click", function () {
	permissions();
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
		content: '/s/buss/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增-输入需要取入档案的所在货位名称",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/wms/h/receiptAddUI.html'
	});
}
function detail(paperid) {
	window.pageii = layer.open({
		title: "入库单明细",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/wms/h/receiptDetailOfOne.html?receiptMainFormMap.paperid=' + paperid
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

function execute(id) {
	layer.confirm('是否下达此单到AGV执行？（此动作不可撤回）', function (index) {
		var url = '/receipt/main/execute.shtml';
		var s = gf.ajax(url, {
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