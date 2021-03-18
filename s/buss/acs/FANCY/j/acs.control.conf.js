import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";

export const
	ITEM_MSG = {
		key: 'msg', target: 'div#msgContainer', title: "消息"
	},
	ITEM_TASK = {
		key: 'task', target: 'div#taskContainer', url: "/s/buss/sys/conf/h/agv.cache.html", init: true, height: "50%", width: "80%", title: "缓存任务",
	},
	ITEM_LOGIN = {
		key: 'login', target: 'div#loginContainer', url: "/s/buss/g/h/loginSuccess.html", init: true, height: "450px", width: "300px", whenInit: () => {
			window.addEventListener("loginFail", function (data) {
				if ($("#loginHideDiv").hasClass("close"))
					$("#loginHideDiv").trigger("click");
			}, false);
		}, title: "登录",
	},
	TEST_FANCY_AGV = {
		key: 'test', container: "bottomRightCtrlContainer", target: 'div#testContainer', url: "/s/buss/acs/fancy/h/agv.test.html", init: true, height: "50%", width: "80%", title: "调试工具",
	};

export let renderModelConfs = () => {
	let confs = [];
	if (localStorage.projectKey != 'LAO_FOXCONN') {
		confs.push({ key: 'agvs', target: 'div#agvDiv', title: "车辆列表" });
	}
	if (![''].includes(localStorage.projectKey))
		confs.push({ key: 'setup', target: 'div#controlContainer', title: "设置" });

	switch (localStorage.projectKey) {
		case 'LAO_FOXCONN':
			confs.push(ITEM_MSG, ITEM_LOGIN);
			break;
		case 'TAIKAI_JY':
			confs.push(ITEM_MSG);
			break;
		case 'CSY_DAJ':
			confs.push(
				{ key: 'charge', target: 'div#chargeContainer' },
				{ key: 'windowCenter', target: 'div#windowCenterContainer' },
				{ key: 'window', target: 'div#windowContainer' },
				{ key: 'wms', target: 'div#wmsContainer' },
				ITEM_MSG
			);
			break;
		case 'CSY_CDBP':
			confs.push(ITEM_TASK, ITEM_MSG);
			break;
		case 'HONGFU_ZHENMU':
			confs.push(ITEM_MSG);
			break;
		case 'YZBD_NRDW':
			// confs.push({key:'tongji',target: 'div#tongjiContainer'});
			confs.push({ key: 'search', target: 'div#searchContainer' },
				{ key: 'shipment', target: 'div#shipmentContainer', title: "出库" },
				{ key: 'receipt', target: 'div#receiptContainer', title: "入库" },
				{
					key: 'POS', target: "none", click: function () {
						let value = $(this).hasClass("close");
						gf.ajax("/de/acs/toggleCargoPos.shtml", { value: value }, 'json', (data) => { gflayer.obj().msg((value ? "显示" : "隐藏") + "坐标"); });
					}, title: "坐标显隐"
				},
				{ key: 'PDA', target: 'div#PDAContainer', title: "PDA" },
				{ type: 'LINK', key: 'manager', url: '/s/buss/g/h/manager.html', self: true, title: "返回管理界面" });
			break;
		case 'YZBD_QSKJ':
			confs.push(ITEM_TASK, ITEM_LOGIN);
			break;
		case 'QDTY_SELF':
			ITEM_TASK.container = "bottomLeftCtrlContainer";
			ITEM_TASK.width = "35%";
			confs.push(ITEM_TASK, ITEM_MSG, ITEM_LOGIN);
			break;
		case 'KFKJ_SELF':
			ITEM_TASK.container = "bottomLeftCtrlContainer";
			ITEM_TASK.width = "35%";
			confs.push(ITEM_TASK, ITEM_MSG, ITEM_LOGIN);
			break;
		default:
			break;
	}
	return confs;
};