import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	id: 'paging',
	l_column: [{
		colkey: "id",
		name: "id",
		width: "50px",
		hide: true
	}, {
		colkey: "accountName",
		name: "账号"
	}, {
		colkey: "loginTime",
		name: "登入时间",
		renderData: function (rowindex, data, rowdata, column) {
			return new Date(data).format("yyyy-MM-dd hh:mm:ss");
		}
	}, {
		colkey: "loginIP",
		name: "登入IP"
	}],
	jsonUrl: '/userlogin/findByPage.shtml',
	checkbox: true
});
$("#searchForm").click("click", function () {// 绑定查询按扭
	var searchParams = $("#fenye").serializeObject();
	window.datagrid.setOptions({
		data: searchParams
	});
});