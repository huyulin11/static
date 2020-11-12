import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { initConfList } from "/s/buss/g/j/template.conf.table.js";

export let init = function () {
	// let paperid = gf.urlParam("paperid");
	// if (!paperid) {
	// 	gf.layerMsg("请定义盘点单号！");
	// 	return;
	// }
	initConfList("task_site_location", {
		checkbox: false,
		jsonColumn: 'value',
		columns: [{
			colkey: "key",
			name: "id"
		}, {
			colkey: "value",
			name: "location"
		}, {
			colkey: "updatetime",
			name: "更新时间"
		}],
		fenyeInTail: true,
	});
}