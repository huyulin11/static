$(function () {
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
});
function smenu(obj, id) {
	$("input[_key='menu_1_" + id + "']").each(function () {
		$(this).prop("checked", obj.checked);
	});
	$("input[_key='menu_1_1_" + id + "']").each(function () {
		$(this).prop("checked", obj.checked);
	});
};
function menu_1(obj, id, pid) {
	$("input[_key_2='menu_1_1_" + id + "']").each(function () {
		$(this).prop("checked", obj.checked);
	});
	if (obj.checked == true) {
		$("input[_key='menu_" + pid + "']").each(function () {
			$(this).prop("checked", obj.checked);
		});
	}
};
function menu_1_1(obj, id, pid) {
	if (obj.checked == true) {
		$("input[_key_1='menu_1_1_" + id + "']").each(function () {
			$(this).prop("checked", obj.checked);
		});
		$("input[_key='menu_" + pid + "']").each(function () {
			$(this).prop("checked", obj.checked);
		});
	}
}
function closeWin() {
	parent.layer.close(parent.pageii);
}
function sub() {
	gf.doAjax({
		async: false, // 请勿改成异步，下面有些程序依赖此请数据
		type: "POST",
		data: serializeObject($("#from")),
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
}
