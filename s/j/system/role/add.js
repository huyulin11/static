import { gf } from "/s/buss/g/j/g.f.js";

jQuery.validator.addMethod("checkRole", function (value, element) {
	return this.optional(element) || ((value.length <= 10) && (value.length >= 3));
}, "角色名由3至10位字符组合构成");

$("form").validate({
	submitHandler: function (form) {//必须写在验证前面，否则无法ajax提交
		debugger;
		gf.doAjaxSubmit(form, {//验证新增是否成功
			type: "post",
			dataType: "json",
			success: function (data) {
				if (data == "success") {
					layer.confirm('添加成功!是否关闭窗口?', function (index) {
						parent.datagrid.loadData();
						parent.layer.close(parent.pageii);
						return false;
					});
					$("#form")[0].reset();
				} else {
					layer.msg('添加失败！');
				}
			}
		});
	},
	errorPlacement: function (error, element) {//自定义提示错误位置
		$(".l_err").css('display', 'block');
		//element.css('border','3px solid #FFCCCC');
		$(".l_err").html(error.html());
	},
	success: function (label) {//验证通过后
		$(".l_err").css('display', 'none');
	}
});

