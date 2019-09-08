/*
 *  global variable: entitytype, searchEntityListUrl
 *  operated DOM :  '#tab5', '.searchingFlag', '#CoinSearchTable'
 *  				'script[type="text/template"]'
 */
rv.requires().defines('search',function(){
	
	// 通过查询获取table5中的数据
	var startRow = 0;
	var enableSearch = true;// 正处于搜索阶段
	var data = [] ;
	
	var showSearchFlag = function(flag){
		if (flag == true) {
			$(".searchingFlag").show();
		} else{
			$(".searchingFlag").hide() ;
		}
	}
	
	
	var ajaxSearch = function() {
		if (enableSearch == true) { // 若ajax异步，服务器返回之前不允许新请求，防重复点击
			enableSearch = false ;
			showSearchFlag(true);
			delayDialog('check', 'delayDialog');
			  
			$.ajax({
				type : "post",
				url : rv.urls.searchEntityListUrl + '?entitytype=' + entitytype 
						+ '&startRow=' + startRow  ,
				data : $("#coinSForm").serializeObject() ,
				async : true,
				success : function(json) {
					fillData(json);
				},
				error : function() {
					showSearchFlag(false);
					enableSearch = true ;
					if (confirm("连接失败，请重新登录！\n是否需要立即刷新？")){
						location.reload();
					}
				}
			});
		}
	};

	
	/* global variable: data */
	var fillData = function(json) {
		if(enableSearch){
			return;
		}
		jsonArray = JSON.parse(json);
		var node = document.querySelector("#tab5 tbody");
		var template = node.querySelector('script[type="text/template"]').text ;
		for(var i =0 ; i < jsonArray.length ; i++){
			if(i == jsonArray.length-1){
				}
			var text = template.replace('{index}',startRow++);
			for (var x in jsonArray[i]){
				text = text.replace("{{"+x+"}}",jsonArray[i][x]);
			}
			data.push(jsonArray[i]);
			node.insertAdjacentHTML("beforeend",text);
			showSearchFlag(false);
			enableSearch = true ;
		}
	};
	return {
		'selectedData' : [],
		'emptyData' : function(){
			startRow = 0;
			data = [] ;
			$("#tab5 tr:gt(0)").remove();
		},
		/* global variable: data */
		/* id can be a single data or a array */
		'getData' : function(ids){ 
			if (!ids){			// return all data
				return data ; 
			}
			ids = ids.constructor == 'Array' ? ids : [].concat(ids);
			var rtnData = [] ;
			for (var i=0 ; i < data.length ; i++ ){
				for(var j=0;j< ids.length;j++){
					if (data[i].id == ids[j]){
						rtnData.push(data[i]) ;
						ids = ids.slice(j);   // delete this id from array
						continue ;
					}
				}
				if (ids.length == 0){
					break ;
				}
			}
			return rtnData.length >  1 ? rtnData : 
				   rtnData.length == 1 ? rtnData[0] : null ;
		},
		'getDataArray' : function(ids){ 
			ids = ids.constructor == 'Array' ? ids : [].concat(ids);
			var rtnData = [] ;
			for (var i=0 ; i < data.length ; i++ ){
				for(var j=0;j< ids.length;j++){
					if (data[i].id == ids[j]){
						rtnData.push(data[i]) ;
						ids = ids.slice(j);   // delete this id from array
					}
				}
			}
			return rtnData ;
		},
		/** 查找按钮开启搜索数据 
		 *  必须先执行loaddataFirst，然后loaddataMore才有效。
		 */
		'loaddataFirst' : function() {
			this.emptyData(); // 即使有数据也全部清空重新搜索
			ajaxSearch();
		},
		/** 滚轮开启搜索数据 */
		'loaddataMore' : function() {
			ajaxSearch();
		},
		'endSearching' : function(){
			this.emptyData();
		}
	}
},true);
