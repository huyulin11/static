import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";

Vue.directive('focus', {
	inserted: function (el) {
		el.focus()
	}
})

var vm = new Vue({
	data: {
		name: null,
		phone: null,
	},
	el: container,
	methods: {
		save() {
			if (!this.name || !this.phone) {
				$("#name").focus();
				layer.msg("姓名或电话不能为空！");
				return;
			};
			let json = { 姓名: this.name, 电话: this.phone };
			gf.doAjax({
				url: '/app/conf/set.shtml',
				data: {
					table: 'CRM_CLIENTS', keyGeneral: 'DATETIME', value: JSON.stringify(json)
				}
			});
			this.clear();
		},
		clear() {
			this.msg = null
		},
		enter() {
			this.save();
		}
	}
})