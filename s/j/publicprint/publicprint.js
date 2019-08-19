function checkstartCode(startCode) {
	if (startCode == "") {
		alert("起始编号不能为空");
		return false;
	} else if (isNaN(startCode)) {
		alert("钱币编号格式有误，不能打印");
		$("#coinNoStart").val("");
		return false;
	} else {
		return true;
	}
}
function checkendCode(endCode, startCode) {
	var startvalue = startCode
			.substring(startCode.length - 3, startCode.length) * 1;
	if (endCode == "") {
		alert("结束编号不能为空");
		return false;
	} else if (isNaN(endCode)) {
		alert("钱币编号格式有误，不能打印");
		$("#coinNoEnd").val("");
		return false;
	} else if (endCode > 0 && endCode <= 999) {
		if (endCode >= startvalue) {
			return true;
		} else {
			alert("结束编号不能小于起始编号");
			$("#coinNoEnd").val("");
			return false;
		}
	} else {
		alert("编号过大");
		$("#coinNoEnd").val("");
		return false;
	}
}
$(function() {
	$("#btn_parcel_print").click(
			function() {
				var packNo = $("#txt_parcel").val();
				if (packNo == "") {
					alert("包裹编号为空,不可打印！");
					return false;
				}
				var LODOP = getLodop(document.getElementById('LODOP_OB'),
						document.getElementById('LODOP_EM'));
				LODOP.PRINT_INIT("包裹编号打印");
				LODOP.SET_PRINT_PAGESIZE("1", 370, 270, "包裹编号打印纸");
				LODOP.ADD_PRINT_BARCODE(5, 0, 130, 70, "Code93", "P" + packNo);
				// LODOP.PREVIEW();
				LODOP.PRINT();
				$("#txt_parcel").val("");
			});
	$("#btn_requisitionNo_print").click(
			function() {
				var reqCode = $("#txt_requisitionNo").val();
				if (reqCode == "") {
					alert("申请单号为空,不可打印！");
					return false;
				}
				var LODOP = getLodop(document.getElementById('LODOP_OB'),
						document.getElementById('LODOP_EM'));
				LODOP.PRINT_INIT("申请单号打印");
				LODOP.SET_PRINT_PAGESIZE("1", 370, 270, "申请单号打印纸");
				LODOP
						.ADD_PRINT_BARCODE(15, 0, 138, 68, "Code93", "R"
								+ reqCode);
				// LODOP.PREVIEW();
				LODOP.PRINT();
				$("#txt_requisitionNo").val("");
			});
	$("#btn_coinNo_print").click(
			function() {
				var coinCode = $("#txt_coinNo").val();
				if (coinCode == "") {
					alert("钱币编号为空,不可打印！");
					return false;
				}
				var LODOP = getLodop(document.getElementById('LODOP_OB'),
						document.getElementById('LODOP_EM'));
				LODOP.PRINT_INIT("钱币编号打印");
				LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
				LODOP.ADD_PRINT_BARCODE(15, 20, 147, 68, "Code93", coinCode);

				LODOP.PRINT();
				coinCode = $("#txt_coinNo").val("");
			});

	$("#coinNoStart").focus(function() {
		$(this).select();
	}).blur(function() {
		var startCode = $("#coinNoStart").val();
		checkstartCode(startCode);
	});
	$("#coinNoEnd").focus(function() {
		$(this).select();
	}).blur(function() {
		var startCode = $("#coinNoStart").val();
		var endCode = $("#coinNoEnd").val();
		if (checkstartCode(startCode)) {
			checkendCode(endCode, startCode);
		}
	});
	$("#btn_batch_print").click(
			function() {
				var startCode = $("#coinNoStart").val();
				var endCode = $("#coinNoEnd").val();
				if (checkstartCode(startCode)) {
					if (checkendCode(endCode, startCode)) {
						var LODOP = getLodop(document
								.getElementById('LODOP_OB'), document
								.getElementById('LODOP_EM'));
						LODOP.PRINT_INIT("钱币编号打印");
						var startvalue = startCode.substring(
								startCode.length - 3, startCode.length) * 1;
						for ( var i = startvalue; i <= endCode; i++) {
							var num = endCode - i + startCode * 1;
							LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
							LODOP.ADD_PRINT_BARCODE(15, 20, 147, 68, "Code93",
									num);
							// LODOP.PREVIEW();
							LODOP.PRINT();
						}
					}
				}
			});
	$("#btn_requisition_print")
			.click(
					function() {
						var parm = $("#txt_requisitionNo").val();
						if (parm == "") {
							alert("申请单号为空,不可打印！");
						} else {
							window
									.open(
											reviewURL
													+ '&myaction=RequestDetail'
													+ '&requestcode=' + parm,
											'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
						}
					});
	$("#btn_statement_print")
			.click(
					function() {
						var parm = $("#txt_requisitionNo").val();
						if (parm == "") {
							alert("申请单号为空,不可打印！");
						} else {
							var LODOP = getLodop(document
									.getElementById('LODOP_OB'), document
									.getElementById('LODOP_EM'));
							LODOP.PRINT_INIT("对账单打印");
							LODOP.SET_PRINT_PAGESIZE("1", "210mm", "297mm",
									"申请单打印纸");
							$
									.post(
											backPath
													+ 'group/coin/stock?p_p_id=stock_WAR_coinportlet&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=printInStock&p_p_cacheability=cacheLevelPage&p_p_col_id=column-3&p_p_col_count=1&reqCode='
													+ parm, function(data) {
												var content = data.split("|");
												// if(content[1]<=23){
												// LODOP.ADD_PRINT_HTM(0,-20,"210mm","297mm",content[0]);
												// LODOP.PREVIEW();
												// }else{
												// LODOP.ADD_PRINT_HTM(0,-20,"210mm","297mm",content[2]);
												// LODOP.PREVIEW();
												// }
												if (content[2] <= 23) {
													var html = content[0]
															+ content[1];
													LODOP.ADD_PRINT_HTM(0, -20,
															"210mm", "297mm",
															html);
													LODOP.PREVIEW();
												} else {
													var html = content[0]
															+ content[3];
													LODOP.ADD_PRINT_HTM(0, -20,
															"210mm", "297mm",
															html);
													LODOP.PREVIEW();
												}
											});
						}

					});

	// 打印外部标签
	$(".btn_cointag_print").click(printTag);
	$("#txt_cointag").focus(function() {
		$(this).val("");
	});
	$("#btn_checklist_print")
			.click(
					function() {
						var reqCode = $("#txt_checklistNO").val();
						if (reqCode == "") {
							alert("申请单号为空,不可打印！");
						} else {
							// http://localhost:8080 10221
							var LODOP = getLodop(document
									.getElementById('LODOP_OB'), document
									.getElementById('LODOP_EM'));
							LODOP.PRINT_INIT("核对清单打印");
							LODOP.SET_PRINT_PAGESIZE("1", "210mm", "297mm",
									"申请单打印纸");
							$
									.post(
											backPath
													+ '/group/coin/common?p_p_id=hear_WAR_coinportlet&p_p_lifecycle=2&p_p_state=pop_up&p_p_mode=view&p_p_resource_id=printInventory&p_p_cacheability=cacheLevelPage&controlPanelCategory=portlet_hear_WAR_coinportlet&reqCode='
													+ reqCode, function(data) {
												var content = data.split("|");
												if (content[2] <= 35) {
													var html = content[0]
															+ content[1];
													LODOP.ADD_PRINT_HTM(0, -20,
															"210mm", "297mm",
															html);
													LODOP.PREVIEW();
												} else {
													var html = content[0]
															+ content[3];
													LODOP.ADD_PRINT_HTM(0, -20,
															"210mm", "297mm",
															html);
													LODOP.PREVIEW();
												}
											});
						}
					});
});

function checkReqcode(requestCode, btnId) {
	var flag = "E";
	var errMsg = "请检查申请单！";
	if ($.trim(requestCode).length > 0) {
	} else {
		alert("申请单号为空,不可打印！");
		return flag;
	}
	$
		.ajax({
				type : "post",
				url : checkRequestUrl,
				data : "&requestCode=" + requestCode,
				async : false,
				success : function(data) {
					data = eval('(' + data + ')');
					if (data.requestCoinNum > 0) {
						if (btnId == "btn_cointag_print") {
							if (!(data.entitytype == "1")) {
								flag = "E";
								errMsg = "老版打印仅适用于金银币！";
							} else {
								flag = "1";
							}
						} else if (btnId == "btn_cointag_new_print") {
							if ((data.entitytype == "1"
									|| data.entitytype == "2"
									|| data.entitytype == "3" 
									|| data.entitytype == "4"
									|| data.entitytype == "5")) {
								flag = data.entitytype;
							}
						}
					}
				}
			});
	if (flag == "E") {
		alert(errMsg);
	}
	return flag;
}

function printTag() {
	var entitytype = checkReqcode($("#txt_cointag").val(), $(this).attr('id'));
	var requestCode = $("#txt_cointag").val();
	if (!(entitytype == "E")) {
		printouttag(requestCode, entitytype, findCoinInfoUrl);
	}
}