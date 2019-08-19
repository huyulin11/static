var rv = window.rv || {} ;
rv.blockNum = {
	// 生成冠字号
	'generate' : function (id, index) {
		var blockNum = $("#tr_" + id).find("td").find(
				"input[name='tmpEditBlockNum']").val();
		var prdfixBlockNum = blockNum.substring(0, blockNum.length - 4);
		var startNum = blockNum.substring(blockNum.length - 4, blockNum.length) * 1;
		$(".input-editBlockNum").each(function() {
			$(".input-editBlockNum").eq(index).val(prdfixBlockNum + startNum++);
			index++;
		});
	},
	// 保存冠字号
	'save' : function (id) {
		var blockNum = $("#tr_" + id).find("td").find(
				"input[name='tmpEditBlockNum']").val();
		$("#retr_" + id).find("td").find("input[name$='.editBlockNum']").val(
				blockNum);
		$("#retr_" + id).find("td").find("input[name$='.id']").val(id);
		$.post(saveBillBlockNumUrl, {
			id : id,
			blockNum : blockNum
		}, function(data) {
			if (data > 0) {
				$("#tr_" + id).find("td").find("input[name='tmpEditBlockNum']")
						.css("border", "");
			}
		});
	},
	// 批量保存
	'batchSave' : function() {
		var inputObj = $("#tab-editBlockNums")
				.find("input[name='tmpEditBlockNum']");
		var json = [];
		for ( var i = 0; i < inputObj.length; i++) {
			var id = $("#tab-editBlockNums tr:eq(" + (i + 1) + ") td:last-child")
					.text();
			var blockNum = inputObj.eq(i).val();
			json[i] = "{'id':'" + id + "','blockNum':'" + blockNum + "'}";
			$("#retr_" + id).find("td").find("input[name$='.editBlockNum']").val(
					blockNum);
			$("#retr_" + id).find("td").find("input[name$='.id']").val(id);
		}
		var billinfos = "[" + json + "]";
		$("#tab-editBlockNums").css("display", "none");
		$("#div-subdata").css("display", "block");
		$.post(batchSaveBillBlockNumsUrl, {
			billinfos : billinfos
		}, function(data) {
			$("#tab-editBlockNums").css("display", "");
			$("#div-subdata").css("display", "none");
			if (data > 0) {
				inputObj.each(function() {
					$(this).css("border", "");
				});
			} else {
				alert("联系技术！");
			}
		});
	}
}

$(function() {
	$("#editBlockNums").click(function() {
		var winHeight = $(window).height() - 35;
		$("#div-billdis").dialog({
			modal : true,
			width : 1000,
			height : winHeight,
			close : function() {
				// 恢复窗体滚动
				$("html").css("overflow", "scroll");
			},
			buttons : [ {
				text : function() {
					$(this).attr("id", "btn-batchSave");
					$(this).text("批量保存");
					$(this).css({
						"background" : "#B0330E",
						"color" : "#fff",
						"height" : "30px"
					});
				},
				click : function() {
					rv.blockNum.batchSave();
				}
			}, {
				text : function() {
					$(this).attr("id", "btn-closediv");
					$(this).text("关闭");
					$(this).css({
						"background" : "#B0330E",
						"color" : "#fff",
						"height" : "30px"
					});
				},
				click : function() {
					// 恢复窗体滚动
					$("html").css("overflow", "scroll");
					$(this).dialog('close');
				}
			} ]
		});
	});
});