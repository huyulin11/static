	$(function () {
		
		//姓名触发焦点
		$('#username').focus(function() {
			realNameFocus();
		});
		
		//姓名失去焦点
		$('#username').blur(function() {
			realNameBlur();
		});
		//手机号获取焦点触发
		$('#defaultmobile').focus(function() {
			checkAccountFocus();
		});
		
		//手机号失去焦点触发
		$('#defaultmobile').blur(function() {
			checkAccountBlur();
		});
		//邮箱触发焦点
		$('#defaultmail').focus(function() {
			emailFocus();
		});
		
		//邮箱失去焦点
		$('#defaultmail').blur(function() {
			emailBlur();
		});
	});
	
	function realNameFocus() {
		$('#nametag').html('请填写真实的姓名，以保护您所有的用户权益。');
		$('#nametag').removeClass();
		$('#nametag').addClass('SelectMsg');
	}

	function realNameBlur() {
		re = /^[0-9a-zA-Z\u4e00-\u9fff]*$/;
		var realname = $('#username').val();
		if(realname == '') {
			$('#nametag').html("<font color='#FF0000'>请填写真实的姓名，不能为空~</font>");
			$('#nametag').removeClass();
			$('#nametag').addClass('DefaultMsg');
			return false;
		} else {
			if(!re.test(realname)) {
				$('#nametag').html("<font color='#FF0000'>姓名不合规范，请填写真实的姓名，以保护您所有的用户权益。</font>");
				$('#nametag').removeClass();
				$('#nametag').addClass('FailedMsg');
				return false;
			}
			$('#nametag').html("<font color='#33CC33'>填写正确！</font>");
			$('#nametag').removeClass();
			$('#nametag').addClass('SucceedMsg');
			return false;
		}
	}
	function checkAccountFocus() {
		$('#mobiletag').html("手机号码数字(0-9)组成，长度为11个数字");
		//下面两句话相当于$('#accounttag')[0].className = "SelectMsg";
		$('#mobiletag').removeClass();
		$('#mobiletag').addClass("SelectMsg");
	}
	function  checkAccountBlur() {
		var defaultmobile = $('#defaultmobile').val();
		if (defaultmobile == '') {
			$('#mobiletag').html("<font color='#FF0000'>手机号码不能为空！</font>");
			$('#mobiletag').removeClass();
			$('#mobiletag').addClass("DefaultMsg");
			return false;
		} else {
			if (defaultmobile.length!=11) {
				$('#mobiletag').html("<font color='#FF9933'>手机号长度应为11位！</font>");
				$('#mobiletag').removeClass();
				$('#mobiletag').addClass("FailedMsg");
				return false;
			}
			checkUserid();
		}
	}
	
	function emailFocus() {
		$('#emailtag').html('邮箱是您取回密码的重要途径，请正确填写。');
		$('#emailtag').removeClass();
		$('#emailtag').addClass('SelectMsg');
	}

	function emailBlur() {
		var email = $('#defaultmail').val();
// 		if(email == '') {
// 			$('#emailtag').html('邮箱是您取回密码的重要途径，请正确填写。');
// 			$('#emailtag').removeClass();
// 			$('#emailtag').addClass('DefaultMsg');
// 			return false;
// 		}
		if(''==email||null==email){
			 $('#emailtag').html("邮箱是您取回密码的重要途径，请正确填写。");
			 $('#emailtag').removeClass();
			 $('#emailtag').addClass("SucceedMsg");
		}else{
			if(!checkEmail(email)){
				$('#emailtag').html("<font color='#FF0000'>邮箱格式不合法！</font>");
				$('#emailtag').removeClass();
				$('#emailtag').addClass("FailedMsg");
				return false;
			 }
			 $('#emailtag').html("<font color='#33CC33'>填写正确！</font>");
			 $('#emailtag').removeClass();
			 $('#emailtag').addClass("SucceedMsg");
		}
		 return true;
		
	}

	function checkEmail(email) {
		var emailRegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
		if (!emailRegExp.test(email)||email.indexOf('.')==-1){
			return false;
		} else{
			return true;
		}
	}
