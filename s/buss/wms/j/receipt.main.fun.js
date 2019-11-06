import { gf } from "/s/buss/g/j/g.f.js";

export var findAlloc = function (paperid, callback) {
	gf.ajax('/bd/conf.shtml?table=RECEIPT_ALLOC_ITEM', { key: paperid }, "json", function (s) {
		var info = "";
		for (var item of s) {
			info = info + item.value + "<br/>";
		}
		if (!info) { info = "未找到执行信息！"; }
		callback(info);
	});
};