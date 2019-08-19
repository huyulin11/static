(function($) {
	var _keyword = null;
	var _that;

	var _init = function(keyword) {
		_keyword = keyword;
		if (!keyword) {
			throw new Error('keyword不能为空');
		}
	};

	var _ajaxStructureInfo = function() {
		var tableinfo;
		$.ajax({
			type : "POST",
			async : false,
			// url : "/general/getTableInfo.shtml",
			url : "/s/j/general/coin.json",
			dataType : "json",
			data : {
				keyword : _keyword
			},
			success : function(json) {
				tableinfo = json;
			},
			error : function(msg) {
				alert('无法获取表单信息，请重新刷新页面');
			}
		});
		return tableinfo;

	};

	var _ajaxSaveData = function(id) {
		var formarray = $(this).serializeArray();
		if (id && operateType === 'EDIT' && submitURL.search('id=') === -1) {
			submitURL += '&id=' + id;
		}
		var rtnValue = false;
		$.ajax({
			type : "POST",
			async : false,// 同步，等待返回
			url : "/general/saveData.shtml",
			dataType : "json",
			data : {
				keyword : _keyword
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

	};

	var _ajaxDataJson = function(start, count) {
		var tableData;
		if (!_keyword || _keyword == "") {
			return null;
		}
		var rtnValue = false;
		$.ajax({
			type : "POST",
			async : false,
			url : "/general/getTableData.shtml",
			dataType : "json",
			data : {
				keyword : _keyword
			},
			success : function(json) {
				tableData = json;
			},
			error : function(msg) {
				window.alert('查询失败！网络原因，请稍后重试');
			}
		});
		return tableData;

	};

	var _ajaxDeleteData = function(id, isIdNum) {
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
			url : "/general/deleteData.shtml",
			dataType : "json",
			data : {
				keyword : _keyword
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

	};

	var _generateForm = function(s) {
		var select = $(
				"<form id='perInfoModifyfrm' method='POST'>"
						+ "<table class='singleDataTable'>"
						+ "<caption>基础信息维护（带红色*为必输字段）</caption>"
						+ "<tbody>"
						+ "<tr id='select_row'>"
						+ "<th>选择类型：</th>"
						+ "<td><select id='tableChoose'name='tableChoose'class='select'>"
						+ "<option value='sys_country'selected='selected'></option>"
						+ "<option value='sys_country'selected='selected'></option>"
						+ "<option value='sys_country'selected='selected'></option>"
						+ "<option value='coin'></option><option value='coin'></option>"
						+ "<option value='coin'></option></select></td>"
						+ "</tr>"
						+ "<tr>"
						+ "<th>中文名称<span class='red'>*</span></th><td>"
						+ "<input type='text'name='chnname'id='chnname'>"
						+ "<span class='red'hidden='hidden'>不能为空!</span>"
						+ "<span class='red'hidden='hidden'>仅允许输入数字!</span>"
						+ "<span class='red'hidden='hidden'>超过规定长度undefined!</span>"
						+ "</td></tr>"
						+ "<tr><th>英文名称<span class='red'>*</span></th>"
						+ "<td><input type='text'name='usaname'id='usaname'>"
						+ "<span class='red'hidden='hidden'>不能为空!</span>"
						+ "<span class='red'hidden='hidden'>仅允许输入数字!</span>"
						+ "<span class='red'hidden='hidden'>超过规定长度undefined!</span>"
						+ "</td></tr><tr id='button_row'>"
						+ "<td id='savebtn'class='saveRow'colspan='2'>"
						+ "<input type='reset'id='reset'value='重&nbsp;&nbsp;置'>"
						+ "<input type='button'id='save'value='保&nbsp;&nbsp;存'></td></tr>"
						+ "</tbody></table></form>").appendTo($(_that));
		;
	}

	$.fn.extend({
		generateForm : function(keyword) {
			_that = this;
			_init(keyword);
			var structureInfo = _ajaxStructureInfo();
			_generateForm(structureInfo);
		}
	});
})(jQuery);