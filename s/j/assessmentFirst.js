$(document).ready(function() {
	$("#start").click(function() {
		if (window.confirm("确认开始评审？")) {
			changeFlag("6");
		} else {
			return false;
		}
	});
	$(".save").click(save);

	$("#find").click(function(){
		var flag = false;
		var condition = $("#condition").val();
		var dataNum = $("#hidden_data_num").val() * 1;
		var employeeid = $("#hidden_data_employeeid").val();
		var coincodes = new Array();
		var coincode1 =0;
		$("#tab4 tr:gt(0) td.coincode input.coincodes").each(function(i){
			var coincode = $(this).val();
			coincodes [i] =coincode;
			coincode1 =coincodes[i];
			if(condition==coincode1){
				window.location.href = findDetailURL + '&level=2&struts=3&coincode='
				+ condition + '&dataNum=' + dataNum + '&employeeid=' + employeeid+'&entitytype='+$('#hidden_entitytype').val(),
				'detailsPage';
				return flag;
			}
		});
		if (condition!=coincode1) {
			alert("请输入正确的评品编号！");
			flag =true;
			return flag;
		}
	});

	var internalstates = $("#internalstates").val();
	if (internalstates == '6') {
		$("#start").hide();
	}
});

function save(parm) {
	var score = $("#score_" + parm).val();
	if(score.trim()=='' || score==null){
		alert("分数不能为空！");
		return false;
	}
	if (checkScore(parm,score) == false) {
		return false;
	}
	var id = $("#requestcoinid_" + parm).val();
	var score = $("#score_" + parm).val();
	var remark = $("#remarkscore_" + parm).val();
	var pubremark = $("#pubremark_" + parm).val();
	var difversion = $("#difversion_" + parm).val();
	var ratingreasondis = $("#ratingreasondis_" + parm).text();
	$.ajax({
		type : "POST",
		url : saveFirstScoreUrl,
		data : "score=" + score + "&remark=" + remark + "&pubremark="
				+ pubremark + "&id=" + id + "&difversion=" + difversion
				+ "&ratingreasondis=" + ratingreasondis,
		dataType : "text",
		success : function(msg) {
			if (msg == "ok") {
				$("#score_" + parm).css("border-color", "#CCC");
				$("#pubremark_" + parm).css("border-color", "#CCC");
				alert("评审成功!");
			} else {
				alert("评审失败！");
			}
		},
		error : function(msg) {
			alert(msg);
		}
	});
}

function assessmentFirstUpload(parm, employeeid) {
	var coinsize = $("#hidden_data_num").val() * 1;
	var requestid = $("#hidden_coininfolist_requestid").val();
	window.open(uploadImgtURL + '&myaction=upload' + '&num=' + parm
			+ '&employeeid=' + employeeid + '&type=2&struts=3&level=2'
			+ '&coinsize=' + coinsize + '&requestid=' + requestid
			+'&entitytype='+$('#hidden_entitytype').val());
}

function changeFlag(flag) {
	var id = $("#id").val();
	$.post(updateAssessmentUrl + '&status=' + flag + '&id=' + id,
			function(data) {
				if (data.result == 'ok') {
					if (flag == '6') {
						// alert("评审开始");
						parent.location.reload();
					} else {
						// alert("评审结束");
						return;
					}
				} else {
					alert("操作失败");
					alert(date.result);
				}
			});
}

function coinno_info(coinno, employeeid) {
	var dataNum = $("#hidden_data_num").val() * 1;
	window.location.href = findDetailURL + '&serviceid=' + serviceid
			+ '&level=2&struts=3&coincode=' + coinno + '&dataNum=' + dataNum
			+ '&employeeid=' + employeeid+'&entitytype='+$('#hidden_entitytype').val(), 'detailsPage';
};

function checkScore(param,score) {
	var score = $("#score_" + param).val();
	if (score != null) {
		if (score >= -2 && score <= 100) {
			if (/^[1-99]+\.?\d{0,2}$/.test(score)|| score == -2 || score == -1 || score == 0) {
				return true;
			} else {
				alert("输入错误");
				$("#score_" + param).val("");
				return false;
			}
		} else {
			alert("输入错误");
			$("#score_" + param).val("");
			return false;
		}
	} else {
		return false;
	}
}

function checkFindNum(findnum, coinsize) {
	if (findnum != "") {
		if (coinsize * 1 < findnum * 1) {
			alert("此钱币不存在");
			$("#txt_findnum").val("");
			return false;
		} else if (findnum.length == 3 && /^\d{0,3}$/.test(findnum)
				&& findnum * 1 > 0) {
			return true;
		} else {
			alert("请输入正确编号");
			$("#txt_findnum").val("");
			return false;
		}
	} else {
		return false;
	}
}

$(document).ready(function() {
	$("#tab4 tr:gt(0) input:checkbox").each(function() {
		$(this).removeAttr("checked");
	});
	var dataNum = $("#hidden_data_num").val() * 1;
	var employeeid = $("#hidden_data_employeeid").val();
	$("#condition").keypress(
			function(event) {
				var condition = $(this).val();
				if (event.keyCode == 13) {
					if (condition.length != 0) {
						window.location.href = findDetailURL
								+ '&level=2&struts=3&coincode=' + condition
								+ '&dataNum=' + dataNum + '&employeeid='
								+ employeeid+'&entitytype='+$('#hidden_entitytype').val(), 'detailsPage';
					}
				}
			});
	$("#btn_saveAll").click(function() {
						var end = $("#tab4 tr").length;
						var json = [];
						var chk_module_value = new Array();
						var checked_row = $("#tab4 tr:gt(0) input:checkbox:checked");
						if (checked_row.length > 0) {
							$("#tab4 tr:gt(0) input:checkbox").each(function() {
								if ($(this).attr("checked")) {
									chk_module_value.push($(this).val());

								}
							});
							for ( var i = 0; i < chk_module_value.length; i++) {
								var id = $(
										"#requestcoinid_" + chk_module_value[i])
										.val();
								var score = $("#score_" + chk_module_value[i])
										.val();
								var remark = $(
										"#remarkscore_" + chk_module_value[i])
										.val();
								var ratingreasondis = $(
										"#ratingreasondis_"
												+ chk_module_value[i]).text();
					//			alert(chk_module_value[i]+"----"+ratingreasondis);
								var pubremark = $(
										"#pubremark_"
												+ chk_module_value[i]).val();
								var difversion = $(
										"#difversion_" + chk_module_value[i])
										.val();
								json[i] = "{'id':'" + id + "','score':'"
										+ score + "','ratingreasondis':'"
										+ ratingreasondis + "','pubremark':'"
										+ pubremark + "','remark':'" + remark
										+ "','difversion':'" + difversion
										+ "'}";
								if (serviceid == '真品鉴定') {
									if (!checkZpjd(score, ratingreasondis)) {
										if (confirm("此单评级类型为真品鉴定。编号为"
												+ $(
														"#requestcoinid_"
																+ chk_module_value[i])
														.parent()
														.find(
																"a[id*='coinno_a']")
														.html()
												+ "的币，评分分数大于0，或者评分分数等于0且评分理由不为真品，是否继续？")) {

										} else {
											return;
										}
										;
									}
									;
								}
								;
							}
							var coins = "[" + json + "]";
							// alert(coins);
							$("#tab4").css("display", "none");
							$("#tabs_loading").css("display", "");
							$.post(batchsaveFirstScoreUrl, {
								coins : coins
							}, function(data) {
								$("#tabs_loading").css("display", "none");
								$("#tab4").css("display", "");
								if (data == "ok") {
									alert("保存成功！");
									for ( var i = 0; i < end - 1; i++) {
										$("#score_" + i)
												.css("border-color", "");
										$("#pubremark_" + i).css(
												"border-color", "");
									}
									$("#tab4 tr:gt(0) input:checkbox").each(
											function() {
												$(this).removeAttr("checked");
											});
									$("#all_checkbox").removeAttr("checked");
								} else {
									alert("请检查数据！");
								}
							});
						} else {
							alert("请选择！");
						}
					});
	$("#find_uploaded_imgs").click(
					function() {
						var requestCode = $("#hidden_data_requestcode").val();
						var coinsize = $("#hidden_data_num").val();
						var employeeid = $("#hidden_data_employeeid").val();
						var type = "2";
						var struts = "3";
						// alert(requestCode+"-------"+coinsize+"-------"+employeeid);
						$.post(
										basePath + "/servlet/FindImgs",
										{
											coincode : requestCode + "001",
											employeeid : employeeid,
											coinsize : coinsize,
											type : type,
											struts : struts
										},
										function(data) {
											data = eval(data);
											new Dialog(
													'<div style="background:#CCC;height:100%; width:95%; margin:20px;">'
															+ '<div style="margin:20px;">编号    '
															+ requestCode
															+ '<input size="3" type="text" id="txt_findnum" value="001"/>'
															+ '<input type="button" value="查看" style="margin:20px;" id="div_find">'
															+ '<input type="button" style="margin:20px;" value="上一枚" id="div_find_last">'
															+ '<input type="button" value="下一枚" id="div_find_next"></div>'
															+ '<div id="div_imgs_list" style="margin:20px;" ></div>'
															+ '</div>').show();
											var html = '<ul style="list-style-type:none;">';
											$
													.each(
															data,
															function(i) {
																html += '<li style="height:100px; width:100px;float:left;text-align:center;margin-left:10px;"><p style="line-height:80px;">';
																html += '<a data-gallery="" download="'
																		+ data[i].name
																		+ '" title="'
																		+ data[i].name
																		+ '" href="'
																		+ data[i].image_l
																		+ '"><img src="'
																		+ data[i].image_s
																		+ '"/></a></p>';
																html += '<p style="line-height:10px;margin-top:-7px;"><a data-gallery="" download="'
																		+ data[i].name
																		+ '" title="'
																		+ data[i].name
																		+ '" href="'
																		+ data[i].image_l
																		+ '">'
																		+ data[i].name
																		+ '</a></p></li>';
															});
											html += '</ul>';
											$("#div_imgs_list").html(html);
											// 回车
											$("#txt_findnum")
													.keypress(
															function(event) {
																if (event.keyCode == 13) {
																	var findnum = $(
																			"#txt_findnum")
																			.val();
																	if (checkFindNum(
																			findnum,
																			coinsize)) {
																		submitFindImg(
																				requestCode
																						+ findnum,
																				employeeid,
																				coinsize,
																				type,
																				struts);
																	}
																}
															});
											// 点击查看
											$("#div_find")
													.click(
															function() {
																var findnum = $(
																		"#txt_findnum")
																		.val();
																if (checkFindNum(
																		findnum,
																		coinsize)) {
																	submitFindImg(
																			requestCode
																					+ findnum,
																			employeeid,
																			coinsize,
																			type,
																			struts);
																}
															});
											$("#div_find_last")
													.click(
															function() {
																var findnum = $(
																		"#txt_findnum")
																		.val();
																if (checkFindNum(
																		findnum,
																		coinsize)) {
																	if (findnum > 1) {
																		findnum--;
																		if (findnum < 10) {
																			findnum = "00"
																					+ findnum;
																		} else {
																			findnum = "0"
																					+ findnum;
																		}
																		submitFindImg(
																				requestCode
																						+ findnum,
																				employeeid,
																				coinsize,
																				type,
																				struts);
																		$(
																				"#txt_findnum")
																				.val(
																						findnum);
																	} else {
																		alert("已经是第一枚了");
																	}
																}
															});
											$("#div_find_next")
													.click(
															function() {
																var findnum = $(
																		"#txt_findnum")
																		.val();
																if (checkFindNum(
																		findnum,
																		coinsize)) {
																	if (findnum * 1 < coinsize * 1) {
																		findnum++;
																		if (findnum < 10) {
																			findnum = "00"
																					+ findnum;
																		} else {
																			findnum = "0"
																					+ findnum;
																		}
																		submitFindImg(
																				requestCode
																						+ findnum,
																				employeeid,
																				coinsize,
																				type,
																				struts);
																		$(
																				"#txt_findnum")
																				.val(
																						findnum);
																	} else {
																		alert("已经是最后一枚了");
																	}
																}
															});
										});
					});
	$("#btn_close_win").click(function() {
		window.close();
	});
});