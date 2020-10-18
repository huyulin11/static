import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";

var agvId = currentAgvId;
let targetArr = new Array();
let container, _target, _currentSite = localStorage.currentSite;
if (_currentSite) console.log("currentSite:" + _currentSite);
let limit = 3;
if (localStorage.projectKey == "CSY_CDBP") { limit = 3; }
else if (localStorage.projectKey == "YZBD_QSKJ") { limit = 2; }
let showSiteWorkChoose = true;
if (localStorage.projectKey != "CSY_CDBP") { showSiteWorkChoose = false; }

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

	var renderSite = function (item) {
		let json = item.jsonObject;
		if (json) {
			let hide = json.hide;
			if (hide) { return null; }
		}
		let currentFlag = item.id == _currentSite;
		var tmpStr = ` class='flag ${currentFlag ? "current" : ""}' data-name='${item.sitename}' `;
		var disabled = "";
		for (let i in item) {
			tmpStr += ` data-${i}='${item[i]}' `;
		}
		let btn = `<button ${tmpStr} ${disabled}>${item.sitename}<br/>${currentFlag ? "当前站点" : ""}</button>`;
		// if (currentFlag) { targetArr.push($(btn)); showPath(); }
		tmpStr = `<div>${btn}</div>`;
		return tmpStr;
	}

	gv.getSite(function (data) {
		let conf = { data: data, numInLine: 5, render: renderSite, target: tableSite };
		gf.renderBtnTable(conf, () => {
			gf.resizeTable();
		});
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
			if (targetArr.length >= limit) { gf.layerMsg(`选中需要操作的站点数不能超过${limit}个！`); return; }
			$(that).addClass("choosed");
			targetArr.push(data);
		}
		showPath();
	});

	var transportHandler = function (that) {
		if (targetArr.length <= 0) { gf.layerMsg("没有选中需要操作的站点！"); return; }
		if (targetArr.length > limit) { gf.layerMsg(`选中需要操作的站点数不能超过${limit}个！`); return; }
		let arrSub = [];
		for (let item of targetArr) {
			let json = $(item).data("json");
			let arrivedact = $("#chooedBtns").find(`span[data-id='${$(item).data("id")}']>select`).val();
			if (!arrivedact) { arrivedact = "S"; }
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