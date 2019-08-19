$(document).ready(function() {
	$("#start").click(function() {
		if (confirm("确认制图开始？")) {
			changeFlag("4");
			$("#btn_display").css("display", "");
		} else {
			return false;
		}
	});
	$("#end").click(function() {
//		var isBlockNumOk=true;
//		$("#tab4 tr:gt(0)").find('td.blockNum').each(function(){
//			if($(this).html()==null||$(this).html().trim()==""){
//				isBlockNumOk=false;
//				return;
//			}
//		});
//		if(!isBlockNumOk){
//			alert("请补全币的冠号！");
//			return;
//		}
		
		if (confirm("确认制图结束？")) {
			var num = 0;
			var datarows = $("#tab4 tr").length - 1;
			for (var i = 0; i < datarows; i++) {
				var imgnum = $("#tab4 tr:eq(" + (i + 1) + ") td:last-child").text() * 1;
				if (imgnum < 2) {
					alert("你第" + (i + 1) + "枚币上传的图片不够！");
					break;
				} else {
					num++;
				}
			}
			if (num == datarows) {
				changeFlag("5");
			}
		} else {
			return false;
		}
	});

	var internalstates = $("#internalstates").val();
	if (internalstates == '4') {
		$("#start").hide();
		$("#btn_display").css("display", "");
	}
	$('#find').click(function() {
		var flag=false;
		var condition = $("#condition").val();
		var dataNum = $("#hidden_rowNum").val();
		var employeeid = $("#hidden_data_employeeid").val();
		var coincodes = new Array();
		var coincode1 =0;
		$("#tab4 tr:gt(0) td.coincode input").each(function(i){
			var coincode = $(this).val();
			coincodes [i] =coincode;
			coincode1 =coincodes[i];
			if(condition==coincode1){
				window.location.href = findDetailURL + '&level=1&struts=2&coincode=' + condition + '&dataNum=' + dataNum + '&employeeid=' + employeeid+'&entitytype='+$('#hidden_entitytype').val(), 'detailsPage';
				return flag;
			}
		});
		if (condition!=coincode1) {
			alert("请输入正确的评品编号！");
			flag =true;
			return flag;
		}
	});
	$("#condition").keypress(function(event) {
		var condition = $(this).val();
		if (event.keyCode == 13) {
			var dataNum = $("#hidden_rowNum").val() * 1;
			if (condition.length != 0) {
				var employeeid = $("#hidden_data_employeeid").val();
				window.location.href = findDetailURL + '&level=1&struts=2&coincode=' + condition + '&dataNum=' + dataNum + '&employeeid=' + employeeid+'&entitytype='+$('#hidden_entitytype').val(), 'detailsPage';
			}
		}

	});
	$("#find_uploaded_imgs").click(function() {
		var requestCode = $("#hidden_data_requestcode").val();
		var coinsize = $("#hidden_rowNum").val();
		var employeeid = $("#hidden_data_employeeid").val();
		$.post(basePath + "/servlet/FindImgs", {
				coincode: requestCode + "001",
				employeeid: employeeid,
				coinsize: coinsize,
				type: 2,
				struts: 2
			},
			function(data) {
				data = eval(data);
				new Dialog('<div style="background:#CCC;height:100%; width:95%; margin:20px;">' + '<div style="margin:20px;">编号    ' + requestCode + '<input size="3" type="text" id="txt_findnum" value="001"/>' + '<input type="button" value="查看" style="margin:20px;" id="div_find">' + '<input type="button" style="margin:20px;" value="上一枚" id="div_find_last">' + '<input type="button" value="下一枚" id="div_find_next"></div>' + '<div id="div_imgs_list" style="margin:20px;" ></div>' + '</div>').show();
				var html = '<ul style="list-style-type:none;">';
				$.each(data, function(i) {
					html += '<li style="height:100px; width:100px;float:left;text-align:center;margin-left:10px;"><p style="line-height:80px;">';
					html += '<a data-gallery="" download="' + data[i].name + '" title="' + data[i].name + '" href="' + data[i].image_l + '"><img src="' + data[i].image_s + '"/></a></p>';
					html += '<p style="line-height:10px;margin-top:-7px;"><a data-gallery="" download="' + data[i].name + '" title="' + data[i].name + '" href="' + data[i].image_l + '">' + data[i].name + '</a></p></li>';
					html += '<head><title>我的图片 </title> </head>';
				});
				html += '</ul>';
				$("#div_imgs_list").html(html);
				//回车
				$("#txt_findnum").keypress(function(event) {
					if (event.keyCode == 13) {
						var findnum = $("#txt_findnum").val();
						if (checkFindNum(findnum, coinsize)) {
							submitFindImg(requestCode + findnum, employeeid, coinsize, 2, 2);
						}
					}
				});
				//点击查看
				$("#div_find").click(function() {
					var findnum = $("#txt_findnum").val();
					if (checkFindNum(findnum, coinsize)) {
						submitFindImg(requestCode + findnum, employeeid, coinsize, 2, 2);
					}
				});
				$("#div_find_last").click(function() {
					var findnum = $("#txt_findnum").val();
					if (checkFindNum(findnum, coinsize)) {
						if (findnum > 1) {
							findnum--;
							if (findnum < 10) {
								findnum = "00" + findnum;
							} else {
								findnum = "0" + findnum;
							}
							submitFindImg(requestCode + findnum, employeeid, coinsize, 2, 2);
							$("#txt_findnum").val(findnum);
						} else {
							alert("已经是第一枚了");
						}
					}
				});
				$("#div_find_next").click(function() {
					var findnum = $("#txt_findnum").val();
					if (checkFindNum(findnum, coinsize)) {
						if (findnum * 1 < coinsize * 1) {
							findnum++;
							if (findnum < 10) {
								findnum = "00" + findnum;
							} else {
								findnum = "0" + findnum;
							}
							submitFindImg(requestCode + findnum, employeeid, coinsize, 2, 2);
							$("#txt_findnum").val(findnum);
						} else {
							alert("已经是最后一枚了");
						}
					}
				});
			});
	});
});

function refreshWindow() {
	window.location.reload();
}

function mouse_over_tab4(rowid) {
	$("#tr" + rowid).addClass("over_coin_tab");
}

function mouse_out_tab4(rowid) {
	$("#tr" + rowid).removeClass("over_coin_tab");
}

function checkFindNum(findnum, coinsize) {
	if (findnum != "") {
		if (coinsize * 1 < findnum * 1) {
			alert("此钱币不存在");
			$("#txt_findnum").val("");
			return false;
		} else if (findnum.length == 3 && /^\d{0,3}$/.test(findnum) && findnum * 1 > 0) {
			return true;
		} else {
			alert("请输入正确编号");
			$("#txt_findnum").val("");
			return false;
		}
	} else {
		alert("不能为空");
		return false;
	}
}

function drawingUpload(parm, requestid, employeeid) {
	var coinsize = $("#hidden_rowNum").val() * 1;
	window.open(uploadImgtURL + '&myaction=upload&struts=2&level=1' + '&num=' + parm + '&employeeid=' +
			employeeid + '&requestid=' + requestid + '&type=2' + '&coinsize=' + 
			coinsize+'&entitytype='+$('#hidden_entitytype').val(), 'uploadPage');
}

function coinno_info(coincode) {
	var dataNum = $("#hidden_rowNum").val() * 1;
	var employeeid = $("#hidden_data_employeeid").val();
	window.location.href = findDetailURL + '&level=1&struts=2&coincode=' + coincode + '&dataNum=' + dataNum + '&employeeid=' + employeeid+'&entitytype='+$('#hidden_entitytype').val(),
		'detailsPage';
};

function changeFlag(flag) {
	var param="p_p_id=task_WAR_coinportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-2&p_p_col_count=1"
	var id = $("#id").val();
	$("#end").attr("disabled","disabled");
	$.post(updateDrawingUrl + '&status=' + flag + '&id=' + id, function(data) {
		$("#end").removeAttr("disabled");
		if (data.result == 'ok') {
			if (flag == '4') {
				parent.location.reload();
			} else {
				window.open(backPath + "group/coin/task?"+param+"&entityType="+$('#hidden_entitytype').val(), "tasklistPage");
				window.parent.close();
			}
		} else {
			alert("操作失败");
		}
	});
}

function submitFindImg(coincode, employeeid, coinsize, type, struts) {
	$.post(basePath + "/servlet/FindImgs", {
			coincode: coincode,
			employeeid: employeeid,
			coinsize: coinsize,
			type: type,
			struts: struts
		},
		function(data) {
			data = eval(data);
			$("#div_imgs_list").html("");
			var html = '<ul style="list-style-type:none;">';
			$.each(data, function(i) {
				html += '<li style="height:100px; width:100px;float:left;text-align:center;margin-left:10px;"><p style="line-height:80px;">';
				html += '<a data-gallery="" download="' + data[i].name + '" title="' + data[i].name + '" href="' + data[i].image_l + '"><img src="' + data[i].image_s + '"/></a></p>';
				html += '<p style="line-height:10px;margin-top:-7px;"><a data-gallery="" download="' + data[i].name + '" title="' + data[i].name + '" href="' + data[i].image_l + '">' + data[i].name + '</a></p></li>';
			});
			html += '</ul>';
			$("#div_imgs_list").html(html);
		});
}