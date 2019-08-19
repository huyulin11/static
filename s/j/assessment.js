$(document).ready(function() {
	$("#all_checkbox").click(function() {
		if ($("#all_checkbox").attr("checked")) {
			$("#tab4 tr:gt(0) input:checkbox").each(function() {
				$(this).attr("checked", true);
			});
		} else {
			$("#tab4 tr:gt(0) input:checkbox").each(function() {
				$(this).removeAttr("checked");
			});
		}
	});
	$("#tab4 tr:gt(0) input:checkbox").click(function() {
		if ($("#tab4 tr:gt(0) input:checkbox:checked").length == 0) {
			$("#all_checkbox").removeAttr("checked");
		}
	});
});

/**
 * 真品鉴定特殊校验，如果申请单评级类型为真品鉴定时， 当分数大于0，或者分数等于0且评级理由不包含真品选项，给出对应提示
 */
function checkZpjd(score, ratingreasondis) {
	if (score > 0) {
		return false;
	}
	if (score == 0 && ratingreasondis.indexOf("真品") < 0) {
		return false;
	}
	return true;
}

//function findEntity() {
//	var condition = $("#condition").val();
//	var dataNum = $("#hidden_data_num").val() * 1;
//	var employeeid = $("#hidden_data_employeeid").val();
//	if (condition.length < 3) {
//		alert("请输入正确的钱币编号！");
//		return;
//	}
//	window.location.href = findDetailURL + '&level=2&struts=3&coincode='
//			+ condition + '&dataNum=' + dataNum + '&employeeid=' + employeeid+'&entitytype='+$('#hidden_entitytype').val(),
//			'detailsPage';
//}

// 鼠标移到行上效果
function mouse_over_tab4(rowid) {
	$("#tr" + rowid).addClass("over_coin_tab");
}
function mouse_out_tab4(rowid) {
	$("#tr" + rowid).removeClass("over_coin_tab");
}
// 分数修改过没保存做标记
function input_score_tag(row_tag) {
	$("#score_" + row_tag).select();
	$("#score_" + row_tag).css("border-color", "red");
	$("#ratingreasondis_" + row_tag).text("");
}

function input_pubremark_tag(row_tag) {
	$("#pubremark_" + row_tag).css("border-color", "red");
}

function submitFindImg(coincode, employeeid, coinsize, type, struts) {
	$.post(
					basePath + "/servlet/FindImgs",
					{
						coincode : coincode,
						employeeid : employeeid,
						coinsize : coinsize,
						type : type,
						struts : struts
					},
					function(data) {
						data = eval(data);
						$("#div_imgs_list").html("");
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
					});
}