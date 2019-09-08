import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	id: 'paging',
	l_column: [{
		colkey: "id",
		name: "requestid",
		width: "50px",
		hide: true
	}, {
		colkey: "inboundcode",
		name: "入库单号"
	}, {
		colkey: "packageid",
		name: "申请单号"
	}, {
		colkey: "amount",
		name: "箱数"
	}, {
		colkey: "createusertime",
		name: "封箱时间",
		renderData: function (rowindex, data, rowdata, column) {
			return new Date(data).format("yyyy-MM-dd hh:mm:ss");
		}
	}, {
		colkey: "inboundtime",
		name: "提交入库时间",
		renderData: function (rowindex, data, rowdata, column) {
			return new Date(data).format("yyyy-MM-dd hh:mm:ss");
		}
	}, {
		colkey: "inbounduserid",
		name: "入库人",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.operator(data);
		}
	}, {
		colkey: "inboundstatus",
		name: "入库单状态",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("INBOUND_STATUS_ERP", data);
		}
	}, {
		name: "操作",
		renderData: function (rowindex, data, rowdata, column) {
			var inbound = eval(rowdata);
			return '<a href="/wms/inbound/detail.shtml?inboundcode=' + inbound.inboundcode + '" target="_blank">入库单详细</a>';
		}
	}],
	jsonUrl: '/wms/inbound/querylist.shtml',
});
$("#search").click("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serializeObject();
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#printpackage").click(function () {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择打印项！！");
		return;
	}
	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
		.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("钱币箱号打印");
	for (var i = 0; i < cbox.length; i++) {
		debugger;
		var packageid = $("input[name='packageMainlist[" + i + "].requestcode']").val();
		var number = $("input[name='packageMainlist[" + i + "].amount']").val() || "";
		if (number == '0' || number == '') {
			alert("请先输入箱数！");
			return;
		}
		for (var j = 0; j < number; j++) {
			LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
			LODOP
				.ADD_PRINT_BARCODE(15, 20, 130, 68, "128Auto", packageid);
			LODOP.PRINT();
		}

	}
})

function cancelbound(param) {
	if (param != null && param != '' && param != 'undefined') {
		if (confirm("确认取消？")) {
			$.ajax({
				type: 'post',
				url: '/wms/inbound/cancelbound.shtml',
				data: 'inboundcode=' + param,
				dataType: 'text',
				success: function (result) {
					if (result = 'success') {
						parent.datagrid.loadData();
					} else {
						alert("取消失败！");
					}
				},
				error: function () {
					alert("网络连接超时，请重试！")
				}
			});
		}
	}
}