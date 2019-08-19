$(function() {
	var leng = $("table").find('tr').length;
	for (var s = 1; s < leng; s++) {
		var class1 = $("table").find("tr").eq(s).attr("class");
		var text2 = $("table").find("tr").eq(s).find(".申请单").html();

		for (var i = 1; i < leng; i++) {
			var text = $("table").find("tr").eq(i).find(".申请单").html();
			var class2 = $("table").find("tr").eq(i).attr("class");
			if (class1 != class2) {
				if (text == text2) {
					$("table").find("tr").eq(s).css("background-color",
							"#FCD5D5");
				}
			}
		}
	}

	$('td.内部状态').each(function() { // "内部状态"一列的数据变更
			$(this).text(gv.get("REQUEST_INN_STATUS", $(this).text()));
	});

	$('td.评级类型').each(function() { // "评级类型"一列的数据变更
		$(this).text(gv.get("ENTITY_TYPE", $(this).text()));
	});

	$('td.状态').each(function() {// "状态"一列的数据变更
		$(this).text(gv.get("REQUEST_OUT_STATUS", $(this).text()));
	});
});
