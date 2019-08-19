function showNewMailDiv(){
	$("#newMail").slideDown(500);
	/*$("#new").css("display","block");*/
}
function closeMailWin(){
	$("#newMail").css("display","none");
	/* document.body.removeChild(bgObj); */
	$("#bgDiv").remove();
	$("#notice").text("");
}
//--------------------------------------
var bgObj; 

function showMailWin(){

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

showNewMailDiv();
}

