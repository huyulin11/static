import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

var findAllocObj = function (keys, callback) {
	gf.ajax('/bd/userRole.shtml?', { userid: keys }, "json", function (s) {
		callback(s);
	});
};

window.datagrid = dataGrid({
	pagId: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
	}, {
		colkey: "userName",
		name: "用户名"
	}, {
		colkey: "accountName",
		name: "账号"
	}, {
		colkey: "roleName",
		name: "所属角色",
	}, {
		colkey: "locked",
		name: "账号状态",
		width: '90px',
		renderData: function (rowindex, data, rowdata, column) {
			return gv.get("ISOK", data);
		}
	}, {
		colkey: "description",
		name: "备注",
		renderData: function (rowindex, data, rowdata, column) {
			return data ? data : "N/A";
		}
	}, {
		colkey: "createTime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return new Date(data).format("yyyy-MM-dd hh:mm:ss");
		},
		hide: true
	}, {
		name: "操作",
		renderData: function (data, rowdata, rowindex, column) {
			return "测试渲染函数";
		}, hide: true
	}],
	jsonUrl: '/user/findByPage.shtml',
	checkbox: true,
	serNumber: true,
	callback: function () {
		let keys = $(".roleName").map(function () { return $(this).parents("tr").find(".id").html() }).get().join(":");
		findAllocObj(keys, function (info) {
			$(".roleName").each(function () {
				let that = this;
				info.some(function (item) {
					if (item.userId == $(that).parents("tr").find(".id").html()) {
						$(that).append(gv.getRole(item.roleId) + ";");
					}
				});
			});
		});
	}
});
$("#search").click("click", function () {// 绑定查询按扭
	var searchParams = $("#searchForm").serialize();// 初始化传参数
	window.datagrid.setOptions({
		data: searchParams
	});
});
$("#addAccount").click("click", function () {
	addAccount();
});
$("#editAccount").click("click", function () {
	editAccount();
});
$("#delAccount").click("click", function () {
	delAccount();
});
$("#permissions").click("click", function () {
	permissions();
});

function editAccount() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("只能选中一个");
		return;
	}
	window.pageii = layer.open({
		title: "编辑",
		type: 2,
		area: gf.layerArea(),
		content: '/user/editUI.shtml?id=' + cbox
	});
}
function addAccount() {
	window.pageii = layer.open({
		title: "新增",
		type: 2,
		area: gf.layerArea(),
		content: '/user/addUI.shtml'
	});
}
function delAccount() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择删除项！！");
		return;
	}
	layer.confirm('是否删除？', function (index) {
		var url = '/user/deleteEntity.shtml';
		gf.ajax(url, {
			ids: cbox.join(":")
		}, "json");
	});
}
function permissions() {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox.length > 1 || cbox == "") {
		layer.msg("请选择一个对象！");
		return;
	}
	var url = '/resources/permissions.shtml?userId=' + cbox;
	window.pageii = layer.open({
		title: "分配权限",
		type: 2,
		area: gf.layerArea(),
		content: url
	});
}