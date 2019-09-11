import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { delIm, executeIm } from "/s/buss/wms/j/base/wms.paper.op.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	l_column: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "paperid",
		name: "盘点单号"
	}, {
		colkey: "totallines",
		name: "盘点数量"
	}, {
		colkey: "inventorytype",
		name: "盘点类型",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("WMS_INVENTORY_TYPE", data);
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
				btns = btns + "&nbsp;&nbsp;" + "<button type='button' class='btn btn-info marR10 whichAgv' data-paperid='"
					+ rowindex.paperid + "'>执行AGV</button>";
				if (rowindex.status == 1) {
					btns = "<button type='button' class='btn btn-info marR10 execute' data-id='"
						+ rowindex.id + "'>下达</button>" + "&nbsp;&nbsp;" + btns;
				}
			}
			return btns;
		}
	}],
	jsonUrl: '/inventory/main/findByPage.shtml',
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
	delIm();
});

$("html").undelegate("button.detail", "click");
$("html").delegate("button.detail", "click", function () {
	detail($(this).data("paperid"));
});

$("html").undelegate("button.whichAgv", "click");
$("html").delegate("button.whichAgv", "click", function () {
	whichAgv($(this).data("paperid"));
});

$("html").undelegate("button.execute", "click");
$("html").delegate("button.execute", "click", function () {
	executeIm($(this).data("id"));
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
		area: localStorage.layerArea.split(","),
		content: '/s/buss/wms/h/inventoryAddUI.html'
	});
}
function detail(paperid) {
	window.pageii = layer.open({
		title: "盘点单明细",
		type: 2,
		area: localStorage.layerArea.split(","),
		content: '/s/buss/wms/h/inventoryDetailOfOne.html?inventoryMainFormMap.paperid='
			+ paperid
	});
}
function whichAgv(key) {
	var url = '/bd/conf.shtml?table=task_agv';
	var s = gf.ajax(url, {
		key: key + "%"
	}, "json");
	var info = "";
	for (var item of s) {
		info = info + "<br/>" + item.key + ":" + item.value;
	}
	if (!info) { info = "未找到执行信息！"; }
	layer.msg(info);
}