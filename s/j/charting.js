$(function(){
	$("#find_uploaded_imgs").click(function(){
		var requestCode=$("#hidden_data_requestcode").val();
		var coinsize=$("#hidden_data_num").val();
		var employeeid=$("#hidden_data_employeeid").val();
		var type="2";
		var struts="5";
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
	$("#start").click(function() {
		if(window.confirm("确认打盒制图开始？")){
			changeFlag("10");
			$("#btn_display").css("display","");
		}else{return false;}
	});
	$("#end").click(function() {
		if(window.confirm("确认打盒制图结束？")){
			var num=0;
			var datarows=$("#tab4 tr").length-1;
			for(var i=0;i<datarows;i++){
				var imgnum = $("#tab4 tr:eq(" + (i+1) + ") td:last-child").text() * 1;
				if(imgnum<2){
					alert("你第"+(i+1)+"枚币上传的图片不够！");
					break;
				}else{
					num++;
				}
			}
			if(num==datarows){
				changeFlag("11");	
			}
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
				window.location.href=findDetailURL +'&struts=5&level=5&coincode='+condition+'&dataNum='+dataNum+'&employeeid='+employeeid+'&entitytype='+$('#hidden_entitytype').val(),'detailsPage';
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
					alert("请输入正确的评品编号！");
					return;
				}
				window.location.href=findDetailURL + '&struts=5&level=5&coincode='+condition+'&dataNum='+dataNum+'&employeeid='+employeeid+'&entitytype='+$('#hidden_entitytype').val(),'detailsPage';
				}
		}
		
	});
	var internalstates = $("#internalstates").val();
	if(internalstates == '10'){
		$("#start").hide();
		$("#btn_display").css("display","");
	}
});

function coinno_info(condition,employeeid){
	var dataNum=$("#hidden_data_num").val()*1;
	window.location.href=findDetailURL + '&struts=5&level=5&coincode='+condition+'&dataNum='+dataNum+'&employeeid='+employeeid+'&entitytype='+$('#hidden_entitytype').val(),'detailsPage';
	};
function coinno_infos(condition,employeeid){
	var dataNum=$("#hidden_data_num").val()*1;
	window.location.href=findDetailURL + '&imgtype=flasking&struts=5&level=5&coincode='+condition+'&dataNum='+dataNum+
	'&employeeid='+employeeid+'&entitytype='+$('#hidden_entitytype').val(),'detailsPage';
	};
function changeFlag(flag) {
	var id = $("#id").val();
	var param="p_p_id=task_WAR_coinportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-2&p_p_col_count=1"
	$.post(updateChartingUrl+'&status='+flag+'&id='+id,function(data) {
		if(data.result == 'ok') {
			if(flag == '10') {
				//alert("打盒制图开始");
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
function chartingUpload(parm,requestid,employeeid){	
	var coinsize=$("#hidden_data_num").val();
	window.open (uploadImgtURL+'&myaction=upload'+'&num='+parm+'&employeeid='+employeeid+'&requestid='+requestid+
			'&type=2&struts=5&level=5'+'&coinsize='+coinsize+'&entitytype='+$('#hidden_entitytype').val(),'uploadPage');
}
function refreshWindow() {
	window.location.reload();
}
/* 打印标签 */
function printTag(ReqCode,coinCount){
	var startCode = $("#codeStart").val();
	var endCode = $("#codeEnd").val();
	if(startCode=="" || startCode==0 || startCode>999){
		alert("起始数字应为1-999正整数！");
		$("#coinNoStart").val("");
		return false;
	}
	if(startCode>coinCount || endCode>coinCount){
		alert("起始或结束数字超过评品总数！");
		return false;
	}
	var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT("打盒制图标签打印");
	//intOrient,intPageWidth,intPageHeight,strPageName
	/*  intOrient：打印方向及纸张类型
     1---纵向打印，固定纸张； 
     2---横向打印，固定纸张；  
     3---纵向打印，宽度固定，高度按打印内容的高度自适应
     0---方向不定，由操作者自行选择或按打印机缺省设置。 */
		 
     
//		LODOP.ADD_PRINT_BARCODE(15,10,128,68,"Code93",packNo);
	if(endCode=="" || (endCode!="" && endCode>startCode)){
		$.post(printTag+'&startCode='+startCode+'&endCode='+endCode+'&requestcode='+ReqCode,function(data) {
			data = eval(data);
			$.each(data,function(key, value) {
				LODOP.SET_PRINT_PAGESIZE("1","55mm","40mm","打盒制图打印纸");
				$("#print_score").text(value.score);
				if(value.score<1){
					$("#print_score").text("");
				}
				$("#print_years").text(value.years+"年");
				$("#print_coincode").text(value.coincode);
				$("#print_country").text(value.country);
				$("#print_mquality").text(value.mquality);
				$("#print_facevaluedis").text(value.facevaluedis);
				if(value.shortsubject.length==2){					
					var array=value.shortsubject.split("");
					var html="<span>"+array[0]+"&nbsp;&nbsp;&nbsp;&nbsp;"+array[1]+"</span>";
					$("#print_shortsubject").html(html);
				}
				if(value.shortsubject.length==3){					
					var array=value.shortsubject.split("");
					var html="<span>"+array[0]+"&nbsp;&nbsp;"+array[1]+"&nbsp;&nbsp;"+array[2]+"</span>";
					$("#print_shortsubject").html(html);
				}
				if(value.shortsubject.length==4){					
					var array=value.shortsubject.split("");
					var html="<span>"+array[0]+"&nbsp;"+array[1]+"&nbsp;"+array[2]+"&nbsp;"+array[3]+"</span>";
					$("#print_shortsubject").html(html);
				}
				$("#print_material").text(value.material+"币");
				$("#print_version").text(value.version);
				$("#print_catalogue").text(value.catalogue);			
         		LODOP.ADD_PRINT_HTM(-5,15,480,390,document.getElementById("printCharting").innerHTML); 
				LODOP.ADD_PRINT_BARCODE(26,31,"0.1mm","0.2mm","QRCode",value.qrurl);
//				LODOP.PREVIEW();
				LODOP.PRINT();
			});
		});
	}else if(endCode!="" && endCode<=startCode){
		alert("结束数字应大于起始数字！");
		return false;
	}else if(endCode>999999 ){
		alert("评品总数不可超过999999！");
		$("#coinNoEnd").val("");
		return false;
	}
}
function mouse_over_tab4(rowid){
	$("#tr"+rowid).addClass("over_coin_tab");
}
function mouse_out_tab4(rowid){
	$("#tr"+rowid).removeClass("over_coin_tab");
}
function checkFindNum(findnum,coinsize){
	if(findnum!=""){
		if(coinsize*1<findnum*1){
			alert("此评品不存在");
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