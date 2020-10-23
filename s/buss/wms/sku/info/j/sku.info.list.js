import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { skuInfoLogs } from "/s/buss/g/j/jquery/skuinfo.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "SKU编号",
		hide: false,
	}, {
		colkey: "name",
		name: "SKU名称",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editSkuName'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}, {
		colkey: "LONG",
		name: "长",
		hide: false,
	}, {
		colkey: "WIDE",
		name: "宽",
		hide: false,
	}, {
		colkey: "HEIGHT",
		name: "高",
		hide: false,
	}, {
		colkey: "type",
		name: "SKU类型",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return sku.typevalue(data);
			}
			return "<div class='changable'>" + "<span>" + sku.typevalue(data) + "</span>" + "&nbsp;&nbsp;&nbsp;&nbsp;"
				+ "<a class='editSkuType'><img src='/s/i/edit.png'/></a>" + "</div>";
		}
	}],
	jsonUrl: '/sku/info/findByPage.shtml',
	checkbox: true,
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

$("#scan").click("click", function () {
	scan();
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
		content: '/s/buss/wms/sku/info/editUI.html?id=' + cbox
	});
}
function add() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: gf.layerArea(),
		content: '/s/buss/wms/sku/info/h/skuInfoAddUI.html'
	});
}
function del() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		gf.layerMsg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/sku/info/deleteEntity.shtml';
		gf.ajax(url, {
			ids: cbox.join(":")
		}, "json");
	});
}
function scan() {
	var detailid = gf.checkOnlyOne("id");
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		gf.layerMsg("请选择扫描项！！");
		return;
	}
	layer.confirm('是否扫描？', function () {
		gf.doAjax({
			url: '/sku/info/scanByName.shtml',
			data: { id: detailid },
		})
	})
}

setInterval(() => {
	skuInfoLogs((data) => {
		if (!data) { return; }
		layer.msg('扫描仪扫描数据：' + '长:' + data.LONG + ',宽:' + data.WIDE + ',高:' + data.HEIGHT + '<br/>' + '最近更新：' + data.TIME, { offset: 'b' });
	});
}, 5000);