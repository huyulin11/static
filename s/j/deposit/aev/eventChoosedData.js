$(function() {
	/* 检查依赖 */
	if (!rv || !rv.requestType){
		throw "rv.requestType does not exist";
	}
	
	/**
	 * 功能：表格样式，着色当前浏览行
	 */
	$("#tab4 tbody tr").live({
		mouseover : function() {
			$(this).chooseBackColor("redbackground");
			$(this).siblings().chooseBackColor("graybackground");
		}
	});
	$("#tabDetail tr:gt(0)").live({
		mouseover : function() {
			$(this).chooseBackColor("bluebackground");
			$(this).siblings().chooseBackColor("graybackground");
		}
	});
	
	/**
	 * 点击输入框（估价、数量），其内文本被全选
	 */
	$("#tab4").find("input[name$='guestappraisal'],input[name$='amount']") 
			.live("click", function() {
				$(this).select();
			});

	/**
	 * 功能：数量、估价框输入格式控制
	 */
	if (rv.requestType == 'EDIT'){
		//add by huyulin 数量框
		$("input[id^='evaluate']").keypress(function(e) {
			keypress_guestappraisal(e, this);
		});
		//add by huyulin 估价框
		$("input[id^='amount']").keypress(function(e) {
			keypress_guestappraisal_amount(e, this);
		});
	};
	
	$("#tab4 input[name$='guestappraisal']").on("blur",blur_guestappraisal); // 单枚估价框
	
	
	
	// todo
	$("#tab4 tr td .delete").live("click", function() {
		$(this).parents('tr').remove();
		// 删除行后重新计算每一行评级费，因为可能0-1.8且发行量大于50的钱币总枚数变化导致收费标准变更
		$("#tab4 tr:gt(0)").each(function() {
		});
		// 处理删除后tr的行号问题
		if (rv.entitytype == rv.ENTITYTYPE_STAMP) {
			var coinid = $(this).parents("tr")
					.find("td input[name*='coinid']").val();
			rv.list.delDetailTabRow(coinid);
		}
		rv.list.dealTrIndex();
		// 合计费用
		return false;
	});

	$("#tab4 tr td .upRow").live("click", function() {
		$(this).parents("tr").rowUp();
		rv.list.dealTrIndex()
		return false;
	});

	$("#tab4 tr td .downRow").live("click", function() {
		$(this).parents("tr").rowDown();
		rv.list.dealTrIndex()
		return false;
	});

	/**
	 * 功能：单元数量变化
	 *	   1、若有详条表（邮票），处理行数改变
	 * 	   2、数量、重量、费用等重新计算
	 * 触发: 编辑完成（失去焦点）
	 */
	$("#tab4 input[name$='.amount']").live("blur", function() {
		if (rv.entitytype == rv.ENTITYTYPE_STAMP) {
			var coinid = $(this).parents("tr").find("input[name*='coinid']").val();
			var amount = $(this).val();
			rv.list.changeDetailTabRowNumber(coinid,amount);
			rv.list.dealTrIndex()
		}
	});
	
	function keypress_guestappraisal(e, obj) {// mod by huyulin
		// 供估价框使用，仅限输入阿拉伯数字和一个小数点
		/*
		 * var code = e.charCode || e.keyCode; var character =
		 * String.fromCharCode(code); var pattern = /^[1234567890.]$/; if
		 * ($.browser.mozilla) { if (e.keyCode == 8 || e.keyCode == 46) { return; } }
		 * if (!pattern.test(character)) { e.preventDefault(); } if
		 * (obj.value.indexOf('.') >= 0 && character == '.') { e.preventDefault(); }
		 */
	}
	function keypress_guestappraisal_amount(e, obj) {// add by huyulin
		// 供数量框使用，仅限输入阿拉伯数字
		// var event = event || window.event;
		var code = e.charCode || e.keyCode;
		var character = String.fromCharCode(code);
		var pattern = /^[1234567890]$/;
		if ($.browser.mozilla) {
			if (e.keyCode == 8 || e.keyCode == 46) {
				return;
			}
		}
		if (!pattern.test(character)) {
			e.preventDefault();
		}
		if (obj.value.indexOf('.') >= 0 && character == '.') {
			e.preventDefault();
		}
	}
	
	function keyup_guestappraisal(obj) {
		if (!/^[0-9]+\.?\d{0,2}$/.test(obj.value)) {
			obj.value = "";
		}
	}

	function blur_guestappraisal(obj) {
		if (isNaN(obj.value)) {// add by huyulin如果输入框失去焦点的时候内容非法，则清空之
			obj.value = "";
		}
		obj.value = (Math.round(obj.value * 100) / 100).toFixed(2);// add by
		// huyulin
		// 格式化成两位小数
		var nowTr = $(obj).parents('tr');
		calculateAll(nowTr);
	}
});
