function delayDialog(container,dialogID){
	//container 父容器ID，dialogID 新生成遮盖层的ID
	//*注意：父容器需要有position属性，relative或absolute
	var Prwidth = $("#"+container).innerWidth();//包含padding值
	var Prheight = $("#"+container).innerHeight();
	var pdWidth = Prwidth/2-64;
	var pdHeight = Prheight/2-64;
	var width = Prwidth - pdWidth;
	var height = Prheight - pdHeight;
	var parentdiv=$('<div></div>');
	 parentdiv.attr('id',dialogID);
	 parentdiv.css({
		 "width" : width+"px",
		 "height" : height+"px",
		 "background" : "#f9f9f9",
		 "position" : "absolute",
		 "z-index" : "9999",
		 "top" : "0",
		 "left" : "0",
		 "opacity" : "0.8",
		 "filter" : "alpha(opacity=80)",
		 "padding-top" : pdHeight+"px",
		 "padding-left" : pdWidth+"px"
	 });
	 
//	 parentdiv.append("<img src='/coin-portlet/images/upload/img/loading.gif'>");
//	 parentdiv.appendTo("#"+container);
	 
}