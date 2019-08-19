function showNewAddressDiv(){
	$("#newAddress").slideDown(500);
	/*$("#new").css("display","block");*/
}
function closeAddressWin(){
	$("#newAddress").css("display","none");
	/* document.body.removeChild(bgObj); */
	$("#bgDiv").remove();
}
var bgObj; 

function showAddressWin(){

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
showNewAddressDiv();
}
$(function () {	
	//国家触发焦点
	$('#s1').focus(function() {
		countryFocus();
	});	
	//国家失去焦点
	$('#s1').blur(function() {
		countryBlur();
	});
	//省/洲获取焦点触发
	$('#s2').focus(function() {
		provinceFocus();
	});	
	//省失去焦点触发
	$('#s2').blur(function() {
		provinceBlur();
	});
	//市触发焦点
	$('#s3').focus(function() {
		cityFocus();
	});	
	//市失去焦点
	$('#s3').blur(function() {
		cityBlur();
	});
	//地区触发焦点
	$('#s4').focus(function() {
		districtFocus();
	});	
	//地区失去焦点
	$('#s4').blur(function() {
		districtBlur();
	});
	//街道地址触发焦点
	$('#aaddress').focus(function() {
		aaddressFocus();
	});	
	//街道地址失去焦点
	$('#aaddress').blur(function() {
		aaddressBlur();
	});
	//收件人触发焦点
	$('#areceiver').focus(function() {
		areceiverFocus();
	});	
	//收件人失去焦点
	$('#areceiver').blur(function() {
		areceiverBlur();
	});
	//邮编触发焦点
	$('#azip').focus(function() {
		azipFocus();
	});	
	//邮编失去焦点
	$('#azip').blur(function() {
		azipBlur();
	});
	
});
function azipFocus(){
	document.getElementById("azip").style.borderColor='';
}
function azipBlur(){
	var azip = $('#azip').val();
	if(azip == ''||azip==null) {
		document.getElementById("azip").style.borderColor='red';
		return false;
	} else {
		return false;
	}
}
function countryFocus() {
	document.getElementById("s1").style.borderColor='';
}

function countryBlur() {
	var country = $('#s1').val();
	if(country == '00'||country=='请选择') {
		document.getElementById("s1").style.borderColor='red';
		return false;
	} else {
		return false;
	}
}
function provinceFocus() {
	document.getElementById("s2").style.borderColor='';
}
function  provinceBlur() {
	var province = $('#s2').val();
	if (province == '请选择'||null==province||''==province||'省份'==province) {
		document.getElementById("s2").style.borderColor='red';	
	} 
	return false;
}

function cityFocus() {
	document.getElementById("s3").style.borderColor='';
}

function cityBlur() {
	var city = $('#s3').val();
	if('请选择'==city||null==city||''==city||'地级市'==city){
		document.getElementById("s3").style.borderColor='red';
	}
	 return false;	
}
function districtFocus() {
	document.getElementById("s4").style.borderColor='';
}
function districtBlur() {
	var district = $('#s4').val();
	if('请选择'==district||null==district||''==district||'市、县级'==district){
		document.getElementById("s4").style.borderColor='red';
	}
	 return false;	
}
function aaddressFocus() {
	document.getElementById("aaddress").style.borderColor='';
}
function aaddressBlur() {
	var aaddress = $('#aaddress').val();
	if(''==aaddress||null==aaddress){
		document.getElementById("aaddress").style.borderColor='red';
	}
	 return false;	
}
function areceiverFocus() {
	document.getElementById("areceiver").style.borderColor='';
}
function areceiverBlur() {
	var areceiver = $('#areceiver').val();
	if(''==areceiver||null==areceiver){
		document.getElementById("areceiver").style.borderColor='red';
	}
	 return false;	
}