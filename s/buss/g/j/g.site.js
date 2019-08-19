import { gv } from "/s/buss/g/j/g.v.js";

$(function () {
	var _sd;

	gv.SOCKET_DEV_INFO = new Object();
	var current = gv.SOCKET_DEV_INFO;

	var _getTS = function (type) {
		if (type < 0) { return _sd; }
		return _sd.filter(function (e) { return e.type == type; });
	};

	current.getT = function (type) {
		return _getTS(type);
	};

	current.get = function (type, key) {
		var o = _getTS(type);
		var s = o.find((v) => { return v.key == key })
		var value = s.value;
		if (s && !value) { value = "" + s.ip + ":" + s.port; }
		return value;
	};

	var _init = function () {
		_initSD();
	};


	var _initSD = function () {
		$.ajax({
			url: '/iotinfo/socketdev/findAllPage.shtml',
			async: true,
			type: 'GET',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function (data) {
				data = data.records;
				var str = JSON.stringify(data);
				str = str.replace(/\"devtype\"/g, "\"type\"");
				str = str.replace(/\"id\"/g, "\"key\"");
				str = str.replace(/\"name\"/g, "\"value\"");
				_sd = jQuery.parseJSON(str);
			}, error: function (e) {
				console.log(e);
			}
		});
	};

	_init();
});
