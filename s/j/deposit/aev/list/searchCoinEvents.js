rv.requires(                        //引入封装类
		'rv.selector',
		'rv.search' ,
		'window.jQuery',			// library: jQuery
		'window.jQuery.fn.dialog',  // library: yahoo-ui 
		'window.tab5'				// dom: table#tab5 
		).defines/*定义*/(null,function(){
		
	if ($("#year option").length <= 1 ){ // 补全年份搜索条件选择框
		var startYear = (rv.entitytype == rv.ENTITYTYPE_BILL)? 2009 : 1979;
		var endYear = (new Date().getMonth() > 8) 
				? new Date().getFullYear() + 1 
				: new Date().getFullYear() ;
		for ( var i = startYear; i <= endYear; i++) {
			$("#year").append("<option value=" + i + ">" + i + "</option>");
		}
	}
	
	// 送评清单中已经存在的不允许添加
	var forbidAddedCoin = function(){ 
		var entityidArray = rv.list.getAddedEntityid() ;
		$("#tab5 tbody :checkbox").each(function(){
			var entityid = $(this).parent().siblings/*同胞元素*/("td[id='id']").text();
			if (entityidArray.contains(entityid)){ 
				this.disabled = true ;
				this.checked = false ;
			}else{
				this.disabled = false ;
			}
		});
	}
	
	
// 弹出层
$("#list>#add").on('click',function() {
	$("html").css("overflow", "hidden");
	$("#check").dialog({
		modal : true,
		width : 1250,
		height : winHeight = $(window).height() - 35 ,
		open : function() {
			//$("#CoinSearchTable input,#CoinSearchTable select").val("");
			// $("#CoinSearchTable [name='dynasty']").val("0");]
			$("#tab5 :checkbox").attr("checked", false);
			$("#tab5 tbody tr").chooseBackColor("graybackground");
			forbidAddedCoin();
		},
		close : function() {
			// [恢复窗体滚动]
			$("html").css("overflow", "scroll");
			rv.search.endSearching();
		},
		buttons : [ {
			text : function() {
				$(this).attr("id", "btn_determine");
			},
			click : function() {
			
				//恢复窗体滚动
				$("html").css("overflow", "scroll");
				// 将选中的行数据加到tab4	

				if (!rv.list.checkCoinAdded()) {
					rv.list.addCheckedNewData();
					$(this).dialog('close');
				} else if (!rv.list.isOnlyOneChoosed()) { // 送评清单中已添加
					alert("当前只允许增加一种类型！");
				} else {
					alert("选中的数据中有重复数据！");
				}
			}
		}, {
			text : function() {
				$(this).attr("id", "btn_cancel");
			},
			click : function() {
				// 恢复窗体滚动
				$("html").css("overflow", "scroll");
				$(this).dialog('close');
			}
		} ]
	});
	$(".ui-dialog-titlebar.ui-widget-header").hide();
});
// 点击确定，根据条件综合查找tab5数据
$("#CoinSearchTable #btn_reset").on('click',function(){
	rv.search.emptyData();
});
$("#CoinSearchTable #confirmBtn").on('click',function(){
	rv.search.loaddataFirst();
});
$("#CoinSearchTable input,#CoinSearchTable select").on({
	'change': function(){
		rv.search.loaddataFirst();
	} ,
	'keypress' : function(e) {
		if (e.keyCode == 13 || (e.which && e.which == 32)
				|| (e.keyCode && e.keyCode == 32)) {
			rv.search.loaddataFirst();
		}
	}
});

// 滚动鼠标自动搜索
$('#check').on("mousewheel", function(e) {
	if ($("#tab5 tr:gt(0)").size() == 0) { // 若ajax异步，服务器返回之前不允许新请求，防重复点击
		rv.search.loaddataFirst();
	}else{
		var nScrollTop = $(this)[0].scrollTop;
		var nScrollHight = $(this)[0].scrollHeight;
		var nDivHight = $("#check").height() + 200;
		if (nScrollTop + nDivHight >= nScrollHight) {
			rv.search.loaddataMore();
		}
	}
});
// 双击钱币详情添加数据到父界面
$("#tab5 tr:gt(0)").on({
	mouseover : function() {
		$(this).chooseBackColor("redbackground");
	},
	mouseout : function() {
		if ($(this).find("td input[name='choice']").attr(
				"checked") == 'checked') {
			return;
		}
		$(this).chooseBackColor("graybackground");
	},
	dblclick : function() { // 现双机改为仅选中/取消选中当前行
		var entityid = $(this).find('td:eq(0)').text().trim() ;
		if (rv.list.addCheckedNewData(entityid)) {
			alert("该条数据已存在！");
			return;
		}
		var checkbox = $(this).find("[name='choice']")[0] ;
		if (checkbox.checked) {
			$(this).chooseBackColor("graybackground");
			checkbox.checked = false ;
		} else {
			$(this).chooseBackColor("redbackground");
			checkbox.checked = true ;
		}
	}
});

// tab5 勾选checkbox事件,实现全选与反选
$("#tab5 [name=checkedAll]:checkbox").live("click", function() {
	if (this.checked) {
		var i = 0;
		$("#tab5 tbody  input:checkbox").each(function() {
			var entityid = $(this).parents('tr').find('td:eq(0)').text().trim() ;
			if (rv.list.checkCoinAdded(entityid)) {
				this.checked = false ;
				i++;
			}else if (!rv.list.isOnlyOneChoosed()) { // 送评清单中已添加
				alert("当前只允许增加一种类型！");
				return ;
			}else{
				this.checked =  true ;
				$(this).parents('tr').chooseBackColor("redbackground");
			}
		});
		if (i > 0) {
			alert("未选中数据已存在！");
		}
	} else {
		$("#tab5 tbody input:checkbox").each(function() {
			$(this).removeAttr("checked");
			$(this).parents('tr').chooseBackColor("graybackground");
		});
	}
});
	// 单个勾选checkbox事件
	$('#tab5 tbody [name=choice]:checkbox').live("click", function() {
		var entityid = $(this).parents('tr').find('td:eq(0)').text().trim() ;
		if (this.checked == true && rv.list.checkCoinAdded(entityid)) { // 送评清单中已添加
			this.checked = false ;
			alert("该条数据已存在！");
			return ;
		}
		if (!rv.list.isOnlyOneChoosed()) { // 送评清单中已添加
			this.checked = false ;
			alert("当前只允许增加一种类型！");
			return ;
		}
		// 如果有checkbox取消，全选取消
		if (this.checked) {
			$(this).parents('tr').chooseBackColor("redbackground");
		} else {
			$(this).parents('tr').chooseBackColor("graybackground");
			$('#checkedAll').attr('checked', false);
		}	
	});

},true); // 'true' means evaluate the anonymous function when all requires are already
