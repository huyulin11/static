import { gf } from "/s/buss/g/j/g.f.js";
import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";

renderAll();

jQuery.validator.addMethod("checkacc", function (value, element) {
	return this.optional(element)
		|| ((value.length <= 30) && (value.length >= 3));
}, "账号由3至30位字符组合构成");

$("form").validate({
	submitHandler: function (form) {// 必须写在验证前面，否则无法ajax提交
		gf.doAjaxSubmit(form, {// 验证新增是否成功
			type: "post",
			dataType: "json",
			success: function (data) {
				if (data.code >= 0) {
					layer.confirm('添加成功!是否关闭窗口?', function (index) {
						parent.datagrid.loadData();
						parent.layer.close(parent.pageii);
						return false;
					});
					$("#form")[0].reset();
				} else {
					layer.alert('添加失败！' + data.msg, 3);
				}
			}
		});
	},
	rules: {
		"userFormMap.accountName": {
			required: true,
			remote: {
				type: "POST",
				url: '/user/isExist.shtml',
				data: {
					accountName: function () {
						return $("#accountName").val();
					}
				}
			}
		},
		"userFormMap.userName": {
			required: true,
			remote: {
				type: "POST",
				url: '/user/isExist.shtml',
				data: {
					userName: function () {
						return $("#userName").val();
					}
				}
			}
		}
	},
	messages: {
		"userFormMap.accountName": {
			required: "请输入账号",
			remote: "该账号已经存在"
		},
		"userFormMap.userName": {
			required: "请输入用户名",
			remote: "该用户名已经存在"
		}
	},
	errorPlacement: function (error, element) {// 自定义提示错误位置
		// $(".l_err").css('display', 'block');
		// element.css('border','3px solid #FFCCCC');
		// $(".l_err").html(error.html());
		if (error.html()) layer.msg(error.html());
	},
	success: function (label) {// 验证通过后
		// $(".l_err").css('display', 'none');
	}
});

window.addEventListener('ASSOCIATING_VAL_CHOOSED', function (event) {
	let datas = event.detail.data;
	console.log('选择的数据为：', datas);
	if (datas.accountname) $("#accountName").val(datas.accountname);
});

$("#userName").on("input", function () {
	$("#accountName").val("");
});

if (localStorage.projectKey == "BJJK_HUIRUI") {
	$("#accountName").attr("readonly", "readonly");
	$("#userName").data("searchurl", '/user/src/findFirstPage.shtml?userName=');
	$("#userName").data("showcol", 'userName,accountName');
	$("#userName").data("keycol", 'userName');
	$("#userName").data("containerofinput", '.panel-body');

	gf.quote("/s/buss/g/j/jquery/jquery.associatingInput.js");
}

gf.onloadurl();
$("#password").val(gf.randomString(9));