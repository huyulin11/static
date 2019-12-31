import { dataGrid } from "/s/j/kf.grid.js";

window.datagrid = dataGrid({
	id: 'paging',
	columns: [{
		colkey: "id",
		name: "id",
		width: "50px",
		hide: true
	}, {
		colkey: "accountName",
		name: "账号"
	}, {
		colkey: "result",
		name: "是否成功"
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