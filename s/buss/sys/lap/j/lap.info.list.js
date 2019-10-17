import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import "/s/buss/sys/lap/j/lap.info.edit.status.js";
import "/s/buss/sys/lap/j/lap.info.edit.name.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "name",
		name: "名称",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editLapName'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}, {
		colkey: "type",
		name: "类型",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("LAP_TYPE", data);
		}
	}, {
		colkey: "status",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return gv.get("LAP_STATUS", data);
			}
			if (!data) { data = "NORMAL"; }
			let json = { id: rowdata.id, name: rowdata.name };
			let btnStr = `<button type="button" class="edit btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
			return gv.select("LAP_STATUS", data) + btnStr;
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
		renderData: function (rowindex, data, rowdata, column) {
			if (data == "1") {
				$("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
				return "已删除";
			} else {
				return "使用中";
			}
		}
	}],
	jsonUrl: '/sys/lap/findByPage.shtml',
	checkbox: true,
	serNumber: true
});

$("#paging").delegate(".edit", "click", function (e) {
	let id = $(this).data("id");
	let name = $(this).data("name");
	let targetVal = $(this).parent("td").find("select").val();
	let target = $(this).parent("td").find("select").find("option:selected").text();
	if (window.confirm(`是否要改变${name}的状态为${target}？`)) {
		gf.doAjax({
			url: `/sys/lap/editEntity.shtml`,
			data: { id: id, status: targetVal }
		});
	}
});

$("#search").on("click", function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
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
		area: localStorage.layerArea.split(","),
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
		var s = gf.ajax(url, {
			ids: cbox.join(",")
		}, "json");
		if (s.code >= 0) {
			layer.msg('删除成功');
			window.datagrid.loadData();
		} else {
			layer.msg('删除失败' + s.msg);
		}
	});
}