import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: false,
	}, {
		colkey: "sitename",
		name: "站点名称",
		renderData: function (rowindex, data, rowdata, column) {
			let col = {
				name: "站点名称", key: "siteName", notnull: true, type: "input",
			};
			let json = { id: rowdata.id, name: rowdata.sitename };
			let html = getInput(col, { value: data, width: '50%', });
			let btnStr = `<button type="button" class="editSiteName btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
			$(html).append(btnStr);
			return html;
		}
	}, {
		colkey: "sitetype",
		name: "站点类型",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("TASK_SITE_TYPE", data);
		}
	}, {
		colkey: "delflag",
		name: "数据状态",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
				return "已删除";
			}
			return "正常使用";
		}
	}],
	jsonUrl: '/tasksite/findByPage.shtml?ORDER_BY_KEY=id',
	checkbox: true,
	serNumber: true
});

$("#paging").delegate(".editSiteName", "click", function (e) {
	let name = $(this).data("name");
	let id = $(this).data("id");
	let targetVal = $(this).parents("td").find("input#siteName").val();
	if (name == targetVal) { gf.layerMsg("名称无修改！"); return; }
	if (window.confirm(`是否要改变该站点(原名称：${name})名称为${targetVal}？`)) {
		gf.doAjax({
			url: `/tasksite/editName.shtml`,
			data: { id: id, sitename: targetVal }
		});
	}
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
function edit() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = gf.layerOpen({
		title: "编辑",
		type: 2,
		content: '/s/buss/site/info/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = gf.layerOpen({
		title: "新增",
		type: 2,
		content: '/s/buss/agv/site/info/h/addSiteUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/tasksite/deleteEntity.shtml';
		gf.ajax(url, { ids: cbox.join(":") }, "json");
	});
}