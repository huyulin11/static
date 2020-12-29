import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { renderCss } from "/s/buss/g/j/g.css.js";

{
	let csss = [];
	csss.push({
		name: "div.rf-op td", content: {
			"height": "40px",
		},
	}, {
		name: "div.rf-op input,div.rf-op select", content: {
			"font-size": "20px",
		},
	}
	);
	renderCss("clientcss", 'body', csss);
}

let container = "#rootContainer";
let _key = gf.urlParam("key");

Vue.directive('focus', {
	inserted: function (el) {
		el.focus()
	}
})

var vm = new Vue({
	data: {
		姓名: null,
		电话: null,
		公司: null,
		状态: null,
	},
	el: container,
	created: function () {
		if (!_key) {
			this.状态 = "基础";
			return;
		}
		gf.doAjax({
			url: '/app/conf/get.shtml',
			data: {
				table: 'CRM_CLIENTS', key: _key
			},
			success: function (data) {
				let json = JSON.parse(data);
				let value = JSON.parse(json[0].value);
				vm.姓名 = value.姓名;
				vm.电话 = value.电话;
				vm.公司 = value.公司;
				vm.状态 = value.状态;
			}
		});
	},
	methods: {
		save() {
			if (!this.姓名 || !this.电话 || !this.公司 || !this.状态) {
				$("#姓名").focus();
				layer.msg("姓名、电话、公司、状态不能为空！");
				return;
			};
			let json = {
				姓名: this.姓名, 电话: this.电话,
				公司: this.公司, 状态: this.状态
			};
			gf.doAjax({
				url: '/app/conf/set.shtml',
				data: {
					table: 'CRM_CLIENTS', key: _key, value: JSON.stringify(json)
				},
				success: function (data) {
					gf.defaultSucFun(data);
					if (!_key) vm.clear();
				}
			});
			this.clear();
		},
		clear() {
			vm.姓名 = null;
			vm.电话 = null;
			vm.公司 = null;
			vm.状态 = "基础";
		},
		enter() {
			this.save();
		}
	}
})