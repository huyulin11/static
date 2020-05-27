import { currentAgvId } from '/s/buss/acs/FANCY/j/agv/agv.id.js';
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { findIotInfo } from "/s/buss/acs/FANCY/j/iot.info.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container, table;

var renderOne = function (item) {
	var tmpStr = "";
	if (item.delflag == '0') {
		var disabled = "";
		var showInfo;
		if (item.text) {
			showInfo = item.text;
		} else {
			showInfo = "位" + item.id;
		}
		tmpStr = "<td><div><button "
			+ "data-id='" + item.id + "'"
			+ " data-rowId='" + item.rowId + "'"
			+ " data-colId='" + item.colId + "'"
			+ " data-zId='" + item.zId + "'"
			+ " data-text='" + item.text + "'"
			+ " data-num='" + item.num + "'"
			+ " data-status='" + item.status + "'"
			+ " data-skuid='" + item.skuId + "'"
			+ disabled + ">" + item.lapName
			+ "</button></div></td>";
	}
	return tmpStr;
}

export var init = function (target) {
	container = $(target);
	table = container.append("<table></table>");
	$.ajax({
		url: '/s/jsons/' + localStorage.projectKey + '/lap.json',
		async: false,
		type: 'GET',
		dataType: 'json',
		timeout: 5000,
		cache: false,
		success: function (data) {
			let conf = { data: data, numInLine: 4, render: renderOne, target: table };
			gf.renderBtnTable(conf);
		},
		error: function (e) { console.log(e); }
	});
}

var transportHandler = function (that, before) {
	if (before) { if (!before()) { return; } }
	var targetSite = prompt("请输入有效的目标站点编号！");
	doTask(agvId, $(that).attr("id"), targetSite);
}
