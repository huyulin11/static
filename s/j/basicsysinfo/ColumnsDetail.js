// constructor
	function ColumnsDetail(){
		this.addColArray = [] ;
		this.queryColArray = [] ;
		this.operateType = OperateType('ADD') ;
		this.currentColArray = this.addColArray ;
		this.addTRArray = [];
		this.editTRArray = [] ;
		this.currentTRArray ;
	}
	function sortColumns(a,b){
		if (!a.columnname && !b.columnname){
			throw new Error('column object a or b does not have columnname \n'
				+ 'a='+ a + '\nb=' + b );
		}
		if (!a.object.ordercol || isNaN(a.object.ordercol)){
			return 1 ;
		}
		if (!b.object.ordercol || isNaN(b.object.ordercol)){
			return - 1 ;
		}
		return a.object.ordercol - b.object.ordercol ;
	}
	function createSpan(text,classAttribute,show){
		var $span = document.createElement("span");
		$span.innerHTML = text ;
		if (classAttribute){
			$span.className  = classAttribute;
		}
		if (!show ){ // show = undefined/null/false
			$span.hidden = true ;
		}
		return $span ;
	}

	function createTrInForm(column){
		var object = column.object ;
		if (!object.columnname){
			throw new Error("columnname is null");
		}
		var $tr = document.createElement("tr");
		var $th = document.createElement("th");
		var $td = document.createElement("td");
		if (object.columnname === 'id'){
			$tr.className  = 'hidden' ;
		}
		// create title for desciption
		$th.innerHTML = object.chncolname ;
		if(column.isNotNull){
			$th.appendChild( createSpan('*','red',true) );
		}

		// create input area 
		var inputElement ;
		if (object.inputtype === "TEXT" ){
			inputElement = document.createElement("input");
			inputElement.type = "text" ;
		}else if (object.inputtype === "SELECT" ){
			inputElement = document.createElement("select");
		}else if (object.inputtype === "TEXTAREA" ){
			inputElement = document.createElement("textarea");
		}else {
			throw new Error('not support this inputtype "'+object.inputtype
				+'" at columnname = ' + object.columnname);
		}
		inputElement.name = object.columnname ;
		inputElement.id = object.columnname ;
		// if (column.maxLength > 0 && column.object.inputtype === 'TEXT' ){
		if (column.maxLength > 0 ){
			inputElement.maxLength = column.maxLength ;
		}
		if (column.isNum && object.inputtype === "TEXT"){
			inputElement.pattern = /^[0-9]+[\.]?[0-9]*$/ ;
			inputElement.title = "整数或小数形式" ;
		}
		var $msg_notNull = createSpan(' 不能为空! ','red');
		var $msg_mustBeNum = createSpan(' 仅允许输入数字! ','red');
		var $msg_checkLength = createSpan(' 超过规定长度' + object.maxLength + '!','red');
		$td.appendChild(inputElement);
		$td.appendChild($msg_notNull);
		$td.appendChild($msg_mustBeNum);
		$td.appendChild($msg_checkLength);
		$tr.appendChild($th);
		$tr.appendChild($td);
		// add to column object
		column.trElement = $tr ;
		column.inputElement = inputElement ;
		column.selectableOptions = object.selectOptions ;
		if (object.inputtype === 'SELECT'){
			fillChoiceOptions(inputElement,column.selectableOptions,
				(object.isNum && object.dictype !== "BOOLEAN") );
		}
		column.msgElements = [$msg_notNull,$msg_mustBeNum,$msg_checkLength];
		column.checkInput(); // onChange绑定检查函数
		return $tr ;
	}
	function fillChoiceOptions(select,options,sort){
		if (select.nodeName !== 'SELECT' && select.nodeName !== 'select' ){
			throw new Error('the first argument of fillChoiceOptions() '
				+ 'expected to be <select> a element.'); 
		}
		if (options.length >= 0){
			throw new Error('the second argument of fillChoiceOptions() '
				+ 'expected to be a object that contains a group of option map'); 
		}
		// the first thing is to sort options
		var array = [] ;
		for ( x in options ){ 
			array.push( {"value":x , "text":options[x] } );
		}
		if (sort){
			array.sort(function(a,b){
				if (isNaN(a.value)) return 1 ;
				if (isNaN(b.value)) return -1 ;
				return a.value - b.value ;
			});
		}
		// add to <select>
		select.options[0] = new Option(((true)?"请选择":"Please Select") , '') ;
		for (var i = 0 ; i < array.length ; i++ ){
			var text  = array[i].text;
			var value = array[i].value ;
			if (text && value && value != '' ){
				select.options[i+1] = new Option(text,value);
			}
		}
	}
	// constructor
	function OperateType(type){
		this.options = ['ADD','EDIT','VIEW'];
		return (function(){
			if ( !type || typeof type !== 'string'
					|| this.options.indexOf(type) === -1 ){
				throw new Error('operateType is only expected '+this.options);
			}
			return type ;
		})();
	}
	
	function getTRArray(colArray){ // a row of the table in the form
		var trArray = [] ;
		if (colArray ){
			for (var i=0 ; i<colArray.length; i++){
				// if (colArray[i].constructor !== Column){
					// throw new Error('ColumnsDetail.getTRArray() : the argument'
						// + 'is expected to passed Column');
				// }
				var e = colArray[i].trElement ;
				!e || trArray.push(e)
			}
		}
		return trArray ;
	}
	// dynamic method
	ColumnsDetail.prototype = {
		'constructor' : ColumnsDetail ,
		'createColArrays' : function(tableinfo){ // return ColumnsDetail
			for (x in tableinfo ){
				var o = tableinfo[x] ;
				if (o.columnname ){ // expected object
					if (o.isaddcol === true ){
						var isNotNull = (o.isaddmust === true) ;
						var column = new Column(o,isNotNull) ;
						createTrInForm(column);
						this.addColArray.push(column);
					}
					if (o.isquerycol === true ){
						var isNotNull = (o.isquerymust === true) ;
						var column = new Column(o,isNotNull) ;
						createTrInForm(column);
						this.queryColArray.push(column);
					}
				}
			}
			this.addColArray.sort(sortColumns);
			this.queryColArray.sort(sortColumns);
			this.addTRArray = getTRArray(this.addColArray);
			this.editTRArray = getTRArray(this.queryColArray);
			this.currentTRArray = this.addTRArray ;
			return this;
		},
		'changeOperateType' : function(type){ // return ColumnsDetail
			this.operateType = OperateType(type) ;
			if (!this.addTRArray){
				this.addTRArray = getTRArray(this.addColArray);
			}
			if (!this.editTRArray){
				this.editTRArray = getTRArray(this.queryColArray);
			}
			if (type === 'ADD'){
				this.currentColArray = this.addColArray ;
				this.currentTRArray  = this.addTRArray ;
			}else if (type === 'EDIT' ){
				this.currentColArray = this.queryColArray ;
				this.currentTRArray  = this.editTRArray ;
			}
			return this; 
		}
	};