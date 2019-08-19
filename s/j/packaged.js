$(function(){
	$("#start").click(function() {
		if(window.confirm("确认打盒开始？")){
			changeFlag("8");
			$("#btn_display").css("display","");
		}else{return false;}
	});
	$("#end").click(function() {
		if(window.confirm("确认打盒结束？")){
			changeFlag("9");
		}else{return false;}
	});
	
	
	$("#find").click(function(){
		var flag = false;
		var condition = $("#condition").val();
		var dataNum=$("#hidden_data_num").val()*1;
		var employeeid=$("#hidden_data_employeeid").val();
		var coincodes = new Array();
		var coincode1 =0;
		$("#tab4 tr:gt(0) td.coincode input").each(function(i){
			var coincode = $(this).val();
			coincodes [i] =coincode;
			coincode1 =coincodes[i];
			if(condition==coincode1){
				window.location.href=findDetailURL + '&struts=4&level=4&coincode='+condition+'&dataNum='+dataNum+'&employeeid='+employeeid+'&entitytype='+$('#hidden_entitytype').val(),'detailsPage';	
				return flag;
			}
		});
		if (condition!=coincode1) {
			alert("请输入正确的评品编号！");
			flag =true;
			return flag;
		}
	});
	$("#condition").keypress(function(event){
		var dataNum=$("#hidden_data_num").val()*1;
		if(event.keyCode==13){
			if($(this).val().length!=0){
				var condition = $("#condition").val();
				var employeeid=$("#hidden_data_employeeid").val();
				if(condition.length<3){
					alert("请输入正确的钱币编号！");
					return;
				}
				window.location.href=findDetailURL + '&level=4&struts=4&coincode='+condition+'&dataNum='+dataNum+'&employeeid='+employeeid,'detailsPage';	
			}
		}
	});
	var internalstates = $("#internalstates").val();
	if(internalstates == '8'){
		$("#start").hide();
		$("#btn_display").css("display","");
	}
});


function coinno_info(condition,employeeid){
	var dataNum=$("#hidden_data_num").val()*1;
	window.location.href=findDetailURL + '&struts=4&level=4&coincode='+condition+'&dataNum='+dataNum+'&employeeid='+employeeid+'&entitytype='+$('#hidden_entitytype').val(),'detailsPage';	
	};
function changeFlag(flag) {
	var id = $("#id").val();
	var param="p_p_id=task_WAR_coinportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-2&p_p_col_count=1"
	$.post(updatePackagedUrl+'&status='+flag+'&id='+id,function(data) {
		if(data.result == 'ok') {
			if(flag == '8') {
				//alert("打盒开始");
				parent.location.reload();
			} else {
				window.open("/group/coin/task?"+param+'&entityType='+$('#hidden_entitytype').val(),"tasklistPage");
				window.parent.close();
			}
		} else {
			alert("操作失败");
		}
	});
}

function packagedUpload(parm,requestid,employeeid){
	var coinsize=$("#hidden_data_num").val();
	window.open (uploadImgtURL+'&myaction=upload'+'&num='+parm+'&employeeid='+employeeid+'&requestid='+
			requestid+'&type=2&struts=4'+'&coinsize='+coinsize+'&entitytype='+$('#hidden_entitytype').val(), 'uploadPage');
}

//鼠标移到行上效果
function mouse_over_tab4(rowid){
	$("#tr"+rowid).addClass("over_packaged_tab");
}
function mouse_out_tab4(rowid){
	$("#tr"+rowid).removeClass("over_packaged_tab");
}
function checkFindNum(findnum,coinsize){
	if(findnum!=""){
		if(coinsize*1<findnum*1){
			alert("此钱币不存在");
			$("#txt_findnum").val("");
			return false;
		}else if(findnum.length==3&&/^\d{0,3}$/.test(findnum)&&findnum*1>0){
			return true;
		}else{
			alert("请输入正确编号");
			$("#txt_findnum").val("");
			return false;
		}
	}else{
		alert("不能为空");
		return false;
	}
  }
function submitFindImg(coincode,employeeid,coinsize,type,struts){
	$.post(basePath+"/servlet/FindImgs",
			{coincode:coincode,employeeid:employeeid,coinsize:coinsize,type:type,struts:struts},
			function(data){
			data = eval(data);
			$("#div_imgs_list").html("");
			var html='<ul style="list-style-type:none;">';
			$.each(data ,function(i){
				html+='<li style="height:100px; width:100px;float:left;text-align:center;margin-left:10px;"><p style="line-height:80px;">';
				html+='<a data-gallery="" download="'+data[i].name+'" title="'+data[i].name+'" href="'+data[i].image_l+'"><img src="'+data[i].image_s+'"/></a></p>';
				html+='<p style="line-height:10px;margin-top:-7px;"><a data-gallery="" download="'+data[i].name+'" title="'+data[i].name+'" href="'+data[i].image_l+'">'+data[i].name+'</a></p></li>';
			});
			html+='</ul>';
			$("#div_imgs_list").html(html);
	});
}
$(function(){
	var dataNum=$("#hidden_data_num").val()*1;
	var employeeid=$("#hidden_data_employeeid").val();
	$("#condition").keypress(function(event){
		var condition =$(this).val();
		if(event.keyCode==13){
			if(condition.length!=0){
				window.location.href=findDetailURL + '&level=4&struts=4&coincode='+condition+'&dataNum='+dataNum+'&employeeid='+employeeid,'detailsPage';
			}
		}
	});
	$("#all_checkbox").click(function() {
		if ($("#all_checkbox").attr("checked")) {
			$("#tab4 tr:gt(0) input:checkbox").each(function() {
				$(this).attr("checked", true);
			});
		} else {
			$("#tab4 tr:gt(0) input:checkbox").each(function() {
				$(this).removeAttr("checked");
			});
		}
	});
	$("#tab4 tr:gt(0) input:checkbox").click(function(){
		if($("#tab4 tr:gt(0) input:checkbox:checked").length==0){
			$("#all_checkbox").removeAttr("checked");
		}
	});
	
	$("#btn_saveAll").click(function(){
		var checked_row=$("#tab4 tr:gt(0) input:checkbox:checked");
		var chk_module_value =new Array();
	   //if(checked_row.length>0){
		   var num=0;
		   var data_Num=$("#hidden_data_num").val()*1;
		   for(var i=0; i<data_Num; i++){
			   if(checkScore(i)){
			   		save(i,1); 
			   		num++;
		   		}
	  		 }
		   if(num==data_Num){
			   alert("批量保存成功");
		   }
		
	  // }
	});
	$("#find_uploaded_imgs").click(function(){
		var requestCode=$("#hidden_data_requestcode").val();
		var coinsize=$("#hidden_data_num").val();
		var employeeid=$("#hidden_data_employeeid").val();
		var type="2";
		var struts="4";
		$.post(basePath+"/servlet/FindImgs",
				{coincode:requestCode+"001",employeeid:employeeid,coinsize:coinsize,type:type,struts:struts},
				function(data){
				data = eval(data);
				new Dialog('<div style="background:#CCC;height:100%; width:95%; margin:20px;">'
					+'<div style="margin:20px;">编号    '+requestCode +'<input size="3" type="text" id="txt_findnum" value="001"/>'
					+'<input type="button" value="查看" style="margin:20px;" id="div_find">'
					+'<input type="button" style="margin:20px;" value="上一枚" id="div_find_last">'
					+'<input type="button" value="下一枚" id="div_find_next"></div>'
					+'<div id="div_imgs_list" style="margin:20px;" ></div>'
					+'</div>'
					).show();
				var html='<ul style="list-style-type:none;">';
				$.each(data ,function(i){
					html+='<li style="height:100px; width:100px;float:left;text-align:center;margin-left:10px;"><p style="line-height:80px;">';
					html+='<a data-gallery="" download="'+data[i].name+'" title="'+data[i].name+'" href="'+data[i].image_l+'"><img src="'+data[i].image_s+'"/></a></p>';
					html+='<p style="line-height:10px;margin-top:-7px;"><a data-gallery="" download="'+data[i].name+'" title="'+data[i].name+'" href="'+data[i].image_l+'">'+data[i].name+'</a></p></li>';
				});
				html+='</ul>';
				$("#div_imgs_list").html(html);
				//回车
				$("#txt_findnum").keypress(function(event){
					if(event.keyCode==13){
						var findnum= $("#txt_findnum").val();
						if(checkFindNum(findnum,coinsize)){
							submitFindImg(requestCode+findnum,employeeid,coinsize,type,struts);
						}
					}
				});
				//点击查看
				$("#div_find").click(function(){
					var findnum= $("#txt_findnum").val();
					if(checkFindNum(findnum,coinsize)){
						submitFindImg(requestCode+findnum,employeeid,coinsize,type,struts);
					}
				});
				$("#div_find_last").click(function(){
					var findnum= $("#txt_findnum").val();
					if(checkFindNum(findnum,coinsize)){
						if(findnum>1){
							findnum--;
							if(findnum<10){
								findnum="00"+findnum;
							}else{
								findnum="0"+findnum;
							}
							submitFindImg(requestCode+findnum,employeeid,coinsize,type,struts);
							$("#txt_findnum").val(findnum);
						}else{
							alert("已经是第一枚了");
						}
					}
				});
				$("#div_find_next").click(function(){
					var findnum= $("#txt_findnum").val();
					if(checkFindNum(findnum,coinsize)){
						if(findnum*1<coinsize*1){
							findnum++;
							if(findnum<10){
								findnum="00"+findnum;
							}else{
								findnum="0"+findnum;
							}
							submitFindImg(requestCode+findnum,employeeid,coinsize,type,struts);
							$("#txt_findnum").val(findnum);
						}else{
							alert("已经是最后一枚了");
						}
					}
				});
			});
	});
});