$(function () {	
	//国家触发焦点
	$('#amount1').focus(function() {
		amount1Focus();
	});	
	//国家失去焦点
	$('#amount1').blur(function() {
		amount1Blur();
	});
	//省/洲获取焦点触发
	$('#password1').focus(function() {
		password1Focus();
	});	
	//省失去焦点触发
	$('#password1').blur(function() {
		password1Blur();
	});
	//市触发焦点
	$('#capitalvalue1').focus(function() {
		capitalvalue1Focus();
	});	
	//市失去焦点
	$('#capitalvalue1').blur(function() {
		capitalvalue1Blur();
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
});
function amount1Focus() {
	document.getElementById("amount1").style.borderColor='';
}

function amount1Blur() {
	var amount1 = $('#amount1').val();
	if(amount1 == '') {
		document.getElementById("amount1").style.borderColor='red';
		return false;
	} else {
		return false;
	}
}
function password1Focus() {
	document.getElementById("password1").style.borderColor='';
}
function  password1Blur() {
	var password1 = $('#password1').val();
	if (''==password1) {
		document.getElementById("password1").style.borderColor='red';	
	} 
	return false;
}

function capitalvalue1Focus() {
	document.getElementById("capitalvalue1").style.borderColor='';
}

function capitalvalue1Blur() {
	var capitalvalue1 = $('#capitalvalue1').val();
	if(''==capitalvalue1){
		document.getElementById("capitalvalue1").style.borderColor='red';
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