import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";

var agvId = currentAgvId;
let container, _target;

var renderLap = function (item) {
	var tmpStr = ` class='flag' data-name='${item.lapName}' `;
	var disabled = "";
	for (let i in item) {
		tmpStr += ` data-${i}='${item[i]}' `;
	}
	tmpStr = `<div><button ${tmpStr} ${disabled}>${item.lapName}</button></div>`;
	return tmpStr;
}

var renderSite = function (item) {
	var tmpStr = ` class='flag' data-name='${item.sitename}' `;
	var disabled = "";
	for (let i in item) {
		tmpStr += ` data-${i}='${item[i]}' `;
	}
	tmpStr = `<div><button ${tmpStr} ${disabled}>${item.sitename}</button></div>`;
	return tmpStr;
}

export var init = function (target) {
	_target = target;
	container = $(target);
	let tableLap = $("<table id='laps'></table>");
	container.append("<span>依次选择站点</span>");
	container.append(tableLap);
	// $.ajax({
	// 	url: '/s/jsons/' + localStorage.projectKey + '/laps.json',
	// 	async: false,
	// 	type: 'GET',
	// 	dataType: 'json',
	// 	timeout: 5000,
	// 	cache: false,
	// 	success: function (data) {
	// 		let conf = { data: data, numInLine: 4, render: renderLap, target: tableLap };
	// 		gf.renderBtnTable(conf);
	// 	},
	// 	error: function (e) { console.log(e); }
	// });
	let tableSite = $("<table id='sites'></table>");
	container.append(tableSite);
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
	let chooedBtns = $(`<span id='chooedBtns'></span>`);
	container.append(chooedBtns);

	let ops = $(`<div id='ops'><button>下达任务</button></div>`);
	container.append(ops);

	let targetArr = new Array();
	container.delegate("button.flag", "click", function () {
		var that = this;
		var data = that;//$(that).data();
		if ($(that).hasClass("choosed")) {
			$(that).removeClass("choosed");
			let a = targetArr.indexOf(data);
			targetArr.splice(a, 1);
		} else {
			$(that).addClass("choosed");
			targetArr.push(data);
		}
		let nameArr = [];
		for (let item of targetArr) {
			nameArr.push($(item).html());
		}
		chooedBtns.html("选中的站点：" + nameArr.join("、"));
	});

	var transportHandler = function (that) {
		if (targetArr.length <= 0) { gf.layerMsg("没有选中需要操作的站点！"); return; }
		let arrSub = [];
		for (let item of targetArr) {
			let json = $(item).data("json");
			arrSub.push({ flag: $(item).data("flag"), site: json.name || $(item).html(), id: $(item).data("id"), arriveact: 'WAITING', name: $(item).html() });
		}
		if (window.confirm("确定下达此任务？")) {
			layer.msg(taskexe.addTaskTo(agvId, "TRANSPORT", JSON.stringify(arrSub)));
		}
	}
	container.delegate("#ops>button", "click", () => { transportHandler(); });
}