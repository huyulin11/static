import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gfbtn } from "/s/buss/g/j/g.f.btn.js";
import { gv } from "/s/buss/g/j/g.v.js";

var agvId = currentAgvId;
let targetArr = new Array();
let container, _target, _currentSite = localStorage.currentSite;
if (_currentSite) console.log("currentSite:" + _currentSite);

let _oneTimeLimit = 3, _numInLine = 5, showSiteWorkChoose = false;
switch (localStorage.projectKey) {
	case "CSY_CDBP":
		_oneTimeLimit = 3; showSiteWorkChoose = true; break;
	case "YZBD_QSKJ":
		_oneTimeLimit = 2; break;
	case "QDTY_SELF":
		_oneTimeLimit = 5; _numInLine = 8; if (!gf.isPc()) _numInLine = 4; break;
	default:
		break;
}

export var init = function (target) {
	_target = target;
	container = $(target);
	let tableSite = $("<table id='sites'></table>");
	container.append(tableSite);
	let chooedBtns = $(`<span id='chooedBtns'></span>`);
	container.append(chooedBtns);
	let ops = $(`<div id='ops'><button>呼叫车辆</button></div>`);
	container.append(ops);

	let showPath = () => {
		let nameArr = [];
		for (let item of targetArr) {
			let chooseOpType = '';
			if (showSiteWorkChoose) { chooseOpType = gv.select("ARRIVED_SITE_ACT_TYPE", "S"); }
			nameArr.push(`<span data-id='${$(item).data("id")}'>
			${$(item).data("name")}${chooseOpType}</span>`);
		}
		chooedBtns.html(nameArr.join("→"));
	}

	gv.getSite(function (data) {
		var _renderSite = function (item) {
			let json = item.jsonObject;
			let inner = item.sitename;
			let btn = $(`<button ${disabled}></button>`);
			if (json) {
				let hide = json.hide;
				if (hide) { return null; }
				let agvIds = json.agvIds;
				if (agvIds) {
					inner += `<br/><span class='currenttip'>${agvIds}</span>`;
					$(btn).attr("title", `限制AGV执行：${agvIds}`);
					$(btn).data('agvids', agvIds);
					if (currentAgvId && !agvIds.split(',').includes('' + currentAgvId)) { return null; }
				}
			}
			let currentFlag = item.id == _currentSite;
			$(btn).addClass('flag'); if (currentFlag) $(btn).addClass('current');
			$(btn).data('name', item.sitename);
			var disabled = "";
			for (let i in item) {
				$(btn).data(i, item[i]);
			}
			inner += `<br/><span class='currentsite'>${currentFlag ? "当前站点" : ""}</span>`;
			$(btn).html(inner);
			let div = $(`<div></div>`);
			$(div).append(btn);
			return div;
		}
		gfbtn.renderBtnTable({ data: data, numInLine: _numInLine, render: _renderSite, target: tableSite, callback: () => gf.resizeTable() });
	});

	container.delegate("button.flag", "click", function () {
		var that = this;
		var data = that;//$(that).data();
		if ($(that).hasClass("choosed")) {
			// if ($(that).data("id") == _currentSite) {
			// 	layer.msg("当前站点无法选择！");
			// 	return;
			// }
			$(that).removeClass("choosed");
			let a = targetArr.indexOf(data);
			targetArr.splice(a, 1);
		} else {
			let check = (obj) => {
				return $(obj).data('agvids');
			}
			let thisAgvCheck = check(this);
			if (thisAgvCheck && targetArr.some((e) => {
				return check(e) && thisAgvCheck != check(e);
			})) {
				gf.layerMsg(`不能同时选择限定AGV不一致的站点！`); return;
			}
			if (targetArr.length >= _oneTimeLimit) {
				gf.layerMsg(`选中需要操作的站点数不能超过${_oneTimeLimit}个！`); return;
			}
			$(that).addClass("choosed");
			targetArr.push(data);
		}
		showPath();
	});

	var transportHandler = function (that) {
		if (targetArr.length <= 0) { gf.layerMsg("没有选中需要操作的站点！"); return; }
		if (targetArr.length > _oneTimeLimit) { gf.layerMsg(`操作的站点数不能超过${_oneTimeLimit}个！`); return; }
		let arrSub = [];
		for (let item of targetArr) {
			let json = $(item).data("json");
			let arrivedact = $("#chooedBtns").find(`span[data-id='${$(item).data("id")}']>select`).val();
			if (!arrivedact) {
				arrivedact = "S";
				if (localStorage.projectKey == 'QDTY_SELF')
					arrivedact = "W";
			}
			arrSub.push({
				arrivedact: arrivedact, id: $(item).data("id")
			});
		} console.log(JSON.stringify(arrSub));
		if (window.confirm("确定呼叫车辆？")) {
			taskexe.addTaskTo(agvId, "TRANSPORT", JSON.stringify(arrSub), function (data) {
				alert(data.msg);
				window.location.reload();
			});
		}
	}
	container.delegate("#ops>button", "click", () => { transportHandler(); });
}