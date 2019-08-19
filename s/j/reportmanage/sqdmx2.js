$(function() {
	var leng = $("table").find('tr').length;
	for (var i = 0; i < leng; i++) {
		var text1 = $("table").find("tr").eq(i).find(".内部状态").text(); // "内部状态"一列的数据变更

		if (text1 == 14) {
			$("table").find("tr").eq(i).find(".内部状态").text("封箱结束");
		}
		if (text1 == 13) {
			$("table").find("tr").eq(i).find(".内部状态").text("封箱中");
		}
		if (text1 == 12) {
			$("table").find("tr").eq(i).find(".内部状态").text("入库");
		}
		if (text1 == 11) {
			$("table").find("tr").eq(i).find(".内部状态").text("打盒制图结束");
		}
		if (text1 == 10) {
			$("table").find("tr").eq(i).find(".内部状态").text("打盒制图中");
		}
		if (text1 == 9) {
			$("table").find("tr").eq(i).find(".内部状态").text("打盒结束");
		}
		if (text1 == 8) {
			$("table").find("tr").eq(i).find(".内部状态").text("打盒中");
		}
		if (text1 == 7) {
			$("table").find("tr").eq(i).find(".内部状态").text("评级结束");
		}
		if (text1 == 6) {
			$("table").find("tr").eq(i).find(".内部状态").text("评级中");
		}
		if (text1 == 5) {
			$("table").find("tr").eq(i).find(".内部状态").text("制图结束");
		}
		if (text1 == 4) {
			$("table").find("tr").eq(i).find(".内部状态").text("制图中");
		}
		if (text1 == 3) {
			$("table").find("tr").eq(i).find(".内部状态").text("受理结束");
		}
		if (text1 == 2) {
			$("table").find("tr").eq(i).find(".内部状态").text("待确认");
		}
		if (text1 == 1) {
			$("table").find("tr").eq(i).find(".内部状态").text("受理中");
		}
		if (text1 == 0) {
			$("table").find("tr").eq(i).find(".内部状态").text("待处理");
		}
		if (text1 == -1) {
			$("table").find("tr").eq(i).find(".内部状态").text("已删除");
		}
		if (text1 == -2) {
			$("table").find("tr").eq(i).find(".内部状态").text("异常处理");
		}

		var text2 = $("table").find("tr").eq(i).find(".评级类型").text(); // "评级类型"一列的数据变更

		if (text2 == 1) {
			$("table").find("tr").eq(i).find(".评级类型").text("现代钱币");
		}
		if (text2 == 2) {
			$("table").find("tr").eq(i).find(".评级类型").text("纸钞");
		}
		if (text2 == 3) {
			$("table").find("tr").eq(i).find(".评级类型").text("古钱");
		}
		if (text2 == 4) {
			$("table").find("tr").eq(i).find(".评级类型").text("邮票");
		}
		if (text2 == 5) {
			$("table").find("tr").eq(i).find(".评级类型").text("机制币");
		}
		if (text2 == 6) {
			$("table").find("tr").eq(i).find(".评级类型").text("套装系列");
		}

		var text3 = $("table").find("tr").eq(i).find(".状态").text(); // "状态"一列的数据变更

		if (text3 == -2) {
			$("table").find("tr").eq(i).find(".状态").text("异常处理");
		}
		if (text3 == -1) {
			$("table").find("tr").eq(i).find(".状态").text("已删除");
		}
		if (text3 == 0) {
			$("table").find("tr").eq(i).find(".状态").text("草稿");
		}
		if (text3 == 1) {
			$("table").find("tr").eq(i).find(".状态").text("已提交");
		}
		if (text3 == 2) {
			$("table").find("tr").eq(i).find(".状态").text("受理中");
		}
		if (text3 == 3) {
			$("table").find("tr").eq(i).find(".状态").text("待确认");
		}
		if (text3 == 4) {
			$("table").find("tr").eq(i).find(".状态").text("待支付");
		}
		if (text3 == 5) {
			$("table").find("tr").eq(i).find(".状态").text("评级中");
		}
		if (text3 == 6) {
			$("table").find("tr").eq(i).find(".状态").text("待发货");
		}
		if (text3 == 7) {
			$("table").find("tr").eq(i).find(".状态").text("发货");
		}
	}
});
