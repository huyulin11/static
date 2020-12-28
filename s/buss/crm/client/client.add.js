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
		company: null,
		status: null,
	},
	el: container,
	methods: {
		save() {
			if (!this.name || !this.phone || !this.company || !this.status) {
				$("#name").focus();
				layer.msg("姓名、电话、公司、状态不能为空！");
				return;
			};
			let json = {
				姓名: this.name, 电话: this.phone,
				公司: this.company, 状态: this.status
			};
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