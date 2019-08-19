rv = window.rv || {} ;
rv.selector = {
	requestForm 	 : 'form#requestForm', // 申请单 表单部分
	entitytypeSelect : 'select#entitytypeSelect' ,
	
	basicInfo 			: 'div#basic',
	expressSpeed 		: 'div#basic input[name="speed"]' ,
	checkedExpressSpeed : 'div#basic input[name="speed"]:checked',
	serviceId 			: 'div#basic input[name="serviceid"]'  , 
	checkedServiceId 	: 'div#basic input[name="serviceid"]:checked'  ,
	
	applytype 			: /*div#ser table#tab2*/ 'input[name*="applytype"]', // 送评方式：上门/物流
	checkedApplytype 	: /*div#ser table#tab2*/ 'input[name*="applytype"]:checked', 
	packagecode			: /*div#ser table#tab2*/ 'input#packagecode' , // 物流单号
	
	sendtype 			: /* div#pay table#tab3 */ 'input[name="sendtype"]', // 取件方式
	checkedSendtype 	: /* div#pay table#tab3 */ 'input[name="sendtype"]:checked',
	address_country 	: /* div#pay table#tab3 */ '#s1' ,
	address_province 	: /* div#pay table#tab3 */ '#s2' ,
	address_city 		: /* div#pay table#tab3 */ '#s3' ,
	address_area 		: /* div#pay table#tab3 */ '#s4' ,
	
	choosedCoinList		: 'div#list' , // 已选择币列表
	openSearchWindowBtn : 'div#list input#add[type="button"]', // 点此’添加'
	showAllDetailAnchor	: 'div#list span#allDetail a', // 全部明细
	choosedCoinListTab	: 'div#list #tab4' ,
	
	totalamount			: '#calculateTab #totalamount',		// 送评数
	totalevaluate		: '#calculateTab #totalevaluate',		// 总估价
	totalreqcost		: '#calculateTab #totalreqcost',		// 总评级费
	totalweight			: '#calculateTab #totalweight',		// 总重量
	totaltransportation	: '#calculateTab #totaltransportation',// 包装运输 
	totalinsurance		: '#calculateTab #totalinsurance',	// 保价费
	totalpreferential	: '#calculateTab #totalpreferential',	// 优惠
	totalboxfee			: '#calculateTab #totalboxfee',		// 增补费用
	totalcost			: '#calculateTab #totalcost',			// 总费用
	
	payment				: 'input[name="payment"]'  , // 付款方式
	checkedPayment		: 'input[name="payment"]:checked'  ,
	
	agreement			: '#agreement' , // 阅读并接受服务协议
	requestSaveBtn		: '#save_add',	// 保存草稿
	requestSubmitBtn	: '#confirminfo_add' , // 提交申请单
	
	
	searchBtn			: '#CoinSearchTable #confirmBtn', // 搜索
	searchResetBtn		: '#CoinSearchTable #btn_reset',  // 重置
	searchResultTab		: /* #result */ '#tab5' ,         // 搜索结果
	
	serviceAgreement	: "#a_server" ,
	addDataBtn			: '#btn_determine',               // 添加数据 按钮
	cancelAddingDataBtn : '#btn_cancel' ,                 // 取消 按钮
	
	setSelector	: function(selector,value){
		if (typeof selector == 'string'){
			this[selector] = value ;
			return getElement(selector) ? true : false;
		}
	},
	getElement : function(root,selector){
		var currentElement 	= (arguments.length > 1)? arguments[0] : undefined ;
		selector = (arguments.length > 1)? arguments[1] : arguments[0] ;
		if (arguments.length == 1){
			if (typeof selector == 'string'){
				var selectorCapUpper = selector.charAt(0).toUpperCase() + selector.substring(1);
				if (this[selector] && !this["_dom_" + selector] 
						&& !selector.startsWith('checked') 
						&& !this['checked'+selectorCapUpper] ){
					this["_dom_" + selector] = this["_dom_" + selector] || 
							document.querySelector(this[selector] || selector) ;
				}
				return this["_dom_" + selector] ||
						document.querySelector(this[selector] || selector);
			}else {
				if (selector.nodeName) { // is a DOM element
					return selector ;
				}
			}
		}else if(currentElement){
			var currentElement = this.getElement(currentElement);
			return currentElement.querySelector(this[selector] || selector) ;
		}
		function buildDOM(selector){// selector must be a string
			
		}
	},
	getElements : function(root,selector){
		var currentElement  = arguments.length > 1 ? arguments[0] : document;
		selector 			= arguments.length > 1 ? arguments[1] : arguments[0];
		if (arguments.length > 1 && typeof currentElement == 'string'){
			currentElement = document.querySelector(this[currentElement] || currentElement);
			if (!currentElement){
				throw 'currentElement can\'t be not existed'
			}
		}
		return currentElement.querySelectorAll(this[selector] || selector) ;
	},
	getValueFromElement : function(e){
		// get value from a element : HTMLElement
		if (e.nodeName == 'INPUT' || e.nodeName == 'SELECT'){
			if (e.type == 'button' || e.type == 'submit' || e.type == 'reset' ){
				return e.onclick ;
			}
			return e.value ;
		}else{
			return e.innerText ;
		}
	},
	getValue : function(root,selector){
		var e = this.getElement.apply(this,arguments);
		return this.getValueFromElement(e);
	},
	getRadioValue : function(root,selector){
		var elements = this.getElements.apply(this,arguments);
		for(var i = 0 ; i < elements.length; i++){
			if (elements[i].type == 'radio' && elements[i].checked == true ){
				return this.getValueFromElement(elements[i]);
			}
		}
	},
	getValues : function(root,selector){
		var elements = this.getElements.apply(this,arguments);
		var values = new Array(elements.length);
		for(var i = 0 ; i < elements.length; i++){
			values.push(this.getValueFromElement(elements[i]));
		}
	},
	setValueToElement : function(e,value){
			if(e.nodeName == 'INPUT' || e.nodeName == 'SELECT') {
				e.value = value ;
			}else{
				e.innerHTML = value ;
			}
	},
	setRadioValue : function(root,selector,value){
		var elements = this.getElements.apply(this,arguments);
		value = arguments.slice(-1)[0] ;
		for(var i = 0 ; i < element.length; i++){
			if (element[i].type == 'radio' && element[i].value == value ){
				element[i].checked = true ;
				return true ;
			}
		}
		return false ; // didn't find matched value
	},
	setValue : function(selector,value){
		var currentElement = (arguments.length > 2) ? arguments[0] : document ;
		selector = arguments[arguments.length - 2] ;
		value = arguments[arguments.length - 1] ;
		var e = this.getElements(currentElement,selector);
		if (e.length == 1){
			e = e[0];
			if (e.nodeName == 'INPUT' || e.nodeName == 'SELECT'){
				if (e.type == 'radio'){
					e.checked = (e.value == value) ? true : false ;
					return (e.value == value) ;
				}else{
					e.value = value;
					return true ;
				}
			}else{
				e.innerText = value;
				return true ;
			}
		}else if(e.length > 1){
			for(var i = 0 ; i< e.length ;i++){
				if (e[i].type != 'radio'){
					throw 'Warnning: There\'re multiple "' + selector + '" elements  ' ;
				}
			}
			for(var i = 0 ; i< e.length ;i++){
				if (e[i].value == value){
					e[i].checked = true ;
					return true;
				}
			}
			throw 'can\'t not find valid value for radio element : "'+ selector +'"' ;
		}else{
			throw 'can\' find the element' ;
		}
	}
}

rv.test = rv.test || {} ;
rv.test.buildAllSeletor = function(){
	for(var x in rv.selector){
		var sel = rv.selector[x];
		if (typeof sel == 'string'){
			rv.selector.getElement(x) || console.log("selected none: "+ sel);
			if (rv.selector.getElements(x).length > 1){
				// console.log("'" + sel + "'elements are more than one");
			}
		}
		
	}
}
rv.test.buildAllSeletor();
