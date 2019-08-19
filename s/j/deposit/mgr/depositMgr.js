function toolbar(com,grid){
	//删除记录如果是默认号码...确定删除后默认号码自动换为已认证的其他手机？
	//另外，如果确定删除当前默认号码，user表中defaultmobile的处理！！
	if (com=='payment'){
		if($("div#Requesttable .trSelected").length==0){
			alert("请选择要支付的申请");
		}else{
			if(confirm('确定支付这 ' + $("div#Requesttable .trSelected").length + ' 条申请记录吗?')){
				 var  ids ="";
				 var  statusvalue="";
			     for(var i=0;i<$("div#Requesttable .trSelected").length;i++){				    	 
			        ids+=","+$("div#Requesttable .trSelected").find("td:first").eq(i).text();//获取id 				        
			        statusvalue=$("div#Requesttable .trSelected").eq(i).children("td").find("li").eq(0).text();				        
			        if (statusvalue!="4"){
			        	alert("只有待支付状态的申请才能进行支付!");
			        	return false;
			        }
			        statusvalue=","+statusvalue;
			      }
			      ids=ids.substring(1);
			      statusvalue=statusvalue.substring(1);
			      var uuid = new UUID(); 
			      selRequest(ids,uuid);
			      showWinDiv(ids,uuid);
	      	}
	   }
	}else if (com=='add'){
		 window.location.href = URLs.refund;
	}else if (com=='select'){
		var  innernos ="";
	     for(var i=0;i<$('.trSelected',grid).length;i++){
	    	 innernos+=";"+$('.trSelected',grid).eq(i).children("td").find("span").eq(0).text();
	      }
	     innernos=innernos.substring(1);
	     window.opener.getinnernos(innernos);
		 window.close();
	}
}

// 申请单编辑
function requestEdit(innerno){
		var iWidth=867; //弹出窗口的宽度;
		var iHeight=600; //弹出窗口的高度;
		var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
		var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
		window.open (URLs.reviewEdit + '?userid='+ param.userid +'&innerno='+innerno, 'newReviewWindow' );
	}
//查看
function requestDetail(innerno,depositstate){
	var iWidth=1100; //弹出窗口的宽度;
	var iHeight=650; //弹出窗口的高度;
	var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	window.open (URLs.reviewDetail /* url*/
			 + '?userid='+ param.userid +'&innerno='+innerno
				+'&depositstate='+depositstate ,
			'detailnewwindow',/* window name */
			'height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizeable=no,location=no,status=no,directories=no');	
			
}

//查看物流详情
function logisticsdetail(innerno,depositstate,sendtype){
	// var iWidth=800; //弹出窗口的宽度;
	// var iHeight=600; //弹出窗口的高度;
	// var iTop = (window.screen.availHeight-30-iHeight)/2; //获得窗口的垂直位置;
	// var iLeft = (window.screen.availWidth-10-iWidth)/2; //获得窗口的水平位置;
	// alert("物流详情：单号："+innerno+"状态："+depositstate+"回邮："+sendtype);
	window.open(URLs.postBackDetail + '?innerno=' + innerno ,
		'回邮详情信息',
		'height=500,width=1000,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no'
	);
}
	
function selRequest(ids,uuid){
	$.getJSON(URLs.insertRequestid,{'ids' :ids,'uuid=': uuid } , function(data) {
		$.each(data, function(key, value) {
			if (value == "ok") {
				window.location.href=URLs.payment+'?id=' +uuid;
				alert("支付功能未开发！");
			} else{
				alert("失败");
			} 
		});
	});
}

/* 删除申请
	delflag = 1 : 作废，删除标志置位
	delflag = 2 : 彻底删除
	delflag = 0 : 还原
*/
function delRequest(innerno,delstatus,delflag){
	var info = (delflag == 1)? "作废" : 
					(delflag == 2)? "删除" : "还原" ;
	if(confirm("确定" + info + "申请单："+innerno+"吗？")){
		$.ajax({
			type: "POST",
			url: URLs.delRequest,
			data: "id="+innerno+"&status="+delstatus+"&delflag="+delflag,
			dataType:"text",
			success: function(msg){
				if(msg!="0"){
					$("#flexRequest").flexReload();
					alert("成功" + info + msg +"条记录");
				}else{
					alert("有错误发生,msg="+msg);
				}
			},
			error: function(msg){
				alert(msg);
			}
		});
	}
}

var restoreRequest = delRequest ;//还原作废申请单为草稿
var abolishRequest = delRequest ;//作废

function confirmRequestqueren(innerno,depositstate,updatetime){
	$.ajax({
		type: "POST",
		url: URLs.confirmRequest,
		data: "innerno="+innerno+"&depositstate="+depositstate+"&updatetime="+updatetime,
		dataType:"text",
		success: function(msg){
			if(msg!="0" && msg!="-1"){
				alert("成功确认"+msg+"条记录");
				$("#flexRequest").flexReload();
				
			}else if(msg=="-1"){
				alert("当前申请单已被修改，请刷新后查看新单子！");
				$("#flexRequest").flexReload();
			}else{
				alert("有错误发生,msg="+msg);
			}
		},
		error: function(msg){
			alert(msg);
		}
	});
}

function test(){
	$(":checkbox").attr("checked",false);
	$("#checkedAmount").text("0");
	$("#checkedTotalCost").text("0.00");
	$('#flexRequest').flexOptions({newp: 1}).flexReload();
	return;
}

function showWinDiv(payid,uuid) {
	var sWidth,sHeight;  
	sWidth=screen.width;  
	sHeight=screen.height;  
	var bgObj=document.createElement("div");  
	bgObj.setAttribute('id','bgDiv');  
	bgObj.style.position="absolute";  
	bgObj.style.top="0";  
	bgObj.style.background="#cccccc";  
	bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75";  
	bgObj.style.opacity="0.6";  
	bgObj.style.left="0";  
	bgObj.style.width=sWidth + "px";  
	bgObj.style.height=sHeight + "px";  
	bgObj.style.zIndex = "998";  
	document.body.appendChild(bgObj);
	showNewDiv(payid,uuid);
} 
function showNewDiv(payid,uuid){
	$("#new").slideDown(1000);
	$("#uuid").val(uuid);
	$("#payid").val(payid);
}

function changeCheck(requestId,totalCost){
	var totalCost=0;
	var totalChecked = $("#flexRequest input[type=checkbox]:checked").length;
	$("#flexRequest input[type=checkbox]:checked").each(function(){
		totalCost = totalCost + Number($(this).val());
	});
	totalCost = totalCost.toFixed(2);
	$("#checkedAmount").text(totalChecked);
	$("#checkedTotalCost").text(totalCost);
	
}
function checkAll(){
	var totalCost=0;
	if($("#selAll").attr("checked")=="checked"){
		$(":checkbox").attr("checked",false);
	}else{
		$(":checkbox").attr("checked",true);
	}
	var totalChecked = $("#flexRequest input[type=checkbox]:checked").length;
	$("#flexRequest input[type=checkbox]:checked").each(function(){
		totalCost = totalCost + Number($(this).val());
	});
	totalCost = totalCost.toFixed(2);
	$("#checkedAmount").text(totalChecked);
	$("#checkedTotalCost").text(totalCost);
}
function payment(){
	if($("#flexRequest input[type=checkbox]:checked").length==0){
		alert("请至少选择一个单子！");
		return;
	}
	var  ids ="";
	$("#flexRequest input[type=checkbox]:checked").each(function(){
		ids+=","+$(this).attr("id");
	});
     ids=ids.substring(1);
     var uuid = new UUID(); 
     selRequest(ids,uuid);
    /*  showWinDiv(ids,uuid); */
}
function removeCheck(){
	$(":checkbox").attr("checked",false);
	$("#checkedAmount").text("0");
	$("#checkedTotalCost").text("0.00");
}