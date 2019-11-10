import { gf } from "/s/buss/g/j/g.f.js";

export var findTransferDetail = function (key, callback) {
	gf.ajax('/app/conf/get.shtml?table=TRANSFER_DETAILS', { key: key }, "json", function (s) {
		var info = [];
		for (var item of s) {
			info.push(item.value);
		}
		if (!info) { info = "未找到执行信息！"; }
		callback(info.join("<br/>"));
	});
};

export var findTransferDetailObj = function (key, callback) {
	gf.ajax('/app/conf/get.shtml?table=TRANSFER_DETAILS', { key: key }, "json", function (s) {
		callback(s);
	});
};