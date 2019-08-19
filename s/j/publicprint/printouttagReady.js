function printouttag(requestCode, entitytype, findCoinInfoUrl) {
	var colNum = 0;
	var printouttagVersion = 1.0;
	var AddedStr = "";// 特殊附加
	if (entitytype == "1") {
		if (window.confirm("是否选择使用新版标签打印？")) {
			colNum = 2;
			printouttagVersion = 2.0;
			AddedStr = "&XSeat=6.6&YSeat=1.85";
		} else {
			colNum = 4;
			printouttagVersion = 1.0;
		}
	} else if ("2" == entitytype) {
		colNum = 1;
		AddedStr = "&XSeat=3.6&YSeat=1.55";
	} else if ("4" == entitytype) {
		colNum = 2;
		printouttagVersion = 2.0;
		AddedStr = "&XSeat=8&YSeat=-1.4";
	} else {
		printouttagVersion = 2.0;
		colNum = 2;
		AddedStr = "&XSeat=6.6&YSeat=1.85";
	}
	window.open(findCoinInfoUrl + "&myaction=loadingdata&requestCode="
			+ requestCode + "&country=cn" + "&colNum=" + colNum
			+ "&printouttagVersion=" + printouttagVersion + AddedStr,
			'printouttag');
}