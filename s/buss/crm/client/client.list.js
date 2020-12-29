import "/s/j/vue/vue.min.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { allocData } from "./client.render.list.data.js";
import { allocRender } from "./client.render.list.work.js";
import "/s/buss/crm/client/client.event.js";
import { renderModel } from "/s/buss/g/j/g.banner.control.js";
import { ITEM_LOGIN } from "/s/buss/acs/FANCY/j/acs.control.conf.js";

let confs = [ITEM_LOGIN];
confs.push({ type: "LAYER", url: "/s/buss/crm/client/client.add.html", key: 'add', target: 'div#addContainer', height: "90%", width: "90%" });
renderModel(confs);

let _conf = { numInLine: 2, target: "table.alloc" };
let _search = {};
let allocDataUdf = () => {
	allocData((data) => {
		allocRender(data, _conf);
	}, _search);
};

var vm = new Vue({
	el: "#kw",
	computed: {
		bigSearchResult: function () {
			var val = localStorage.bigSearchResult;
			return val ? val : "";
		}
	}, methods: {
		inputFun: function (e) {
			allocDataUdf();
		}
	}
});

setInterval(function () {
	if ($("#simple-2").is(":checked")) {
		allocDataUdf();
	}
}, 5000);

setTimeout(function () {
	allocDataUdf();
}, 500);

setTimeout(function () {
	gf.resizeTable();
}, 1000);