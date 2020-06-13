import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import "/s/buss/sys/lap/j/lap.info.edit.name.js";

let tempBtns = [{
	id: "refresh", name: "刷新", class: "btn-info",
	bind: function () {
		window.datagrid.loadData();
	}
}, {
	id: "back", name: "返回", class: "btn-info",
	bind: function () {
		window.history.back();
	}
}];
gf.bindBtns("div.doc-buttons", tempBtns);

let _type = gf.urlParam("type");
let _columns = [{
	colkey: "id",
	name: "id",
	hide: true,
}, {
	colkey: "type",
	name: "类型",
	renderData: function (rowindex, data, rowdata, column) {
		return gv.get("LAP_TYPE", data);
	}
}, {
	colkey: "name",
	name: "产线名称",
	renderData: function (rowindex, data, rowdata, column) {
		return data;
		// return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
		// 	+ "<a class='editLapName'><img src='/s/i/edit.png'/></a>" + "</div>";
	}
}, {
	colkey: "skuId",
	name: "SKU",
	hide: true,
}, {
	colkey: "inUesd",
	name: "是否在用",
	hide: true,
}, {
	colkey: "environment",
	name: "环境",
	hide: true,
}, {
	colkey: "delflag",
	name: "是否删除",
	hide: true,
	renderData: function (rowindex, data, rowdata, column) {
		if (data == "1") {
			$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
			return "已删除";
		} else {
			return "使用中";
		}
	}
}];

if (_type == 'PROD_LINE') {
	let opStatus = {
		colkey: "status",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return gv.get("LAP_STATUS", data);
			}
			if (!data) { data = "NORMAL"; }
			let json = { id: rowdata.id, name: rowdata.name };
			let btnStr = `<button type="button" class="editStatus btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
			return gv.select("LAP_STATUS", data) + btnStr;
		}
	};
	let opLineName = {
		colkey: "name",
		name: "修改名称",
		hide: !gf.isPc(),
		renderData: function (rowindex, data, rowdata, column) {
			let col = {
				name: "产线名称", key: "lineName", notnull: true, type: "input",
			};
			let json = { id: rowdata.id, name: rowdata.name };
			let html = getInput(col, { value: data, width: '50%', });
			let btnStr = `<button type="button" class="editLineName btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
			$(html).append(btnStr);
			return html;
		}
	};
	_columns = _columns.concat(opLineName);
	_columns = _columns.concat(opStatus);
}

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: _columns,
	jsonUrl: `/sys/lap/findByPage.shtml?type=${_type}`,
	checkbox: false,
	serNumber: true
});

$("#paging").delegate(".editLineName", "click", function (e) {
	let name = $(this).data("name");
	let id = $(this).data("id");
	let targetVal = $(this).parent("td").find("input#lineName").val();
	if (name == targetVal) { gf.layerMsg("名称无修改！"); return; }
	if (window.confirm(`是否要改变该产线(原名称：${name})名称为${targetVal}？`)) {
		gf.doAjax({
			url: `/sys/lap/bjjk/huirui/editName.shtml`,
			data: { id: id, name: targetVal }
		});
	}
});

$("#paging").delegate(".editStatus", "click", function (e) {
	let id = $(this).data("id");
	let name = $(this).data("name");
	let targetVal = $(this).parent("td").find("select").val();
	let target = $(this).parent("td").find("select").find("option:selected").text();
	if (window.confirm(`是否要改变${name}的状态为${target}？`)) {
		gf.doAjax({
			url: `/sys/lap/bjjk/huirui/editStatus.shtml`,
			data: { id: id, status: targetVal }
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
$("#del").click("click", function () {
	del();
});
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: gf.layerArea(),
		content: '/s/buss/sys/lap/h/lapInfoAddUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/sys/lap/deleteEntity.shtml';
		gf.ajax(url, { ids: cbox.join(":") }, "json");
	});
}