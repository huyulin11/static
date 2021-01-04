import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js?f=crmv000001";
import { StringUtils } from "/s/buss/g/j/g.string.util.js";

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
		职位: null,
		电话: null,
		公司: null,
		状态: null,
		备注: null,
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
				vm.职位 = value.职位;
				vm.电话 = value.电话;
				vm.公司 = value.公司;
				vm.状态 = value.状态;
				vm.备注 = StringUtils.textShow(value.备注);
			}
		});
	},
	methods: {
		checkNull() {
			if (!this.姓名 || !this.电话 || !this.公司 || !this.职位) {
				if (!this.姓名) {
					$("#姓名").focus();
				} else if (!this.职位) {
					$("#职位").focus();
				} else if (!this.电话) {
					$("#电话").focus();
				} else if (!this.公司) {
					$("#公司").focus();
				}
				layer.msg("姓名、电话、公司、职位不能为空！");
				return false;
			};
			return true;
		},
		save() {
			let checkNullFlag = this.checkNull();
			if (!checkNullFlag) {
				return;
			};
			let json = {
				姓名: this.姓名, 职位: this.职位, 电话: StringUtils.trimAll(this.电话),
				公司: this.公司, 状态: this.状态, 备注: StringUtils.textSave(this.备注),
			};
			gf.doAjax({
				url: '/app/conf/set.shtml',
				data: {
					table: 'CRM_CLIENTS', key: _key, value: JSON.stringify(json)
				},
				whenSuccess: () => {
					gf.refreshEvent();
					// if (!_key) vm.clear();
					parent.layer.close(parent.pageii);
				}
			});
		},
		clear() {
			vm.姓名 = null;
			vm.职位 = null;
			vm.电话 = null;
			vm.公司 = null;
			vm.备注 = null;
			vm.状态 = "基础";
		},
		close() {
			parent.layer.close(parent.pageii);
		},
		enter() {
			this.save();
		}
	}
})