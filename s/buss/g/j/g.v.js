import { gf } from "/s/buss/g/j/g.f.js";

class GV {
	init() {
		$.ajax({
			url: '/bd/info.shtml',
			async: true,
			type: 'GET',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function (data) {
				var str = JSON.stringify(data.role);
				localStorage.setItem("role", str);
				str = JSON.stringify(data.dict);
				localStorage.setItem("dic", str);
				str = JSON.stringify(data.res);
				localStorage.setItem("res", str);
				try {
					str = JSON.stringify(data.lap);
					localStorage.setItem("lap", str);
				} catch (error) {
				}
			}
		});
	}

	select(type, defalutVal, data) {
		let tmpOpStr = "";
		var all = this.__getTS(type);
		if (!all) { return ""; }
		for (let one of all) {
			tmpOpStr = tmpOpStr + "<option " + "value='" + one.key + "' "
				+ (one.key == defalutVal ? "selected='selected'" : "") + ">"
				+ one.value + "</option>";
		};
		return `<select class='${type}' ${gf.jsonToLabelData(data)}>${tmpOpStr}</select>`;
	}

	__getTS = (type) => {
		if (!this._dic) { this._dic = jQuery.parseJSON(localStorage.dic); }
		return this._dic.filter(function (e) { return e.type == type; });
	};

	get(type, key) {
		var o = this.__getTS(type);
		var v = o.find((v) => { return v.key == key });
		if (!v) return "";
		return v.value;
	};

	getT(type) {
		return this.__getTS(type);
	};

	getALS(type, key) {
		var o = this.__getTS(type);
		return o.find((v) => { return v.key == key }).alias;
	};

	getObj(type, key) {
		var o = this.__getTS(type);
		return o.find((v) => { return v.key == key }).value;
	};

	getRole(key) {
		if (!this._role) { this._role = jQuery.parseJSON(localStorage.role); }
		var o = this._role.find((v) => { return v.id == key });
		return (!o) ? "" : o.rolename;
	};

	getLap(key) {
		if (!this._lap) { this._lap = jQuery.parseJSON(localStorage.lap); }
		var o = this._lap.find((v) => { return v.id == key });
		return o;
	};

	getRes(key) {
		if (!this._res) { this._res = jQuery.parseJSON(localStorage.res); }
		var o = this._res.find((v) => { return v.id == key });
		return (!o) ? "" : o.name;
	};

	getSite(key) {
		var o = this._site.find((v) => { return v.id == key });
		return (!o) ? "" : o.sitename;
	};

	getArmact(key) {
		var o = this._armact.find((v) => { return v.id == key });
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
			timeout: 5000,
			cache: false,
			data: {
				"userid": userid
			},
			success: function (data) {
				operator = data[0]["userName"];
			}
		});
		return operator;
	};
}
var gv = new GV();
window.gv = gv;
export { gv };