import { gf } from "/s/buss/g/j/g.f.js";
import { gu } from "/s/buss/g/j/g.u.js";
import { dataGrid } from "/s/j/kf.grid.js";

var paperid = gf.urlParam("transferMainFormMap.paperid");
let _columns = [];

_columns.push({
	colkey: "id",
	name: "id",
	hide: true,
}, {
	colkey: "paperid",
	name: "单号"
});

let tt = gu.huiruiImportExcelCols();
for (let seq of tt) {
	_columns.push({
		json: seq.index,
		name: seq.name,
		hide: seq.hide,
	});
}

_columns.push({
	colkey: "updatetime",
	name: "时间",
	renderData: function (rowindex, data, rowdata, column) {
		return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
			+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
	}
});
window.datagrid = dataGrid({
	pagId: 'paging',
	columns: _columns,
	jsonUrl: '/transfer/detail/findByPage.shtml?transferDetailFormMap.paperid=' + paperid,
	checkbox: true,
	serNumber: true
});