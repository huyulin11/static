class GV {
	_init() {
		$.ajax({
			url: '/bd/info.shtml',
			async: true,
			type: 'GET',
			dataType: 'json',
			timeout: 1000,
			cache: false,
			success: function (data) {
				var str = JSON.stringify(data.role);
				localStorage.setItem("role", str);
				str = JSON.stringify(data.dict);
				localStorage.setItem("dic", str);
				str = JSON.stringify(data.res);
				localStorage.setItem("res", str);
			}
			// 成功执行方法
		});
	}

	__getTS = (type) => {
		if (!gv._dic) { gv._dic = jQuery.parseJSON(localStorage.getItem("dic")); }
		return gv._dic.filter(function (e) { return e.type == type; });
	};

	get(type, key) {
		var o = gv.__getTS(type);
		var v = o.find((v) => { return v.key == key });
		if (!v) return "";
		return v.value;
	};

	getT(type) {
		return gv.__getTS(type);
	};

	getALS(type, key) {
		var o = gv.__getTS(type);
		return o.find((v) => { return v.key == key }).alias;
	};

	getObj(type, key) {
		var o = gv.__getTS(type);
		return o.find((v) => { return v.key == key }).value;
	};

	getRole(key) {
		if (!gv._role) { gv._role = jQuery.parseJSON(localStorage.getItem("role")); }
		var o = gv._role.find((v) => { return v.id == key });
		return (!o) ? "" : o.rolename;
	};

	getCurrentRole() {
		var role = '';
		jQuery.ajax({
			url: "/getRole.shtml",
			type: "post",
			dataType: "json",
			async: false,
			success: function (data) {
				role = data;
			}
		});
		return role;
	};

	getRes(key) {
		if (!gv._res) { gv._res = jQuery.parseJSON(localStorage.getItem("res")); }
		var o = gv._res.find((v) => { return v.id == key });
		return (!o) ? "" : o.name;
	};

	getSite(key) {
		var o = gv._site.find((v) => { return v.id == key });
		return (!o) ? "" : o.sitename;
	};

	getArmact(key) {
		var o = gv._armact.find((v) => { return v.id == key });
		return (!o) ? "" : o.armactname;
	};

	operator(userid) {
		var operator = "";
		if (userid == null) {
			return operator;
		}
		$.ajax({
			url: '/si/operator.shtml',
			async: false,
			type: 'GET',
			dataType: 'json',
			timeout: 1000,
			cache: false,
			data: {
				"userid": userid
			},
			success: function (data) {
				operator = data[0]["userName"];
			}
			// 成功执行方法
		});
		return operator;
	};
}
var gv = new GV();
gv._init();
gv.globalLayerArea = ($(window).width() < 960) ? ["95%", "90%"] : ["720px", "80%"];
window.gv = gv;
window.globalLayerArea = gv.globalLayerArea;
export { gv };