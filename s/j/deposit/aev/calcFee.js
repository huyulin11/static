/**
 * dependencies: rv.entitytype ,rv.ENTITYTYPE_COIN ... rv.ENTITYTYPE_MECHANISMCOIN
 */ 
rv.fee = (function(){
	
	var selector = rv.selector ;
	var compositeForm = function(name,selector){
		this.name = name ;
		this.selector = rv.selector[name] || rv.selector[selector] || selector ;
		this.root = arguments[2] || document ;
		this.setRoot = function(root){
			this.root = rv.selector.getElement(root);
			return this;
		};
		if (!rv.selector[name] ){
			rv.selector[name] = selector ;
		}
		this.elements = rv.selector.getElements(this.selector);
		if (this.elements.length == 1 && this.elements[0].type != 'radio'){
			this.element = this.elements[0];
			delete this.elements ;
		}

		var getValue = function(){ // update value field and return element's value
			if (this.element){
				this.value =  rv.selector.getValueFromElement(this.element);
			}else{
				this.value =  rv.selector.getRadioValue(this.root,this.name);
			}
			return this.value ;
		}
		var setValue = function(value){
			var success = false ;
			if (this.element){
				rv.selector.setValueToElement(this.element,value);
				success = true ;
			}else{
				success = rv.selector.setRadioValue(this.root,this.name,value);
			}
			if(success){
				this.value = value ;
			}
			return success ;
		}
		
		this.getValue = getValue ;
		this.setValue = setValue ;
		this.value ;
		this.notifyChange = function(){
			this.getValue();
		}
	};
	
	var userInputs = {
		expressSpeed 		: new compositeForm('expressSpeed')	, 
		serviceId 			: new compositeForm('serviceId')	,   
		applytype 			: new compositeForm('applytype') 	,// 送评方式：上门/物流
		packagecode			: new compositeForm('packagecode')	,// 物流单号
		sendtype 			: new compositeForm('sendtype') 	,// 取件方式
		payment				: new compositeForm('payment')		// 付款方式
	};                      
	// 注意JS逗号运算符与C语言不同: 先计算左边的参数，再计算右边的参数值，然后返回最右边参数的值
	
	var chargeOutputs = {   
		totalamount			: new compositeForm('totalamount'),				// 送评数
		totalevaluate		: new compositeForm('totalevaluate'),			// 总估价
		totalreqcost		: new compositeForm('totalreqcost'),			// 总评级费
		totalweight			: new compositeForm('totalweight'),				// 总重量
		totaltransportation	: new compositeForm('totaltransportationation'),// 包装运输 
		totalinsurance		: new compositeForm('totalinsurance'),			// 保价费
		totalpreferential	: new compositeForm('totalpreferential'),		// 优惠
		totalboxfee			: new compositeForm('totalboxfee'),				// 增补费用
		totalcost			: new compositeForm('totalcost')				// 总费用
	};
	(function checkDependency(){
		if (!rv || !rv.entitytype || rv.entitytype == ''){
			throw 'rv.entitytype is expected to be a number between 1 and 5';
		}
	})
	
	var FAST_SPEED = 1 ,SLOW_SPEED = 4 ;
	var getSpeed = function(){
		return document.querySelector('input[name="speed"]:checked').value;
	}
	var isFastSpeed = function(){
		return getSpeed() == FAST_SPEED ;
	}
	var setSpeed = function(sp){
		document.querySelector('input[name="speed"][value="'+sp+'"]').checked = true ;
		return getSpeed() == sp ;
	}
	var hasProxy = function(){
		return document.querySelector("input#isproxy[type=checkbox]:checked") ? true : false;
	}
	
	var HELPYOURSELF_TRANSPORTATION = '2';	// 上门自取
	var EXPRESSION_TRANSPORTATION 	= '1';  // 快递回邮
	var VALUEINSURED_TRANSPORTATION = '3' ; // 回邮保价
	
	// 计算回邮运费
	var calcTransFee = function(weight,province,sendtype){ // weight单位:克
		if (sendtype == EXPRESSION_TRANSPORTATION 
				|| sendtype == VALUEINSURED_TRANSPORTATION ){
			var fee0 = (province == 9 || province == 10 || province == 11 ) 
					? 15 /* 江浙沪 */ : 25 ;
			return weight <= 1000
					? fee0 
					: fee0 + ( weight - 1000) / 100  ;
		}else{
			return 0 ;
		}
	}
	// 计算保价费
	var calcInsureFee = function(totalevaluate,sendtype){
		if (sendtype == VALUEINSURED_TRANSPORTATION){
			var fee = totalevaluate / 200 ;
			return fee <= 1 ? 1 : fee ;
		}else{
			return 0 ;
		}
	}
	
	
	
	/** 合计估价 */
	var getOneCount = function(coinid,amount,guestappraisal) {
		var total = 0;
		if (rv.entitytype == rv.ENTITYTYPE_STAMP ) {
			$("#tabDetail tr.tr_" + coinid).each(function() {
				if ($(this).find("td input[name*='coinid']").val() != coinid) {
					throw 'the 2 coidid are different';
				}
				var val = $(this).find("td input[name*='coinevaluate']").val() ;
				// when guestappraisal is zero,clear all coinevaluate <input>
				if (val == 0 && guestappraisal != 0
						||  val != 0 && guestappraisal == 0 ) {
					$(this).find("td input[name*='val']")
						   .val(val = guestappraisal);
				}
				total += Number(val);
			});
		} else {
			total = (amount * guestappraisal).toFixed(2);
		}
		return total ;
	}
	
	/**
	 * global function : isFastSpeed 
	 * global function : hasProxy
	 */
	var getOneAssessment = function(coinid,amount,guestappraisal,sysInfo) {
		if (rv.entitytype == rv.ENTITYTYPE_COIN) {
			var calcFee = getFee(sysInfo.guojia,sysInfo.years,sysInfo.size);
		}
		if (amount == '' || isNaN(amount) || amount < 0 ) throw Error();
		if (amount == '' || isNaN(guestappraisal) ||  guestappraisal < 0 ) throw Error();
		if (amount == '' || isNaN(sysInfo.boxCost)){
			sysInfo.boxCost = 0 ;
		}
		switch(rv.entitytype){
			case rv.ENTITYTYPE_COIN   : {
				var fee = calcFee(amount,guestappraisal,isFastSpeed());
				return total = (fee >= 0)? (amount * fee).toFixed(2) : -1;
				// break ;
			}
			case rv.ENTITYTYPE_BILL   : {
				var fee = getFee(amount,guestappraisal,isFastSpeed(),sysInfo.whetherSeries);
				return total = (fee >= 0)? 
					(amount * ( fee + sysInfo.boxCost)).toFixed(2) 
					: -1;
				// break ;
			}
			case rv.ENTITYTYPE_ANCIENTCOIN   : {
				var fee = getFee(amount,guestappraisal,isFastSpeed());
				return total = (fee >= 0)? 
					(amount * ( fee + sysInfo.boxCost)).toFixed(2) 
					: -1;
				//break ;
			}
			case rv.ENTITYTYPE_STAMP         : {
				var total = 0 ;
				$("#tabDetail tr.tr_" + coinid).each(function() {
					var fee = getFee(amount,guestappraisal,isFastSpeed(),hasProxy());
					total += fee ;
				});
				return total ;
				//break ;
			}
			case rv.ENTITYTYPE_MECHANISMCOIN : {
				var fee = getFee(amount,guestappraisal,isFastSpeed());
				return total = (fee >= 0)? 
					(amount * ( fee + sysInfo.boxCost)).toFixed(2) 
					: -1;
				//break ;
			}			
		}
	}

	var getFee = (function(entitytype,rv){
		function cf(amount,price,isFastSpeed){
			if (price > 500000) {
				return 2000;
			} else if (price >= 0 && price <= 2000 && amount >= 20) {
				return isFastSpeed ? 80: 30 ;
			} else if (price >= 0 && price <= 5000) {
				return isFastSpeed ? 80: 50 ;
			} else if (price > 5000 && price <= 20000) {
				return isFastSpeed ? 150: 100 ;
			} else if (price > 20000 && price <= 100000) {
				return 200 ;
			} else if (price > 100000 && price <= 500000) {
				return 500 ;
			} else {
				return -1 ;
			}
		}
		function bf(amount,price,isFastSpeed,whetherSeries){
			if (price > 500000) {
				fee = price * 0.01;
			} else if (price >= 0 && price <= 3000 && amount >= 20
					&& whetherSeries == 1) { /* toDo */
				return isFastSpeed ? 50: 50 ;
			} else if (price >= 0 && price <= 3000 && amount >= 20
					&& whetherSeries == 2) {
				return isFastSpeed ? 80: 80 ;
			} else if (price >= 0 && price <= 5000) {
				return isFastSpeed ? 120: 120 ;
			} else if (price > 5000 && price <= 20000) {
				return isFastSpeed ? 200: 200 ;
			} else if (price > 20000 && price <= 100000) {
				return isFastSpeed ? 400: 400 ;
			} else if (price > 100000 && price <= 500000) {
				return isFastSpeed ? 700: 700 ;
			}else {
				return -1 ;
			}
		}
		function af(amount,price,isFastSpeed){
			if (price > 500000) {// 大于50万元
				fee = price * 0.01;
			} else if (price >= 0 && price <= 1000) { // 0~1000元
				return isFastSpeed ? 120: 80 ;
			} else if (price >= 1000 && price <= 5000) { // 1000~5000元
				return isFastSpeed ? 180: 120 ;
			} else if (price > 5000 && price <= 20000) {// 5000~2万元
				return isFastSpeed ? 300: 200 ;
			} else if (price > 20000 && price <= 100000) {// 2万~10万元
				return isFastSpeed ? 400: 400 ;
			} else if (price > 100000 && price <= 500000) {// 10万~50万元
				return isFastSpeed ? 700: 700 ;
			}else {
				return -1 ;
			}
		}
		function sf(amount,price,isFastSpeed,isproxy){
			if (isproxy) {
				if (price >= 0 && price <= 200) {
					return 30;
				} else if (price > 200 && price <= 1000) {
					return 55;
				} else if (price > 1000 && price <= 5000) {
					return 85;
				} else if (price > 5000 && price <= 20000) {
					return 140;
				} else if (price > 20000 && price <= 100000) {
					return 400;
				} else {
					return price * 0.008;
				}
			} else {
				if (price >= 0 && price <= 200) {
					return 40;
				} else if (price > 200 && price <= 1000) {
					return 80;
				} else if (price > 1000 && price <= 5000) {
					return 120;
				} else if (price > 5000 && price <= 20000) {
					return 200;
				} else if (price > 20000 && price <= 100000) {
					return 500;
				} else {
					return price * 0.01;
				}
			}
		}
		function mf(amount,price,isFastSpeed){
			if (price > 500000) {// 大于50万元
				return price * 0.01;
			} else if (price >= 0 && price <= 1000) { // 0~1000元
				return isFastSpeed ? 120: 80 ;
			} else if (price >= 1000 && price <= 5000) { // 1000~5000元
				return isFastSpeed ? 180: 120 ;
			} else if (price > 5000 && price <= 20000) {// 5000~2万元
				return isFastSpeed ? 300: 200 ;
			} else if (price > 20000 && price <= 100000) {// 2万~10万元
				return isFastSpeed ? 400: 400 ;
			} else if (price > 100000 && price <= 500000) {// 10万~50万元
				return isFastSpeed ? 700: 700 ;
			}else {
				return -1 ;
			}
		}
		if (entitytype == rv.ENTITYTYPE_COIN ){
			return function(country,year,size){
				if (country == "中国" || country == "台湾" || country == "香港" || country == "澳门") {
					return cf ;
				} else {
					if (year >= 1920) {
						return cf ;
					} else if (year >= 1801 && year < 1920) {
						return (size >= 40 && size < 80) ? af : af ;
					} else {
						alert('温馨提示：\n此币早于1800年');
					}
				}
			}
		}else if (entitytype == rv.ENTITYTYPE_BILL ){
			return bf ;
		}else if (entitytype == rv.ENTITYTYPE_ANCIENTCOIN ){
			return af ;
		}else if (entitytype == rv.ENTITYTYPE_STAMP ){
			return sf ;
		}else if (entitytype == rv.ENTITYTYPE_MECHANISMCOIN ){
			return mf ;
		}else{
			throw "不支持此类型钱币评级: entitytype = " + entitytype ;
		}
	})(rv.entitytype,rv);
	
	return {
		'userInputs' : userInputs ,
		'chargeOutputs' : chargeOutputs ,
		'calcOneRow' : function(trIndex) {
			var tr = $('#tab4 tbody tr')[trIndex] ;
			if (!tr){
				return ;throw 'The ' + trIndex + 'th doesn\'t exist' ;
			}
			var data = {
				'coinid' :  tr.querySelector("td input[name*='coinid']").value,
				'amount' :  Number(tr.querySelector("input[name$='.amount']").value), // 数量
				'guestappraisal' :  tr.querySelector("input[name$='.guestappraisal']").value.replace(/,/g,""), // 估价
				'weight' : undefined
			}
			var sysInfo = rv.search.getData(data.coinid);
			data.sysInfo = sysInfo ;
			// 合计估价
			data.total = getOneCount(data.coinid,data.amount,data.guestappraisal);
			// 合计评级费
			data.assessment = getOneAssessment(data.coinid,data.amount,
					data.guestappraisal,sysInfo);
			tr.querySelector("td input[name$='.total2']").value = data.total;
			tr.querySelector("td input[name$='.total1']").value = 
					data.assessment != -1 ? data.assessment : '???' ;
			return data ;
		},
		'calcTransFee' : function(weight,province){ // weight单位
			var fee0 = (province == 9 || province == 10 || province == 11 ) 
					? 15 /* 江浙沪 */ : 25 ;
			return weight <= 10 
		}
	}
})();
