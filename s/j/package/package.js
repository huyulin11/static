import { lyGrid } from "/s/j/lyGrid.js";

window.datagrid = lyGrid({
	id: 'paging',
	l_column: [{
		colkey: "id",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].id" style="display:none" value="' + data + '">';
		}
	}, {
		colkey: "innerno",
		name: "内部流转号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].innerno" size="7" style="border:none;width:auto;text-align:center" readonly = "readonly" value="' + data + '">';
		}
	}, {
		colkey: "entityid",
		name: "藏品编号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].entityid" style="border:none;width:auto;text-align:center" readonly = "readonly" value="' + data + '">';
		}
	}, {
		colkey: "aliasname",
		name: "藏品名称",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].aliasname" style="border:none;width:auto;text-align:center" readonly = "readonly" value="' + data + '">';
		}
	}, {
		name: "藏品数量",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" size="5" style="text-align: right" name="packageMainlist[' + (rowindex - 1) + '].amount"/><span>个</span>'
		}
	}, {
		name: "箱号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" size="7" name="packageMainlist[' + (rowindex - 1) + '].packageid"/>'
		}
	}, {
		name: "内封条号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<textarea name="packageMainlist[' + (rowindex - 1) + '].sealinner"></textarea>'
		}
	}, {
		name: "外封条号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" size="7" name="packageMainlist[' + (rowindex - 1) + '].sealouter"/>'
		}
	}, {
		name: "封签号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" size="7" name="packageMainlist[' + (rowindex - 1) + '].sealsigh"/>'
		}
	}, {
		name: "客户封条号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" size="7" name="packageMainlist[' + (rowindex - 1) + '].sealbyuser"/>'
		}
	}, {
		name: "新增",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="button" value="✚" style="color:red" class="add" name="' + (rowindex - 1) + '"/>'
		}
	}],
	jsonUrl: '/judge/showpackage.shtml',
});
$(".add").live("click", function () {
	var id = $(this).parent().parent().find('td').eq(2).find('input').val();
	var inn = $(this).parent().parent().find('td').eq(3).find('input').val();
	var ent = $(this).parent().parent().find('td').eq(4).find('input').val();
	var ali = $(this).parent().parent().find('td').eq(5).find('input').val();
	var rowindex = $(this).prop("name");
	rowindex++;
	var tr = '<tr style="line-height:27px;" d-tree="1-1">'
	tr += '<td style="text-align: center; width: 15px; display: none;">1</td>'
	tr += '<td style="text-align: center; width: 28px; display: none;">'
	tr += '<input type="checkbox" cid="undefined" pid="undefined" _l_key="checkbox" value="undefined">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" name="packageMainlist[' + rowindex + '].id" style="display:none" value="' + id + '">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" name="packageMainlist[' + rowindex + '].innerno" size="7" style="border:none;width:width:auto;text-align:center" readonly = "readonly" value="' + inn + '">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" name="packageMainlist[' + rowindex + '].entityid" style="border:none;width:auto;text-align:center" readonly = "readonly" value="' + ent + '">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" name="packageMainlist[' + rowindex + '].aliasname" style="border:none;width:width:auto;text-align:center" readonly = "readonly" value="' + ali + '">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" size="5" style="text-align: right" name="packageMainlist[' + rowindex + '].amount">'
	tr += '<span>个</span>'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" size="7" name="packageMainlist[' + rowindex + '].packageid">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<textarea name="packageMainlist[' + rowindex + '].sealinner"></textarea>'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" size="7" name="packageMainlist[' + rowindex + '].sealouter">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" size="7" name="packageMainlist[' + rowindex + '].sealsigh">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="text" size="7" name="packageMainlist[' + rowindex + '].sealbyuser">'
	tr += '</td>'
	tr += '<td style="text-align:center;width: auto;vertical-align: middle;">'
	tr += '<input type="button" value="✚" style="color:red" class="add" name="' + rowindex + '">'
	tr += '</td>'
	tr += '</tr>'
	$(this).hide();
	$("table").eq(0).append(tr);
});

$("#surepackage").click("click", function () {
	var r = confirm("是否确认封箱？")
	if (r == true) {
		$("#sealingform").submit();
		alert("封箱完成");
	} else {
		return false;
	}
});