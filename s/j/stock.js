function showNewStockDiv(){
	$("#newStock").slideDown(500);
	/*$("#new").css("display","block");*/
}
function closeStockWin(){
	$("#newStock").css("display","none");
	/* document.body.removeChild(bgObj); */
	$("#bgDiv").remove();
}

//--------------------------------------
var bgObj; 

function showStockWin(){

bgObj=document.createElement("div"); 
bgObj.setAttribute( "id", "bgDiv"); 
bgObj.style.position="absolute"; 
bgObj.style.top="0"; 
bgObj.style.background="#cccccc"; 
bgObj.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=3,opacity=25,finishOpacity=75)"; 
bgObj.style.opacity="0.6"; 
bgObj.style.left="0"; 
bgObj.style.marginTop="-100px";
bgObj.style.width=screen.width+"px"; 
bgObj.style.height="1100px";
document.body.appendChild(bgObj);
showNewStockDiv();
}

$(function () {
	
	//姓名触发焦点
	$('#stockno').focus(function() {
		stocknoFocus();
	});
	
	//姓名失去焦点
	$('#stockno').blur(function() {
		stocknoBlur();
	});
});

function stocknoFocus() {
	$('#stocknotag').html("<font color='#FF9933'>请输入6~12位字母+数字的单号~</font>");
	$('#stocknotag').removeClass();
	$('#stocknotag').addClass('SelectMsg');
}

function stocknoBlur() {
	var re=new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$");
	var stockno = $('#stockno').val();
	if(stockno == '') {
//		document.getElementById("stockno").style.borderColor='red';
//		$('#stocknotag').html("<font color='#FF0000'>申请单号或包裹编号不能为空!</font>");
//		$('#stocknotag').removeClass();
//		$('#stocknotag').addClass('DefaultMsg');
		return false;
	} else {
//		if(!re.test(stockno)) {
//			$('#stocknotag').html("<font color='#FF9933'>申请单号或包裹编号不合规范，请认真填写</font>");
//			$('#stocknotag').removeClass();
//			$('#stocknotag').addClass('FailedMsg');
//			return false;
//		}else{
//			checkstockno();
//		}
		checkstockno();
//		$('#stocknotag').html('检测通过！');
//		$('#stocknotag').removeClass();
//		$('#stocknotag').addClass('SucceedMsg');
//		return false;
	}
}
