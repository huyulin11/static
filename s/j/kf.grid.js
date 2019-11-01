import { gf } from "/s/buss/g/j/g.f.js";

var _defaultConf = {
	columns: [],
	pagId: 'paging', // 加载表格存放位置的ID
	width: '100%', // 表格高度
	height: '100%', // 表格宽度
	theadHeight: '28px', // 表格的thead高度
	tbodyHeight: '27px',// 表格body的每一行高度
	jsonUrl: '', // 访问后台地址
	isFixed: false,//是否固定表头
	usePage: true,
	serNumber: false,// 是否显示序号
	records: 'records',// 分页数据
	pageNow: 'pageNow',// 当前页码 或 当前第几页a
	totalPages: 'pageCount',// 总页数
	totalRecords: 'rowCount',// 总记录数
	pagecode: '20',// 分页时，最多显示几个页码
	async: true, // 默认为同步
	data: '', // 发送给后台的数据 是json数据 例如{nama:"a",age:"100"}....
	pageSize: 40, // 每页显示多少条数据
	checkbox: false,// 是否显示复选框
	checkValue: 'id', // 当checkbox为true时，需要设置存放checkbox的值字段 默认存放字段id的值
	treeGrid: {
		type: 1, //1 表示后台已经处理好父类带children集合 2 表示没有处理,由前端处理树形式
		tree: false,// 是否显示树
		name: 'name',// 以哪个字段 的树形式 如果是多个 name,key
		id: "id",
		pid: "pid"
	},
	callback: function () { }
};

let _flag = false;
var jsonRequest = function (conf, callback) {
	if (_flag) return;
	_flag = true;
	$.ajax({
		type: 'POST',
		async: conf.async,
		data: conf.data,
		url: conf.jsonUrl,
		dataType: 'json',
		success: function (data) {
			if (data) { callback(data); }
			_flag = false;
		},
		error: function (msg) {
			console.log(msg);
			_flag = false;
			layer.msg("数据错误！请检查网络或权限配置！");
		}
	});
};

var renderFun = function (obj, rowindex, data, rowdata, clm) {
	if (obj.renderData) {
		return obj.renderData(rowindex, data, rowdata, clm);
	} else {
		return data;
	}
}

var restoreBgColor = function (tr) {
	for (var i = 0; i < tr.childNodes.length; i++) {
		tr.childNodes[i].style.backgroundColor = "";
	}
};
var setBgColor = function (tr) {
	for (var i = 0; i < tr.childNodes.length; i++) {
		tr.childNodes[i].style.backgroundColor = "#D4D4D4";
	}
};

var highlight = function () {
	var evt = arguments[0] || window.event;
	var chkbox = evt.srcElement || evt.target;
	var tr = chkbox.parentNode.parentNode;
	chkbox.checked ? setBgColor(tr) : restoreBgColor(tr);
};

var fixhead = function () {
	for (var i = 0; i <= $('.t_table .pp-list tr:last').find('td:last').index(); i++) {
		$('.pp-list th').eq(i).css('width', ($('.t_table .pp-list tr:last').find('td').eq(i).width()) + 2);
	}
};

var tag = function (tag) {
	return document.createElement(tag);
};

var name = function (oneColumn) {
	if (typeof oneColumn.name == "string") return oneColumn.name;
	if (typeof oneColumn.name == "function") return oneColumn.name();
	return "";
}

var hide = function (oneColumn) {
	if (typeof oneColumn.hide == "boolean") return oneColumn.hide;
	if (typeof oneColumn.hide == "function") return oneColumn.hide();
	return "";
}

var _fieldModel = {
	colkey: null,
	name: null,
	height: 'auto',
	align: 'center',
	hide: false,
	renderData: null
};

var _container;
var _conf;
var _confTreeGrid;
var _columns;
var _tee = "1-0";
var _nb = '20';
var _img;

let _focusCss = "text-align:center; vertical-align: middle;";
let _HideCss = "display: none;";
let defaultItemCss = function (oneColumn) {
	return "padding-top:5px;margin-left:5px;vertical-align: middle;text-align:" + oneColumn.align + ";height:" + _conf.theadHeight + ";";
}
let chooseHideNumber = function (th) {
	th.setAttribute("style", _focusCss + ((!_conf.serNumber) ? _HideCss : ""));
}
let chooseHideCheckbox = function (th) {
	th.setAttribute("style", _focusCss + ((!_conf.checkbox) ? _HideCss : ""));
}

var dataGrid = function (params) {
	_conf = $.extend(_defaultConf, params);
	_confTreeGrid = _conf.treeGrid;
	_columns = _conf.columns;

	for (let oneColumn of _columns) {
		for (let p in _fieldModel)
			if (_fieldModel.hasOwnProperty(p) && (!oneColumn.hasOwnProperty(p)))
				oneColumn[p] = _fieldModel[p];
	}

	var initGrid = function (conf) {
		_container = document.getElementById(_conf.pagId);
		if (!_container) {
			console.error(`找不到id=${_conf.pagId}选择器！`);
			return;
		}
		_container.innerHTML = '';
		jsonRequest(conf, render);
	};

	var render = function (jsonData) {
		renderHead(_container);
		renderBody(_container, jsonData);
		renderFenye(_container, jsonData);

		if (_conf.callback) { _conf.callback(); }
		fixhead();
	};

	var renderHead = function (divid) {
		if (!_conf.isFixed) { return; }
		var table = tag("table");
		table.id = "table_head";
		table.className = "pp-list table table-striped table-bordered";
		table.setAttribute("style", "margin-bottom: -3px;");
		divid.appendChild(table);
		var thead = tag('thead');
		table.appendChild(thead);
		var tr = tag('tr');
		tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
		thead.appendChild(tr);
		var th = tag('th'); chooseHideNumber(th);
		tr.appendChild(th);
		var cth = tag('th'); chooseHideCheckbox(cth);
		var chkbox = tag("INPUT");
		chkbox.type = "checkbox";
		chkbox.setAttribute("pagId", _conf.pagId);
		$(chkbox).on("click", checkboxbind);
		cth.appendChild(chkbox);
		tr.appendChild(cth);
		for (let oneColumn of _columns) {
			if (!hide(oneColumn)) {
				var th = tag('th');
				th.setAttribute("style", defaultItemCss(oneColumn));
				th.innerHTML = name(oneColumn);
				tr.appendChild(th);
			}
		};
	};

	var renderBody = function (divid, jsonData) {
		var tdiv = tag("div");
		var h = '';
		var xy = "hidden";
		if (_conf.height == "100%") {
			if (!_conf.isFixed) {
				h = "auto";
			} else {
				xy = "auto";
				h = $(window).height() - $("#table_head").offset().top - $('#table_head').find('th:last').eq(0).height();
				if (_conf.usePage) {
					h -= 55;
				}
				h += "px";
			}
		} else {
			h = _conf.height;
		}
		tdiv.setAttribute("style", 'overflow-y: ' + xy + '; overflow-x: ' + xy + '; height: ' + h + '; border: 1px solid #DDDDDD;background: white;');
		tdiv.className = "t_table";
		divid.appendChild(tdiv);
		var table2 = tag("table");
		table2.id = "mytable";
		table2.className = "pp-list table table-striped table-bordered";
		table2.setAttribute("style", "margin-bottom: -3px;");

		tdiv.appendChild(table2);
		var tbody = tag("tbody");
		table2.appendChild(tbody);
		var json = _getValueByName(jsonData, _conf.records);

		if (!_conf.isFixed) {
			var tr = tag('tr');
			tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
			tbody.appendChild(tr);
			var th = tag('th'); chooseHideNumber(th);
			tr.appendChild(th);
			var cth = tag('th'); chooseHideCheckbox(cth);
			var chkbox = tag("INPUT");
			chkbox.type = "checkbox";
			chkbox.setAttribute("pagId", _conf.pagId);
			$(chkbox).on("click", checkboxbind);
			cth.appendChild(chkbox);
			tr.appendChild(cth);
			for (let oneColumn of _columns) {
				if (!hide(oneColumn)) {
					var th = tag('th');
					th.setAttribute("style", defaultItemCss(oneColumn));
					th.innerHTML = name(oneColumn);
					tr.appendChild(th);
				}
			};
		}

		$.each(json, function (indexNum) {
			if (gf.notNull(json[indexNum])) {
				var tr = tag('tr');
				tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
				var sm = parseInt(_tee.substring(_tee.length - 1), 10) + 1;
				_tee = _tee.substring(0, _tee.length - 2);
				_tee = _tee + "-" + sm;
				tr.setAttribute("d-tree", _tee);
				tbody.appendChild(tr);
				var ntd_d = tr.insertCell(-1); chooseHideNumber(ntd_d);
				var rowindex = tr.rowIndex;

				ntd_d.innerHTML = rowindex;
				var td_d = tr.insertCell(-1); chooseHideCheckbox(td_d);
				var chkbox = tag("INPUT");
				chkbox.type = "checkbox";
				for (let v in json[indexNum]) { if (json[indexNum][v]) chkbox.setAttribute("data-" + v, json[indexNum][v]); };
				chkbox.setAttribute("data-" + "cid", _getValueByName(json[indexNum], _confTreeGrid.id));
				chkbox.setAttribute("pid", _getValueByName(json[indexNum], _confTreeGrid.pid));
				chkbox.setAttribute("_l_key", "checkbox");
				chkbox.value = _getValueByName(json[indexNum], _conf.checkValue);
				$(chkbox).on("click", highlight);
				td_d.appendChild(chkbox);
				for (let oneColumn of _columns) {
					if (!hide(oneColumn)) {
						var td_o = tr.insertCell(-1);
						td_o.setAttribute("style", defaultItemCss(oneColumn));

						var rowdata = json[indexNum];
						var dtee = _tee;
						rowdata.dtee = dtee;
						var colKey = oneColumn.colkey;
						var data = gf.notEmpty(_getValueByName(rowdata, colKey));

						if (_confTreeGrid.tree) {
							var lt = _confTreeGrid.name.split(",");
							if (gf.inArray(lt, colKey)) {
								var divtree = tag("div");
								divtree.className = "ly_tree";
								divtree.setAttribute("style", defaultItemCss(oneColumn));
								var img = tag('img');
								img.src = "/s/i/tree/nolines_minus.gif";
								$(img).on("click", datatree);
								divtree.appendChild(img);
								td_o.appendChild(divtree);
								var divspan = tag("span");
								divspan.className = "l_test";
								divspan.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");

								divspan.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
								td_o.appendChild(divspan);
							} else {
								td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
							}
							;
						} else {
							td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
						}
					}
				};
				if (_confTreeGrid.tree) {
					if (_confTreeGrid.type == 1) {
						_tee = _tee + "-0";
						treeHtml(tbody, json[indexNum]);
					} else {
						var obj = json[indexNum];
						delete json[indexNum];
						_nb = 20;
						treeSimpleHtml(tbody, json, obj);
					}
				}
			}
		});
	};
	var renderFenye = function (divid, jsonData) {
		if (!_conf.usePage) { return; }
		var totalRecords = _getValueByName(jsonData, _conf.totalRecords);
		var totalPages = _getValueByName(jsonData, _conf.totalPages);
		var pageNow = _getValueByName(jsonData, _conf.pageNow);
		var bdiv = tag("div");
		bdiv.setAttribute("style", _focusCss);

		bdiv.className = "span12 center";
		divid.appendChild(bdiv);
		var btable = tag("table");
		btable.width = "100%";
		bdiv.appendChild(btable);
		var btr = tag("tr");
		btable.appendChild(btr);
		var btd_1 = tag("td");
		btd_1.style.textAlign = "left";
		btr.appendChild(btd_1);
		var btddiv = tag("div");
		btddiv.className = "pagination";
		btd_1.appendChild(btddiv);
		var divul = tag("ul");
		btddiv.appendChild(divul);
		var ulli = tag("li");
		ulli.className = "prev";
		divul.appendChild(ulli);
		var lia = tag("a");
		lia.href = "javascript:void(0);";
		ulli.appendChild(lia);
		lia.innerHTML = '总&nbsp;' + totalRecords + '&nbsp;条&nbsp;&nbsp;每页&nbsp;' + _conf.pageSize + '&nbsp;条&nbsp;&nbsp;共&nbsp;' + totalPages + '&nbsp;页';

		var btd_1 = tag("td");
		btd_1.style.textAlign = "right";
		btr.appendChild(btd_1);
		var divul_2 = tag("ul");
		divul_2.className = "dataTables_paginate paging_bootstrap pagination";
		btd_1.appendChild(divul_2);

		if (pageNow > 1) {
			var ulli_2 = tag("li");
			divul_2.appendChild(ulli_2);
			var lia_2 = tag("a");
			$(lia_2).on("click", pageBind);
			lia_2.id = "pagNum_" + (pageNow - 1);
			lia_2.href = "javascript:void(0);";
			lia_2.innerHTML = '← prev';
			ulli_2.appendChild(lia_2);
		} else {
			var ulli_2 = tag("li");
			ulli_2.className = "prev disabled";
			divul_2.appendChild(ulli_2);
			var lia_2 = tag("a");
			lia_2.href = "javascript:void(0);";
			lia_2.innerHTML = '← prev';
			ulli_2.appendChild(lia_2);
		}
		var pg = pagesIndex(_conf.pagecode, pageNow, totalPages);
		var startpage = pg.start;
		var endpage = pg.end;
		if (startpage != 1) {
			var ulli_3 = tag("li");
			divul_2.appendChild(ulli_3);
			var lia_3 = tag("a");
			$(lia_3).on("click", pageBind);
			lia_3.href = "javascript:void(0);";
			lia_3.id = "pagNum_1";
			lia_3.innerHTML = '1...';
			ulli_3.appendChild(lia_3);
		}
		/*if (endpage - startpage <= 0) {
			var ulli_4 = tag("li");
			ulli_4.className = "active";
			divul_2.appendChild(ulli_4);
			var lia_4 = tag("a");
			lia_4.href = "javascript:void(0);";
			lia_4.innerHTML = '1';
			ulli_4.appendChild(lia_4);
		}*/
		for (var i = startpage; i <= endpage; i++) {
			if (i == pageNow) {
				var ulli_5 = tag("li");
				ulli_5.className = "active";
				divul_2.appendChild(ulli_5);
				var lia_5 = tag("a");
				lia_5.href = "javascript:void(0);";
				lia_5.innerHTML = i;
				ulli_5.appendChild(lia_5);
			} else {
				var ulli_5 = tag("li");
				divul_2.appendChild(ulli_5);
				var lia_5 = tag("a");
				$(lia_5).on("click", pageBind);
				lia_5.href = "javascript:void(0);";
				lia_5.id = "pagNum_" + i;
				lia_5.innerHTML = i;
				ulli_5.appendChild(lia_5);
			}
			;

		}
		if (endpage != totalPages) {
			var ulli_6 = tag("li");
			divul_2.appendChild(ulli_6);
			var lia_6 = tag("a");
			$(lia_6).on("click", pageBind);
			lia_6.href = "javascript:void(0);";
			lia_6.id = "pagNum_" + totalPages;
			lia_6.innerHTML = '...' + totalPages;
			ulli_6.appendChild(lia_6);
		}
		if (pageNow >= totalPages) {
			var ulli_7 = tag("li");
			ulli_7.className = "prev disabled";
			divul_2.appendChild(ulli_7);
			var lia_7 = tag("a");
			lia_7.href = "javascript:void(0);";
			lia_7.innerHTML = 'next → ';
			ulli_7.appendChild(lia_7);
		} else {
			var ulli_7 = tag("li");
			ulli_7.className = "next";
			divul_2.appendChild(ulli_7);
			var lia_7 = tag("a");
			$(lia_7).on("click", pageBind);
			lia_7.href = "javascript:void(0);";
			lia_7.id = "pagNum_" + (pageNow + 1);
			lia_7.innerHTML = 'next → ';
			ulli_7.appendChild(lia_7);
		}
		;
	};
	var treeHtml = function (tbody, data) {
		if (!data) return;
		var jsonTree = data.children;
		if (!jsonTree) return;
		$.each(jsonTree, function (jt) {
			var tte = false;
			if (jsonTree[jt].children) {
				tte = true;
			}
			var tr = tag('tr');
			tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
			var sm = parseInt(_tee.substring(_tee.length - 1), 10) + 1;
			_tee = _tee.substring(0, _tee.length - 2);
			_tee = _tee + "-" + sm;
			tr.setAttribute("d-tree", _tee);
			tbody.appendChild(tr);
			var ntd_d = tr.insertCell(-1); chooseHideNumber(ntd_d);
			var rowindex = tr.rowIndex;
			ntd_d.innerHTML = rowindex;
			var td_d = tr.insertCell(-1); chooseHideCheckbox(td_d);
			var chkbox = tag("INPUT");
			chkbox.type = "checkbox";

			for (let v in jsonTree[jt]) { if (jsonTree[jt][v]) chkbox.setAttribute("data-" + v, jsonTree[jt][v]); };
			chkbox.setAttribute("data-" + "cid", _getValueByName(jsonTree[jt], "id"));
			chkbox.setAttribute("pid", _getValueByName(jsonTree[jt], "parentId"));

			chkbox.setAttribute("_l_key", "checkbox");
			chkbox.value = _getValueByName(jsonTree[jt], _conf.checkValue);
			$(chkbox).on("click", highlight);
			td_d.appendChild(chkbox);
			for (let oneColumn of _columns) {
				if (!hide(oneColumn)) {
					var td_o = tr.insertCell(-1);
					td_o.setAttribute("style", defaultItemCss(oneColumn));
					var rowdata = jsonTree[jt];
					var dtee = _tee;
					rowdata.dtee = dtee;
					var colKey = oneColumn.colkey;
					var data = gf.notEmpty(_getValueByName(rowdata, colKey));

					if (_confTreeGrid.tree) {
						var lt = _confTreeGrid.name.split(",");
						if (gf.inArray(lt, colKey)) {
							var divtree = tag("div");
							divtree.className = "ly_tree";
							divtree.setAttribute("style", defaultItemCss(oneColumn));
							if (tte) {
								var img = tag('img');
								img.src = "/s/i/tree/nolines_minus.gif";
								$(img).on("click", datatree);
								divtree.appendChild(img);
							}
							td_o.appendChild(divtree);
							var divspan = tag("span");
							divspan.className = "l_test";
							divspan.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
							divspan.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
							td_o.appendChild(divspan);
						} else {
							td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
						}
					} else {
						td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
					}
				}
			};
			if (tte) {
				//1-1
				_tee = _tee + "-0";
				_nb = parseInt(_nb, 10) + 20;
				treeHtml(tbody, jsonTree[jt]);
			}

		});
		_tee = _tee.substring(0, _tee.length - 2);
		_nb = 20;
	};

	var treeSimpleHtml = function (tbody, jsonTree, obj) {
		var tte = false;
		_tee = _tee + "-0";
		$.each(jsonTree, function (jt) {
			if (gf.notNull(jsonTree[jt])) {
				var jsb = _getValueByName(jsonTree[jt], _confTreeGrid.pid);
				var ob = _getValueByName(obj, _confTreeGrid.id);
				if (jsb == ob) {
					tte = true;
					var tr = tag('tr');
					tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
					var sm = parseInt(_tee.substring(_tee.length - 1), 10) + 1;
					_tee = _tee.substring(0, _tee.length - 2);
					_tee = _tee + "-" + sm;
					tr.setAttribute("d-tree", _tee);
					tbody.appendChild(tr);
					var ntd_d = tr.insertCell(-1); chooseHideNumber(ntd_d);
					var rowindex = tr.rowIndex;
					ntd_d.innerHTML = rowindex;
					var td_d = tr.insertCell(-1); chooseHideCheckbox(td_d);
					var chkbox = tag("INPUT");
					chkbox.type = "checkbox";
					for (let v in json[d]) { if (json[d][v]) chkbox.setAttribute("data-" + v, json[d][v]); };
					chkbox.setAttribute("data-" + "cid", _getValueByName(jsonTree[jt], _confTreeGrid.id));
					chkbox.setAttribute("pid", _getValueByName(jsonTree[jt], _confTreeGrid.pid));
					chkbox.setAttribute("_l_key", "checkbox");
					chkbox.value = _getValueByName(jsonTree[jt], _conf.checkValue);
					$(chkbox).on("click", highlight);
					td_d.appendChild(chkbox);
					for (let oneColumn of _columns) {
						if (!hide(oneColumn)) {
							var td_o = tr.insertCell(-1);
							td_o.setAttribute("style", defaultItemCss(oneColumn));
							var rowdata = jsonTree[jt];
							var dtee = _tee;
							rowdata.dtee = dtee;
							var colKey = oneColumn.colkey;
							var data = gf.notEmpty(_getValueByName(rowdata, colKey));

							if (_confTreeGrid.tree) {
								var lt = _confTreeGrid.name.split(",");
								if (gf.inArray(lt, colKey)) {
									var divtree = tag("div");
									divtree.className = "ly_tree";
									divtree.setAttribute("style", defaultItemCss(oneColumn));
									_img = tag('img');
									_img.src = "/s/i/tree/nolines_minus.gif";
									$(_img).on("click", datatree);
									divtree.appendChild(_img);
									td_o.appendChild(divtree);
									var divspan = tag("span");
									divspan.className = "l_test";
									divspan.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
									divspan.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
									td_o.appendChild(divspan);
								} else {
									td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
								}
							} else {
								td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colKey);
							}
						}
					}
					var o = jsonTree[jt];
					delete jsonTree[jt];
					_nb = parseInt(_nb, 10) + 20;
					treeSimpleHtml(tbody, jsonTree, o)
				}
			}
		});
		if (!tte) {
			if (gf.notNull(_img)) {
				_img.remove(_img.selectedIndex);
			}
		}

		_tee = _tee.substring(0, _tee.length - 2);
		_nb = parseInt(_nb, 10) - 20;;
	};
	var dataGridUp = function (jsonUrl) {
		var upOne = function (tr) {
			if (tr.rowIndex > 0) {
				var ctr = _container.children[0].children.mytable.rows[tr.rowIndex - 1];
				swapTr(tr, ctr);
				getChkBox(tr).checked = true;
			}
		};
		var arr = [].concat(_container.children[0].children.mytable.rows).reverse();
		if (arr.length > 0 && getChkBox(arr[arr.length - 1]).checked) {
			for (var i = arr.length - 1; i >= 0; i--) {
				if (getChkBox(arr[i]).checked) {
					arr.pop();
				} else {
					break;
				}
			}
		}
		for (let tr of arr.reverse()) {
			var ck = getChkBox(tr);
			if (ck.checked) {
				var cd = ck.getAttribute("data-" + "cid");
				$("input:checkbox[pid='" + cd + "']").attr('checked', 'true');
				upOne(tr);
			}
		};
		var row = grid.rowline();
		var data = [];
		$.each(row, function (i) {
			data.push(_conf.checkValue + "[" + i + "]=" + row[i].rowId);
			data.push("rowId[" + i + "]=" + row[i].rowNum);
		});
		$.ajax({
			type: 'POST',
			data: data.join("&"),
			url: jsonUrl,
			dataType: 'json',
		});
	};
	var dataGridDown = function (jsonUrl) {
		var downOne = function (tr) {
			if (tr.rowIndex < _container.children[0].children.mytable.rows.length - 1) {
				swapTr(tr, _container.children[0].children.mytable.rows[tr.rowIndex + 1]);
				getChkBox(tr).checked = true;
			}
		};
		var arr = [].concat(_container.children[0].children.mytable.rows);
		if (arr.length > 0 && getChkBox(arr[arr.length - 1]).checked) {
			for (var i = arr.length - 1; i >= 0; i--) {
				if (getChkBox(arr[i]).checked) {
					arr.pop();
				} else {
					break;
				}
			}
		}
		for (let tr of arr) {
			var ck = getChkBox(tr);
			if (ck.checked) {
				var cd = ck.getAttribute("data-" + "cid");
				$("input:checkbox[pid='" + cd + "']").attr('checked', 'true');
			}
		};
		for (let tr of arr.reverse()) {
			if (getChkBox(tr).checked)
				downOne(tr);
		};
		var row = grid.rowline();
		var data = [];
		$.each(row, function (i) {
			if (!isNaN(row[i].rowId)) {
				data.push(_conf.checkValue + "[" + i + "]=" + row[i].rowId);
			} else {
				data.push(_conf.checkValue + "[" + i + "]=" + i);
			}
			data.push("rowId[" + i + "]=" + row[i].rowNum);
		});
		$.ajax({
			type: 'POST',
			data: data.join("&"),
			url: jsonUrl,
			dataType: 'json',
		});
	};
	var selectRow = function (pagId) {
		if (!pagId) { pagId = _conf.pagId; }
		var arr = [];
		$("#" + pagId + " input[_l_key='checkbox']:checkbox:checked").each(function () {
			arr.push($(this).val());
		});
		return arr;
	};
	var checkboxbind = function () {
		var evt = arguments[0] || window.event;
		var chkbox = evt.srcElement || evt.target;
		var checkboxes = $("#" + chkbox.attributes.pagId.value + " input[_l_key='checkbox']");
		if (chkbox.checked) {
			checkboxes.prop('checked', true);
		} else {
			checkboxes.prop('checked', false);
		}
		checkboxes.each(function () {
			var tr = this.parentNode.parentNode;
			var chkbox = getChkBox(tr);
			if (chkbox.checked) {
				setBgColor(tr);
			} else {
				restoreBgColor(tr);
			}
		});
	};

	var pageBind = function () {
		var evt = arguments[0] || window.event;
		var a = evt.srcElement || evt.target;
		var page = a.id.split('_')[1];
		_conf.data = $.extend(_conf.data, {
			pageNow: page
		});
		initGrid(_conf);
	};
	var datatree = function () {
		var evt = arguments[0] || window.event;
		var img = evt.srcElement || evt.target;
		var ttr = img.parentElement.parentElement.parentElement.getAttribute('d-tree');
		if (img.src.indexOf("nolines_plus.gif") > -1) {
			img.src = "/s/i/tree/nolines_minus.gif";
			$("tr[d-tree^='" + ttr + "-']").show();
		} else {
			img.src = "/s/i/tree/nolines_plus.gif";
			$("tr[d-tree^='" + ttr + "-']").hide();
		}
	};

	var swapTr = function (tr1, tr2) {
		var target = (tr1.rowIndex < tr2.rowIndex) ? tr2.nextSibling : tr2;
		var tBody = tr1.parentNode;
		tBody.replaceChild(tr2, tr1);
		tBody.insertBefore(tr1, target);
	};
	var getChkBox = function (tr) {
		return tr.cells[1].firstChild;

	};
	Function.prototype.bind = function () {
		var __method = this, args = [].concat(arguments), object = args.shift();
		return function () {
			return __method.apply(object, args.concat(arguments));
		};
	};

	var _getValueByName = function (data, name) {
		if (!data || !name)
			return null;
		if (name.indexOf('.') == -1) {
			return data[name];
		} else {
			try {
				return new Function("data", "return data." + name + ";")(data);
			} catch (e) {
				return null;
			}
		}
	};
	var rowline = function () {
		var cb = [];

		var arr = [].concat(_container.children[0].children.mytable.rows);
		for (var i = arr.length - 1; i > 0; i--) {
			var cbox = getChkBox(arr[i]).value;
			var row = arr[i].rowIndex;
			var sort = {};
			sort.rowNum = row;
			sort.rowId = cbox;
			cb.push(sort);
		}
		return cb.reverse();
	};
	var pagesIndex = function (pagecode, pageNow, pageCount) {
		pagecode = parseInt(pagecode);
		pageNow = parseInt(pageNow);
		pageCount = parseInt(pageCount);
		var startpage = pageNow - (pagecode % 2 == 0 ? pagecode / 2 - 1 : pagecode / 2);
		var endpage = pageNow + pagecode / 2;
		if (startpage < 1) {
			startpage = 1;
			if (pageCount >= pagecode)
				endpage = pagecode;
			else
				endpage = pageCount;
		}
		if (endpage > pageCount) {
			endpage = pageCount;
			if ((endpage - pagecode) > 0)
				startpage = endpage - pagecode + 1;
			else
				startpage = 1;
		};
		var se = {
			start: startpage,
			end: endpage
		};
		return se;
	};
	var loadData = function () {
		initGrid(_conf);
	};
	var setOptions = function (params) {
		$.extend(_conf, params);
		initGrid(_conf);
	};
	var getSelectedCheckbox = function (key) {
		var arr = [];
		$(`#${_conf.pagId} input[_l_key='checkbox']:checkbox:checked`).each(function () {
			if (key) arr.push($(this).data(key));
			else arr.push($(this).val());
		});
		return arr;
	};
	var getSelectedCheckboxObj = function () {
		var arr = [];
		$(`#${_conf.pagId} input[_l_key='checkbox']:checkbox:checked`).each(function () {
			arr.push($(this).data());
		});
		return arr;
	};
	initGrid(_conf);
	return {
		setOptions: setOptions,
		loadData: loadData,
		getSelectedCheckboxObj: getSelectedCheckboxObj,
		getSelectedCheckbox: getSelectedCheckbox,
		selectRow: selectRow,
		dataGridUp: dataGridUp,
		dataGridDown: dataGridDown,
		rowline: rowline
	};
};

export { dataGrid };