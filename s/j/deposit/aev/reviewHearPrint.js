var printInventoryUrl;

function setPrintInventoryUrl(printInventoryUrlTemp) {
	printInventoryUrl = printInventoryUrlTemp;
}
function printCoinCode(ReqCode, coinCount) {
	var startCode = $("#coinNoStart").val();
	var endCode = $("#coinNoEnd").val();
	if (startCode == "" || startCode == 0 || startCode > 999) {
		alert("起始数字应为1-999正整数！");
		$("#coinNoStart").val("");
		return false;
	}
	if (startCode > coinCount || endCode > coinCount) {
		alert("起始或结束数字超过钱币总数！");
		return false;
	}
	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
			.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("钱币编号打印");
	// intOrient,intPageWidth,intPageHeight,strPageName
	/*
	 * intOrient：打印方向及纸张类型 1---纵向打印，固定纸张； 2---横向打印，固定纸张；
	 * 3---纵向打印，宽度固定，高度按打印内容的高度自适应 0---方向不定，由操作者自行选择或按打印机缺省设置。
	 */

	LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
	if (endCode == "") {
		var temp = "000" + startCode;
		var endNum = temp.substring(temp.length - 3);
		// Top,Left,Width,Height,BarCodeType,BarCodeValue
		LODOP.ADD_PRINT_BARCODE(15, 20, 150, 68, "Code93", ReqCode + endNum);
		LODOP.PRINT();
	} else if (endCode != "" && endCode < startCode) {
		alert("结束数字应不小于起始数字！");
		return false;
	} else if (endCode > 999999) {
		alert("钱币总数不可超过999999！");
		$("#coinNoEnd").val("");
		return false;

	} else if (endCode != "" && endCode >= startCode) {
		for ( var i = startCode; i <= endCode; i++) {
			var temp = "000" + i;
			var endNum = temp.substring(temp.length - 3);
			LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "钱币编号打印纸");
			LODOP
					.ADD_PRINT_BARCODE(15, 20, 150, 68, "Code93", ReqCode
							+ endNum);
			LODOP.PRINT();
		}
	}
}
function printReqCode(reqCode) {
	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
			.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("申请单号打印");
	// intOrient,intPageWidth,intPageHeight,strPageName
	/*
	 * intOrient：打印方向及纸张类型 1---纵向打印，固定纸张； 2---横向打印，固定纸张；
	 * 3---纵向打印，宽度固定，高度按打印内容的高度自适应 0---方向不定，由操作者自行选择或按打印机缺省设置。
	 */

	LODOP.SET_PRINT_PAGESIZE("1", 380, 270, "申请单号打印纸");
	LODOP.ADD_PRINT_BARCODE(15, 0, 133, 68, "Code93", "R" + reqCode);
	LODOP.PRINT();
	// LODOP.PREVIEW();
}
function printAddedcoinremark(reqCode) {
	debugger;
	var d = new Date();
	var vYear = d.getFullYear();
	var vMon = d.getMonth() + 1;
	var vDay = d.getDate();
	var h = d.getHours();
	var m = d.getMinutes();
	var se = d.getSeconds();
	s = vYear + "年" + (vMon < 10 ? "0" + vMon : vMon) + "月"
			+ (vDay < 10 ? "0" + vDay : vDay) + "日 " + (h < 10 ? "0" + h : h)
			+ ":" + (m < 10 ? "0" + m : m) + ":" + (se < 10 ? "0" + se : se);
	jQuery("#nowTime").html(s);
	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
			.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("送评清单补充信息打印");
	LODOP.SET_PRINT_PAGESIZE("1", "210mm", "297mm", "送评清单补充信息打印纸");
	LODOP.ADD_PRINT_HTM(0, -20, "210mm", "297mm", document
			.getElementById("addedcoininfo").innerHTML);
	LODOP.PREVIEW();
}
function printInventory(reqCode) {
	var LODOP = getLodop(document.getElementById('LODOP_OB'), document
			.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("核对清单打印");
	LODOP.SET_PRINT_PAGESIZE("1", "210mm", "297mm", "申请单打印纸");
	$.post(printInventoryUrl + '&reqCode=' + reqCode, function(data) {
		var content = data.split("|");
		if (content[2] <= 35) {
			var html = content[0] + content[1];
			LODOP.ADD_PRINT_HTM(0, -20, "210mm", "297mm", html);
			LODOP.PREVIEW();
		} else {
			var html = content[0] + content[3];
			LODOP.ADD_PRINT_HTM(0, -20, "210mm", "297mm", html);
			LODOP.PREVIEW();
		}
	});

}