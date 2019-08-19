	var um = window.um || {}; // user manage namespace
	um.urls = um.urls || {} ;
	um.urls.updatePersonInfo = um.urls.updatePersonInfo || "/customer/personalInfo/updatePersonInfo.shtml" ;
	um.personalInfo = {
		checkNameIfNull : function (){
			var username = $('#name').val();
			if (username.length == 0 && sessionType	== 0) {
				$("#div_check_name").html("<div class='triangle-left'></div>\
						<div class='rectangle'>真实姓名一旦保存将不能再修改，请谨慎填写。</div>");
			}
		},
		checkNicknameIfNull : function() {
			var nickname = $('#nickname').val();
			if (nickname.length == 0) {
				$("#div_check_nickname").html("<div class='triangle-left'></div>\
					<div class='rectangle'>如果您填写了称谓，我们和您联系时将使用这个称谓。</div>");
			}
		},
		checkDocumentcodeIfNull : function() {
			var html = "<div class='triangle-left'></div>\
					<div class='rectangle'>以上登记的信息须和您的证件信息保持一致。</div>";
			$("#div_check_documentcode").html(html);

		},
		confirm : function() {
			$.messager.confirm('My Title', 'Are you confirm this?', function(r) {
				if (r) {
					alert('confirmed: ' + r);
				}
			});
		},
		savePersonInfo : function(){
			var userid = $("#userid").val();
			var name = $("#name").val();
			var gender = $("[name='gender']:checked").val();
			var birthday = $("#birthday").val();
			var documenttype = $("#documenttype").val();
			var documentcode = $("#documentcode").val();
			var nickname = $("#nickname").val();
			var remark = $("#remark").val();
			debugger ;
			$.ajax({
				type : "POST",
				url : um.urls.updatePersonInfo,
				data : "userid=" + userid + "&name=" + name + "&gender=" + gender
						+ "&birthday=" + birthday + "&documenttype=" + documenttype
						+ "&documentcode=" + documentcode + "&nickname=" + nickname
						+ "&remark=" + remark,
				dataType : "text",
				success : function(msg) {
					alert("修改成功！");
					location.reload();
				},
				error : function(msg) {
					alert("出错啦！" + msg);
				}
			});
		},
		TextValidate : function () {
			var code;
			var character;
			var err_msg = "输入文本不可包含特殊字符，可输入'-'和'_'";
			if (document.all) //判断是否是IE浏览器
			{
				code = window.event.keyCode;
			} else {
				code = arguments.callee.caller.arguments[0].which;
			}
			var character = String.fromCharCode(code);

			var txt = new RegExp(
					"[ ,\\`,\\~,\\!,\\@,\#,\\$,\\%,\\^,\\+,\\*,\\&,\\\\,\\/,\\?,\\|,\\:,\\.,\\<,\\>,\\{,\\},\\(,\\),\\',\\;,\\=,\"]");
			//特殊字符正则表达式
			if (txt.test(character)) {
				alert("不可输入以下特殊字符:\n , ` ~ ! @ # $ % ^ + & * \\ / ? | : . < > {} () [] \" ");
				if (document.all) {
					window.event.returnValue = false;
				} else {
					arguments.callee.caller.arguments[0].preventDefault();
				}
			}
		}
	}