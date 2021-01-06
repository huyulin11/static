import "/s/j/vue/vue.min.js";
import { data } from "./client.render.list.data.js?f=crmv000002";
import { render } from "./client.render.list.work.js?f=crmv000002";
import "/s/buss/crm/client/client.list.event.js?f=crmv000002";
import { gf } from "/s/buss/g/j/g.f.js?f=crmv000002";

let _conf = { numInLine: gf.isPc() ? 2 : 1, target: "div#target" };
let _search = {};
let dataUdf = () => {
	if ($("#showSelf").is(":checked")) {
		gf.currentUser((u) => {
			data((data) => {
				render(data, _conf);
			}, _search, u.id);
		});
	}
	data((data) => {
		render(data, _conf);
	}, _search);
};

// gf.addChooseFlag({ container: "#chooseflags", id: 'timeRefresh', name: '定时刷新' });
gf.addChooseFlag({ container: "#chooseflags", id: 'showDel', name: '显示删除', click: dataUdf });
gf.addChooseFlag({ container: "#chooseflags", id: 'showList', name: '显示清单', click: dataUdf });
gf.addChooseFlag({ container: "#chooseflags", id: 'showSelf', name: '仅看自己', defaultValue: true, click: dataUdf });
gf.addChooseFlag({ container: "#chooseflags", id: 'showType1', name: '仅看基础', click: dataUdf });

var vm = new Vue({
	el: "#kw",
	computed: {
		bigSearchResult: function () {
			var val = localStorage.bigSearchResult;
			return val ? val : "";
		}
	}, methods: {
		inputFun: function (e) {
			dataUdf();
		}
	}
});

setInterval(function () {
	if ($("#timeRefresh").is(":checked")) {
		dataUdf();
	}
}, 5000);

setTimeout(function () {
	dataUdf();
}, 500);

setTimeout(function () {
	gf.resizeTable();
}, 1000);

window.addEventListener("refresh", function (data) {
	dataUdf();
}, false);
window.addEventListener("loginSuccess", function (data) {
	$("#loginHideDiv").trigger("click");
	dataUdf();
}, false);