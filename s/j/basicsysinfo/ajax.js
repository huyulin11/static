function ajaxTableInfo() {
	var tableinfo;
	$.ajax({
		type : "POST",
		async : false,
		url : "/basicsysinfo/getTableInfo.shtml",
		dataType : "json",
		data : {
			tableName : $("tableChoose").val()
		},
		success : function(json) {
			tableinfo = json;
		},
		error : function(msg) {
			alert('无法获取表单信息，请重新刷新页面');
		}
	});
	return tableinfo;
}
function ajaxSaveData(operateType, id) {
	var formarray = $("form#perInfoModifyfrm").serializeArray();
	if (id && operateType === 'EDIT' && submitURL.search('id=') === -1) {
		submitURL += '&id=' + id;
	}
	var rtnValue = false;
	$.ajax({
		type : "POST",
		async : false,// 同步，等待返回
		url : "/basicsysinfo/saveData.shtml",
		dataType : "json",
		data : {
			tableName : $("tableChoose").val()
		},
		success : function(message) {
			if (message == 'true') {
				alert('保存成功');
				rtnValue = true;
			} else {
				alert('保存失败');
				rtnValue = false;
			}
		},
		error : function(data) {
			alert('保存失败！网络原因，请稍后重试');
		}
	});
	return rtnValue;
}
function ajaxDataJson(start, count) {
	var tableName = $('select#tableChoose').val();
	var tableData;
	if (!tableName || tableName == "") {
		return null;
	}
	var rtnValue = false;
	$.ajax({
		type : "POST",
		async : false,
		url : "/basicsysinfo/getTableData.shtml",
		dataType : "json",
		data : {
			tableName : $("tableChoose").val()
		},
		success : function(json) {
			tableData = json;
		},
		error : function(msg) {
			window.alert('查询失败！网络原因，请稍后重试');
		}
	});
	return tableData;
}
function ajaxDeleteData(id, isIdNum) {
	if (!isIdNum) {
		throw new Error('id and isIdNum can not be undefined or null.');
	}
	if (!id || id == '') {
		alert('id为空,无法执行删除操作!');
		return false;
	}
	$.ajax({
		type : "POST",
		async : false,// 同步，等待返回
		url : "/basicsysinfo/deleteData.shtml",
		dataType : "json",
		data : {
			tableName : $("tableChoose").val()
		},
		success : function(message) {
			if (message == 'true') {
				alert('删除成功');
				rtnValue = true;
			} else {
				alert('删除失败');
				rtnValue = false;
			}
		},
		error : function(data) {
			rtnValue = false;
			alert('删除失败！网络原因，请稍后重试');

		}
	});
	return rtnValue;
}
function getDataHTML(start, count) {
	dataMgr.getData(start, count); // 保证data数据与html一致
	var submitURL = urls.viewResourceURL
	var rtnValue = false;
	$.ajax({
		type : "POST",
		async : true,
		url : "/basicsysinfo/viewTable.shtml",
		dataType : "json",
		data : {
			tableName : $("tableChoose").val()
		},
		success : function(table) {
			$("div#viewData").html(table);
			rtnValue = true;
		},
		error : function(msg) {
			window.alert('查询失败！网络原因，请稍后重试');
			rtnValue = false;
		}
	});
	return rtnValue;
}
function ajaxSearchData(conditionArray, start, count) {
	var tableName = $('select#tableChoose').val();
	if (!tableName || tableName == "") {
		return null;
	}
	var tableData;
	$.ajax({
		type : "POST",
		async : false,// 同步，等待返回
		url : "/basicsysinfo/searchTableData.shtml",
		dataType : "json",
		data : {
			tableName : $("tableChoose").val()
		},
		success : function(json) {
			tableData = JSON.parse(json);
		},
		error : function(msg) {
			window.alert('查询失败！网络原因，请稍后重试');
		}
	});
	return tableData;
}