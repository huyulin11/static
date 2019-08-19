function checkstartcoincode() {
	var startCoincode = $("#txt_startCoincode").val();
	var initialendCoincode = $("#hidden_nowendcoincode").val();
	var endCoincode = $("#txt_endCoincode").val();
	if (startCoincode.length == 0) {
		$("#span_startCoincode").html("请输入起始编号！");
		$("#txt_startCoincode").css("border-color", "#C63302");
		return false;
	} else if (startCoincode.length == 3) {
		if (startCoincode * 1 > initialendCoincode * 1) {
			$("#span_startCoincode").html("编号不能大于钱币总数 ");
			$("#txt_startCoincode").css("border-color", "#C63302");
			return false;
		} else if (startCoincode * 1 < 1) {
			$("#span_startCoincode").html("编号不能小于于当前最小编号");
			$("#txt_startCoincode").css("border-color", "#C63302");
			return false;
		} else if (startCoincode * 1 > endCoincode * 1) {
			$("#span_startCoincode").html("起始编号不能大于结束编号");
			$("#txt_startCoincode").css("border-color", "#C63302");
			return false;
		} else {
			$("#span_nowprintnum").html(
					$("#txt_endCoincode").val() * 1
							- $("#txt_startCoincode").val() * 1 + 1);
			return true;
		}
	} else {
		$("#span_startCoincode").html("输入错误！");
		$("#txt_startCoincode").css("border-color", "#C63302");
		return false;
	}
}
function checkendcoincode() {
	var endCoincode = $("#txt_endCoincode").val();
	var initialendCoincode = $("#hidden_realEndCoincode").val();
	var startCoincode = $("#txt_startCoincode").val();
	if (endCoincode.length == 0) {
		$("#span_endCoincode").html("输入结束编号！");
		$("#txt_endCoincode").css("border-color", "#C63302");
	} else if (endCoincode.length == 3) {
		if (endCoincode * 1 > initialendCoincode * 1) {
			$("#span_endCoincode").html("编号不能大于钱币总数 ");
			$("#txt_endCoincode").css("border-color", "#C63302s");
			return false;
		} else if (endCoincode * 1 >= startCoincode * 1) {
			$("#span_nowprintnum").html(
					$("#txt_endCoincode").val() * 1
							- $("#txt_startCoincode").val() * 1 + 1);
			return true;
		} else {
			$("#span_endCoincode").html("结束编号不能小于起始编号 ");
			$("#txt_endCoincode").css("border-color", "#C63302");
			return false;
		}
	} else {
		$("#span_endCoincode").html("输入错误！");
		$("#txt_endCoincode").css("border-color", "#C63302");
		return false;
	}
}
function checkstartposition() {
	var startposition = $("#txt_startposition").val().toUpperCase();
	var starthead = startposition.substr(0, 1);
	var starttail = startposition.substr(1, startposition.length) * 1;
	var nowpage = $("#span_nowpage").text() * 1;
	if (startposition.length == 0) {
		$("#span_startposition").html("请输入起始位置，如:B1");
		$("#txt_startposition").css("border-color", "#C63302");
		return false;
	} else if (startposition.length == 1) {
		$("#span_startposition").html("输入错误，如:B1");
		$("#txt_startposition").css("border-color", "#C63302");
		return false;
	} else if (starthead == "A" || starthead == "B") {
		if (starttail <= 6 * nowpage && starttail > 0) {
			$("#hidden_startposition").val(returnnum(starthead, starttail));
			return true;
		} else {
			$("#span_startposition").html("当前页面不能为空，如:B1");
			$("#txt_startposition").css("border-color", "#C63302");
			return false;
		}
	} else {
		$("#span_startposition").html("输入错误，如:B1");
		$("#txt_startposition").css("border-color", "#C63302");
		return false;
	}
}
function returnnum(letter, n) {
	var renum = 0;
	if (letter == "A") {
		renum = 2 * n - 1;
	} else if (letter == "B") {
		renum = 2 * n;
	} else {
		renum = 0;
	}
	return renum;
}