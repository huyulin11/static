import { dataGrid } from "/s/j/kf.grid.js";

var flag = $("#checkflag").val();
window.datagrid = dataGrid({
	id: 'paging',
	l_column: [{
		colkey: "innerno",
		name: "内部流转号",
		renderData: function (rowindex, data, rowdata, column) {
			return '<span class="' + data + '">' + data + '</span>';
		}
	}, {
		colkey: "userAccount",
		name: "编号-名称",
		hide: function () {
			if (flag) {
				return false;
			} else {
				return true;
			}
		}
	}, {
		colkey: "reservno",
		name: "预约单号",
		hide: function () {
			if (flag) {
				return false;
			} else {
				return true;
			}
		}
	}, {
		colkey: "entitytype",
		name: "藏品类型",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("ENTITY_TYPE", data);
		}
	}, {
		colkey: "depositstate",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("DEPOSIT_STATUS", data);
		}
	}, {
		colkey: "aliasname",
		name: "藏品名称",
		renderData: function (rowindex, data, rowdata, column) {
			return '<span class="' + data + '">' + data + '</span>';
		}
	}, {
		colkey: "amount",
		name: "预约数量"
	}, {
		colkey: "applytime",
		name: "申请时间",
		renderData: function (rowindex, data, rowdata, column) {
			return data == '' ? '' : new Date(data).format("yyyy-MM-dd hh:mm:ss");
		},
		hide: true
	}, {
		colkey: "deposittime",
		name: "受理时间",
		renderData: function (rowindex, data, rowdata, column) {
			return data == '' ? '' : new Date(data).format("yyyy-MM-dd hh:mm:ss");
		},
		hide: function () {
			if (flag) {
				return false;
			} else {
				return true;
			}
		}
	}, {
		colkey: "deposittime",
		name: "剩余时间",
		renderData: function (rowindex, data, rowdata, column) {
			return data == '' ? '' : new Date(data).format("yyyy-MM-dd hh:mm:ss");
		},
		hide: true
	}, {
		colkey: "deposittime",
		name: "评鉴结束时间",
		renderData: function (rowindex, data, rowdata, column) {
			return data == '' ? '' : new Date(data).format("yyyy-MM-dd hh:mm:ss");
		},
		hide: true
	}, {
		colkey: "remark",
		width: "200px",
		name: "备注"
	}, {
		name: "操作",
		renderData: function (rowindex, data, rowdata, cloumn) {
			var evaluation = eval(rowdata);
			//0-业管；1-客管；2-质管；3-普客；4-评鉴；5-封箱
			if (evaluation.depositstate == -3 || evaluation.depositstate == -2) {
				if (evaluation.checkownid0 == 0 || evaluation.checkownid1 == 1) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == -1) {
				if (evaluation.checkownid0 == 0) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == 0) {
				if (evaluation.checkownid1 == 1 || evaluation.checkownid3 == 3) {
					return '<button class="btn btn-info marR10" onclick="accepted(&apos;' + evaluation.depositid + '&apos;)">受理</button>&nbsp;&nbsp;<button onclick="deletedeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-danger marR10">删除</button>';
				} else if (evaluation.checkownid0 == 0) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == 1 || evaluation.depositstate == 2) {
				if (evaluation.checkownid1 == 1 || evaluation.checkownid3 == 3) {
					return '<button class="btn btn-info marR10" onclick="accepted(&apos;' + evaluation.depositid + '&apos;)">受理</button>&nbsp;&nbsp;<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else if (evaluation.checkownid0 == 0) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == 3) {
				if (evaluation.checkownid0 == 0 || evaluation.checkownid1 == 1 || evaluation.checkownid3 == 3) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == 4) {
				if (evaluation.checkownid2 == 2) {
					if (evaluation.currentuserid == evaluation.opuserid) {
						return '<button onclick="bulksearcharrange(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">分配查看</button>&nbsp;&nbsp;<button class="btn btn-info marR10" onclick="evaluation(&quot;' + evaluation.innerno + '&quot;)">评鉴</button>';
					} else {
						return '<button onclick="bulksearcharrange(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">分配查看</button>';
					}
				} else if (evaluation.checkownid0 == 0 || evaluation.checkownid1 == 1) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else if (evaluation.currentuserid == evaluation.opuserid) {
					return '<button class="btn btn-info marR10" onclick="evaluation(&quot;' + evaluation.innerno + '&quot;)">评鉴</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == 5 || evaluation.depositstate == 6) {
				if (evaluation.checkownid2 == 2) {
					return '<button class="btn btn-info marR10" onclick="review(&quot;' + evaluation.innerno + '&quot;)">复核</button>&nbsp;&nbsp;<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else if (evaluation.checkownid0 == 0 || evaluation.checkownid1 == 1) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == 7 || evaluation.depositstate == 8) {
				if (evaluation.checkownid0 == 0 || evaluation.checkownid1 == 1) {
					if (evaluation.currentuserid == evaluation.opuserid) {
						return '<button class="btn btn-info marR10" onclick="sealing(&apos;' + evaluation.innerno + '&apos;)">封箱</button>&nbsp;&nbsp;<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
					} else {
						return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
					}
				} else if (evaluation.currentuserid == evaluation.opuserid) {
					return '<button class="btn btn-info marR10" onclick="sealing(&apos;' + evaluation.innerno + '&apos;)">封箱</button>';
				} else {
					return '';
				}
			} else if (evaluation.depositstate == 9) {
				if (evaluation.checkownid0 == 0 || evaluation.checkownid1 == 1 || evaluation.checkownid3 == 3) {
					return '<button onclick="searchdeposit(&apos;' + evaluation.depositid + '&apos;)"class="btn btn-PRIMARY marR10">查看</button>';
				} else {
					return '';
				}
			} else {
				return '';
			}
		}
	}],
	jsonUrl: '/task/tasklist/evaluation.shtml',
	checkbox: true,
	checkValue: 'depositid',
	treeGrid: { id: 'depositstate', pid: 'depositid' }
});
$("#search").click("click", function () {// 绑定查询按扭
	var searchParams = serializeObject($("#searchForm"));
	window.datagrid.setOptions({
		data: searchParams
	});
	var entitytype = $("#entitytype").val();
	var innerno = $("#innerno").val();
	var deposittimestart = $("#deposittimestart").val();
	var deposittimeend = $("#deposittimeend").val();
	var amount = $("#amount").val();
	var depositstatus = $("#depositstatus").val();
	$.ajax({
		type: 'POST',
		url: '/task/tasklist/evaluationcount.shtml',
		data: "innerno=" + innerno + "&entitytype=" + entitytype + "&deposittimestart=" + deposittimestart + "&deposittimeend=" + deposittimeend +
			"&amount=" + amount + "&depositstatus=" + depositstatus,
		dataType: 'text',
		success: function (amountcount) {
			$("#amountcount").text(amountcount);
		}
	});
});
$("#assign").click("click", function () {
	assign();
});
$("#bulkevaluation").click("click", function () {
	bulkevaluation();
});
$("#bulkreview").click("click", function () {
	bulkreview();
});
$("#bulksealing").click("click", function () {
	bulksealing();
});
$("#clare").click("click", function () {
	$("#searchForm input").val("");
	$("#searchForm select").val("");
});

function searchdeposit(depositid) {
	window.open("/deposit/depositDetail.shtml?id=" + depositid);
}
function assign() {
	var cbox = window.datagrid.getSelectedCheckbox();
	var cid = window.datagrid.getSelectedCheckboxCid();
	var num = 0;
	for (var i = 0; i < cid.length; i++) {
		if (cid[i] == 3) {
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
		title: "分配任务",
		type: 2,
		area: ["900px", "80%"],
		content: '/task/tasklist/assign.shtml?id=' + cbox + '&flag=0'
	});
}
function bulksearcharrange(cbox) {
	window.pageii = layer.open({
		title: "分配查看",
		type: 2,
		area: ["900px", "80%"],
		content: '/task/tasklist/assign.shtml?id=' + cbox + '&flag=1'
	});
}
function bulkevaluation() {
	var cbox = window.datagrid.getSelectedCheckbox();
	var cid = window.datagrid.getSelectedCheckboxCid();
	var num = 0;
	for (var i = 0; i < cid.length; i++) {
		if (cid[i] == 4) {
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
		title: "批量评鉴",
		type: 2,
		area: ["900px", "80%"],
		content: '/task/tasklist/bulkevaluation.shtml?id=' + cbox
	});
}
function bulkreview() {
	var cbox = window.datagrid.getSelectedCheckbox();
	var cid = window.datagrid.getSelectedCheckboxCid();
	var num = 0;
	for (var i = 0; i < cid.length; i++) {
		if (cid[i] == 5 || cid[i] == 6) {
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
		title: "批量复核",
		type: 2,
		area: ["900px", "80%"],
		content: '/task/tasklist/bulkreview.shtml?id=' + cbox
	});
}
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
function evaluation(innerno, aliasname) {
	window.pageii = layer.open({
		title: "评鉴",
		type: 2,
		area: ["1100px", "90%"],
		content: '/judge/judgelist.shtml?innerno=' + innerno
	});
}

function accepted(id) {
	window.open("/deposit/depositEdit.shtml?id=" + id);
}
function review(innerno, aliasname) {
	window.pageii = layer.open({
		title: "复核",
		type: 2,
		area: ["1100px", "90%"],
		content: '/judge/confirm.shtml?innernoRe=' + innerno
	});
}
function sealing(innerno, aliasname) {
	window.pageii = layer.open({
		title: "封箱",
		type: 2,
		area: ["1100px", "90%"],
		content: '/judge/package.shtml?innernoPa=' + innerno
	});
	$.ajax({
		url: "/judge/changePack.shtml",
		type: "post",
		success: function (result) {
			if (result != 0) {

			}
		}
	})
}
