import { gf } from "/s/buss/g/j/g.f.js";

let call = (key2, callback) => {
	let json = JSON.parse(localStorage.APP_COL_NAME);
	if (callback) callback(json[key2]);
	let arr = json.filter((e) => { return e.key == key2 });
	if (!arr || arr == [] || arr.length == 0) { return ""; }
	return arr[0].value;
}

class GCOL {
	init() {
		$.ajax({
			url: '/s/jsons/' + localStorage.projectKey + '/appColName.json',
			async: false,
			type: 'GET',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function (data) {
				localStorage.APP_COL_NAME = JSON.stringify(data);
			},
			error: function (e) { console.log(e); }
		});
	};
	getColName(key, callback) {
		if (!localStorage.APP_COL_NAME) {
			this.init();
		}
		return call(key, callback);
	}

}
var gcol = new GCOL();
window.gcol = gcol;
gcol.init();
export { gcol };