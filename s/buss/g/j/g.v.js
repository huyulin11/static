class gv {
	constructor() {
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
				this._readyNum++;
			}
			// 成功执行方法
		});
	}

	static isReady() {
		return this._readyNum >= 1;
	}

	static __getTS = (type) => {
		if (!this._dic) { this._dic = jQuery.parseJSON(localStorage.getItem("dic")); }
		return this._dic.filter(function (e) { return e.type == type; });
	};

	static get(type, key) {
		var o = this.__getTS(type);
		var v = o.find((v) => { return v.key == key });
		if (!v) return "";
		return v.value;
	};

	static getT(type) {
		return this.__getTS(type);
	};

	static getALS(type, key) {
		var o = this.__getTS(type);
		return o.find((v) => { return v.key == key }).alias;
	};

	static getObj(type, key) {
		var o = this.__getTS(type);
		return o.find((v) => { return v.key == key }).value;
	};

	static getRole(key) {
		if (!this._role) { this._role = jQuery.parseJSON(localStorage.getItem("role")); }
		var o = this._role.find((v) => { return v.id == key });
		return (!o) ? "" : o.rolename;
	};

	static getCurrentRole() {
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

	static getRes(key) {
		if (!this._res) { this._res = jQuery.parseJSON(localStorage.getItem("res")); }
		var o = this._res.find((v) => { return v.id == key });
		return (!o) ? "" : o.name;
	};

	static getSite(key) {
		var o = this._site.find((v) => { return v.id == key });
		return (!o) ? "" : o.sitename;
	};

	static getArmact(key) {
		var o = this._armact.find((v) => { return v.id == key });
		return (!o) ? "" : o.armactname;
	};

	static operator(userid) {
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

window.gv = gv;
export { gv };