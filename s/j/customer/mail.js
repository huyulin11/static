	var um = window.um || {} ;
	um.userid = um.userid || window.userid ;
	um.mail = {
		checkEmail : function (email) {
			var emailRegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
			if (!emailRegExp.test(email)||email.indexOf('.')==-1){
				alert("邮箱格式不合法！");
				return false;
			} else{
				return true;
			}
		},
		addNewMailFrm : function (){
			var mail = $("#usermail").val();
			if("" == mail){
				$("#megss").css("display","block");
				$("#megs").text("邮箱不可为空！");
				$("#usermail").focus();
				return false;
			}
			// 	closeMailWin();
			var mailstauts="0";
			var describe = $("#describe").val();
			var isdefault = "0";
			if ($("#checkDefault").is(":checked")){
				isdefault = "1";
			}else {
				isdefault = "0";
			}
			if ($("#mailstauts").is(":checked")){
				mailstauts = "1";
			}else {
				mailstauts = "0";
			}
			
			$("input[type=reset]").trigger("click");
			if(mail!=""&&this.checkEmail(mail)){
				$.ajax({
					type: "POST",
					url: um.urls.addNewMail ,
					data: "userid=" + um.userid + "&mail="+mail+"&describe="+describe+"&isdefault="+isdefault+"&mailstauts="+mailstauts,
					dataType:"text",
					success: function(msg){
						if(msg=="1"){
							$("#flexMail").flexReload();
							document.getElementById("megss").style.display="block";
							$("#megs").text("新增成功");
							$("#usermail").val("");
							$("#describe").val("");
						}else if (msg=="-1"){
							document.getElementById("megss").style.display="block";
							$("#megs").text("邮箱已存在！");
						}else{
							alert("添加失败！");
						}
					},
					error: function(msg){
						alert(msg);
					}
				});
			}
			return false;
		},

		openEmailApproveWindow : function (id,mail){
			window.open(um.urls.mailApprove +'?id='+id+'&userid='+ um.userid+"&no=" + mail,
					'newwindow', 'height=800,width=800,top=0,left=0,toolbar=no,\
					menubar=no,scrollbars=yes, resizable=no,location=no, status=no');
		},
		/*
		 * 选择事件
		 */
		selectMail : function (id){
			if(opener){ // this window is a inner one
				opener.document.getElementById("amail").value=id;
				window.close();
			}else{
				document.getElementById("amail").value=id;
			}
			
		},
		//执行默认
		setToBeDefault : function (id){
			$.ajax({
				type: "POST",
				url: um.urls.changeDefaultMail ,
				data: "userid="+um.userid + "&id="+id,
				dataType:"text",
				success: function(msg){
					if(msg!="0"){
						$("#flexMail").flexReload();
					}else{
						alert("该邮箱地址已经是默认邮箱地址");
					}
				},
				error: function(msg){
					alert(msg);
				}
			});
		},
		//执行删除
		deleteMail : function (id,num){
			if(confirm('确定删除此邮箱吗 ？')){
			 $.ajax({
					type: "POST",
					url: um.urls.delMail + "?userid="+um.userid,
					data: "id="+id+"&mailnum="+num,
					dataType:"text",
					success: function(msg){
						if(msg!="0"){
							$("#flexMail").flexReload();
							document.getElementById("megss").style.display="block";
							$("#megs").text("删除成功");
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
	}