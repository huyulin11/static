$(function() {
	window.datagrid = lyGrid({
		id : 'paging',
		l_column : [{
			colkey : "id",
			renderData:function(rowindex,data, rowdata, column){
				return'<span class="depositclassid" style="display:none">'+data+'</span>'
			}
		},{
			colkey : "innerno",
			name : "内部流转号",
		},{
			colkey : "entitytype",
			name : "藏品类型",
			renderData : function(rowindex,data,rowdata,column){
				if(data=='1'){
					return '金银币';
				}else if(data=='2'){
					return '纸币';
				}else if(data=='3'){
					return '古钱';
				}else if(data=='4'){
					return '邮票';
				}else if(data=='5'){
					return '机制币';
				}else {
					return '未知类型';
				}
			}
		},{
			colkey : "aliasname",
			name : "藏品名称"
		},{
			colkey : "amount",
			name : "预约数量"
		},{
			colkey : "numreal",
			name : "实际数量",
			renderData : function(rowindex,data, rowdata, column) {
				return '<input type="text" size="5" name="JudgeResult.numreal" value="'+data+'">'
			}
		},{	
			colkey:"numtestok",
			name : "鉴定合格数量",
			renderData : function(rowindex,data,rowdata,column){
				return '<p><span>合&nbsp;&nbsp;&nbsp;格</span><input type="text" size="5" name="JudgeResult.numtestok" value="'+data+'"></p>'
			},
		},{
			colkey:"numtestnotok",
			name : "鉴定不合格数量",
			renderData:function(rowindex,data,rowdata,column){
				return '<p><span>不合格</span><input type="text" size="5" name="JudgeResult.numtestnotok" value="'+data+'"></p>'
			},
		},{
			colkey:"numtestunjudged",
			name : "未鉴定数量",
			renderData:function(rowindex,data,rowdata,column){
				return '<p><span>未&nbsp;&nbsp;&nbsp;评</span><input type="text" size="5" name="JudgeResult.numtestunjudged" value="'+data+'"></p>'
			}
		},{
			colkey:"illustrate",
			name : "鉴定结果说明",
			renderData : function(rowindex,data,rowdata,column){
				return '<textarea name="JudgeResult.remark">'+data+'</textarea>'
			}
		},{
			colkey:"depositstate",
			renderData : function(rowindex,data,rowdata,column){
				return '<span class="depositstate" style="display:none">'+data+'</span>'
			}
		},{
			name : "操作",
			renderData : function(rowindex,data,rowdata, cloumn) {
				return '<span style="text-decoration:underline;color:red;cursor:pointer;" class="save">保存</span>'
			}
		}],
		jsonUrl : '/judge/select.shtml',
		checkbox : true,
	});
	
	$('td:eq(7) input').blur(function(){
		var numapp = $(this).parent().parent().find("td").eq(6).text();
		var numreal = $(this).parent().parent().find("td").eq(7).find("input").val();
		if(numapp!=numreal){
			if(confirm("实际数量与预约数量不符，确认继续？")){
				return true;
			}else{
				$('td:eq(7) input').attr("value","");
			}
		}
	});
	
	$(".save").click("click", function() {
		var depositclassid = $(this).parent().parent().find("td").eq(2).text();
		var numreal = $(this).parent().parent().find("td").eq(7).find("input").val();
		var numtestok =$(this).parent().parent().find("td").eq(8).find("input").val();
		var numtestnotok = $(this).parent().parent().find("td").eq(9).find("input").val();
		var numtestunjudged = $(this).parent().parent().find("td").eq(10).find("input").val();
		var remark = $(this).parent().parent().find("td").eq(11).find("textarea").val();
		$.ajax({
			url:"/judge/result.shtml",
			type:"post",
			data:{"depositclassid":depositclassid,
				  "numreal":numreal,
				  "numtestok":numtestok,
				  "numtestnotok":numtestnotok,
				  "numtestunjudged":numtestunjudged,
				  "remark":remark},	
			dataType:"json",
			success:function(result){
				if(result!=0){
					$(".save").css("color","blue");
					$("#judgeEnd").show();
					alert("保存评鉴结果成功");					
				}
			},
			error:function(){
				alert("保存评鉴结果失败");
			}
		})
	});
	
	/*
	$(".save").click("click", function() {
		var depositclassid = $(this).parent().parent().find("td").eq(2).text();
		var numreal = $(this).parent().parent().find("td").eq(6).find("input").val();
		var numtestok =$(this).parent().parent().find("td").eq(7).find("input").eq(0).val();
		var numtestnotok = $(this).parent().parent().find("td").eq(7).find("input").eq(1).val();
		var remark = $(this).parent().parent().find("td").eq(8).find("textarea").val();
		debugger;
		$.ajax({
			url:"/judge/change.shtml",
			type:"post",
			data:{"depositclassid":depositclassid,
				  "numreal":numreal,
				  "numtestok":numtestok,
				  "numtestnotok":numtestnotok,
				  "remark":remark},	
			dataType:"json",
			success:function(result){
				debugger;
				if(result!=0){
					alert("修改评鉴结果成功");					
				}
			},
			error:function(result){
				alert("修改评鉴结果失败"+result);
			}
		})
	});
	 */
	$("#judgeEnd").click("click",function(){
		 var depositclassid = $(".depositclassid").eq(0).text();
		 var depositstate = $(".depositstate").eq(0).text();
		 $.ajax({
			 url:"/judge/changeState.shtml",
			 type:"post",
			 data:{"depositclassid":depositclassid,
				   "depositstate":depositstate},
		     dataType:"json",
		     success:function(result){
		    	 if(result==true){
		    		 layer.confirm('评鉴成功!请关闭窗口?', function(index) {
							parent.datagrid.loadData();
							parent.layer.close(parent.pageii);
							return false;
						});
		    	 }
		     },
		     error:function(){
		    	 alert("评鉴失败，请重试！");
		     }
		 })
	});
});