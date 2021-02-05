import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		hide: true,
	}, {
		colkey: "agvid",
		name: "AGV编号"
	}, {
		colkey: "devtype",
		name: "设备类型",
		renderData: function (rowindex, data, rowdata, column) {
			return "<input class='hidden' name='iotRelationFormMap.id[" + rowindex + "]' value='" + rowdata.id + "'/>"
				+ "<select class='input-medium ui-autocomplete-input jsSelect' data-patten='SOCKET_DEV_TYPE' data-initval='"
				+ data + "' name='iotRelationFormMap.devtype[" + rowindex + "]'></select>";
		}
	}, {
		colkey: "devid",
		name: "设备",
		renderData: function (rowindex, data, rowdata, column) {
			return "<select class='input-medium ui-autocomplete-input jsSelect' data-patten='SOCKET_DEV_INFO.-1" + rowdata.devtype + "' data-initval='"
				+ data + "' name='iotRelationFormMap.devid[" + rowindex + "]'></select>";
		}
	}],
	jsonUrl: '/iotinfo/relation/findByPage.shtml',
	checkbox: false,
	serNumber: true,
	callback: function () {
		renderAll();
	}
});

let doSearch = function () {
	var searchParams = $("#searchForm").serialize();
	window.datagrid.setOptions({
		data: searchParams
	});
}

$("#searchForm").on("submit", function () {
	doSearch();
	return false;
});

$("#search").on("click", function () { doSearch(); });
$("#saveAll").click("click", function () { saveAll(); });

function saveAll() {
	layer.confirm('是否确认保存所有数据？', function (index) {
		var url = '/iotinfo/relation/saveAll.shtml';
		gf.ajax(url, $("#formInList").serialize(), "json");
	});
}