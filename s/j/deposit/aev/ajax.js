rv.ajax = (function(){
	
	return {
		//检查物流单号是否已经使用
		checkLogisticsNo : function(logisticsno) {
			// var logisticsno = $("#packagecode").val().trim();
			if ( logisticsno && logisticsno == "" ) {
				$.ajax({
					type : "POST",
					url : rv.urls.checkLogisticsNoURL,
					data : "logisticsno=" + logisticsno,
					dataType : "text",
					success : function(data) {
						if (data == -1) {
							alert("该物流单号已被使用！");
							$("#packagecode").val("");
						} 
						return (data == 0) ;
					},
					error : function(data) {
						alert(data);
					}
				});
			}
		},
		// 检查用户输入的手机号码是否验证通过
		validateUserMobile : function (mobilecode,requestusercode) {
			var rtnVal ;
			$.ajax({
				type : "POST",
				url : rv.urls.validateUserMobile,
				data : "mobilecode=" + mobilecode + "&requestusercode="
						+ requestusercode,
				dataType : "text",
				async : false,
				success : function(data) {
					if (data == 'false') {
						// $("#mobile").focus();
						if(window.confirm("手机号码未验证通过！是否现在认证？")){
							window.open(rv.urls.mobileApprove +'?no='+mobilecode+'&userid='+ rv.userid,
									'手机号验证', 
									'height=800,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,\
										resizable=no,location=no, status=no');
							rtnVal = false ;
						}else{
							rtnVal = true ;
						}
					} else {
						rtnVal = true;
					}
				},
				error : function(data) {
					alert("校验手机号码失败，可能登录连接已经失效，请重新登录!");
				}
			});
			return rtnVal ;
		},
		// e.g: rv.ajax.getProvince($("#s1").val())
		getProvince : function(countryid,dealFun){
			var data ;
			$.post(rv.urls.getProvinceUrl + '?parentid=' + countryid, function(data) {
				data = eval(data);
				if (dealFun){
					dealFun(data);
				}
			});
			return data ;
		},
		getCity : function(provinceid,dealFun){
			var data ;
			$.post(rv.urls.getCityUrl + '?parentid=' + provinceid, function(data) {
				data = eval(data);
				if (dealFun){
					dealFun(data);
				}
			});
			return data ;
		},
		getDistrict : function(cityid,dealFun){
			var data ;
			$.post(rv.urls.getDistrictUrl + '?parentid=' + cityid, function(data) {
				data = eval(data);
				if (dealFun){
					dealFun(data);
				}
			});
			return data ;
		},
		
		
		/** 活动优惠选择是否合法 */
		ValidateCoupon : function(reservationtypeid, couponid, requestcode) {
			var rtnVal = false;
			$.ajax({
				type : "POST",
				url : rv.urls.validateCoupon,
				data : "couponid=" + couponid + "&reservationtypeid="
						+ reservationtypeid + "&requestcode=" + requestcode,
				dataType : "text",
				async : false,
				success : function(data) {
					if (data == "OK") {
						if ($("#totalamount").val() > 10) {
							var reservsubtype = $("#resTypesTab").find(
									"input[type='radio']:checked").parents("tr").find(
									"td.reservsubtype").html();
							if (reservsubtype.indexOf("-") < 0) {
								alert("该活动限评10枚，超过10枚则无法享受优惠！");
								rtnVal = false;
							} else {
								rtnVal = true;
							}
						} else {
							rtnVal = true;
						}
					} else {
						alert(data);
						rtnVal = false;
					}
				},
				error : function(data) {
					alert("校验手机号码失败，可能登录连接已经失效，请重新登录!");
					rtnVal = false;
				}
			});
			return rtnVal;
		}
	}
})();

