import { gf } from "/s/buss/g/j/g.f.js";

export var findAlloc = function (paperid, callback) {
	gf.ajax('/app/conf/get.shtml?table=RECEIPT_ALLOC_ITEM', { key: paperid }, "json", function (s) {
		var info = [];
		for (var item of s) {
			info.push(item.value);
		}
		if (!info) { info = "未找到执行信息！"; }
		callback(info.join("<br/>"));
	});
};

export var findAllocObj = function (paperid, callback) {
	gf.ajax('/app/conf/get.shtml?table=RECEIPT_ALLOC_ITEM', { key: paperid }, "json", function (s) {
		callback(s);
	});
};