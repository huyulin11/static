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
		hide: true,
	}, {
		colkey: "whid",
		name: "仓库",
		renderData: function (rowindex, data, rowdata, column) {
			var whId = "";
			whId = (data ? gv.get("WAREHOUSE", data) : "");
			return "<div class='changable'>" + "<span>" + whId + "</span>" + "</div>";
		}
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
		colkey: "userdef1",
		name: "巷道",
		hide: function () { return localStorage.projectKey != "BJJK_HUIRUI"; },
		renderData: function (rowindex, data, rowdata, column) {
			var lap = gv.getLap(data);
			return lap ? lap.name : "N/A";
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
	// checkItem: function (rowdata) {
	// 	return rowdata.whid != 2;
	// },
	serNumber: true
});

let doSearch = function () {
	var searchParams = $("#searchForm").serializeObject();
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
	let MAX_ONE_TIME = 200;
	let submit = (p, callback) => {
		gf.doAjax({
			url: `/alloc/item/import.shtml`,
			data: p, dataType: "json", type: "POST", timeout: 0, success: callback
		});
	};
	let submitSuc = (_paper, i, goon) => {
		_paper = {};
		gf.layerMsg(`${goon ? "前" + (i - 1) + "行完成提交（刷新界面中断导入）" : "全部" + (i - 1) + "行提交成功！"}`, () => { window.datagrid.loadData(); });
		if (goon) fun(i);
	};
	let times = 1;
	let fun = (start) => {
		let _paper = {};
		for (let i = start + 1; ; i++) {
			if (sheet["A" + i] && sheet["B" + i]) {
				if (i > times * MAX_ONE_TIME) {
					times++;
					submit(_paper, () => {
						submitSuc(_paper, i, true);
					});
					break;
				}
				_paper[`allocItem[${i}]`] = sheet["A" + i].v;
				_paper[`warehouse[${i}]`] = sheet["B" + i].v;
				_paper[`name[${i}]`] = sheet["C" + i] ? sheet["C" + i].v : "";
			} else {
				submit(_paper, () => {
					submitSuc(_paper, i - 1);
				});
				break;
			}
		}
	}
	fun(1);
	$('#upload').val("");
	gf.layerMsg("数据导入操作已提交，请在本页面等待提交结果，数据过多时等待的时间会比较久！");
}

let importStr = `<label class="ui-upload">
导入货位<input multiple type="file" id="upload" style="display: none;" />
</label>`;
$("div.doc-buttons").append(importStr);
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

$("#export").on("click", function () {
	window.location.href = '/alloc/item/downloads.shtml?allocItemFormMap.inStock=true' + '&' + $("#searchForm").serialize();
});