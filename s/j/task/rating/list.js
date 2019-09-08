import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	id: 'paging',
	l_column: [
		{
			colkey: "requestid",
			name: "requestid",
			width: "50px",
			hide: true
		},
		{
			colkey: "requestcode",
			name: "申请单号"
		},
		{
			colkey: "totalamount",
			name: "数量"
		},
		{
			colkey: "internalstates",
			name: "状态",
			renderData: function (rowindex, data, rowdata, column) {
				return gv.get("REQUEST_INN_STATUS", data);
			}
		},
		{
			colkey: "requesttime",
			name: "受理时间",
			renderData: function (rowindex, data, rowdata, column) {
				return new Date(data).format("yyyy-MM-dd hh:mm:ss");
			}
		},
		{
			colkey: "duetime",
			name: "剩余时间",
			renderData: function (rowindex, data, rowdata, column) {
				if (data != null && data != '') {
					var starttime = new Date(data).getTime();
					var endtime = new Date().getTime();
					time = starttime - endtime;
					var SysSecond = time / 1000;
					var day, hour, minute;
					if (SysSecond > 0) {
						second = Math.floor(SysSecond % 60);
						minute = Math.floor((SysSecond / 60) % 60);
						hour = Math.floor((SysSecond / 3600) % 24);
						day = Math.floor((SysSecond / 3600) / 24);
						if (minute <= 9)
							minute = '0' + minute;
						if (day < 5 && day >= 2) {
							return '<font color=green>' + day + '天'
								+ hour + '时' + minute + '分'
								+ '</font>';
						} else if (day < 2 && day > 0) {
							return '<font color=orange>' + day + '天'
								+ hour + '时' + minute + '分'
								+ '</font>';
						} else if (day > 5) {
							return '<font color=blue>5天以上</font>';
						} else if (day == 0) {
							return '<font color=red>' + day + '天'
								+ hour + '时' + minute + '分'
								+ '</font>';
						}
					} else if (SysSecond < 0) {
						SysSecond = SysSecond * -1;
						second = Math.floor(SysSecond % 60);
						minute = Math.floor((SysSecond / 60) % 60);
						hour = Math.floor((SysSecond / 3600) % 24);
						day = Math.floor((SysSecond / 3600) / 24);
						if (minute <= 9)
							minute = '0' + minute;
						if (day > 0) {
							return '<font color=red>' + "超" + day + '天'
								+ hour + '时' + minute + '分'
								+ '</font>';
						} else {
							return '<font color=red>' + "超" + hour
								+ '时 ' + minute + '分' + '</font>';
						}
					} else {
						return '<font color=red>--</font>';
					}
				} else {
					return '<font color=red>--</font>';
				}
			}
		},
		{
			name: "操作",
			renderData: function (rowindex, data, rowdata, column) {
				var buttonflag = eval(rowdata);
				if (buttonflag.internalstates == 6
					&& buttonflag.sendtype == 2
					&& buttonflag.rebackreqNum == 0) {
					return '<input type="button" value="发货"onclick="setoutRequest('
						+ buttonflag.requestcode + ')" />';
				} else if (buttonflag.internalstates != 6) {
					if (buttonflag.flag == 0) {
						if (buttonflag.internalstates == 0
							|| buttonflag.internalstates == 1
							|| buttonflag.internalstates == 2
							|| buttonflag.internalstates == 101) {
							return '<input type="button" value="查看" onclick="see('
								+ buttonflag.requestcode + ')" />';
						}
					}
				}
				if (buttonflag.internalstates == 1
					|| buttonflag.internalstates == 2) {
					return '<input type="button" value="受理" onclick="selhear('
						+ buttonflag.requestcode
						+ ','
						+ buttonflag.entityType + ')" />';
				} else if (buttonflag.internalstates == 3) {
					return '<input type="button" value="制图" onclick="drafting('
						+ buttonflag.requestid + ')" />';
				} else if (buttonflag.internalstates == 4) {
					return '<input type="button" value="制图" onclick="drafting('
						+ buttonflag.requestid + ')" />';
				} else if (buttonflag.internalstates == 5
					|| buttonflag.internalstates == 6) {
					return '<input type="button" value="一审" onclick="see1('
						+ buttonflag.requestid
						+ ')" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="button" value="二审" onclick="see2('
						+ buttonflag.requestid + ')" />';
				} else if (buttonflag.internalstates == 7
					|| buttonflag.internalstates == 8) {
					return '<input type="button" value="打盒" onclick="packaged('
						+ buttonflag.requestid + ')" />';
				} else if (buttonflag.internalstates == 9
					|| buttonflag.internalstates == 10) {
					return '<input type="button" value="打盒制图" onclick="chart('
						+ buttonflag.requestid + ')" />';
				} else if (buttonflag.internalstates == 11 || buttonflag.internalstates == 12
					|| buttonflag.internalstates == 13) {
					return '<button class="btn btn-info marR10" onclick="sealing(&apos;'
						+ buttonflag.requestid
						+ '&apos;)">封箱</button>';
				} else if (buttonflag.flag == 1) {
					return '<input type="button" value="开始处理" onclick="unpack('
						+ buttonflag.requestcode + ')" />';
				} else {
					return '';
				}
			}
		}, {
			colkey: "remark",
			name: "备注",
			renderData: function (rowindex, data, rowdata, column) {
				return '<div style="color:red;width:200px;margin:0 auto;padding:0">' + data + '</div>';
			}
		}],
	jsonUrl: '/task/tasklist/rating.shtml?other=' + other,
	checkbox: true,
	checkValue: 'requestid',
	treeGrid: { id: 'internalstates', pid: 'requestid' }
});
$("#search").click("click", function () {// 绑定查询按扭
	var searchParams = serializeObject($("#searchForm"));
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#batchoperate").click("click", function () {
	batchoperate();
});
$("#numberprint").click(function () {
	var packageid = $("#requestcode").val();
	if (packageid == '' || packageid == 'undefined') {
		alert("请输入箱号！");
		return;
	}

	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
		.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("钱币箱号打印");
	LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
	LODOP
		.ADD_PRINT_BARCODE(15, 20, 130, 68, "128Auto", packageid);
	LODOP.PRINT();
});

function bulksealing() {
	var cbox = window.datagrid.getSelectedCheckbox();
	var cid = window.datagrid.getSelectedCheckboxCid();
	var num = 0;
	for (var i = 0; i < cid.length; i++) {
		if (cid[i] == 7 || cid[i] == 8) {
			num += 1;
		}
	}
	if (cid.length != num) {
		alert("选择订单错误，不可编辑！");
		return false;
	}
	if (cbox == "") {
		layer.msg("至少选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "批量封箱",
		type: 2,
		area: ["900px", "80%"],
		content: '/task/tasklist/bulksealing.shtml?id=' + cbox
	});
}

function sealing(requestid) {
	window.pageii = layer.open({
		title: "封箱",
		type: 2,
		area: ["1100px", "90%"],
		content: '/judge/packageJudge.shtml?requestid=' + requestid
	});

}
function batchoperate() {
	var cbox = window.datagrid.getSelectedCheckbox();
	var cid = window.datagrid.getSelectedCheckboxCid();
	var num = 0;
	for (var i = 0; i < cid.length; i++) {
		if (cid[i] == 11 || cid[i] == 12 || cid[i] == 13) {
			num += 1;
		}
	}
	if (cid.length != num) {
		alert("选择订单错误，不可编辑！");
		return false;
	}
	if (cbox == "") {
		layer.msg("至少选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "批量操作",
		type: 2,
		area: ["1100px", "90%"],
		content: '/p/package.shtml?requestid=' + cbox
	});
}