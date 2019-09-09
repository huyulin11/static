import { gf } from "/s/buss/g/j/g.f.js";

$.ajax({
	type: "POST",
	data: {
		"resFormMap.userId": $("#userId").val(),
		"resFormMap.roleId": $("#roleId").val()
	},
	url: '/resources/findRes.shtml',
	dataType: 'json',
	success: function (json) {
		for (index in json) {
			$(
				"input[name='resId']:checkbox[value='" + json[index].id
				+ "']").prop('checked', 'true');
		}
	}
});

function smenu(obj) {
	$("input[_key='menu_1_" + $(obj).val() + "']").each(function () {
		$(this).prop("checked", obj.checked);
	});
	$("input[_key='menu_1_1_" + $(obj).val() + "']").each(function () {
		$(this).prop("checked", obj.checked);
	});
};

$(".smenu").on("click", function () {
	smenu(this);
});

function menu_1(obj) {
	$("input[_key_2='menu_1_1_" + $(obj).val() + "']").each(function () {
		$(this).prop("checked", obj.checked);
	});
	if (obj.checked == true) {
		$("input[_key='menu_" + $(obj).data("kid") + "']").each(function () {
			$(this).prop("checked", obj.checked);
		});
	}
};

$(".menu_1").on("click", function () {
	menu_1(this);
});

function menu_1_1(obj) {
	if (obj.checked == true) {
		$("input[_key_1='menu_1_1_" + $(obj).data("kcid") + "']").each(function () {
			$(this).prop("checked", obj.checked);
		});
		$("input[_key='menu_" + $(obj).data("kid") + "']").each(function () {
			$(this).prop("checked", obj.checked);
		});
	}
}

$(".menu_1_1").on("click", function () {
	menu_1_1(this);
});

$("#closeWin").on("click", function () {
	parent.layer.close(parent.pageii);
});

$("#sub").on("click", function () {
	gf.doAjax({
		async: false, // 请勿改成异步，下面有些程序依赖此请数据
		type: "POST",
		data: $("#from").serializeObject(),
		url: '/resources/addUserRes.shtml',
		dataType: 'json',
		success: function (json) {
			if (json == "success") {
				layer.confirm('分配成功！是否关闭窗口？', {
					icon: 3,
					area: ["25%", "25%"],
					offset: 'auto'
				}, function (index) {
					parent.layer.close(parent.pageii);
					return false;
				});
			} else {
				layer.alert("分配失败！！", {
					icon: 3,
					area: ["25%", "25%"],
					offset: 'auto'
				});
			}
			;
		}
	});
});
