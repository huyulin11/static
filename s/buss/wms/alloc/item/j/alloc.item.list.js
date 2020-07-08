import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { gu } from "/s/buss/g/j/g.u.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { submit } from "/s/buss/g/j/g.xlsx.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "货位ID",
		hide: false,
	}, {
		colkey: "text",
		name: "货位名称",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag != null) {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editAllocName'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}, {
		colkey: "sitename",
		name: "对应站点",
		hide: true,
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data
				+ "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editSite'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}, {
		colkey: "whid",
		name: "仓库",
		renderData: function (rowindex, data, rowdata, column) {
			var whId = "";
			whId = (data ? gv.get("WAREHOUSE", data) : "");
			return "<div class='changable'>" + "<span>" + whId + "</span>" + "</div>";
		}
	}, {
		colkey: "userdef1",
		name: "巷道",
		hide: function () { return localStorage.projectKey != "BJJK_HUIRUI"; },
		renderData: function (rowindex, data, rowdata, column) {
			var lap = gv.getLap(data);
			return lap ? lap.name : "";
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
	checkone: false,
	checkItem: function (rowdata) {
		return rowdata.whid != 2;
	},
	serNumber: true
});

let doSearch = function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
}

$("#search").on("click", function () {
	doSearch();
});

$("#searchForm").on("submit", function () {
	doSearch();
	return false;
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

function edit() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		gf.layerMsg("只能选中一个");
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
		area: gf.layerArea(),
		content: '/s/buss/wms/alloc/item/h/allocItemAddUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		gf.layerMsg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/alloc/item/deleteEntity.shtml';
		gf.ajax(url, { ids: cbox.join(":") }, "json");
	});
}

var dealSheet = function (sheet) {
	let _paper = {};
	let index = 500;
	for (let i = 2; i > 0; i++) {
		if (i > index + 12) {
			alert("单次最多仅能导入" + index + "条明细！");
			break;
		}
		if (sheet["A" + i] && sheet["B" + i]) {
			_paper[`allocItem[${i}]`] = sheet["A" + i].v;
			_paper[`warehouse[${i}]`] = sheet["B" + i].v;
			_paper[`name[${i}]`] = sheet["C" + i] ? sheet["C" + i].v : "";
		} else { break; }
	}
	$('#upload').val("");
	gf.doAjax({
		url: `/alloc/item/import.shtml`,
		data: _paper, dataType: "json", type: "POST", timeout: 0
	});
	gf.layerMsg("数据导入操作已提交，请在本页面等待提交结果，数据过多时等待的时间会比较久！");
}

$("div.doc-buttons").append(`<label class="ui-upload">
导入货位<input multiple type="file" id="upload" style="display: none;" />
</label>`);
$('#upload').on("change", function (e) {
	var files = e.target.files;
	if (files.length > 1 && localStorage.importThenEdit) {
		gf.layerMsg("编辑模式下仅能单个导入");
		$('#upload').val("");
		return;
	}
	submit(e, function (workbook) {
		let sheet = workbook.Sheets[workbook.SheetNames[0]];
		dealSheet(sheet);
	});
});