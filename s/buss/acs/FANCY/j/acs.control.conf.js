import { gf } from "/s/buss/g/j/g.f.js";
import { gflayer } from "/s/buss/g/j/g.f.layer.js";

export const
	ITEM_MSG = {
		key: 'msg', target: 'div#msgContainer'
	},
	ITEM_TASK = {
		key: 'task', target: 'div#taskContainer', url: "/s/buss/sys/conf/h/agv.cache.html", init: true, height: "50%", width: "80%",
	},
	ITEM_LOGIN = {
		key: 'login', target: 'div#loginContainer', url: "/s/buss/g/h/loginSuccess.html", init: true, height: "450px", width: "300px", whenInit: () => {
			window.addEventListener("loginFail", function (data) {
				if ($("#loginHideDiv").hasClass("close"))
					$("#loginHideDiv").trigger("click");
			}, false);
		},
	};

export let renderModelConfs = () => {
	let confs = [];
	if (localStorage.projectKey != 'LAO_FOXCONN') {
		confs.push({ key: 'agvs', target: 'div#agvDiv' });
	}
	if (![''].includes(localStorage.projectKey))
		confs.push({ key: 'setup', target: 'div#controlContainer' });
	if (localStorage.projectKey == 'LAO_FOXCONN') {
		confs.push(ITEM_MSG, ITEM_LOGIN);
	} else if (localStorage.projectKey == 'TAIKAI_JY') {
		confs.push(ITEM_MSG);
	} else if (localStorage.projectKey == 'CSY_DAJ') {
		confs.push(
			{ key: 'charge', target: 'div#chargeContainer' },
			{ key: 'windowCenter', target: 'div#windowCenterContainer' },
			{ key: 'window', target: 'div#windowContainer' },
			{ key: 'wms', target: 'div#wmsContainer' },
			ITEM_MSG
		);
	} else if (localStorage.projectKey == 'CSY_CDBP') {
		confs.push(ITEM_TASK, ITEM_MSG);
	} else if (localStorage.projectKey == 'HONGFU_ZHENMU') {
		confs.push(ITEM_MSG);
	} else if (localStorage.projectKey == 'YZBD_NRDW') {
		// confs.push({key:'tongji',target: 'div#tongjiContainer'});
		confs.push({ key: 'search', target: 'div#searchContainer' },
			{ key: 'shipment', target: 'div#shipmentContainer' },
			{ key: 'receipt', target: 'div#receiptContainer' },
			{
				key: 'POS', target: "none", click: function () {
					let value = $(this).hasClass("close");
					gf.ajax("/de/acs/toggleCargoPos.shtml", { value: value }, 'json', (data) => { gflayer.obj().msg((value ? "显示" : "隐藏") + "坐标"); });
				}
			},
			{ key: 'PDA', target: 'div#PDAContainer' },
			{ type: 'LINK', key: 'manager', url: '/s/buss/g/h/manager.html', self: true });
	} else if (localStorage.projectKey == 'YZBD_QSKJ') {
		confs.push(ITEM_TASK, ITEM_LOGIN);
	} else if (localStorage.projectKey == 'QDTY_SELF') {
		ITEM_TASK.container = "bottomCtrlContainer";
		ITEM_TASK.width = "35%";
		confs.push(ITEM_TASK, ITEM_MSG, ITEM_LOGIN);
	}
	return confs;
};