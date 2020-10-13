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
		colkey: "loginIP",
		name: "IP",
		hide: true
	}, {
		colkey: "loginTime",
		name: "时间",
		renderData: function (rowindex, data, rowdata, column) {
			return new Date(data).format("yyyy-MM-dd hh:mm:ss");
		}
	}],
	jsonUrl: '/userlogin/findByPage.shtml',
	checkbox: false,
	serNumber: true
});

let doSearch = function () {
	var searchParams = $("#searchForm").serializeObject();
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