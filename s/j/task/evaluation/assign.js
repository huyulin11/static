$(function() {
	$("#assignsave").click("click",function(){
		var witness=$("#witness").val();
		var sealedbox=$("#sealedbox").val();
		var pointperson=$("#pointperson").val();
		var depositid = $("#depositid").val();
		if(witness==null||witness==''){
			alert("评鉴人不能为空！");
			return false;
		}
		if(sealedbox==null||sealedbox==''){
			alert("封箱人不能为空！");
			return false;
		}
		$.ajax({
			url:"/task/tasklist/assignresult.shtml",
			type:"post",
			data:"witness="+witness+"&sealedbox="+sealedbox+"&pointperson="+pointperson+"&depositid="+depositid,
			dataType:"text",
			success:function(data){
				if(data==='success'){
					layer.confirm('分配成功!是否关闭窗口?', function(index) {
						parent.datagrid.loadData();
						parent.layer.close(parent.pageii);
						return false;
					});
				}else if(data==='error'){
					alert("分配失败！");
				}else{
					alert(data);
				}
			},
			error:function(){
				alert("网络连接异常，请稍后重试！");
			}
		});
	});
});