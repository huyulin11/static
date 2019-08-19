$(function () {
	var search =
		function () {
			var obj = $("form#queryForm").serializeArray();
			$("#loadhtml").html(CommnUtil.loadingImg()).load(
				"/reportmanager/data.shtml?type=" + type, obj);
		};

	$("body").on("click", "#query", search);

	$("div#loadhtml").css('padding-top', function () {
		var qdpx = $("div#queryDiv").css("height");
		var qdpxL = parseInt(qdpx.substring(0, qdpx.length - 2)) + 10;
		return qdpxL + 'px';
	});
	var searchFirstTime = $("#queryTable").data("searchfirsttime");
	if (searchFirstTime == 1) {
		search();
	}

	// $('html').on(
	// "mousewheel",
	// function(e) {
	// if ($("#dataTable tr:gt(0)").size() == 0) { //
	// 若ajax异步，服务器返回之前不允许新请求，防重复点击
	// alert();
	// } else {
	// var nScrollTop = $(this)[0].scrollTop;
	// var nScrollHight = $(this)[0].scrollHeight;
	// var nDivHight = $("html").height();
	// if (nScrollTop + nDivHight >= nScrollHight) {
	// $("#dataTable").append(
	// "/reportmanager/data.shtml?type=" + type);
	// }
	// }
	// });
});
