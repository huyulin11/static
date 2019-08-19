Array.prototype.contains = Array.prototype.contains || function(value) {
	for (var i = 0; i < this.length; i++) {
		if (this[i] == value) { // allow week type
			return true;
		}
	}
	return false;
}
Array.prototype.substract = Array.prototype.substract || function(array) { // get
																			// deference
																			// set
	var ds = []; // difference set : this - array
	if (!array) {
		return this;
	}
	for (var i = 0; i < this.length; i++) {
		if (!array.contains(this[i])) {
			ds.push(this[i]);
		}
	}
	return ds;
}

rv = window.rv || {};
/**
 * require : rv.entitytype, rv.selector, rv.search
 */
rv.list = (function() {
	var getValueFromElement = function(e) {
		if (e.nodeName == 'INPUT' || e.nodeName == 'SELECT') {
			return e.value;
		} else {
			return e.innerText;
		}
	}
	var getValueFromElements = function(elements, validate) {
		var values = [];
		for (var i = 0; i < elements.length; i++) {
			var value = getValueFromElement(elements[i]);
			if (validate && validate(value) || !validate) {
				values.push(value);
			}
		}
		return values;
	}
	var templateReplace = function(text, data, reg) {
		if (arguments < 2) {
			throw 'length of arguments is expected to be not less than 2';
		}
		var reg = reg || function(key) {
			return new RegExp("{{" + key + "}}", "g");
		}
		for ( var x in data) {
			text = text.replace(new RegExp("{{" + x + "}}", "g"), data[x]);
		}
		return text;
	}
	var getCheckedIds = function() {
		var inputs = $("#result tbody td :checked").parent().siblings(
				"td[id='id']");
		var validate = function(value) {// must be number,not undefined,'' or
										// null
			return !isNaN(value);
		}
		return getValueFromElements(inputs, validate);
	}
	var getAddedIds = function() {
		var inputs = $('div#list tbody input[name$=entityid]');
		return getValueFromElements(inputs);
	}

	var addDetailRow = function(rowId, detailRowId, data) {
		var index = rowId - 1;
		var node2 = document.querySelector("#tabDetail tbody"); // querySelector()
																// 方法返回文档中匹配指定
																// CSS 选择器的一个元素
		if (node2) { // only stamp request page has detail table(只有邮票请求页有详细表)
			var template2 = document.querySelector('#datail-tr-template').text;
			var text2 = template2.replace(/{rowId}/g, rowId);
			text2 = text2.replace(/{detailRowId}/g, detailRowId);
			text2 = text2.replace(/{index}/g, index);
			for ( var x in data) {
				text2 = text2
						.replace(new RegExp("{{" + x + "}}", "g"), data[x]);
			}
			node2.insertAdjacentHTML("beforeend", text2);
		}
	}

	var addData = function(rowId, data) {
		var index = rowId * 1 - 1;
		var node = document.querySelector("#tab4 tbody");
		var template = document.querySelector('#tab4-tr-template').text;
		var text = template.replace(/{rowId}/g, rowId);
		text = text.replace(/{index}/g, index);
		for ( var x in data) {
			text = text.replace(new RegExp("{{" + x + "}}", "g"), data[x])
		}
		node.insertAdjacentHTML("beforeend", text); // 在指定的地方插入html内容
		// console.table(rv.test.getEssentialData(data));
		// rv.test.lookupOneListRow($('#tab4 tbody tr:eq(' + rowId + ')
		// input'));

		if (rv.entitytype == rv.ENTITYTYPE_STAMP) {
			addDetailRow(rowId, 1, data);
		}

	};

	/** 重新给每一行赋行号 */
	var dealTrIndex = function() {
		var i = 1;
		var rowNum = 0;
		$("#tab4 tr:gt(0)")
				.each(
						function() {
							$(this).find("td:first").html(i);
							if (entitytype == 4) {
								var entityid = $(this).find(
										"td input[name*='entityid']").val();
								var j = 1;
								$("#tabDetail tr:gt(0)")
										.each(
												function() {
													if ($(this)
															.find(
																	"td input[name*='entityid']")
															.val() == entityid) {
														$(this)
																.find(
																		"td:first")
																.html(
																		i
																				+ "-"
																				+ j++);
														$(this)
																.find(
																		"input,select,textarea")
																.each(
																		function() {
																			var name = $(
																					this)
																					.attr(
																							'name');
																			if (!name) {
																				return;
																			}
																			var arr = name
																					.split(/[\[\]]/); // 拆分特殊字符
																			var tmpName = arr[0]
																					+ "["
																					+ ("" + (rowNum))
																					+ "]"
																					+ arr[2];
																			$(
																					this)
																					.attr(
																							'name',
																							tmpName);
																		});
														rowNum++;
													}
												});
							}
							i++;
						});

		if (entitytype == 4) {
			$("#tabDetail").sortTable({
				compareCol : function() {
					return $("#tabDetail tr:gt(0)").find(" td:first");
				},
				compareFun : function(a, b) {
					var arra = $(a).html().split("-");
					var arrb = $(b).html().split("-");
					if (arra[0] != arrb[0]) {
						return arra[0] - arrb[0];
					} else {
						return arra[1] - arrb[1];
					}
				}
			});
		}

	}

	var changeDetailTabRowNumber = function(entityid, amount) {
		var rowAmount = 0;
		var trArray = [];
		var tbody = document.querySelector("#tabDetail tbody");
		// 逐个比较，找到entityid对应的列
		$("#tabDetail input[name$='entityid']").each(function() {
			if (this.value == entityid) {
				trArray[rowAmount++] = $(this).parents("tr")[0];
			}
		});
		if (rowAmount <= 0) {
			throw "数量不可为0";
		}
		var lastTr = trArray[rowAmount - 1];

		// 不足:补充（选择从最后一TR元素复制）
		if (amount > rowAmount) {
			for (var i = 0; i < amount - rowAmount; i++) {
				var clonedTr = lastTr.cloneNode(true);
				tbody.insertBefore(clonedTr, lastTr);
			}
			// 过多:删除
		} else if (amount < rowAmount) {
			for (var i = 0; i < rowAmount - amount; i++) {
				tbody.removeChild(trArray[rowAmount - 1 - i]);
			}
		}
	}

	return {
		'getCheckedData' : function() {
			return rv.search.getData(getCheckedIds());
		},
		'getAddedData' : function() {
			return rv.search.getData(getAddedIds());
		},
		'getCheckedNewData' : function() {
			var ids = getCheckedIds().substract(getAddedIds());
			return rv.search.getDataArray(ids);
		},
		/* test */'addOneRowData' : addData,
		'addCheckedNewData' : function() {
			var data = this.getCheckedNewData();
			if (!data || data.length == 0) { // empty
				return null;
			}
			var listRowId = $("#tab4 tr").length;
			for (var i = 0; i < data.length; i++) {
				addData(listRowId++, data[i]);
			}
		},
		'addRowsInDetailTable' : function(rowId, length) {
			var entityid = document.querySelector('#list tr#tr' + rowId
					+ ' input[name$=".entityid"').value;
			var firstDetailRowId = document
					.querySelectorAll("#tabDetail tr[entityid^=tr" + rowId
							+ "]").length + 1;
			for (var i = firstDetailRowId; i < firstDetailRowId + length; i++) {
				var data = rv.search.getData(entityid);
				addDetailRow(rowId, i, data);
			}
		},
		'checkCoinAdded' : function(entityid) { // 检查数据是否已添加
			var arr = new Array();
			var result = false;
			var i = 0;
			if (entityid) {
				arr[0] = entityid;
			} else {
				$("#tab5 td input[type=checkbox]:checked").parents("tr").each(
						function() {
							arr[i++] = $(this).find("td#id").html();
						});
			}

			for (x in arr) {
				$('#tab4 tr').find('td:eq(-1)').each(
						function() {
							if (arr[x] == $(this).find(
									"input[name$='.entityid']").val()) {
								result = true;
								return;
							}
						});
			}
			return result;
		},
		
		'isOnlyOneChoosed' : function() { // 检查数据是否已添加
			var result = true;
			if($('#tab4 tr:gt(0)').size()>0){
				result = false;
			}else if($("#tab5 td input[type=checkbox]:checked").size()>1){
				result = false;
			}
			return result;
		},
		'getAddedEntityid' : function() {
			var entityid = [];
			$("#tab4 tr:gt(0)").find("td:eq(-1)").find(
					"input[name$='.entityid']").each(function() {
				entityid.push(this.value);
			});
			return entityid;
		},
		'dealTrIndex' : dealTrIndex,
		'changeDetailTabRowNumber' : changeDetailTabRowNumber,
		'delDetailTabRow' : function(entityid) {
			$("#tabDetail").find("tr td input[name*='entityid']").each(
					function() {
						if ($(this).val() == entityid) {
							$(this).parents("tr").remove();
						}
					});
		}
	}
})();

/*
 * // 往tab4添加数据 function addData() { var listRowId = ($("#tab4 tr:last
 * td").eq(0).text() != '' ) ? parseInt($("#tab4 tr:last td").eq(0).text()) + 1 :
 * 1 ; // when list is empty $("#tab5 tr td
 * input:checkbox:checked").parents('tr').each(function() { rowId = listRowId++; //
 * 将选中数据写到主页面中 this.addDataToPage(rowId); calculateRow($('#tab4 #tr' + rowId));
 * if ("1" == sessionType) { evaluate = this.find("td[id$='evaluate']").text();
 * $('#tab4 #tr' + rowId).find("input[name$='guestappraisal']")
 * .attr('value',evaluate).trigger('blur'); } }); // 重新分配行号 dealTrIndex();
 * $("#tab4 tr:gt(0)").chooseBackColor("graybackground"); }
 * 
 */

rv = window.rv || {};
rv.test = rv.test || {};
/**
 * 从一条ajax查询到的数据中提取有效信息 , data 由rv.search.getData(entityid)函数获取 for examble :
 * rv.test.getEssentialData(rv.search.getData()[2],'coin')
 */
rv.test.getEssentialData = function(data, entitytype) {
	switch (entitytype || rv.entitytype) {
	case rv.ENTITYTYPE_COIN: {
		return {
			id : data.id,
			years : data.years,
			guojia : data.guojia,
			shortsubject : data.shortsubject,
			zhongliang : data.zhongliang,
			weight : data.weight,
			zhiliang : data.zhiliang,
			caizhi : data.caizhi,
			facevaluedis : data.facevaluedis,
			evaluate : data.evaluate,
			fulltitle : data.fulltitle,
			enfullsubject : data.enfullsubject,
			cointypename : data.cointypename,
			size : data.size,
			amountofissue : data.amountofissue
		}
	}
	case rv.ENTITYTYPE_STAMP: {
		return {
			id : data.id,
			zhino : data.zhino,
			color : data.color,
			issuingquantity : data.issuingquantity,
			issuetime : data.issuetime,
			issuedate : data.issuedate,
			guojia : data.guojia,
			fullsubject : data.shortsubject,
			facevaluedis : data.facevaluedis,
			evaluate : data.evaluate,
			boxCost : data.boxCost
		}
	}
	case rv.ENTITYTYPE_ANCIENTCOIN: {
		return {
			guojia : data.guojia,
			dynastyname : data.dynastyname,
			fullsubject : data.shortsubject,
			weight : data.weight,
			gradename : data.gradename,
			size : data.size,
			version : data.version,
			caizhi : data.caizhi,
			facevaluedis : data.facevaluedis,
			evaluate : data.evaluate,
			fulltitle : data.fulltitle,
			enfullsubject : data.enfullsubject,
			cointypename : data.cointypename,
			amountofissue : data.amountofissue,
			boxCost : data.boxCost
		}
	}
	case rv.ENTITYTYPE_BILL: {
		return {
			years : data.years,
			guojia : data.guojia,
			fullsubject : data.shortsubject,
			facevaluedis : data.facevaluedis,
			version : data.version,
			wmk : data.wmk,
			evaluate : data.evaluate,
			boxCost : data.boxCost
		}
	}
	case rv.ENTITYTYPE_MECHANISMCOIN: {
		return {
			years : data.years,
			guojia : data.guojia,
			fullsubject : data.shortsubject,
			weight : data.weight,
			size : data.size,
			version : data.version,
			caizhi : data.caizhi,
			facevaluedis : data.facevaluedis,
			evaluate : data.evaluate,
			fulltitle : data.fulltitle,
			enfullsubject : data.enfullsubject,
			cointypename : data.cointypename,
			amountofissue : data.amountofissue,
			boxCost : data.boxCost
		}
	}
	default: {
		return data;
	}
	}
}
/**
 * for examble: rv.test.lookupOneListRow($('#tab4 tbody tr:eq(1) input'))
 */
rv.test.lookupOneListRow = function(elements) {
	var obj = [];
	var getValueFromElement = function(e) {
		if (e.nodeName == 'INPUT' || e.nodeName == 'SELECT') {
			return e.value;
		} else {
			return e.innerText;
		}
	}
	var getNodeType = function(e) {
		var nodeName = e.nodeName;
		if (e.nodeName == 'INPUT') {
			if (e.type == 'button' || e.type == 'reset' || e.type == 'submit') { // 小心大小写
				return null;
			}
			return ":" + e.type;
		} else {
			return e.nodeName;
		}
	}
	for (var i = 0; i < elements.length; i++) {
		var type = getNodeType(elements[i]);
		if (type) {
			obj.push({
				'type' : type,
				'value' : getValueFromElement(elements[i]),
				'node' : elements[i].outerHTML
			});
		}

	}
	console.table(obj);
	return obj;
}
