import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";

var agvId = currentAgvId;
let targetArr = new Array();
let container, _target, _currentSite = localStorage.currentSite;
if (_currentSite) console.log("currentSite:" + _currentSite);
let limit = 3;

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
			nameArr.push(`<span data-id='${$(item).data("id")}'>
			${$(item).data("name")}${gv.select("ARRIVED_SITE_ACT_TYPE", "S")}
			</span>`);
		}
		chooedBtns.html(nameArr.join("-->"));
	}

	var renderSite = function (item) {
		let currentFlag = item.id == _currentSite;
		var tmpStr = ` class='flag ${currentFlag ? "choosed" : ""}' data-name='${item.sitename}' `;
		var disabled = "";
		for (let i in item) {
			tmpStr += ` data-${i}='${item[i]}' `;
		}
		let btn = `<button ${tmpStr} ${disabled}>${item.sitename}<br/>${currentFlag ? "当前站点" : ""}</button>`;
		if (currentFlag) { targetArr.push($(btn)); showPath(); }
		tmpStr = `<div>${btn}</div>`;
		return tmpStr;
	}

	$.ajax({
		url: '/s/jsons/' + localStorage.projectKey + '/sites.json',
		async: false,
		type: 'GET',
		dataType: 'json',
		timeout: 5000,
		cache: false,
		success: function (data) {
			let conf = { data: data, numInLine: 8, render: renderSite, target: tableSite };
			gf.renderBtnTable(conf, () => {
				gf.resizeTable();
			});
		},
		error: function (e) { console.log(e); }
	});

	container.delegate("button.flag", "click", function () {
		var that = this;
		var data = that;//$(that).data();
		if ($(that).hasClass("choosed")) {
			if ($(that).data("id") == _currentSite) {
				layer.msg("当前站点无法选择！");
				return;
			}
			$(that).removeClass("choosed");
			let a = targetArr.indexOf(data);
			targetArr.splice(a, 1);
		} else {
			if (localStorage.projectKey == "CSY_CDBP" && targetArr.length >= limit) { gf.layerMsg(`选中需要操作的站点数不能超过${limit}个！`); return; }
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
			arrSub.push({
				arrivedact: arrivedact, site: json.name || $(item).data("name"),
				id: $(item).data("id"), name: $(item).data("name")
			});
		} console.log(JSON.stringify(arrSub));
		if (window.confirm("确定呼叫车辆？")) {
			layer.msg(taskexe.addTaskTo(agvId, "TRANSPORT", JSON.stringify(arrSub)));
		}
	}
	container.delegate("#ops>button", "click", () => { transportHandler(); });
}