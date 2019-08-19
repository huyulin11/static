function showNewBankDiv(){
	$("#newBank").slideDown(500);
	/*$("#new").css("display","block");*/
}
//function closeBankWin(){
//	$("#newBank").css("display","none");
//	/* document.body.removeChild(bgObj); */
//	$("#bgDiv").remove();
//}

//--------------------------------------
var bgObj; 

function showBankWin(){

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

showNewBankDiv();
}
$(function () {	
	//银行触发焦点
	$('#ibankname').focus(function() {
		banknameFocus();
	});	
	//银行失去焦点
	$('#ibankname').blur(function() {
		banknameBlur();
	});
	//开户行获取焦点触发
	$('#ilocation').focus(function() {
		locationFocus();
	});	
	//开户行失去焦点触发
	$('#ilocation').blur(function() {
		locationBlur();
	});
	//账号触发焦点
	$('#iaccountid').focus(function() {
		iaccountidFocus();
	});	
	//账号失去焦点
	$('#iaccountid').blur(function() {
		iaccountidBlur();
	});
	//开户人触发焦点
	$('#ireceiver').focus(function() {
		ireceiverFocus();
	});	
	//开户人失去焦点
	$('#ireceiver').blur(function() {
		ireceiverBlur();
	});
	
//	---------------国际银行
	//银行名称触发焦点
	$('#tbankname').focus(function() {
		tbanknameFocus();
	});	
	//银行名称失去焦点
	$('#tbankname').blur(function() {
		tbanknameBlur();
	});
	//银行所在地获取焦点触发
	$('#tlocation').focus(function() {
		tlocationFocus();
	});	
	//银行所在地失去焦点触发
	$('#tlocation').blur(function() {
		tlocationBlur();
	});
	//收款人银行账户触发焦点
	$('#taccountid').focus(function() {
		taccountidFocus();
	});	
	//收款人银行账户失去焦点
	$('#taccountid').blur(function() {
		taccountidBlur();
	});
	//开户人触发焦点
	$('#treceiver').focus(function() {
		treceiverFocus();
	});	
	//开户人失去焦点
	$('#treceiver').blur(function() {
		treceiverBlur();
	});
	//银行地址触发焦点
	$('#taddress').focus(function() {
		taddressFocus();
	});	
	//银行地址失去焦点
	$('#taddress').blur(function() {
		taddressBlur();
	});
	//国际银行账户号（IBAN）触发焦点
	$('#tiban').focus(function() {
		tibanFocus();
	});	
	//国际银行账户号（IBAN）失去焦点
	$('#tiban').blur(function() {
		tibanBlur();
	});
	//银行识别码（Swift Code）触发焦点
	$('#tswiftcode').focus(function() {
		tswiftcodeFocus();
	});	
	//银行识别码（Swift Code）失去焦点
	$('#tswiftcode').blur(function() {
		tswiftcodeBlur();
	});
});

function banknameFocus() {
	document.getElementById("ibankname").style.borderColor='';
}

function banknameBlur() {
	var ibankname = $('#ibankname').val();
	if(ibankname == '00'||ibankname==''||ibankname=='选择银行') {
		document.getElementById("ibankname").style.borderColor='red';
		return false;
	} else {
		return false;
	}
}
function locationFocus() {
	document.getElementById("ilocation").style.borderColor='';
}
function  locationBlur() {
	var location = $('#ilocation').val();
	if (location == ''||null==location||location=='输入开户行') {
		document.getElementById("ilocation").style.borderColor='red';	
	} 
	return false;
}

function iaccountidFocus() {
	document.getElementById("iaccountid").style.borderColor='';
	document.getElementById("error").style.display="none";
}

function iaccountidBlur() {
	var iaccountid = $('#iaccountid').val();
	if(''==iaccountid||null==iaccountid||iaccountid=='输入账号'){
		document.getElementById("iaccountid").style.borderColor='red';
	}
	 return false;	
}
function ireceiverFocus() {
	document.getElementById("ireceiver").style.borderColor='';
}
function ireceiverBlur() {
	var ireceiver = $('#ireceiver').val();
	if(''==ireceiver||null==ireceiver||ireceiver=='开户人姓名'){
		document.getElementById("ireceiver").style.borderColor='red';
	}
	 return false;	
}
//国际银行function
function tbanknameFocus() {
	document.getElementById("tbankname").style.borderColor='';
}

function tbanknameBlur() {
	var tbankname = $('#tbankname').val();
	if(tbankname == '00'||tbankname==''||tbankname=='银行名称（Bank name）') {
		document.getElementById("tbankname").style.borderColor='red';
		return false;
	} else {
		return false;
	}
}
function tlocationFocus() {
	document.getElementById("tlocation").style.borderColor='';
}
function  tlocationBlur() {
	var tlocation = $('#tlocation').val();
	if (tlocation == ''||null==tlocation||tlocation=='银行所在地（Bank location）') {
		document.getElementById("tlocation").style.borderColor='red';	
	} 
	return false;
}

function taccountidFocus() {
	document.getElementById("taccountid").style.borderColor='';
}

function taccountidBlur() {
	var taccountid = $('#taccountid').val();
	if(''==taccountid||null==taccountid||taccountid=='收款人银行账户（beneficiary’s account ID）'){
		document.getElementById("taccountid").style.borderColor='red';
	}
	 return false;	
}
function treceiverFocus() {
	document.getElementById("treceiver").style.borderColor='';
}
function treceiverBlur() {
	var treceiver = $('#treceiver').val();
	if(''==treceiver||null==treceiver||treceiver=='收款人姓名（beneficiary’s name）'){
		document.getElementById("treceiver").style.borderColor='red';
	}
	 return false;	
}
function taddressFocus() {
	document.getElementById("taddress").style.borderColor='';
}
function taddressBlur() {
	var taddress = $('#taddress').val();
	if(''==taddress||null==taddress||taddress=='银行地址（Bank address）'){
		document.getElementById("taddress").style.borderColor='red';
	}
	 return false;	
}
function tibanFocus() {
	document.getElementById("tiban").style.borderColor='';
	document.getElementById("error1").style.display="none";
}
function tibanBlur() {
	var tiban = $('#tiban').val();
	if(''==tiban||null==tiban||tiban=='国际银行账户号（IBAN）'){
		document.getElementById("tiban").style.borderColor='red';
	}
	 return false;	
}
function tswiftcodeFocus() {
	document.getElementById("tswiftcode").style.borderColor='';
}
function tswiftcodeBlur() {
	var tswiftcode = $('#tswiftcode').val();
	if(''==tswiftcode||null==tswiftcode||tswiftcode=='银行识别码（Swift Code）'){
		document.getElementById("tswiftcode").style.borderColor='red';
	}
	 return false;	
}
function reloadcheck(){var doc=document,inputs=doc.getElementsByTagName('input'),supportPlaceholder='placeholder'in doc.createElement('input'),placeholder=function(input){var text=input.getAttribute('placeholder'),defaultValue=input.defaultValue;if(defaultValue==''){input.value=text}input.onfocus=function(){if(input.value===text){this.value=''}};input.onblur=function(){if(input.value===''){this.value=text}}};if(!supportPlaceholder){for(var i=0,len=inputs.length;i<len;i++){var input=inputs[i],text=input.getAttribute('placeholder');if(input.type==='text'&&text){placeholder(input)}}}}