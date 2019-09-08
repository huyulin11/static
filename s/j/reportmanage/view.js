import { gf } from "/s/buss/g/j/g.f.js";

var search = function () {
	var obj = $("form#queryForm").serializeArray();
	$("#loadhtml").html(gf.loadingImg()).load(
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