function DataMgr(formMgr) {
	this.data;
	this.table;
	this.formMgr;
	this.pageMgr = new PageMgr();
	this.searchFlag = false;
	this.searchMgr;
	this.getData = function(start, count) {
		if (isNaN(count) || count <= 0) {
			alert('请输入每行输入数据条数');
		}
		if (this.searchFlag && this.searchMgr) {
			var json = ajaxSearchData(this.searchMgr.readSearchCondition(),
					start, count)
		} else {
			var json = ajaxDataJson(start, count);
		}

		this.data = json.data;
		this.pageMgr.setTotalDataCount(json.totalDataCount);
		return this.data;
	}
	this.setFormMgr = function(formMgr) {
		if (formMgr.constructor !== FormMgr) {
			throw new Error('the argument must be a instance of FormMgr');
		}
		this.formMgr = formMgr;
		formMgr.dataMgr = this;
		return this;
	}
	if (formMgr) {
		this.setFormMgr(formMgr);
	}
	if (this.pageMgr) {
		setPageChooseAnchors(this, this.pageMgr);
	}
}
DataMgr.prototype = {
	'getOneByID' : function(id) {
		for (var i = 0; i < this.data.length; i++) {
			var row = this.data[i];
			if (row && row['id'] == id) { // 允许弱类型比较
				return row;
			}
		}
		return null;
	},
	'deleteByID' : function(id) {
		var isIdNum;
		if (formMgr) {
			isIdNum = this.formMgr.getIdType();
		}
		isIdNum = null;
		if (ajaxDeleteData(id, isIdNum)) {
			this.pageMgr.decTotalDataCount();
			this.refresh();
		}
		return false;
	},
	'createDataViewTable' : function() {
		this.table = createDataViewTable(this.formMgr, this.data);
		var viewData = document.getElementById('viewData');
		viewData.innerHTML = '';
		viewData.appendChild(this.table);
		return this.table;
	},
	'refresh' : function() {
		var count = this.pageMgr.countPerPage;
		var start = count * this.pageMgr.currentPage;
		dataMgr.getData(start, count);
		dataMgr.createDataViewTable();
	}
}

function createTableRow(dataArray, childNodeName) {
	var tr = document.createElement("TR");
	for (var i = 0; i < dataArray.length; i++) {
		var e = document.createElement(childNodeName);
		e.innerHTML = dataArray[i];
		tr.appendChild(e);
	}
	return tr;
}
function createDataViewTable(formMgr, data) {
	debugger;
	var textArray;
	if (formMgr) {
		textArray = formMgr.getTitles();
	}
	var tableNode = document.createElement('TABLE');
	var thead = document.createElement('THEAD');
	var titleTr = createTableRow(textArray, "TH");
	titleTr.appendChild(document.createElement("TH"));
	thead.appendChild(titleTr);
	tableNode.appendChild(thead);
	var tbody = document.createElement('TBODY');
	for (var i = 0; i < data.length; i++) {
		var valueArray;
		if (formMgr) {
			valueArray = formMgr.parseText(data[i]);
		}
		var dataTr = createTableRow(valueArray, "TD");
		var td = document.createElement('TD');
		td.innerHTML = '<button name="edit">编辑</button>\
				<button name="delete">删除</button>';
		dataTr.appendChild(td);
		dataTr.setAttribute('data-id', data[i]['id']);
		tbody.appendChild(dataTr);
	}
	tableNode.appendChild(tbody);
	tableNode.id = 'dataTable';
	return tableNode;
}
function setPageChooseAnchors(dataMgr, pageMgr) {
	var anchors = $("div#pageChoose").children("a");
	anchors[0].onclick = function() {
		clickAction(pageMgr.goFirst());
	};
	anchors[1].onclick = function() {
		clickAction(pageMgr.prev());
	};
	anchors[2].onclick = function() {
		clickAction(pageMgr.next());
	};
	anchors[3].onclick = function() {
		clickAction(pageMgr.goEnd());
	};
	$('div#pageChoose button#jump').click(function() {
		// jumpIndex 从1开始计
		var jumpIndex = $('div#pageChoose :text').val().match(/\d+/)[0];
		var total = document.getElementById('dataCount').innerHTML;
		var count = $('div#view p :text').val().match(/\d+/)[0] / 1;
		var endPageIndex = getEndPage(total, count);
		if (jumpIndex >= 1 && jumpIndex <= endPageIndex) {
			clickAction(pageMgr.goPage(jumpIndex));
		} else {
			alert("请输入有效的范围:1 ~ " + endPageIndex);
		}
	});
	function clickAction(scObject) {
		debugger;
		dataMgr.getData(scObject.start, scObject.count);
		dataMgr.createDataViewTable();
	}
//	anchors[0].onclick();
}
