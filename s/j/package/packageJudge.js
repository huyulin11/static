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
	jsonUrl: '/judge/showPackageJudge.shtml',
});

$(".save").click("click", function () {
	var formid = $(".formid").val();
	var packageid = $(".packageid").val();
	var amount = $(".amount").val();
	var totalamount = $(".totalamount").val();
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

$("#surepackage").click("click", function () {
	var r = confirm("是否确认结束封箱？")
	if (r == true) {
		var id = $(".formid").val();
		var packageid = $(".packageid").val();
		$.ajax({
			url: "/p/packageChange.shtml",
			type: "post",
			data: {
				"id": id,
				"packageid": packageid
			},
			dataType: "json",
			success: function (result) {
				if (result == "ok") {
					parent.datagrid.loadData();
					parent.layer.close(parent.pageii);
				}
				if (result == "unfinished") {
					alert("请先进行保存操作");
				}
				if (result == "error") {
					alert("数据异常，请联系管理员");
				}
			},
			error: function () {
				alert("保存封箱失败");
			}
		})
	} else {
		return false;
	}

});
$("#printpackage").live('click',
	function (e) {
		// 这里可得到鼠标X坐标
		var pointX = e.clientX - 1050;
		// 这里可以得到鼠标Y坐标
		var pointY = e.clientY + 10;
		var param = $(this).attr("packageid");
		$.ajax({
			type: "POST",
			url: "${deliveryDetailShowURL}",
			data: "packageid=" + param,
			dataType: "text",
			success: function (data) {
				if (data != '') {
					$("#printpackageinfo div.printpackageinfoshow").html(data);
					$("#printpackageinfo").show(50).css({
						right: pointX,
						top: pointY
					});
					return false;//阻止冒泡
				} else {
					alert("暂无信息。");
				}
			},
			error: function (data) {
				alert(data);
			}
		});
	}).live("focus", function () {
		$("#printpackageinfo").hide();
	});

$("#printpackage").click(function () {
	var packageid = $(".packageid").val();
	var number = $(".amount").val() || "";
	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
		.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("钱币箱号打印");
	if (number > 1) {
		for (var i = 0; i < number; i++) {
			LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
			LODOP
				.ADD_PRINT_BARCODE(15, 20, 130, 68, "128Auto", packageid);
			LODOP.PRINT();
		}
	} else {
		LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币箱号打印");

		LODOP.ADD_PRINT_BARCODE(15, 20, 130, 68, "128Auto", packageid);
		LODOP.PRINT();
	}
})