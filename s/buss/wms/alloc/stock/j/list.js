import { sku } from "/s/buss/acs/g/j/wms.sku.js";

window.datagrid = lyGrid({
	pagId: 'paging',
	l_column: [{
		colkey: "id",
		name: "货位ID",
		hide: true,
	}, {
		colkey: "text",
		name: "货位名称",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return data;
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "</div>";
		}
	}, {
		colkey: "num",
		name: "库存数量",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return "--";
			}
			return "<div class='changable'>" + "<span>" + data + "</span>" + "</div>";
		}
	}, {
		colkey: "skuId",
		name: "货物种类",
		renderData: function (rowindex, data, rowdata, column) {
			if (rowdata.delflag == "1") {
				return "--";
			}
			var data = sku.value(data);
			return "<div class='changable'>" + "<span>" + data + "</span>" + "</div>";
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
	jsonUrl: '/alloc/item/findByPage.shtml?allocItemFormMap.inStock=true',
	checkbox: false,
	serNumber: true
});
$("#search").on("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serialize();// 初始化传参数
	window.datagrid.setOptions({
		data: searchParams
	});
});