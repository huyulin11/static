import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	id: 'paging',
	columns: [{
		colkey: "requestcode",
		name: "申请单号"
	}, {
		colkey: "totalamount",
		name: "数量"
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
		colkey: "createuserid",
		name: "封箱人",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.operator(data);
		}
	}],
	jsonUrl: '/wms/inbound/oplist.shtml',
	checkbox: true,
	checkValue: 'requestcode'
});
$("#search").click("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serializeObject();
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#batchoperate").click("click", function () {
	batchoperate();
});

function batchoperate() {
	var cbox = window.datagrid.getSelectedCheckbox();
	var cid = window.datagrid.getSelectedCheckbox("cid");
	if (cbox == "") {
		layer.msg("至少选中一个");
		return;
	}
	if (confirm("确认提交入库？")) {
		$.ajax({
			url: "/wms/inbound/opinbound.shtml",
			type: "post",
			data: "id=" + cid,
			dataType: "text",
			success: function (result) {
				if (result = "success") {
					parent.datagrid.loadData();
				} else {
					alert("发生错误！");
				}
			},
			error: function () {
				alert("网络连接失败！请重试。");
			}
		});
	}
}