$(function(){
	
	var formatAmount = function($input){
		// 必须保证第一个为数字而不是0
		$input.value = obj.value.replace(/^0/g, "");
		// 先把非数字的都替换掉，除了数字
		$input.value = obj.value.replace(/[^0-9]/g, "");
		if ($input.value.length > 3) {
			$input.value = $input.value.replace($input.value, 
					$input.value.substr(0, 3));
		}
	}
	
	var formatMoney = function(input){
		if (input.nodeName == 'INPUT' ){
			input.value = Convert(input.value);
			return input.value ;
		}else{ // 值类型
			return Convert(input);
		}
		/** 匹配金钱格式 */
		function Convert(money) {
			var s = money; // 获取小数型数据
			s += "";
			if (s.indexOf(".") == -1)
				s += ".0"; // 如果没有小数点，在后面补个小数点和0
			if (/\.\d$/.test(s))
				s += "0"; // 正则判断
			while (/\d{4}(\.|,)/.test(s))
				// 符合条件则进行替换
				s = s.replace(/(\d)(\d{3}(\.|,))/, "$1,$2"); // 每隔3位添加一个
			return s;
		}
	}
	
	$("tab4 input[name$='amount']").on("keyup",function(){
		formatAmount($(this));
	}).on("afterpaste",function(){
		formatAmount($(this));
	}).on("blur",function(){
		formatAmount($(this));
	}).on("blur",function(){
		calculateAll($(this).parents('tr'));
	});
	
	// 格式化输入为货币格式
	function formate() {
		formatMoney(document.querySelector("#totalevaluate"));
		formatMoney(document.querySelector("#totalreqcost"));
		formatMoney(document.querySelector("#totalpremium"));
		formatMoney(document.querySelector("#totaltransportation"));
		formatMoney(document.querySelector("#totalinsurance"));
		formatMoney(document.querySelector("#totalcost"));
	}
	
	$('#s2').change(function() {
		// 计算总重量
		getWeight();
	});

	// 加急、标准切换
	$("input:radio[name='speed']").live("click", function() {
		$("#tab4 tr:gt(0)").each(function() {
			// 重新计算合计评级费
		});
		// 合计费用
	});

	// 加急、标准切换
	$("input#isproxy[type=checkbox]").live("click", function() {
		$("#tab4 tr:gt(0)").each(function() {
			// 重新计算合计评级费
		});
		// 合计费用
	});

	// 当切换取件方式时
	$("input:radio[name='sendtype']").live("click", function() {
		getWeight();
	});

	// 当数量失去焦点时，计算
	$("#totalreqcost").live("blur", function() {
		// 合计费用
	});

	// 当保价费失去焦点时，计算
	$("#totalinsurance").blur(function() {
		formatMoney(this);
	});

	// 当包装费失去焦点时，计算
	$("#totaltransportation").blur(function() {
		formatMoney(this);
	});

	// 当其他费用文本框失去焦点时，计算
	$("#othercost").blur(function() {
		formatMoney(this);
	});

	$("#resTypesTab input:radio").live("click", function() {
	});

	$("#resTypesTab input.couponid").live("blur",function() {
		var thisRadio = $(this).parents("tr").find("input:radio");
		if (thisRadio.is(':checked') == false && $(this).val() != null
				&& $(this).val() != "") {
			thisRadio.attr("checked", "checked");
		}
	});

	

	$("#tab4 tr td input[name*='zhongliang']").live("blur", function() {
		testWeightVal(this);
		var testWeightVal = function(obj) {
			if (obj.value.trim() == "") {
				return true;
			} else if (obj.value.indexOf("克") >= 0) {
				var weight = obj.value.substring(0, obj.value.length - 1) * 1;
				if (!isNaN(weight) && weight > 0) {
					obj.value = weight.toFixed(2) + '克';
					var nowTr = $(obj).parents('tr');
					calculateAll(nowTr);
				} else {
					alert("请检查重量！");
				}
			} else {
				alert("请检查重量！");
			}
		};
	});

	var initReview = function() {
		rv.list.dealTrIndex();
		$("#tab4 tr:gt(0)").chooseBackColor("graybackground");
		$("#tab4 tr td input[name*='guestappraisal']").parents("td").attr(
				"title",
				"更改估价时，" + "如果需要对应明细数据中的估价一并改动，" + "可以试试先将估价改为0，"
						+ "然后再改成期望的估价");
	};

	initReview();

});