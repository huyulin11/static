	var um = window.um || {}; // user manage namespace
	um.userid = um.userid || window.userid ;
	um.mobile = {
		openMobileApproveWindow : function (id,gettel){
			window.open(um.urls.mobileApprove +'?id='+id+'&no='+gettel+'&userid='+ um.userid,
				'手机号验证', 
				'height=800,width=800,top=0,left=0,toolbar=no,menubar=no,scrollbars=yes,\
					resizable=no,location=no, status=no');
		},
		/*
		 * 选择事件
		 */
		selectMobileNo : function (id){
			if (opener){
				opener.document.getElementById("mobile").value=id;
				window.close();
			}else{
				document.getElementById("mobile").value=id;
			}
		},
		setToBeDefaultMobile : function (id){
			$.ajax({
				type: "POST",
				url: um.urls.changeDefaultMobile + "?userid="+um.userid,
				data: "id="+id,
				dataType:"text",
				success: function(msg){
					if(msg!="0"){
						$("#flexMobile").flexReload();
					}else{
						alert("本号码已经是默认号码");
					}
				},
				error: function(msg){
					alert(msg);
				}
			});
		},
		/**
		 * 执行删除
		 */
		deleteMobileNo : function (id,num){
			if(confirm('确定删除吗 ？')){
				 var  ids ="";
				  ids=ids.substring(1);
				  $.ajax({
						type: "POST",
						url: um.urls.delMobile + "?userid="+um.userid,
						data: "id="+id+"&phonenum="+num,
						dataType:"text",
						success: function(msg){
							if(msg!="0"){
								$("#flexMobile").flexReload();
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
		},
		mobileNoCheck : function(){
			var area = $("#country").val();
			var Num = $("#mobile").val();
			var mobileNum = area + "-" + Num;
			if (Num == ''){
				$("#notice").text("号码不可为空！");
				return false;
			}
			$.ajax({
				type: "POST",
				url: um.urls.mobileNoCheck + "?userid="+um.userid,
				data : "mobileNum=" + mobileNum,
				dataType : "text",
				success : function(data) {
					if (data == "ok") {
						$("#notice").text("");
					} else {
						$("#notice").text("不可以重复添加！");
						$("#mobile").val("");
					}
				},
				error : function(data) {
					alert(data);
				}
			});
		},
		submitMobile : function (){
			// closeAddTelWin();
			var number =  $("#mobile").val();
			var num=/^[0-9]*[1-9][0-9]*$/;
			if (number==''){
				document.getElementById("megss").style.display="block";
				$("#megs").text("号码不可为空！");
				return false;
			}else if(!num.test(number)|| number.length!=11){
				document.getElementById("megss").style.display="block";
				$("#megs").text("手机号码输入错误！");
				return false;
			}
			var describe = $("#describe").val();
			var isdefault = ($("#checkDefault").is(":checked")) ? "1" : "0";
			$("input[type=reset]").trigger("click");
			$.ajax({
				type: "POST",
				url: um.urls.addNewMobile + "?userid="+ um.userid,
				data: "number="+number+"&describe="+describe+"&isdefault="+isdefault,
				dataType:"text",
				success: function(msg){
					if(msg=="1"){
						$("#flexMobile").flexReload();
						document.getElementById("megss").style.display="block";
						$("#megs").text("新增成功");
						$("#mobile").val("");
						$("#describe").val("");
					}else if(msg=="-1"){
						document.getElementById("megss").style.display="block";
						$("#megs").text("号码已存在！");
					}
					else{
						alert("添加失败！");
					}
				},
				error: function(msg){
					alert(msg);
				}
			});
			return false;
		}
	}