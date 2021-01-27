import { gf } from "/s/buss/g/j/g.f.js";
import {
	_defaultConf, renderFun, restoreBgColor, setBgColor, renderChkbox, renderAllChkbox, _fieldModel, _focusCss, _hideCss, hideNumber, hideCheckbox,
	_getValueByName, fixhead, tag, name, hide, _conf, _confTreeGrid, _columns, initUtil, checkItem, jsonRequest, getChkBox
} from "/s/j/kf.grid.util.js";

var _container;
var _tee = "1-0";
var _nb = '20';
var _img;

let defaultItemCss = function (oneColumn) {
	if (hide(oneColumn)) {
		return _hideCss;
	}
	return "padding-top:5px;margin-left:5px;vertical-align: middle;text-align:" + oneColumn.align + ";height:" + _conf.theadHeight + ";";
}

var dataGrid = function (params) {
	initUtil(params);

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

	var render = function (jsonDatas) {
		if (!_conf.simple) {
			if (!_conf.fenyeInTail) {
				renderFenye(_container, jsonDatas);
			}
			renderBody(_container, jsonDatas);
			if (_conf.fenyeInTail) {
				renderFenye(_container, jsonDatas);
			}
		} else {
			renderBody(_container, jsonDatas);
		}
		if (_conf.callback) { _conf.callback(); }
		let scrollHandle = function (e) {
			var scrollTop = this.scrollTop;
			var style = this.querySelector('thead').style;
			style.transform = 'translateY(' + scrollTop + 'px)';
			if (scrollTop > 0) { style.background = "#f9f9f96b"; } else { style.background = ""; }
		}
		$(_container).find(".t_table").on('scroll', scrollHandle);
		fixhead();
	};

	var renderBody = function (divid, jsonDatas) {
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
		// tdiv.setAttribute("style", 'overflow-y: ' + xy + '; overflow-x: ' + xy + '; height: ' + h + '; border: 1px solid #DDDDDD;');
		tdiv.className = "t_table";
		divid.appendChild(tdiv);
		var table2 = tag("table");
		table2.id = "mytable";
		table2.className = "pp-list table table-striped table-bordered";
		table2.setAttribute("style", "margin-bottom: -3px;");

		tdiv.appendChild(table2);
		var tbody = tag("tbody");
		table2.appendChild(tbody);
		var jsonItems = _getValueByName(jsonDatas, _conf.records);

		if (!_conf.isFixed) {
			var thead = tag('thead');
			table2.appendChild(thead);
			var tr = tag('tr');
			tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
			thead.appendChild(tr);

			var th = tag('th'); hideNumber(th);
			tr.appendChild(th);
			var cth = tag('th'); hideCheckbox(cth);
			if (!_conf.checkone) {
				var chkbox = renderAllChkbox();
				cth.appendChild(chkbox);
			}
			tr.appendChild(cth);
			for (let oneColumn of _columns) {
				var th = tag('th');
				th.setAttribute("style", defaultItemCss(oneColumn));
				th.innerHTML = name(oneColumn);
				tr.appendChild(th);
			};
		}

		$.each(jsonItems, function (indexNum) {
			var rowdata = jsonItems[indexNum];
			let jsonCol;
			let jsonColumn = _conf.jsonColumn ? _conf.jsonColumn : "json";
			if (rowdata && rowdata[jsonColumn]) jsonCol = JSON.parse(rowdata[jsonColumn]); else jsonCol = {};
			if (gf.notNull(rowdata)) {
				var tr = tag('tr');
				if (_conf.id) tr.setAttribute("data-" + "key", _getValueByName(rowdata, _conf.id));
				tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
				var sm = parseInt(_tee.substring(_tee.length - 1), 10) + 1;
				_tee = _tee.substring(0, _tee.length - 2);
				_tee = _tee + "-" + sm;
				tr.setAttribute("d-tree", _tee);
				tbody.appendChild(tr);
				var ntd_d = tr.insertCell(-1); hideNumber(ntd_d);
				var rowindex = tr.rowIndex;

				ntd_d.innerHTML = rowindex;
				var td_d = tr.insertCell(-1); hideCheckbox(td_d);
				if (checkItem(rowdata)) {
					var chkbox = renderChkbox(rowdata, _confTreeGrid.id, _confTreeGrid.id);
					td_d.appendChild(chkbox);
				}
				for (let oneColumn of _columns) {
					if (oneColumn.jsonColumn && rowdata && rowdata[oneColumn.jsonColumn]) jsonCol = JSON.parse(rowdata[oneColumn.jsonColumn]);
					var td_o = tr.insertCell(-1);
					var colkey = oneColumn.colkey;
					td_o.setAttribute("style", defaultItemCss(oneColumn));
					td_o.setAttribute("class", colkey);
					var dtee = _tee;
					rowdata.dtee = dtee;
					var data = gf.notEmpty(_getValueByName(rowdata, colkey));

					if (_confTreeGrid.tree) {
						var lt = _confTreeGrid.name.split(",");
						if (gf.inArray(lt, colkey)) {
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

							divspan.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
							td_o.appendChild(divspan);
						} else {
							td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
						}
						;
					} else {
						td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
					}
				}
			};
			if (_confTreeGrid.tree) {
				if (_confTreeGrid.type == 1) {
					_tee = _tee + "-0";
					treeHtml(tbody, rowdata);
				} else {
					var obj = rowdata;
					delete jsonItems[jt];
					_nb = 20;
					treeSimpleHtml(tbody, jsonItems, obj);
				}
			}
		});
	};
	var renderFenye = function (divid, jsonDatas) {
		if (!_conf.usePage) { return; }
		var totalRecords = _getValueByName(jsonDatas, _conf.totalRecords);
		var totalPages = _getValueByName(jsonDatas, _conf.totalPages);
		var pageNow = _getValueByName(jsonDatas, _conf.pageNow);
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
		lia.innerHTML = '总&nbsp;' + totalRecords + '&nbsp;条&nbsp;&nbsp;共&nbsp;' + totalPages + '&nbsp;页';

		var btd_1 = tag("td");
		btd_1.style.textAlign = "right";
		btr.appendChild(btd_1);
		var divul_2 = tag("ul");
		divul_2.className = "dataTables_paginate paging_bootstrap pagination";
		btd_1.appendChild(divul_2);

		var ulli_2 = tag("li");
		if (pageNow > 1) {
			divul_2.appendChild(ulli_2);
			var lia_2 = tag("a");
			$(lia_2).on("click", pageBind);
			lia_2.id = "pagNum_" + (pageNow - 1);
		} else {
			ulli_2.className = "prev disabled";
			divul_2.appendChild(ulli_2);
			var lia_2 = tag("a");
		}
		lia_2.href = "javascript:void(0);";
		lia_2.innerHTML = '←';
		ulli_2.appendChild(lia_2);
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
			var ulli_5 = tag("li");
			if (i == pageNow) {
				ulli_5.className = "active";
				divul_2.appendChild(ulli_5);
				var lia_5 = tag("a");
			} else {
				divul_2.appendChild(ulli_5);
				var lia_5 = tag("a");
				$(lia_5).on("click", pageBind);
				lia_5.id = "pagNum_" + i;
			}
			lia_5.href = "javascript:void(0);";
			lia_5.innerHTML = i;
			ulli_5.appendChild(lia_5);
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
		var ulli_7 = tag("li");
		if (pageNow >= totalPages) {
			ulli_7.className = "prev disabled";
			divul_2.appendChild(ulli_7);
			var lia_7 = tag("a");
		} else {
			ulli_7.className = "next";
			divul_2.appendChild(ulli_7);
			var lia_7 = tag("a");
			$(lia_7).on("click", pageBind);
			lia_7.id = "pagNum_" + (pageNow + 1);
		}
		lia_7.href = "javascript:void(0);";
		lia_7.innerHTML = '→';
		ulli_7.appendChild(lia_7);
	};
	var treeHtml = function (tbody, data) {
		if (!data) return;
		var jsonItems = data.children;
		if (!jsonItems) return;
		$.each(jsonItems, function (jt) {
			var rowdata = jsonItems[jt];
			let jsonCol;
			if (rowdata && rowdata.json) jsonCol = JSON.parse(rowdata.json); else jsonCol = {};
			var tte = false;
			if (rowdata.children) {
				tte = true;
			}
			var tr = tag('tr');
			if (_conf.id) tr.setAttribute("data-" + "key", _getValueByName(rowdata, _conf.id));
			tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
			var sm = parseInt(_tee.substring(_tee.length - 1), 10) + 1;
			_tee = _tee.substring(0, _tee.length - 2);
			_tee = _tee + "-" + sm;
			tr.setAttribute("d-tree", _tee);
			tbody.appendChild(tr);
			var ntd_d = tr.insertCell(-1); hideNumber(ntd_d);
			var rowindex = tr.rowIndex;
			ntd_d.innerHTML = rowindex;
			var td_d = tr.insertCell(-1); hideCheckbox(td_d);

			if (checkItem(rowdata)) {
				var chkbox = renderChkbox(rowdata, "id", "parentId");
				td_d.appendChild(chkbox);
			}
			for (let oneColumn of _columns) {
				if (oneColumn.jsonColumn && rowdata && rowdata[oneColumn.jsonColumn]) jsonCol = JSON.parse(rowdata[oneColumn.jsonColumn]);
				var td_o = tr.insertCell(-1);
				var colkey = oneColumn.colkey;
				td_o.setAttribute("style", defaultItemCss(oneColumn));
				td_o.setAttribute("class", colkey);
				var dtee = _tee;
				rowdata.dtee = dtee;
				var data = gf.notEmpty(_getValueByName(rowdata, colkey));

				if (_confTreeGrid.tree) {
					var lt = _confTreeGrid.name.split(",");
					if (gf.inArray(lt, colkey)) {
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
						divspan.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
						td_o.appendChild(divspan);
					} else {
						td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
					}
				} else {
					td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
				}
			};
			if (tte) {
				//1-1
				_tee = _tee + "-0";
				_nb = parseInt(_nb, 10) + 20;
				treeHtml(tbody, rowdata);
			}

		});
		_tee = _tee.substring(0, _tee.length - 2);
		_nb = 20;
	};

	var treeSimpleHtml = function (tbody, jsonItems, obj) {
		var tte = false;
		_tee = _tee + "-0";
		$.each(jsonItems, function (jt) {
			var rowdata = jsonItems[jt];
			let jsonCol;
			if (rowdata && rowdata.json) jsonCol = JSON.parse(rowdata.json); else jsonCol = {};
			if (gf.notNull(rowdata)) {
				var jsb = _getValueByName(rowdata, _confTreeGrid.pid);
				var ob = _getValueByName(obj, _confTreeGrid.id);
				if (jsb == ob) {
					tte = true;
					var tr = tag('tr');
					if (_conf.id) tr.setAttribute("data-" + "key", _getValueByName(rowdata, _conf.id));
					tr.setAttribute("style", "line-height:" + _conf.tbodyHeight + ";");
					var sm = parseInt(_tee.substring(_tee.length - 1), 10) + 1;
					_tee = _tee.substring(0, _tee.length - 2);
					_tee = _tee + "-" + sm;
					tr.setAttribute("d-tree", _tee);
					tbody.appendChild(tr);
					var ntd_d = tr.insertCell(-1); hideNumber(ntd_d);
					var rowindex = tr.rowIndex;
					ntd_d.innerHTML = rowindex;
					var td_d = tr.insertCell(-1); hideCheckbox(td_d);

					if (checkItem(rowdata)) {
						var chkbox = renderChkbox(rowdata, _confTreeGrid.id, _confTreeGrid.id);
						td_d.appendChild(chkbox);
					}
					for (let oneColumn of _columns) {
						if (oneColumn.jsonColumn && rowdata && rowdata[oneColumn.jsonColumn]) jsonCol = JSON.parse(rowdata[oneColumn.jsonColumn]);
						var td_o = tr.insertCell(-1);
						var colkey = oneColumn.colkey;
						td_o.setAttribute("style", defaultItemCss(oneColumn));
						td_o.setAttribute("class", colkey);
						var dtee = _tee;
						rowdata.dtee = dtee;
						var data = gf.notEmpty(_getValueByName(rowdata, colkey));

						if (_confTreeGrid.tree) {
							var lt = _confTreeGrid.name.split(",");
							if (gf.inArray(lt, colkey)) {
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
								divspan.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
								td_o.appendChild(divspan);
							} else {
								td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
							}
						} else {
							td_o.innerHTML = renderFun(oneColumn, rowindex, data, rowdata, colkey, jsonCol);
						}
					}
				}
				var o = rowdata;
				delete jsonItems[jt];
				_nb = parseInt(_nb, 10) + 20;
				treeSimpleHtml(tbody, jsonItems, o)
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
	};;

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
	Function.prototype.bind = function () {
		var __method = this, args = [].concat(arguments), object = args.shift();
		return function () {
			return __method.apply(object, args.concat(arguments));
		};
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
	if (_conf.searchInInit) initGrid(_conf);

	if (_conf.refreshTime) {
		setInterval(() => {
			loadData();
		}, _conf.refreshTime);
	}

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