$(function() {
	$('td.内部状态').each(function() { // "内部状态"一列的数据变更
		if ($(this).text() < 0) {
			$(this).parents("tr").css("background-color", "#FCD5D5");
		}
		$(this).text(gv.get("REQUEST_INN_STATUS", $(this).text()));
	});

	$('td.评级类型').each(function() { // "评级类型"一列的数据变更
		$(this).text(gv.get("ENTITY_TYPE", $(this).text()));
	});

	$('td.外部状态').each(function() {// "状态"一列的数据变更
		$(this).text(gv.get("REQUEST_OUT_STATUS", $(this).text()));
	});
});
