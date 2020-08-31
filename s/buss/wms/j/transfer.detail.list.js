import { gf } from "/s/buss/g/j/g.f.js";
import { gu } from "/s/buss/g/j/g.u.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";

let tempBtns = [{
	url: `/transfer/detail/deleteBySub.shtml`,
	id: "deleteSub", name: "提交撤销", class: "btn-danger",
	bind: function () {
		let that = this;
		var detailid = gf.checkOnlyOne("id");
		if (!detailid) { return; }
		layer.confirm(`是否${that.name}${detailid}？`, function (index) {
			gf.ajax(that.url, { detailid: detailid }, "json", function (s) {
				if (s.code >= 0) {
					gf.layerMsg(`成功${that.name}！`);
					if (window.datagrid) window.datagrid.loadData();
					else if (parent.datagrid) parent.datagrid.loadData();
				} else {
					gf.layerMsg(`${that.name}失败！` + s.msg);
				}
			});
		});
	},
}];
gf.bindBtns("div.doc-buttons", tempBtns);

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
		colkey: seq.index,
		name: seq.name,
		hide: seq.hide,
	});
}

_columns.push({
	colkey: "updatetime",
	name: "时间",
	hide: true,
	renderData: function (rowindex, data, rowdata, column) {
		return "创建：" + new Date(rowdata.createtime).format("yyyy-MM-dd hh:mm:ss") + "<br/>"
			+ "更新：" + new Date(rowdata.updatetime).format("yyyy-MM-dd hh:mm:ss");
	}
});

_columns.push({
	colkey: "status",
	name: "状态",
	renderData: function (rowindex, data, rowdata, column) {
		return gv.get("ACS_STATUS", data) + gf.rowDisplay(rowdata);
	}
});
window.datagrid = dataGrid({
	pagId: 'paging',
	columns: _columns,
	jsonUrl: '/transfer/detail/findByPage.shtml?transferDetailFormMap.paperid=' + paperid,
	checkbox: true,
	serNumber: true
});
$("html").addClass("small");