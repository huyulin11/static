function Condition(name){
		this.name = name ;
		this.condition ;
		this.setEqual = function(con){ // WHERE name = '?'
			this.condition = null ;
			if (con && con != '' ){
				if (typeof con === 'string'){
					this.condition = this.name + '=EQUAL ' + con ;
				}else if (con.constructor === Array){
					this.condition = new Array();
					for (var i =0;i < con.length ; i++){
						this.condition.push(this.name + '=EQUAL ' + con[i]) ;
					}
				}
				return this.condition ;
			}
		}
		this.setLike = function(con){ // WHERE name LIKE '?'
			this.condition = null  ;
			if (con && con != '' ){
				this.condition = this.name + '=LIKE ' + con ;
				return this.condition ;
			}
		}
		this.setBetween = function(left,right){ // WHERE name = '?'
			this.condition = null ;
			var con = '' ;
			if (left > right){
				var temp = left ;left = right ;right = temp ;
			}else if (left == right){
				return this.setEqual(left);
			}
			if (left && left != '' ){
				con += 'GTE ' + left ; // less than or equal
			}
			if (right && right != ''){ // greater than or equal
				con += ' LTE ' + right ; // 即使left为空，con中间也只是多了一个空格
			}
			if (con != ''){
				this.condition = this.name + '=' + con ;
				return this.condition ;
			}
		}
		this.setNull = function(){
			this.condition = null  ;
		}
	}
	function SearchMgr(columnArray){ // argument: formMgr.columnsDetail.queryColArray
		this.columns = new Array() ;
		/* item in Columns:
		 *  name : String
		 *  lable : String
		 *  column : Column
		 *  inputElement : InputElement : <input:text> <select> <div>
		 *	searchCondition : Conditon
		 */
		this.addColumnArray = function(columnArray){
			if (columnArray && columnArray.constructor == Array){
				for (var i=0;i<columnArray.length;i++){
					var column = columnArray[i] ;
					this.columns.push({
						'name' : column.columnname ,
						'label' : column.object.chncolname ,
						'column' : column ,
						'inputElement' : createInputElement(column) ,
						'searchCondition' : new Condition(column.columnname)
					});
				}
			}
		}
		if (columnArray){
			this.addColumnArray(columnArray);
		}
	}
	function createInputElement(column){
		if ( !column || !column.columnname){ // check if it's valid
			throw new Error("column or columnname is null");
		}
		inputElement = document.createElement("input");
		inputElement.type = "text" ;
		inputElement.name = column.columnname ;
		if (column.selectableOptions ){
			var datalist = document.createElement("DATALIST"); 
			datalist.setAttribute("id",column.columnname +"_list");
			inputElement.setAttribute("list", datalist.id);
			inputElement.datalist = datalist ;
			for (var x in column.selectableOptions){
				var option = document.createElement("OPTION");
				if (x && x != '' && x != ' ' ){
					option.setAttribute("value",column.selectableOptions[x]);
					datalist.appendChild(option);
				}
			}
		}
		return inputElement ;
	}
	SearchMgr.prototype = {
		'readSearchCondition' : function(){
			var conditionArray = new Array() ;
			for (var i=0;i< this.columns.length;i++){
				var val = $.trim($(this.columns[i].inputElement).val());
				if (val == '' ){
					this.columns[i].searchCondition.setNull();
					continue ;
				}
				if ( this.columns[i].inputElement.tagName == 'SELECT'){
					this.columns[i].searchCondition.setEqual(val);
				}else if( this.columns[i].inputElement.tagName == 'INPUT') {
					var options = this.columns[i].column.selectableOptions ;
					var selectedValue ;
					var selectedLikeArray = new Array() ;
					if (options){
						for (var x in options){
							if (val == options[x] ){
								selectedValue = x ;
								break ;
							} 
							if ( options[x].search(val) >= 0){
								selectedLikeArray.push(x);
							}
						}
					}
					if (selectedValue){ // 从下拉列表中找到对应值
						this.columns[i].searchCondition.setEqual(selectedValue);
					}else if(selectedLikeArray.length > 0){ // 没有从下拉列表中找到对应值，但找到相似值
						this.columns[i].searchCondition.setEqual(selectedLikeArray);
					}else{ // 没有下拉列表或有没有列表项相似值（条件放宽）
						this.columns[i].searchCondition.setLike(val);
					}
				}
				var condition = this.columns[i].searchCondition.condition ;
				if (condition && condition != '' ){
					conditionArray.push(condition);
				}
			}
			return conditionArray ;
		},
		'createHtml' : function(){
			var searchForm = document.createElement("Form");
			searchForm.id = 'searchForm';
			var ul = document.createElement("UL");
			for (var i=0;i < this.columns.length ; i++){
				var labelLi = document.createElement("LI");
				var inputDiv = document.createElement("DIV");
				var inputLi = document.createElement("LI");
				labelLi.setAttribute("class","label");
				inputLi.setAttribute("class","input");
				var inputElement = this.columns[i].inputElement ;
				var datalist = inputElement.getAttribute('list');
				labelLi.innerHTML = this.columns[i].label ;
				inputDiv.appendChild(inputElement);
				if (inputElement.datalist){
					inputDiv.appendChild(inputElement.datalist);
				}
				inputLi.appendChild(inputDiv);
				ul.appendChild(labelLi);
				ul.appendChild(inputLi);
				if (i % 2 == 1){ // 换行
					searchForm.appendChild(ul);
					ul = document.createElement("UL");
				}else if (i == this.columns.length - 1 ){ // 添加最后一组
					searchForm.appendChild(ul);
				}
			}
			var clrBtn = document.createElement("INPUT");
			var searchBtn = document.createElement("INPUT");
			var btnDiv = document.createElement("DIV");
			clrBtn.setAttribute('type','reset');
			searchBtn.setAttribute('type','submit');
			clrBtn.value = "重置" ;
			searchBtn.value = "搜索" ;
			btnDiv.appendChild(clrBtn);
			btnDiv.appendChild(searchBtn);
			searchForm.appendChild(btnDiv);
			return searchForm ;
		}
	}