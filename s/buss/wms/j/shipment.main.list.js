import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { delSm, executeSm } from "/s/buss/wms/j/base/wms.paper.op.js";

export var init = function () {
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
					return "--空--";
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
			name: "交接点",
			renderData: function (rowindex, data, rowdata, column) {
				return gv.get("ACS_CACHE_CABLE", data);
			}
		}, {
			colkey: "status",
			name: "状态",
			renderData: function (rowindex, data, rowdata, column) {
				var btns = "";
				if (data == 3) {
					$(`tr[d-tree='${rowdata.dtee}]`).css("color", "red");
				}
				if (rowdata.delflag == 1) {
					$(`tr[d-tree='${rowdata.dtee}']`).css("color", "#dedede");
					btns = "-已删除";
				}
				btns = gv.get("ACS_STATUS", data) + btns;
				return btns;
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
			renderData: function (rowindex, data, rowdata, column) {
				var btns = `<button type='button' class='btn btn-info marR10 detail' 
				data-paperid='${rowdata.paperid}'>明细</button>`;
				if (rowdata.delflag != 1) {
					if (rowdata.status == 1) {
						btns = `<button type='button' class='btn btn-info marR10 execute' 
						data-id='${rowdata.id}'>下达</button>&nbsp;&nbsp;${btns}`;
					}
				}
				return btns;
			}
		}],
		jsonUrl: '/shipment/main/findByPage.shtml',
		checkbox: true,
		serNumber: true
	});
}

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
	delSm();
});

$("html").undelegate("button.detail", "click");
$("html").delegate("button.detail", "click", function () {
	detail($(this).data("paperid"));
});

$("html").undelegate("button.execute", "click");
$("html").delegate("button.execute", "click", function () {
	executeSm($(this).data("id"));
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
		title: "新增-输入需要取出档案的所在货位名称",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/wms/h/shipmentAddUI.html'
	});
}
function detail(paperid) {
	window.pageii = layer.open({
		title: "出库单明细",
		type: 2,
		area: globalLayerArea,
		content: '/s/buss/wms/h/shipmentDetailOfOne.html?shipmentMainFormMap.paperid=' + paperid
	});
}