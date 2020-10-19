import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { initConfList } from "/s/buss/g/j/template.conf.table.js";

export let init = function () {
	let paperid = gf.urlParam("paperid");
	if (!paperid) {
		gf.layerMsg("请定义盘点单号！");
		return;
	}
	initConfList("inventory_result_" + paperid, {
		checkbox: false,
		jsonColumn: 'value',
		columns: [{
			colkey: "key",
			name: "已盘点条码"
		}, {
			colkey: "lot",
			name: "批次号"
		}, {
			colkey: "skuname",
			name: "物料名称"
		}],
		fenyeInTail: true,
	});
}