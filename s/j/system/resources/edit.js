import { gf } from "/s/buss/g/j/g.f.js";

$("form").validate({
	submitHandler: function (form) {// 必须写在验证前面，否则无法ajax提交
		gf.doAjaxSubmit(form, {//验证新增是否成功
			type: "post",
			dataType: "json",
			success: function (data) {
				if (data == "success") {
					layer.confirm('编辑成功!是否关闭窗口?', function (index) {
						parent.datagrid.loadData();
						parent.layer.close(parent.pageii);
						return false;
					});
				} else {
					layer.alert('编辑失败！', 3);
				}
			}
		});
	},
	rules: {
		resKey: {
			required: true
		},
		resUrl: {
			required: true
		}
	},
	messages: {
		resKey: {
			required: "菜单标识不能为空"
		},
		resUrl: {
			required: "url连接不能为空"
		}
	},
	errorPlacement: function (error, element) {// 自定义提示错误位置
		$(".l_err").css('display', 'block');
		// element.css('border','3px solid #FFCCCC');
		$(".l_err").html(error.html());
	},
	success: function (label) {// 验证通过后
		$(".l_err").css('display', 'none');
	}
});

function but(v) {
	if (v.value == 2) {
		showBut();
	} else {
		$("#divbut").css("display", "none");
	}
}
function toBut(b) {
	$("#description").val($("#" + b.id).html());
}
function showBut() {
	$("#divbut").css("display", "block");
	var url = '/resources/findByButtom.shtml';
	var data = gf.ajax(url, null, "json");
	if (data != null) {
		var bb = $("#but");
		bb.html('');
		for (var i = 0; i < data.length; i++) {
			bb.append("<span onclick=\"toBut(this)\" id=\"span_" + data[i].id + "\">" + data[i].buttom + "</span>");
		}
	} else {
		layer.msg("获取按扭列表失败！");
	}
}