$(document).ready(function(){
	
	/**
	 * 函数：弹出窗口（居中）
	 * 参数：弹窗内页面地址、标题、宽度及高度
	 */
	var popWindow = function(url,name,iWidth,iHeight){
		var iTop = (window.screen.availHeight - 30 - iHeight) / 2; // 垂直位置;
		var iLeft = (window.screen.availWidth - 10 - iWidth) / 2; // 水平位置;
		var features = 'height=' + iHeight + ',innerHeight=' + iHeight
				+ ',width='+ iWidth + ',innerWidth='  + iWidth
				+ ',top='  + iTop   + ',left='		  + iLeft
				+ ',toolbar=no,menubar=no,scrollbars=yes,'
				+ 'resizeable=yes,location=no,status=no';
		window.open(url,name,features);
	}
	
	/**
	 * 功能：申请单类型选择
	 * 范围：新建申请单
	 */
	if (rv.requestType == 'ADD'){
		$("#entitytypeSelect").live("change", function() {
			var nextType = $("#entitytypeSelect").val();
			var nextURL = location.pathname+ '?entitytype=' + nextType
					+ '&userid=' + userid ;// 后台需要传输userid参数
			window.location.assign(nextURL);
		});
	}
	
	/*
	 * 功能：手机号码验证（是否注册通过）
	 * 触发：输入框失去焦点
	 * 扩展TODO：打开手机号码验证页
	 */
	$("#basic #mobile").live("blur", function() {
		rv.checkForm.checkUserMobile();
	});
	
	/*
	 * 功能：电子邮箱验证
	 * 触发：输入框失去焦点
	 */
	$("#basic #mail").live("blur", function() {
		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/; 
		if(!reg.test(this.value)){
			alert("电子邮箱格式不正确");
		}
	});
	
	/*
	 * 功能：送评方式切换
			选择上门时，禁用物流单输入框并清空。
			选择物流时，启用物流单输入框，使之可编辑。
	 * 触发：多选框切换
	 */
	$("input:radio[name*='applytype']").live("click", (function() {
		var $packagecode  ;
		var tmpValue = "" ;
		return function(){
			if (!$packagecode){
				$packagecode = document.getElementById("packagecode") ;
			}
			if (rv.selector.getRadioValue("applytype") == "1"){ // 上门 
				tmpValue = $packagecode.value ;
				$packagecode.value = "" ;
				$packagecode.disabled = true ;
			}else{ 												// 物流
				$packagecode.value = tmpValue ;
				$packagecode.disabled = false ;
			}
		}
	})() );
	
	/*
	 * 功能：取件方式切换
	 * 触发：多选框切换
	 */
	$("input[name='sendtype']").on("change",(function(){
		var $idInfo = $("input[name='sendtype']").parents('tr')
				.siblings(".tr_pickup_address");
		var $addrInfo = $("input[name='sendtype']").parents('tr')
				.siblings(".Y_toggle");
		return function(){
			var sendtype = $("input[name='sendtype']:checked").val();
			// 2:上门自取 1、2:快递
			if(sendtype == 2){
				$idInfo.css("display","table-row");
				$addrInfo.css("display", "none");
			}else{
				$idInfo.css("display","none");
				$addrInfo.css("display", "table-row");
			}
		}
	})());

	/*
	 * Object: 地址获取
	 */
	var addr = (function(){
		var removeArea = function(){
			$(rv.selector["address_area"]).children("option:gt(0)").remove();
		}
		var removeCity = function(){
			$(rv.selector["address_city"]).children("option:gt(0)").remove();
			removeArea();
		}
		var removeProvince = function(){
			$(rv.selector["address_province"]).children("option:gt(0)").remove();
			removeCity();
		}
		var appendAdress = function($select,data){
			for (var i=0;i < data.length;i++){
				var $option = document.createElement("OPTION");
				$option.value = data[i].id ;
				$option.innerHTML = data[i].name ;
				$select.appendChild($option);
			}
		}
		
		return {
			addressChange : false,
			updateProvinceList : function() {
				removeProvince();
				var countryid = rv.selector.getValue('address_country');
				var dealFun = function(data){
					appendAdress(rv.selector.getElement("address_province"),data);
				};
				rv.ajax.getProvince(countryid,dealFun);
			},
			updateCityList : function() {
				removeCity();
				var provinceid = rv.selector.getValue('address_province');
				var dealFun = function(data){
					appendAdress(rv.selector.getElement("address_city"),data);
				};
				rv.ajax.getCity(provinceid,dealFun);
			},
			updateAreaList : function() {
				removeArea();
				var cityid = rv.selector.getValue('address_city');
				var dealFun = function(data){
					appendAdress(rv.selector.getElement("address_area"),data);
				};
				rv.ajax.getDistrict(cityid,dealFun);
			}
		}
	})();
	
	/**
	 * 功能：国、省、市、区四级地址选择框切换
	 * 触发：内容改变
	 */
	$('#s1').change(function() {
		addr.addressChange = true;
		addr.updateProvinceList();
	});
	$('#s2').change(function() {
		addr.addressChange = true;
		addr.updateCityList();
	});
	$('#s3').change(function() {
		addr.addressChange = true;
		addr.updateAreaList();
	});
	$('#s4').change(function() { /* problem */
		if (this.value > 0){ // 取有效地址
			addr.addressChange = false;
		}else{
			addr.addressChange = true ;
		}
	});
	
	// 提取地址
	$('#recover').live("click",function() {
		if (addr.addressChange && confirm("页面数据发生变动，继续操作？")) {
			var userid = $('#userid').val();
			var url = rv.urls.addressURL + "?userid=" + userid; // 转向网页的地址; /* problem */
			var iWidth = 867; // 弹窗宽度;
			var iHeight = 500; // 弹窗高度;
			popWindow(url,"提取地址",iWidth,iHeight);
		}
	});
	
	// 查看收费标准
	$("#showStandard").on("click",function() {
		$("#standardWin").dialog({
			// title : '添加钱币',
			modal : true,
			width : 650,
			height : 390,
			open : function() {
				// 锁定窗体滚动
				// $("html").css("overflow","hidden");
			},
			close : function() {
				// 恢复窗体滚动
				// $("html").css("overflow","scroll");
			}
		});
	});
	
	/* DOM稳定后使能提交按钮 */
	$(rv.selector.requestSubmitBtn)
			.removeAttr("disabled")
			.removeClass("btn_submit_req_disabled");
	
	/* 新建时保存 */
	$("#save_add").live("click", function() {
		$(this).attr("disabled", "disabled");
		if (!rv.checkForm.checkWhenSaving()) {
			$(this).removeAttr("disabled");
			return false;
		}
		$("#depositstate").val("0");
		$("#requestForm").submit();
	});

	/* 新建时提交 */
	$("#confirminfo_add").live("click", function() {
		if (!rv.checkForm.checkWhenSubmitting()) {
			return false;
		}
		if (!window.confirm("确认提交申请单？")) {
			return false;
		}
		this.disabled=true;
		$("#depositstate").val("3");
		$("#requestForm").submit();
	});

	/* 编辑时提交 */
	$("#confirminfo_edit").live("click", function() {
		if (!rv.checkForm.checkWhenSubmitting()) {
			return false;
		}
		if (!window.confirm("确认提交申请单？")) {
			return false;
		}
		var innerno = $("#innerno").html();
		$.post(rv.urls.checkSubOrNot + '?innerno=' + innerno, function(data) {
			if (data) {
				$("#depositstate").val("3");
				$("#requestForm").submit();
			} else {
				alert("当前申请单已被提交，操作无效！");
				return;
			}
		});
	});

	/* 编辑时保存 */
	$("#save_edit").live("click", function() {
		$(this).attr("disabled", "disabled");
		if (!rv.checkForm.checkWhenSaving()) {
			$(this).removeAttr("disabled");
			return false;
		}
		var innerno = $("#innerno").html();
		$.post(rv.urls.checkSubOrNot  + '?innerno=' + innerno, function(data) {
			if (data) {
				$("#depositstate").val("0");
				$("#requestForm").submit();
			} else {
				alert("当前申请单已被提交，操作无效！");
				$(this).removeAttr("disabled");
				return;
			}
		});
	});
	
	/* 打开服务协议 */
	$(rv.selector.serviceAgreement).click(function() { 
		popWindow(rv.urls.serviceAgreementUrl,"服务协议", 1000, 600)
	});
});

