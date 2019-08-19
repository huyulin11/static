
//--------------------------------------
$(function () {
	
	//输入密码触发焦点
	$('#walletpw').focus(function() {
		checkNewPasswordFocus();
	});
	
	//输入密码失去焦点
	$('#walletpw').blur(function() {
		checkNewPasswordBlur();
	});
	//再次输入获取焦点触发
	$('#walletpwagain').focus(function() {
		walletpwagainFocus();
	});	
	//再次输入失去焦点触发
	$('#walletpwagain').blur(function() {
		walletpwagainBlur();
	});
});
function checkNewPasswordFocus(){
	$('#walletpwtag').html("<div class='triangle-left'></div><div class='rectangle'>请输入密码</div>");
	
	$('#walletpwtag').removeClass();
	$('#walletpwtag').addClass("FailedMsg");
}
function checkNewPasswordBlur() {
	var pwd = $('#walletpw').val();
	if(pwd == '') {
		$('#walletpwtag').html("<div class='triangle-left'></div><div class='rectangle'>密码不能为空~</div>");
		$('#walletpwtag').removeClass();
		$('#walletpwtag').addClass("FailedMsg");
		return false;
	} else {
		if (pwd.length < 6 || pwd.length > 16) {
			$('#walletpwtag').html("<div class='triangle-left'></div><div class='rectangle'>密码长度为6～16！</div>");
			$('#walletpwtag').removeClass();
			$('#walletpwtag').addClass("FailedMsg");
			return false;
		}	
		for(var i=0;i<pwd.length;i++) {
			if(!((pwd.substr(i,1) >= '0' && pwd.substr(i,1) <= '9') ||
					(pwd.substr(i,1) >= 'A' && pwd.substr(i,1) <= 'Z') ||
					(pwd.substr(i,1) >= 'a' && pwd.substr(i,1) <= 'z'))) {
				$('#walletpwtag').html("<font color='#FF9933'>密码由字母数字组成</font>");
				$('#walletpwtag').removeClass();
				$('#walletpwtag').addClass("FailedMsg");
				return false;
			}
		}
		$('#walletpwtag').html("<div class='triangle-left'></div><div class='rectangle'>填写正确！</div>");
		$('#walletpwtag').removeClass();
		$('#walletpwtag').addClass("FailedMsg");
		return true;
	}
}
function walletpwagainFocus(){
	$('#walletpwagaintag').html("<div class='triangle-left'></div><div class='rectangle'>重复新密码 </div>");
	$('#walletpwagaintag').removeClass();
	$('#walletpwagaintag').addClass("FailedMsg");
}
function walletpwagainBlur() {
	var pwd = $('#walletpw').val();
	var repwd = $('#walletpwagain').val();
	if(repwd == '') {
		$('#walletpwagaintag').html("<div class='triangle-left'></div><div class='rectangle'>请再次输入你的新密码</div>");
		$('#walletpwagaintag').removeClass();
		$('#walletpwagaintag').addClass("FailedMsg");
		return false;
	} else {
			if (repwd.length < 6 || repwd.length > 16) {
				$('#walletpwagaintag').html("<div class='triangle-left'></div><div class='rectangle'>确认密码长度为6～16！</div>");
				$('#walletpwagaintag').removeClass();
				$('#walletpwagaintag').addClass("FailedMsg");
				return false;
			}
			for(var i=0;i<repwd.length;i++) {
				if(!((repwd.substr(i,1) >= '0' && repwd.substr(i,1) <= '9') ||
						(repwd.substr(i,1) >= 'A' && repwd.substr(i,1) <= 'Z') ||
						(repwd.substr(i,1) >= 'a' && repwd.substr(i,1) <= 'z'))) {
					$('#walletpwagaintag').html("<div class='triangle-left'></div><div class='rectangle'>密码由字母数字组成</div>");
					$('#walletpwagaintag').removeClass();
					$('#walletpwagaintag').addClass("FailedMsg");
					return false;
				}
			}
			if(pwd != repwd) {
				$('#walletpwagaintag').html("<div class='triangle-left'></div><div class='rectangle'>两次输入密码不一样！</div>");
				$('#walletpwagaintag').removeClass();
				$('#walletpwagaintag').addClass("FailedMsg");
				return false;
			}
		$('#walletpwagaintag').html("<div class='triangle-left'></div><div class='rectangle'>输入正确！</div>");
		$('#walletpwagaintag').removeClass();
		$('#walletpwagaintag').addClass("SucceedMsg");
		return true;
	}
}