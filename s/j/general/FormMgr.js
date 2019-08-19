var FormMgr = function(formid) {
	this.tableInfo = ajaxTableInfo();
	this.columnsDetail = new ColumnsDetail().createColArrays(this.tableInfo);
	this.idInEditForm;
	this.form = $(formid)[0];
	this.formtable = $(formid + ' table tbody')[0];
	this.reservedTrArray = [ 'select_row', 'button_row' ];
}
function hideId(trNode) {
	if (debug) {
		debugger;
	}
	var thNode = trNode.getElementsByTagName("TH")[0];
	if (thNode.innerHTML === 'id') {
		trNode.setAttribute('hidden', 'hidden');
	}
}
function detectTr(element) { // ensure this's a <tr> element
	if (debug) {
		debugger;
	}
	if (element && element.constructor !== HTMLTableRowElement) {
		throw new Error('tr is not a table row element');
	}
	return element;

}
function clrFormTable(tbody, reservedTrArray) {
	if (debug) {
		debugger;
	}
	if (!tbody || tbody.constructor !== HTMLTableSectionElement) {
		throw new ERROR(tbody + 'is null or is not a <tbody> element.');
	}
	if (!reservedTrArray) {
		var reservedTrArray = [ 'select_row', 'button_row' ];
	}
	var childNodes = tbody.childNodes;
	var trNode;
	for (var i = 0; i < childNodes.length; i++) {
		trNode = childNodes[i];
		if (findInArray(reservedTrArray, trNode.id)) {
			continue;
		}
		tbody.removeChild(trNode);
		// the length will decrease after removing a node
		if (childNodes.length > 0) {
			i -= 1;
		}
	}
}
function findInArray(array, item) {
	if (debug) {
		debugger;
	}
	for (var i = 0; i < array.length; i++) {
		if (item == array[i]) {
			return true;
		}
	}
	return false;
}
function clearForm(colArray) {
	if (debug) {
		debugger;
	}
	for (var i = 0; i < colArray.length; i++) {
		colArray[i].clearInput().clearMsgElements();
	}
}
FormMgr.prototype = {
	'constructor' : FormMgr,
	'setIdInEditForm' : function(id) {
		this.idInEditForm = id;
	},
	'getIdInEditForm' : function() {
		if (this.columnsDetail.operateType === 'EDIT') {
			return this.idInEditForm;
		}
	},
	'rebuildForm' : function rebuildForm(operateType) {
		if (operateType) {
			clearForm(this.columnsDetail.currentColArray);
			this.columnsDetail.changeOperateType(operateType);
			clearForm(this.columnsDetail.currentColArray);
		}
		var trArray = this.columnsDetail.currentTRArray;
		if (!trArray) {
			throw new Error("current table row array is undefined or null");
		}
		var $oldtrs = $('form#perInfoModifyfrm tr');
		if (trArray) {
			clrFormTable(this.formtable, this.reservedTrArray);
			for (var i = 0; i < trArray.length; i++) {
				var tr = trArray[i];
				if (tr) {
					var insertPosition = document
							.getElementById(this.reservedTrArray[this.reservedTrArray.length - 1]);
					this.formtable.insertBefore(detectTr(tr), insertPosition);
					hideId(tr);
				}
			}
		}
		this.idInEditForm = null;
		return this;
	},
	'clearForm' : function() {
		clearForm(this.columnsDetail.currentColArray);
		return this;
	},
	'fillData' : function(data, columns) {
		if (!data || !data.id || $.trim(data.id) == '') {
			alert('id为空,无法编辑保存');
			return false;
		}
		if (arguments.length === 1) {
			columns = this.columnsDetail.currentColArray;
		}
		/* 转换类型 */
		if (this.columnsDetail.operateType !== 'EDIT') {
			this.rebuildForm('EDIT');
		}
		this.setIdInEditForm(data.id);
		/* 填充数据 ： 1、填值 2、检查 */
		for (var i = 0; i < columns.length; i++) {
			var columnname = columns[i].columnname;
			columns[i].setValue(data[columnname]);
			columns[i].checkInput();
		}
		return true;
	},
	'saveData' : function() {
		/* 检查 */
		var rtnCheck = true;
		var colArray = this.columnsDetail.currentColArray;
		for (var i = 0; i < colArray.length; i++) {
			rtnCheck = rtnCheck && colArray[i].checkInput()[0];
		}
		/* ajax */
		if (rtnCheck) {
			var operateType = this.columnsDetail.operateType;
			if (ajaxSaveData(operateType, this.getIdInEditForm())) {

				this.clearForm();
				// ADD成功 在最后一页 ： refresh
				// ADD成功 不在最后一页：重设totalDataCount
				// EDIT成功 ： refresh
				if (operateType == 'ADD' && !this.dataMgr.pageMgr.atEndPage()) {
					this.dataMgr.pageMgr.addTotalDataCount();
				} else {
					this.dataMgr.refresh();
				}
			}
		} else {
			alert('请检查输入，然后重新提交');
		}

	},
	'getIdType' : function() { // is id a num
		return this.tableInfo.id.isNum;
	},
	'parseText' : function(data) {
		var textArray = [];
		// 如果this.queryColArray与data的length不一致，
		// 可能是select_sql有问题
		var colArray = this.columnsDetail.queryColArray;
		for (var i = 0; i < colArray.length; i++) {
			var column = colArray[i];
			if (column.columnname === 'id') { // id隐藏
				continue;
			}
			var value = data[column.columnname];
			var text = undefined;
			if (column.selectableOptions) {
				text = column.selectableOptions[value];
			} else {
				text = value;
			}
			textArray.push(check(column, value, text));
		}
		function check(column, value, text) {
			var rtn = checkValue(column, value);

			if (!rtn[0]) {
				if (!rtn[1]) { // 内容标红
					var $span = createSpan('(空)', 'red', true);
				} else {
					var $span = createSpan(text, 'red', true);
				}
				// 设置title提示
				for (var i = 1; i < rtn.length; i++) {
					if (!rtn[i]) {
						$span.title += column.msgElements[i - 1].innerHTML
								+ '\n';
					}
				}
				return $span.outerHTML;
			} else {
				if (value && !text || value != '' && text == '') {
					return createSpan('(无效值)', 'red', true).outerHTML;
				} else {
					return text ? text : '';
				}
			}
		}
		return textArray;
	},
	'getTitles' : function() {
		var titleArray = [];
		var colArray = this.columnsDetail.queryColArray;
		for (var i = 0; i < colArray.length; i++) {
			if (colArray[i].columnname === 'id') { // id隐藏
				continue;
			}
			titleArray.push(colArray[i].object.chncolname || '');
		}
		return titleArray;
	}
}
