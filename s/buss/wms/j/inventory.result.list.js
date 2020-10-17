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
		columns: [{
			colkey: "key",
			name: "已盘点条码",
			fenyeInTail: true
		}],
	});
}