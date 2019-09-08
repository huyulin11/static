import { lyGrid } from "/s/j/lyGrid.js";

window.datagrid = lyGrid({
	id: 'paging',
	l_column: [{
		colkey: "id",
		renderData: function (rowindex, data, rowdata, column) {
			return '<span style="display:none">' + data + '</span>'
		}
	}, {
		colkey: "innerno",
		name: "内部流转号",
	}, {
		colkey: "entitytype",
		name: "藏品类型",
		renderData: function (rowindex, data, rowdata, column) {
			if (data == '1') {
				return '金银币';
			} else if (data == '2') {
				return '纸币';
			} else if (data == '3') {
				return '古钱';
			} else if (data == '4') {
				return '邮票';
			} else if (data == '5') {
				return '机制币';
			} else {
				return '未知类型';
			}
		}
	}, {
		colkey: "aliasname",
		name: "藏品名称"
	}, {
		colkey: "amount",
		name: "预约数量"
	}, {
		colkey: "numreal",
		name: "实际数量",
		renderData: function (rowindex, data, rowdata, column) {
			return '<input type="text" tabindex="0" size="5" name="JudgeResult.numreal" readonly="true" value="' + data + '">'
		}
	}, {
		colkey: "numtestok",
		name: "合格量",
		renderData: function (rowindex, data, rowdata, column) {
			return '<p><span>合&nbsp;&nbsp;&nbsp;格</span><input type="text" size="5" name="JudgeResult.numtestok" readonly="true" value="' + data + '"></p>'
		}
	}, {
		colkey: "numtestnotok",
		name: "不合格量",
		renderData: function (rowindex, data, rowdata, column) {
			return '<p><span>不合格</span><input type="text" size="5" name="JudgeResult.numtestnotok" readonly="true" value="' + data + '"></p>'
		}
	}, {
		colkey: "numtestunjudged",
		name: "未评量",
		renderData: function (rowindex, data, rowdata, column) {
			return '<p><span>未评</span><input type="text" size="5" name="JudgeResult.numtestunjudged" readonly="true" value="' + data + '"></p>'
		}
	}, {
		colkey: "deposittime",
		name: "受理时间",
		renderData: function (rowindex, data, rowdata, column) {
			return data == '' ? '' : new Date(data).format("yyyy-MM-dd hh:mm:ss");
		}
	}, {
		colkey: "remark",
		name: "备注",
	}, {
		colkey: "illustrate",
		name: "鉴定结果说明",
	}, {
		colkey: "opuserid",
		name: "评鉴人",
	}, {
		colkey: "depositstate",
		renderData: function (rowindex, data, rowdata, column) {
			return '<span style="display:none">' + data + '</span>'
		}
	}],
	jsonUrl: '/judge/search.shtml'
});
$("#start").click("click", function () {
	var depositclassid = $('td:eq(2)').text();
	var depositstate = $('td:eq(15)').text();
	$.ajax({
		url: "/judge/changeCom.shtml",
		type: "post",
		data: {
			"depositclassid": depositclassid,
			"depositstate": depositstate
		},
		dataType: "json",
		success: function () {
			$(":input").removeAttr("readonly").css("background", "white");
			$(".m-b-md").css('display', 'block');
		},
	})
});
$("#comfirmResult").click("click", function () {
	debugger;
	var depositclassid = $('td:eq(2)').text();
	var numreal = $('td:eq(7) input').val();
	var numtestok = $('td:eq(8) input').val();
	var numtestnotok = $('td:eq(9) input').val();
	var numtestunjudged = $('td:eq(10) input').val();
	var depositstate = 6;
	$.ajax({
		url: "/judge/comfirmResult.shtml",
		type: "post",
		data: {
			"depositclassid": depositclassid,
			"numreal": numreal,
			"numtestok": numtestok,
			"numtestnotok": numtestnotok,
			"numtestunjudged": numtestunjudged,
			"depositstate": depositstate
		},
		dataType: "json",
		success: function (result) {
			if (result == true) {
				layer.confirm('复核完成!请关闭窗口?', function (index) {
					parent.datagrid.loadData();
					parent.layer.close(parent.pageii);
					return false;
				});
			}
		},
		error: function () {
			alert("复核失败");
		}
	})
});