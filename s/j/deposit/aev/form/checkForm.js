rv = window.rv || {};
rv.checkForm = (function() {
	/** 匹配金钱格式 */
	function formatMoney(money) {
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

	/** 以下为用户信息检查 */
	function checkUserCode() {
		if ($("#sendtype2").attr("checked")) {
			if ($("#usercardcode").val() == ""
					|| $("#usercardcode").val() == null
					|| $("#usercardcode").val() == undefined) {
				alert("取件方式为上门自取时，所输证件号码不能为空！");
				return false;
			} else if ($("#usercardtype").val() == 1
					&& $.trim($("#usercardcode").val()).length != 18) {
				alert("身份证号码应为18位长度");
				return false;
			}
		}
		return true;
	}

	function checkSpeed() {
		var totalCost = $("#totalcost").val().split(",").join("");
		if (isNaN(totalCost)) {
			var checkedSpeed = $('input:radio[name="speed"]:checked').val();
			if (checkedSpeed == 1) {
				checkedSpeed = 2;
			} else if (checkedSpeed == 2) {
				checkedSpeed = 5;
			} else if (checkedSpeed == 3) {
				checkedSpeed = 8;
			} else if (checkedSpeed == 4) {
				checkedSpeed = 15;
			}
			alert("您添加的钱币信息不符合送评速度为" + checkedSpeed + "工作日的条件，" + "请更改为其他送评速度！");
			return false;
		} else {
			return true;
		}
	}

	// 检查收货人，用于判断地址的完整性
	function checkAddress() {
		// 判断物流，若为物流送评则必须填写物流单号
		var applytype = $("input:radio[name*='applytype']:checked").val();
		if (applytype == '2') {
			var packagecode = $("#packagecode").val();
			if (packagecode == '') {
				alert("请输入物流单号！");
				return false;
			}
		}
		// 如果选择通知方式为邮件，则邮件不可为空
		var notice = $("input:radio[name='notice']:checked").val();
		if (notice == '3') {
			var mail = $("#mail").val();
			if (mail == '') {
				alert("请填写邮箱，方便通知和联系。");
				return false;
			}
		}

		var country = $("#s1").val();
		var province = $("#s2").val();
		var city = $("#s3").val();
		var area = $("#s4").val();
		var address = $("#capitalvalue2").val();
		var receivermobile = $("#mobile").val();
		var name = $("#customer").val();
		if ($("#sendtype1").is(":checked") || $("#sendtype3").is(":checked")) {
			if (name == '' || country == -1 || province == -1 || city == -1
					|| area == -1 || province == -2 || city == -2 || area == -2
					|| address == '') {
				alert("请填写完整的申请人和地址！");
				return false;
			}

		}
		if (receivermobile == '') {
			alert("请填写手机，方便取件和联系。");
			$("#receivermobile").focus();
			return false;
		}
		/*
		 * if (countAmount() != 0) { alert("钱币数量不能为空或零！"); return false; }
		 */
		return true;
	}

	function countAmount() {
		var temCount = 0;
		$("#tab4 tr:gt(0)").each(
				function() {
					temCount += Number($(this).find("td").find(
							"input[name$='.amount']").val());
				});
		return temCount;
	}

	function checkCoinNum() {
		if ($("#rad_restype").attr("checked")) {
			$("#usedeals").val("1");
			$("#resid").val($("#rad_restype").attr("class"));
			if ($("#totalamount").val() * 1 > 10) {
				alert("您使用了优惠券，最多可以提交10枚，剩余的请您另外新建一张送评单，谢谢！");
				return false;
			} else {
				return true;
			}
		} else {
			$("#usedeals").val("0");
			$("#resid").val("");
			return true;
		}
	}

	/** 不能送评单数为0的同时附加信息为空 */
	function checkCoinNumInfo() {
		var totalamount = 0;
		$('#tab4 input[name$="amount"]').each(function() {
			if (this.value > 999999) {
				alert("每张申请单目前最多支持拆分数量999999！");
				throw "每张申请单目前最多支持拆分数量999999！";
			}
			totalamount += Number(this.value);
		});
		if (totalamount == 0 && $("#addedcoinremark").val().trim() == '') {
			alert("送评清单与补充信息不能同时为空！");
			return false;
		}
		return true;
	}

	function checkEvaluate() {
		var flag = true;
		$("#tab4 tr:gt(0)").each(
				function() {
					var guestappraisal = Number($(this).find("td").find(
							"input[name$='.guestappraisal']").val().replace(
							/,/g, ""));
					var amount = Number($(this).find("input[name$='.amount']")
							.val().replace(/,/g, ""));
					var zhongliang = $(this).find("td").find(
							"input[name$='.zhongliang']").val(); // 盒子费用
					if (entitytype == 3) {
						if (zhongliang.trim() == "") {
							alert("重量不能为空！");
							flag = false;
							return false;
						}
					}
					if (guestappraisal <= 0 || amount <= 0) {
						alert("估价或数量不能为0");
						flag = false;
						return false;
					}
				});
		return flag;
	}

	/** 活动优惠选择是否合法无参 */
	function checkReservation2() {
		if ($("#resTypesTab").find("input:radio[checked]").length > 0) {
			return (rv.ajax.ValidateCoupon($("#resTypesTab").find(
					"input[name='reservationtypeid']").val(), $("#resTypesTab")
					.find("input[name='couponid']").val(),
					(rv.requestType == "ADD" ? "0" : $("#innerno").val())));
		} else {
			return true;
		}
	}

	return {
		checkUserCode : checkUserCode,
		checkExpressSpeed : checkSpeed, // 物流速度
		checkReceiveAddress : checkAddress, // 收件地址

		checkRequestListNumber : checkCoinNumInfo, // 送评单数
		checkEvaluate : checkEvaluate,
		checkCoupon : checkReservation2, // 优惠活动
		checkCouponNumber : checkCoinNum, // 优惠券：不过量

		checkWhenSaving : function() {
			return this.checkUserCode() && this.checkRequestListNumber();
		},
		checkWhenSubmitting : function() {
			return this.checkUserCode() && this.checkReceiveAddress()
					&& this.checkRequestListNumber();
		},
		checkBeforePriting : function() {
			return this.checkUserCode() && this.checkReceiveAddress();
		}
	}

})()

/*
 * 流程修改： 原本提交时没有送评单数检查，现在加上。
 */