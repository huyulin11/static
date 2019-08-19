function showNewTelDiv(){
	$("#new").slideDown(1000);
	/*$("#new").css("display","block");*/
}
function closeAddTelWin(){
	$("#new").css("display","none");
	/* document.body.removeChild(bgObj); */
	$("#bgDiv").remove();
	$("#notice").text("");
}
/*function changeDiv(param){
	 if ($("#guhua").is(":checked")) { 
		alert("jquery判断checkbox是否选中成功！");
	} 
	if (param==2) {
		$("#mobileDiv").css({
			"display":"none"
		});
		$("#telephoneDiv").css({
			"display":"block"
		});	
		
		}else if (param==1){
			$("#telephoneDiv").css({
				"display":"none"
			});
			$("#mobileDiv").css({
				"display":"block"
			});
		}
	
}*/

//--------------------------------------
var bgObj; 

function showWin(){

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

//main.style.display='block';
/* login.style.visibility = "visible";
login.style.zIndex = "50"; 
login.style.width="420px";

document.getElementById("username").focus(); */
showNewTelDiv();
}