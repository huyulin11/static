	function debug(){debugger;}
	// constructor
	function Column(object,isNotNull){
		this.object = object ;
		this.columnname = object.columnname ;
		this.isNum = (object.isNum === true ) ;
		this.isNotNull = isNotNull ;
		this.maxLength = object.maxLength ;
		this.trElement ;
		this.inputElement ;
		this.selectableOptions ;
		this.msgElements ;
	}
	Column.prototype = {
		'getValue' : function(value){
			return getInputValue(this.inputElement);
		},
		'setValue' : function(value){
			setInputValue(this.inputElement,value);
			return this ;
		},
		'clearInput' : function(){
			setInputValue(this.inputElement,'');
			return this ;
		},
		'clearMsgElements' : function(){
			for (var i=0 ;i < this.msgElements.length ; i++){
				this.msgElements[i].setAttribute('hidden','hidden');
			}
			return this ;
		},
		'checkInput' : function(){
			/*
			 * 返回值： Array
			 * 	Array[0] 总的验证结果
			 *  Array[1]...Array[n-1] 各项检查的验证结果
			*/
			
			// 绑定到事件
			if ( !this.inputElement.onchange) {
				this.inputElement.onchange = function(column){
					return function(){
						checkValue(column);
					}
				}(this);
			}
			return checkValue(this);
		}
	}
	/*
	 * 输入检查：
	 * 1 ) 检查表单输入是否合法，只指定column参数
	 * 2 ) 检查value数值是否合法，需要column、value两个参数
	 */
	function checkValue(column,value){	
		var rtn = [true,true,true] ;
		if (!value){ 
			var value = $.trim($(column.inputElement).val()) ;
			$(column.inputElement).val(value);
		}
		if ( column.isNotNull && $.trim(value) == "" ){
			rtn[0] = false ;
			return rtn.unshift(rtn[0] && rtn[1] && rtn[2]); 
		}
		var pattern = /^[0-9]+[\.]?[0-9]*$/g ;
		if ( column.isNum && value ){
			if (typeof value === 'string' && value.search(pattern) == -1  ){ 
				rtn[1] = false ;// 空白跳过检查
			}
		}
		for(var i=0 ;i < column.msgElements.length ; i++){
			column.msgElements[i].hidden = rtn[i] ;
		}
		rtn.unshift(rtn[0] && rtn[1] && rtn[2]);
		return rtn  ; // 
	}
	function setInputValue(input,value){
		 if (input.nodeName === 'INPUT' || input.nodeName === 'TEXTAREA' ){
			if (!value){ // 空值处理，防止<input>中出现undefined
				input.value = '' ;
			}else{
				input.value = value ; 
			}
		}else if(input.nodeName === 'SELECT' ){
			var index ;
			if ( !value || value == ''){
				index = 0 ;
			}else{
				var options = input.options ; //array
				for(var i=0;i < options.length ; i++){
					if (options[i].value == value){
						index = i ;
					}
				}
			}
			input.selectedIndex = index ;
		}
	}
	function getInputValue(input){
		if (input.nodeName === 'INPUT' || input.nodeName === 'TEXTAREA' ){
			return input.value ; 
		}else if(input.nodeName === 'SELECT' ){
			return input.options[input.selectedIndex] ; 
		}
	}
	