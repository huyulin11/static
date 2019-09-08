import { lyGrid } from "/s/j/lyGrid.js";

window.datagrid = lyGrid({
	id: 'paging',
	l_column: [{
		colkey: "id",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].id" style="display:none" class="formid" value="' + data + '">';
		}
	}, {
		colkey: "requestcode",
		name: "申请单号",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].requestcode" class="packageid" size="7" style="border:none;width:auto;text-align:center" readonly = "readonly" value="' + data + '">';
		}
	}, {
		colkey: "totalamount",
		name: "藏品数量",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].totalamount" style="border:none;width:auto;text-align:center" readonly = "readonly" class="totalamount" value="' + data + '">';
		}
	}, {
		colkey: "amount",
		name: "封箱数量",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" size="5" style="text-align: right" name="packageMainlist[' + (rowindex - 1) + '].amount" class="amount" value="' + data + '"/><span>个</span>';
		}
	}, {
		colkey: "userid",
		name: "封箱人",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="text" name="packageMainlist[' + (rowindex - 1) + '].userid" class="createuserid" style="border:none;width:auto;text-align:center" readonly = "readonly" value="' + operatorname + '">';
		}
	}, {
		name: "操作",
		renderData: function (rowindex, data, rowdata, cloumn) {
			return '<input type="button" name="packageMainlist[' + (rowindex - 1) + '].save" class="save" style="text-align: center;color:blue" value="保存">';
		}
	}],
	jsonUrl: '/p/packages.shtml',
	checkbox: true,
});

$(".save").click("click", function () {
	var formid = $(this).parent().parent().find("td").eq(2).find("input").val();
	var packageid = $(this).parent().parent().find("td").eq(3).find("input").val();
	var amount = $(this).parent().parent().find("td").eq(5).find("input").val();
	var totalamount = $(this).parent().parent().find("td").eq(4).find("input").val();
	$.ajax({
		url: "/p/packageInfo.shtml",
		type: "post",
		data: {
			"formid": formid,
			"packageid": packageid,
			"amount": amount,
			"totalamount": totalamount
		},
		dataType: "json",
		success: function (result) {
			if (result != 0) {
				$(".save").css("color", "red");
				parent.datagrid.loadData();
				alert("保存封箱完成");
			}
		},
		error: function () {
			alert("保存封箱失败")
		}
	})
})

$("#allpackage").click("click", function () {
	allpackage();
})

function allpackage() {
	var cbox = window.datagrid.getSelectedCheckbox();
	var res = 0;
	if (cbox == "") {
		layer.msg("请选择保存项！！");
		return;
	}
	for (var i = 0; i < cbox.length; i++) {
		var formid = $("input[name='packageMainlist[" + i + "].id']").val();
		var packageid = $("input[name='packageMainlist[" + i + "].requestcode']").val();
		var amount = $("input[name='packageMainlist[" + i + "].amount']").val();
		var totalamount = $("input[name='packageMainlist[" + i + "].totalamount']").val();
		$.ajax({
			url: "/p/packageInfo.shtml",
			async: false,
			type: "post",
			data: {
				"formid": formid,
				"packageid": packageid,
				"amount": amount,
				"totalamount": totalamount
			},
			dataType: "json",
			success: function (result) {
				if (result != 0) {
					res++;
				};
			},
			error: function () {
				res;
			}
		})
	}
	if (res == cbox.length) {
		$(".save").css("color", "red");
		parent.datagrid.loadData();
		alert("保存封箱完成");
	} else {
		alert("保存封箱失败");
	}

}

$("#surepackage").click("click", function () {
	var r = confirm("是否确认封箱？")
	if (r == true) {
		var cbox = window.datagrid.getSelectedCheckbox();
		var res = 0;
		if (cbox == "") {
			layer.msg("请选择保存项！！");
			return;
		}
		for (var i = 0; i < cbox.length; i++) {
			var id = $("input[name='packageMainlist[" + i + "].id']").val();
			var packageid = $("input[name='packageMainlist[" + i + "].requestcode']").val();
			$.ajax({
				url: "/p/packageChange.shtml",
				async: false,
				type: "post",
				data: {
					"id": id,
					"packageid": packageid
				},
				dataType: "json",
				success: function (result) {
					if (result == "ok") {
						res++;
					}
					if (result == "unfinished") {
						res = -1;
					}
					if (result == "error") {
						res = -2;
					}
				},
				error: function () {
					res;
				}
			})
		}
		if (res == cbox.length) {
			parent.datagrid.loadData();
			parent.layer.close(parent.pageii);
		} else if (res == -1) {
			alert("请先进行保存操作");
		} else if (res == -2) {
			alert("数据异常，请联系管理员");
		} else {
			alert("保存封箱失败");
		}
	} else {
		return false;
	}

});
$("#printpackage").click(function () {
	var cbox = window.datagrid.getSelectedCheckbox();
	if (cbox == "") {
		layer.msg("请选择打印项！！");
		return;
	}
	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
		.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("钱币箱号打印");
	for (var i = 0; i < cbox.length; i++) {
		debugger;
		var packageid = $("input[name='packageMainlist[" + i + "].requestcode']").val();
		var number = $("input[name='packageMainlist[" + i + "].amount']").val() || "";
		if (number == '0' || number == '') {
			alert("请先输入箱数！");
			return;
		}
		for (var j = 0; j < number; j++) {
			LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
			LODOP
				.ADD_PRINT_BARCODE(15, 20, 130, 68, "128Auto", packageid);
			LODOP.PRINT();
		}

	}
})