import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js?f=crmv000002";
import { StringUtils } from "/s/buss/g/j/g.string.util.js";
import { dataFull } from "./test.render.list.data.js?f=crmv000002";

let container = "#rootContainer";
let _key = gf.urlParam("key");

Vue.directive('focus', {
	inserted: function (el) {
		el.focus()
	}
})

var vm = new Vue({
	data: {
		项目名: null,
		客户名: null,
		位置: null,
		状态: null,
		备注: null,
		manager: null,
		责任人: null,
	},
	el: container,
	created: function () {
		if (!_key) {
			this.状态 = "良好";
			return;
		}
		gf.doAjax({
			url: '/app/conf/get.shtml',
			data: {
				table: 'CRM_TESTS', key: _key
			},
			success: function (data) {
				let json = JSON.parse(data);
				let value = JSON.parse(json[0].value);
				vm.项目名 = value.项目名;
				vm.客户名 = value.客户名;
				vm.位置 = value.位置;
				vm.状态 = value.状态;
				vm.manager = value.manager;
				vm.备注 = StringUtils.textShow(value.备注);
				if (vm.manager) {
					gf.doAjax({
						dataType: 'json',
						url: '/user/findOne.shtml',
						data: {
							"UserFormMap.id": vm.manager
						},
						success: (data) => {
							$("#rootContainer>h2").append(`<br/>（责任人：${data.userName}）`);
						}
					});
				}
			}
		});
	},
	methods: {
		checkNull() {
			if (!this.项目名 || !this.位置 || !this.客户名) {
				if (!this.项目名) {
					$("#项目名").focus();
				} else if (!this.客户名) {
					$("#客户名").focus();
				} else if (!this.位置) {
					$("#位置").focus();
				}
				layer.msg("项目名、客户名、位置不能为空！");
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
				项目名: this.项目名, 客户名: this.客户名,
				位置: this.位置, 状态: this.状态, 备注: StringUtils.textSave(this.备注),
			};
			let update = () => {
				gf.doAjax({
					url: '/app/conf/set.shtml',
					data: {
						table: 'CRM_TESTS', key: _key, value: JSON.stringify(json)
					},
					whenSuccess: () => {
						gf.refreshEvent();
						// if (!_key) vm.clear();
						parent.layer.close(parent.pageii);
					}
				});
			};
			if (!vm.manager) {
				gf.currentUser((user) => {
					json.manager = user.id;
					update();
				});
			} else {
				json.manager = vm.manager;
				update();
			}
		},
		clear() {
			vm.项目名 = null;
			vm.客户名 = null;
			vm.位置 = null;
			vm.备注 = null;
			vm.状态 = "良好";
		},
		close() {
			parent.layer.close(parent.pageii);
		},
		enter() {
			this.save();
		}
	}
})