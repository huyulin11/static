import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container, tableLap, tableSite;

var renderLap = function (item) {
	var tmpStr = "";
	var disabled = "";
	for (let i in item) {
		tmpStr += ` data-${i}='${item[i]}' `;
	}
	tmpStr = `<td><div><button ${tmpStr} ${disabled}>${item.lapName}</button></div></td>`;
	return tmpStr;
}

var renderSite = function (item) {
	var tmpStr = "";
	var disabled = "";
	for (let i in item) {
		tmpStr += ` data-${i}='${item[i]}' `;
	}
	tmpStr = `<td><div><button ${tmpStr} ${disabled}>${item.sitename}</button></div></td>`;
	return tmpStr;
}

export var init = function (target) {
	container = $(target);
	tableLap = container.append("<table id='laps'></table>");
	$.ajax({
		url: '/s/jsons/' + localStorage.projectKey + '/laps.json',
		async: false,
		type: 'GET',
		dataType: 'json',
		timeout: 5000,
		cache: false,
		success: function (data) {
			let conf = { data: data, numInLine: 4, render: renderLap, target: tableLap };
			gf.renderBtnTable(conf);
		},
		error: function (e) { console.log(e); }
	});
	tableSite = container.append("<table id='sites'></table>");
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
}

var transportHandler = function (that, before) {
	if (before) { if (!before()) { return; } }
	var targetSite = prompt("请输入有效的目标站点编号！");
	doTask(agvId, $(that).attr("id"), targetSite);
}
