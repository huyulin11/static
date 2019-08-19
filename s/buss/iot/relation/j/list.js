$(function () {
	window.datagrid = lyGrid({
		pagId: 'paging',
		l_column: [{
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
			$.getScript("/s/buss/g/j/jquery/jquery.jsSelect.js");
		}
	});
	$("#search").on("click", function () {// 绑定查询按扭
		var searchParams = $("#searchForm").serialize();// 初始化传参数
		window.datagrid.setOptions({
			data: searchParams
		});
	});
	$("#saveAll").click("click", function () {
		saveAll();
	});
});
function saveAll() {
	layer.confirm('是否确认保存所有数据？', function (index) {
		var url = '/iotinfo/relation/saveAll.shtml';
		var s = CommnUtil.ajax(url, $("#formInList").serialize(), "json");
		if (s == "success") {
			layer.msg('保存成功');
			window.datagrid.loadData();
		} else {
			layer.msg('保存失败！' + s);
		}
	});
}

