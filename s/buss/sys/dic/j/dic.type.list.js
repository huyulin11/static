import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
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
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return "";
			}
			var btns = "";
			btns += `<button type='button' class='btn btn-info marR10 view' 
						data-dictype='${rowdata.dictype}'>查看</button>`;
			btns += "&nbsp;&nbsp;";
			btns += `<button type='button' class='btn btn-info marR10 detail' 
						data-dictype='${rowdata.dictype}'>维护数据</button>`;
			if (localStorage.admin) {
				btns += "&nbsp;&nbsp;";
				btns += `<button type='button' class='btn btn-info marR10 mgr' 
						data-dictype='${rowdata.dictype}'>维护类型</button>`;
			}
			return btns;
		}
	}],
	jsonUrl: '/sys/dic/type/findByPage.shtml',
	checkbox: true,
	checkValue: "dictype",
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

$("#add").on("click", function () {
	add();
});

$("html").undelegate("button.view", "click");
$("html").delegate("button.view", "click", function () {
	var dictype = $(this).data("dictype");
	view(dictype);
});

$("html").undelegate("button.detail", "click");
$("html").delegate("button.detail", "click", function () {
	var dictype = $(this).data("dictype");
	detail(dictype);
});

$("html").undelegate("button.mgr", "click");
$("html").delegate("button.mgr", "click", function () {
	var dictype = $(this).data("dictype");
	mgr(dictype);
});

$("#del").on("click", function () {
	del();
});
function mgr(dictype) {
	window.pageii = gf.layerOpen({
		title: "明细",
		type: 2,
		content: '/s/buss/sys/dic/h/sysDicTypeEditUI.html?dictype=' + dictype
	});
}

function detail(dictype) {
	window.pageii = gf.layerOpen({
		title: "明细",
		type: 2,
		content: '/s/buss/sys/dic/h/sysDicDataEditUI.html?dictype=' + dictype
	});
}

function view(dictype) {
	window.pageii = gf.layerOpen({
		title: "明细",
		type: 2,
		content: '/s/buss/sys/dic/h/sysDicDataEditUI.html?dictype=' + dictype + '&model=VIEW'
	});
}

function add() {
	window.pageii = gf.layerOpen({
		title: "新增",
		type: 2,
		content: '/s/buss/sys/dic/h/sysDicTypeEditUI.html'
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
		gf.ajax(url, { ids: cbox.join(":") }, "json");
	});
}