import { gf } from "/s/buss/g/j/g.f.js";

var defaultConf = {
	columns: [],
	pagId: 'paging', // 加载表格存放位置的ID
	width: '100%', // 表格高度
	height: '100%', // 表格宽度
	theadHeight: '28px', // 表格的thead高度
	tbodyHeight: '27px',// 表格body的每一行高度
	jsonUrl: '', // 访问后台地址
	isFixed: false,//是否固定表头
	usePage: true,// 是否分页
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
	// 树形式 {tree : false,//是否显示树 name : 'name'}//以哪个字段 的树形式
};

var fields = {
	colkey: null,
	name: null,
	width: 'auto',
	height: 'auto',
	align: 'center',
	hide: false,
	renderData: null
};

export var dataGrid = function (params) {
	var finalConf = $.extend(defaultConf, params);
	var l_tree = finalConf.treeGrid;
	var field = [];
	for (var i = 0; i < finalConf.columns.length; i++) {
		field.push(fields);
	}
	// var column = jQuery.extend(true, col, confs.columns);
	for (var i = 0; i < field.length; i++) {
		for (var p in field[i])
			if (field[i].hasOwnProperty(p) && (!finalConf.columns[i].hasOwnProperty(p)))
				finalConf.columns[i][p] = field[i][p];
	}
	var column = finalConf.columns;
	var init = function () {
		jsonRequest(createHtml);
	};
	var extend = function (o, n, override) {
		for (var p in n)
			if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override))
				o[p] = n[p];
	};

	var jsonRequest = function (callback) {
		$.ajax({
			type: 'POST',
			async: finalConf.async,
			data: finalConf.data,
			url: finalConf.jsonUrl,
			dataType: 'json',
			success: function (data) {
				callback(data);
			},
			error: function (msg) {
				console.log(msg);
				layer.msg("数据错误！请检查网络或权限配置！");
				json = '';
			}
		});
	};
	var divid = "";
	var tee = "1-0";
	var createHtml = function (jsonData) {
		if (jsonData == '') {
			return;
		}
		var id = finalConf.pagId;
		divid = typeof (id) == "string" ? document.getElementById(id) : id;
		if (divid == "" || divid == undefined || divid == null) {
			console.error("找不到 id= " + id + " 选择器！");
			;
			return;
		}

		divid.innerHTML = '';
		if (finalConf.isFixed) {//不固定表头
			cHeadTable(divid);
		}
		cBodyTable(divid, jsonData);
		if (finalConf.usePage) {// 是否分页
			fenyeDiv(divid, jsonData);
		}

		if (finalConf.callback) {
			setTimeout(() => {
				finalConf.callback();
			}, 500);
		}
		fixhead();
	};
	var cHeadTable = function (divid) {
		var table = document.createElement("table");// 1.创建一个table表
		table.id = "table_head";// 2.设置id属性
		table.className = "pp-list table table-striped table-bordered";
		table.setAttribute("style", "margin-bottom: -3px;");
		divid.appendChild(table);
		var thead = document.createElement('thead');
		table.appendChild(thead);
		var tr = document.createElement('tr');
		tr.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");
		thead.appendChild(tr);
		var cn = "";
		if (!finalConf.serNumber) {
			cn = "none";
		}
		var th = document.createElement('th');
		th.setAttribute("style", "text-align:center;width: 15px;vertical-align: middle;display: " + cn + ";");
		tr.appendChild(th);
		var cbk = "";
		if (!finalConf.checkbox) {
			cbk = "none";
		}
		var cth = document.createElement('th');
		cth.setAttribute("style", "text-align:center;width: 28px;vertical-align: middle;text-align:center;display: " + cbk + ";");
		var chkbox = document.createElement("INPUT");
		chkbox.type = "checkbox";
		chkbox.setAttribute("pagId", finalConf.pagId);
		chkbox.onclick = checkboxbind.bind();
		cth.appendChild(chkbox); // 第一列添加复选框
		tr.appendChild(cth);
		$.each(column, function (o) {
			var isHide;
			if (typeof (column[o].hide) == "function") {
				isHide = column[o].hide();
			} else {
				isHide = column[o].hide;
			}
			if (!isHide || isHide == undefined) {
				var th = document.createElement('th');
				th.setAttribute("style", "text-align:" + column[o].align + ";width: " + column[o].width + ";height:" + finalConf.theadHeight + ";vertical-align: middle;");
				th.innerHTML = column[o].name;
				tr.appendChild(th);
			}
		});
	};
	var cBodyTable = function (divid, jsonData) {
		var tdiv = document.createElement("div");
		var h = '';
		var xy = "hidden";
		if (finalConf.height == "100%") {
			if (!finalConf.isFixed) {// //不固定表头
				h = "auto";
			} else {
				xy = "auto";
				h = $(window).height() - $("#table_head").offset().top - $('#table_head').find('th:last').eq(0).height();
				if (finalConf.usePage) {// 是否分页
					h -= 55;
				}
				h += "px";
			}
		} else {
			h = finalConf.height;
		}
		tdiv.setAttribute("style", 'overflow-y: ' + xy + '; overflow-x: ' + xy + '; height: ' + h + '; border: 1px solid #DDDDDD;background: white;');
		tdiv.className = "t_table";
		divid.appendChild(tdiv);
		var table2 = document.createElement("table");// 1.创建一个table表
		table2.id = "mytable";
		table2.className = "pp-list table table-striped table-bordered";
		table2.setAttribute("style", "margin-bottom: -3px;");

		tdiv.appendChild(table2);
		var tbody = document.createElement("tbody");// 1.创建一个table表
		table2.appendChild(tbody);
		var json = _getValueByName(jsonData, finalConf.records);

		if (!finalConf.isFixed) {//不固定表头
			var tr = document.createElement('tr');
			tr.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");
			tbody.appendChild(tr);
			var cn = "";
			if (!finalConf.serNumber) {
				cn = "none";
			}
			var th = document.createElement('th');
			th.setAttribute("style", "text-align:center;width: 15px;vertical-align: middle;display: " + cn + ";");
			tr.appendChild(th);
			var cbk = "";
			if (!finalConf.checkbox) {
				cbk = "none";
			}
			var cth = document.createElement('th');
			cth.setAttribute("style", "text-align:center;width: 28px;vertical-align: middle;text-align:center;display: " + cbk + ";");
			var chkbox = document.createElement("INPUT");
			chkbox.type = "checkbox";
			chkbox.setAttribute("pagId", finalConf.pagId);
			chkbox.onclick = checkboxbind.bind();
			cth.appendChild(chkbox); // 第一列添加复选框
			tr.appendChild(cth);
			$.each(column, function (o) {
				var isHide;
				if (typeof (column[o].hide) == "function") {
					isHide = column[o].hide();
				} else {
					isHide = column[o].hide;
				}
				if (!isHide || isHide == undefined) {
					var th = document.createElement('th');
					th.setAttribute("style", "text-align:" + column[o].align + ";width: " + column[o].width + ";height:" + finalConf.theadHeight + ";vertical-align: middle;");
					th.innerHTML = column[o].name;
					tr.appendChild(th);
				}
			});
		}

		$.each(json, function (d) {
			if (gf.notNull(json[d])) {
				var tr = document.createElement('tr');
				tr.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");
				var sm = parseInt(tee.substring(tee.length - 1), 10) + 1;
				tee = tee.substring(0, tee.length - 2);
				tee = tee + "-" + sm;
				tr.setAttribute("d-tree", tee);
				tbody.appendChild(tr);
				var cn = "";
				if (!finalConf.serNumber) {
					cn = "none";
				}
				var ntd_d = tr.insertCell(-1);
				ntd_d.setAttribute("style", "text-align:center;width: 15px;display: " + cn + ";");
				var rowindex = tr.rowIndex;

				ntd_d.innerHTML = rowindex;
				var cbk = "";
				if (!finalConf.checkbox) {
					cbk = "none";
				}
				var td_d = tr.insertCell(-1);
				td_d.setAttribute("style", "text-align:center;width: 28px;display: " + cbk + ";");
				var chkbox = document.createElement("INPUT");
				chkbox.type = "checkbox";
				// ******** 树的上下移动需要
				for (let v in json[d]) { if (json[d][v]) chkbox.setAttribute("data-" + v, json[d][v]); };
				chkbox.setAttribute("data-" + "cid", _getValueByName(json[d], l_tree.id));
				chkbox.setAttribute("pid", _getValueByName(json[d], l_tree.pid));
				// ******** 树的上下移动需要
				chkbox.setAttribute("_l_key", "checkbox");
				chkbox.value = _getValueByName(json[d], finalConf.checkValue);
				chkbox.onclick = highlight.bind(this);
				td_d.appendChild(chkbox); // 第一列添加复选框
				$.each(column, function (o) {
					var isHide;
					if (typeof (column[o].hide) == "function") {
						isHide = column[o].hide();
					} else {
						isHide = column[o].hide;
					}
					if (!isHide || isHide == undefined) {
						var td_o = tr.insertCell(-1);
						td_o.setAttribute("style", "text-align:" + column[o].align + ";width: " + column[o].width + ";vertical-align: middle;");

						var rowdata = json[d];
						var dtee = tee;
						rowdata.dtee = dtee;
						var clm = column[o].colkey;
						var data = gf.notEmpty(_getValueByName(rowdata, clm));

						if (l_tree.tree) {
							var lt = l_tree.name.split(",");
							if (gf.inArray(lt, clm)) {
								var divtree = document.createElement("div");
								divtree.className = "ly_tree";
								divtree.setAttribute("style", "padding-top:5px;margin-left:5px;text-align:" + column[o].align + ";");
								var img = document.createElement('img');
								img.src = "/s/i/tree/nolines_minus.gif";
								img.onclick = datatree.bind();
								divtree.appendChild(img);
								td_o.appendChild(divtree);
								var divspan = document.createElement("span");
								divspan.className = "l_test";
								divspan.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");

								if (column[o].renderData) {
									divspan.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
								} else {
									divspan.innerHTML = data;
								}
								td_o.appendChild(divspan);
							} else {
								if (column[o].renderData) {
									td_o.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
								} else {
									td_o.innerHTML = data;
								}
							}
							;
						} else {
							if (column[o].renderData) {
								td_o.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
							} else {
								td_o.innerHTML = data;
							}
						}
						;
					}
				});
				if (l_tree.tree) {
					if (l_tree.type == 1) {
						tee = tee + "-0";
						treeHtml(tbody, json[d]);// 树形式
					} else {
						var obj = json[d];
						delete json[d];
						nb = 20;
						treeSimpleHtml(tbody, json, obj);
					}
				}
			}
		});
	};
	var fenyeDiv = function (divid, jsonData) {
		var totalRecords = _getValueByName(jsonData, finalConf.totalRecords);
		var totalPages = _getValueByName(jsonData, finalConf.totalPages);
		var pageNow = _getValueByName(jsonData, finalConf.pageNow);
		var bdiv = document.createElement("div");
		bdiv.setAttribute("style", "vertical-align: middle;");

		bdiv.className = "span12 center";
		divid.appendChild(bdiv);
		var btable = document.createElement("table");
		btable.width = "100%";
		bdiv.appendChild(btable);
		var btr = document.createElement("tr");
		btable.appendChild(btr);
		var btd_1 = document.createElement("td");
		btd_1.style.textAlign = "left";
		btr.appendChild(btd_1);
		var btddiv = document.createElement("div");
		btddiv.className = "pagination";
		btd_1.appendChild(btddiv);
		var divul = document.createElement("ul");
		btddiv.appendChild(divul);
		var ulli = document.createElement("li");
		ulli.className = "prev";
		divul.appendChild(ulli);
		var lia = document.createElement("a");
		lia.href = "javascript:void(0);";
		ulli.appendChild(lia);
		lia.innerHTML = '总&nbsp;' + totalRecords + '&nbsp;条&nbsp;&nbsp;每页&nbsp;' + finalConf.pageSize + '&nbsp;条&nbsp;&nbsp;共&nbsp;' + totalPages + '&nbsp;页';

		var btd_1 = document.createElement("td");
		btd_1.style.textAlign = "right";
		btr.appendChild(btd_1);
		var divul_2 = document.createElement("ul");
		divul_2.className = "dataTables_paginate paging_bootstrap pagination";
		btd_1.appendChild(divul_2);

		if (pageNow > 1) {
			var ulli_2 = document.createElement("li");
			divul_2.appendChild(ulli_2);
			var lia_2 = document.createElement("a");
			lia_2.onclick = pageBind.bind();
			lia_2.id = "pagNum_" + (pageNow - 1);
			lia_2.href = "javascript:void(0);";
			lia_2.innerHTML = '← prev';
			ulli_2.appendChild(lia_2);
		} else {
			var ulli_2 = document.createElement("li");
			ulli_2.className = "prev disabled";
			divul_2.appendChild(ulli_2);
			var lia_2 = document.createElement("a");
			lia_2.href = "javascript:void(0);";
			lia_2.innerHTML = '← prev';
			ulli_2.appendChild(lia_2);
		}
		var pg = pagesIndex(finalConf.pagecode, pageNow, totalPages);
		var startpage = pg.start;
		var endpage = pg.end;
		if (startpage != 1) {
			var ulli_3 = document.createElement("li");
			divul_2.appendChild(ulli_3);
			var lia_3 = document.createElement("a");
			lia_3.onclick = pageBind.bind();
			lia_3.href = "javascript:void(0);";
			lia_3.id = "pagNum_1";
			lia_3.innerHTML = '1...';
			ulli_3.appendChild(lia_3);
		}
		/*if (endpage - startpage <= 0) {
			var ulli_4 = document.createElement("li");
			ulli_4.className = "active";
			divul_2.appendChild(ulli_4);
			var lia_4 = document.createElement("a");
			lia_4.href = "javascript:void(0);";
			lia_4.innerHTML = '1';
			ulli_4.appendChild(lia_4);
		}*/
		for (var i = startpage; i <= endpage; i++) {
			if (i == pageNow) {
				var ulli_5 = document.createElement("li");
				ulli_5.className = "active";
				divul_2.appendChild(ulli_5);
				var lia_5 = document.createElement("a");
				lia_5.href = "javascript:void(0);";
				lia_5.innerHTML = i;
				ulli_5.appendChild(lia_5);
			} else {
				var ulli_5 = document.createElement("li");
				divul_2.appendChild(ulli_5);
				var lia_5 = document.createElement("a");
				lia_5.onclick = pageBind.bind();
				lia_5.href = "javascript:void(0);";
				lia_5.id = "pagNum_" + i;
				lia_5.innerHTML = i;
				ulli_5.appendChild(lia_5);
			}
			;

		}
		if (endpage != totalPages) {
			var ulli_6 = document.createElement("li");
			divul_2.appendChild(ulli_6);
			var lia_6 = document.createElement("a");
			lia_6.onclick = pageBind.bind();
			lia_6.href = "javascript:void(0);";
			lia_6.id = "pagNum_" + totalPages;
			lia_6.innerHTML = '...' + totalPages;
			ulli_6.appendChild(lia_6);
		}
		if (pageNow >= totalPages) {
			var ulli_7 = document.createElement("li");
			ulli_7.className = "prev disabled";
			divul_2.appendChild(ulli_7);
			var lia_7 = document.createElement("a");
			lia_7.href = "javascript:void(0);";
			lia_7.innerHTML = 'next → ';
			ulli_7.appendChild(lia_7);
		} else {
			var ulli_7 = document.createElement("li");
			ulli_7.className = "next";
			divul_2.appendChild(ulli_7);
			var lia_7 = document.createElement("a");
			lia_7.onclick = pageBind.bind();
			lia_7.href = "javascript:void(0);";
			lia_7.id = "pagNum_" + (pageNow + 1);
			lia_7.innerHTML = 'next → ';
			ulli_7.appendChild(lia_7);
		}
		;
	};
	var nb = '20';
	var treeHtml = function (tbody, data) {
		if (data == undefined)
			return;
		var jsonTree = data.children;
		if (jsonTree == undefined || jsonTree == '' || jsonTree == null) {
		} else {
			var tte = false;
			$.each(jsonTree, function (jt) {

				var tte = false;
				if (jsonTree[jt].children != undefined && jsonTree[jt].children != '' && jsonTree[jt].children != null) {
					tte = true;
				}
				var tr = document.createElement('tr');
				tr.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");
				var sm = parseInt(tee.substring(tee.length - 1), 10) + 1;
				tee = tee.substring(0, tee.length - 2);
				tee = tee + "-" + sm;
				tr.setAttribute("d-tree", tee);
				tbody.appendChild(tr);
				var cn = "";
				if (!finalConf.serNumber) {
					cn = "none";
				}
				var ntd_d = tr.insertCell(-1);
				ntd_d.setAttribute("style", "text-align:center;width: 15px;display: " + cn + ";");
				var rowindex = tr.rowIndex;
				ntd_d.innerHTML = rowindex;
				var cbk = "";
				if (!finalConf.checkbox) {
					cbk = "none";
				}
				var td_d = tr.insertCell(-1);
				td_d.setAttribute("style", "text-align:center;width: 28px;display: " + cbk + ";");
				var chkbox = document.createElement("INPUT");
				chkbox.type = "checkbox";
				// ******** 树的上下移动需要
				for (let v in jsonTree[jt]) { if (jsonTree[jt][v]) chkbox.setAttribute("data-" + v, jsonTree[jt][v]); };
				chkbox.setAttribute("data-" + "cid", _getValueByName(jsonTree[jt], "id"));
				chkbox.setAttribute("pid", _getValueByName(jsonTree[jt], "parentId"));
				// ******** 树的上下移动需要
				chkbox.setAttribute("_l_key", "checkbox");
				chkbox.value = _getValueByName(jsonTree[jt], finalConf.checkValue);
				chkbox.onclick = highlight.bind(this);
				td_d.appendChild(chkbox); // 第一列添加复选框
				$.each(column, function (o) {
					var isHide;
					if (typeof (column[o].hide) == "function") {
						isHide = column[o].hide();
					} else {
						isHide = column[o].hide;
					}
					if (!isHide || isHide == undefined) {
						var td_o = tr.insertCell(-1);
						td_o.setAttribute("style", "text-align:" + column[o].align + ";width: " + column[o].width + ";vertical-align: middle;");
						var rowdata = jsonTree[jt];
						var dtee = tee;
						rowdata.dtee = dtee;
						var clm = column[o].colkey;
						var data = gf.notEmpty(_getValueByName(rowdata, clm));

						if (l_tree.tree) {
							var lt = l_tree.name.split(",");
							if (gf.inArray(lt, column[o].colkey)) {
								var divtree = document.createElement("div");
								divtree.className = "ly_tree";
								divtree.setAttribute("style", "padding-top:5px;margin-left:5px;text-align:" + column[o].align + ";margin-left: " + nb + "px;");
								if (tte) {
									var img = document.createElement('img');
									img.src = "/s/i/tree/nolines_minus.gif";
									img.onclick = datatree.bind();
									divtree.appendChild(img);
								}
								td_o.appendChild(divtree);
								var divspan = document.createElement("span");
								divspan.className = "l_test";
								divspan.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");
								if (column[o].renderData) {
									divspan.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
								} else {
									divspan.innerHTML = data;
								}
								td_o.appendChild(divspan);
							} else {
								if (column[o].renderData) {
									td_o.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
								} else {
									td_o.innerHTML = data;
								}
							}
							;
						} else {
							if (column[o].renderData) {
								td_o.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
							} else {
								td_o.innerHTML = data;
							}
						}
						;
					}
				});
				if (tte) {
					//1-1
					tee = tee + "-0";
					nb = parseInt(nb, 10) + 20;
					treeHtml(tbody, jsonTree[jt]);
				}

			});
			tee = tee.substring(0, tee.length - 2);
			nb = 20;
		}
	};
	var img;
	var treeSimpleHtml = function (tbody, jsonTree, obj) {
		var tte = false;
		tee = tee + "-0"
		$.each(jsonTree, function (jt) {
			if (gf.notNull(jsonTree[jt])) {
				var jsb = _getValueByName(jsonTree[jt], l_tree.pid);
				var ob = _getValueByName(obj, l_tree.id);
				if (jsb == ob) {
					tte = true;
					var tr = document.createElement('tr');
					tr.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");
					var sm = parseInt(tee.substring(tee.length - 1), 10) + 1;
					tee = tee.substring(0, tee.length - 2);
					tee = tee + "-" + sm;
					tr.setAttribute("d-tree", tee);
					tbody.appendChild(tr);
					var cn = "";
					if (!finalConf.serNumber) {
						cn = "none";
					}
					var ntd_d = tr.insertCell(-1);
					ntd_d.setAttribute("style", "text-align:center;width: 15px;display: " + cn + ";");
					var rowindex = tr.rowIndex;
					ntd_d.innerHTML = rowindex;
					var cbk = "";
					if (!finalConf.checkbox) {
						cbk = "none";
					}
					var td_d = tr.insertCell(-1);
					td_d.setAttribute("style", "text-align:center;width: 28px;display: " + cbk + ";");
					var chkbox = document.createElement("INPUT");
					chkbox.type = "checkbox";
					// ******** 树的上下移动需要
					for (let v in json[d]) { if (json[d][v]) chkbox.setAttribute("data-" + v, json[d][v]); };
					chkbox.setAttribute("data-" + "cid", _getValueByName(jsonTree[jt], l_tree.id));
					chkbox.setAttribute("pid", _getValueByName(jsonTree[jt], l_tree.pid));
					// ******** 树的上下移动需要
					chkbox.setAttribute("_l_key", "checkbox");
					chkbox.value = _getValueByName(jsonTree[jt], finalConf.checkValue);
					chkbox.onclick = highlight.bind(this);
					td_d.appendChild(chkbox); // 第一列添加复选框
					$.each(column, function (o) {
						var isHide;
						if (typeof (column[o].hide) == "function") {
							isHide = column[o].hide();
						} else {
							isHide = column[o].hide;
						}
						if (!isHide || isHide == undefined) {
							var td_o = tr.insertCell(-1);
							td_o.setAttribute("style", "text-align:" + column[o].align + ";width: " + column[o].width + ";vertical-align: middle;");
							var rowdata = jsonTree[jt];
							var dtee = tee;
							rowdata.dtee = dtee;
							var clm = column[o].colkey;
							var data = gf.notEmpty(_getValueByName(rowdata, clm));

							if (l_tree.tree) {
								var lt = l_tree.name.split(",");
								if (gf.inArray(lt, column[o].colkey)) {
									var divtree = document.createElement("div");
									divtree.className = "ly_tree";
									divtree.setAttribute("style", "padding-top:5px;margin-left:5px;text-align:" + column[o].align + ";margin-left: " + nb + "px;");
									img = document.createElement('img');
									img.src = "/s/i/tree/nolines_minus.gif";
									img.onclick = datatree.bind();
									divtree.appendChild(img);
									td_o.appendChild(divtree);
									var divspan = document.createElement("span");
									divspan.className = "l_test";
									divspan.setAttribute("style", "line-height:" + finalConf.tbodyHeight + ";");
									if (column[o].renderData) {
										divspan.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
									} else {
										divspan.innerHTML = data;
									}
									td_o.appendChild(divspan);
								} else {
									if (column[o].renderData) {
										td_o.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
									} else {
										td_o.innerHTML = data;
									}
								}
								;
							} else {
								if (column[o].renderData) {
									td_o.innerHTML = column[o].renderData(rowindex, data, rowdata, clm);
								} else {
									td_o.innerHTML = data;
								}
							}
							;
						}
					});
					var o = jsonTree[jt];
					delete jsonTree[jt];
					nb = parseInt(nb, 10) + 20;
					treeSimpleHtml(tbody, jsonTree, o)
				}
			}
		});
		if (!tte) {
			if (gf.notNull(img)) {
				img.remove(img.selectedIndex);
			}
		}

		tee = tee.substring(0, tee.length - 2);
		nb = parseInt(nb, 10) - 20;;
	};
	Array.prototype.ly_each = function (f) { // 数组的遍历
		for (var i = 0; i < this.length; i++)
			f(this[i], i, this);
	};
	var dataGridUp = function (jsonUrl) { // 上移所选行

		var upOne = function (tr) { // 上移1行
			if (tr.rowIndex > 0) {
				var ctr = divid.children[0].children.mytable.rows[tr.rowIndex - 1];
				swapTr(tr, ctr);
				getChkBox(tr).checked = true;
			}
		};
		var arr = $A(divid.children[0].children.mytable.rows).reverse(); // 反选
		if (arr.length > 0 && getChkBox(arr[arr.length - 1]).checked) {
			for (var i = arr.length - 1; i >= 0; i--) {
				if (getChkBox(arr[i]).checked) {
					arr.pop();
				} else {
					break;
				}
			}
		}
		;
		arr.reverse().ly_each(function (tr) {
			var ck = getChkBox(tr);
			if (ck.checked) {
				var cd = ck.getAttribute("data-" + "cid");
				$("input:checkbox[pid='" + cd + "']").attr('checked', 'true');// 让子类选中
				upOne(tr);
			}
		});
		var row = grid.rowline();// 数组对象默认是{"rowNum":row,"rowId":cbox};
		var data = [];
		$.each(row, function (i) {
			data.push(finalConf.checkValue + "[" + i + "]=" + row[i].rowId);
			data.push("rowId[" + i + "]=" + row[i].rowNum);
		});
		$.ajax({
			type: 'POST',
			data: data.join("&"),
			url: jsonUrl,
			dataType: 'json',
		});
	};
	var dataGridDown = function (jsonUrl) { // 下移所选行

		var downOne = function (tr) {
			if (tr.rowIndex < divid.children[0].children.mytable.rows.length - 1) {
				swapTr(tr, divid.children[0].children.mytable.rows[tr.rowIndex + 1]);
				getChkBox(tr).checked = true;
			}
		};
		var arr = $A(divid.children[0].children.mytable.rows);
		if (arr.length > 0 && getChkBox(arr[arr.length - 1]).checked) {
			for (var i = arr.length - 1; i >= 0; i--) {
				if (getChkBox(arr[i]).checked) {
					arr.pop();
				} else {
					break;
				}
			}
		}
		arr.ly_each(function (tr) {
			var ck = getChkBox(tr);
			if (ck.checked) {
				var cd = ck.getAttribute("data-" + "cid");
				$("input:checkbox[pid='" + cd + "']").attr('checked', 'true');// 让子类选中
			}
		});
		arr.reverse().ly_each(function (tr) {
			if (getChkBox(tr).checked)
				downOne(tr);
		});
		var row = grid.rowline();// 数组对象默认是{"rowNum":row,"rowId":cbox};
		var data = [];
		$.each(row, function (i) {
			if (!isNaN(row[i].rowId)) {
				data.push(finalConf.checkValue + "[" + i + "]=" + row[i].rowId);
				data.push("rowId[" + i + "]=" + row[i].rowNum);
			} else {
				data.push(finalConf.checkValue + "[" + i + "]=" + i);
				data.push("rowId[" + i + "]=" + row[i].rowNum);
			}
		});
		$.ajax({
			type: 'POST',
			data: data.join("&"),
			url: jsonUrl,
			dataType: 'json',
		});
	};
	var highlight = function () { // 设置行的背景色
		var evt = arguments[0] || window.event;
		var chkbox = evt.srcElement || evt.target;
		var tr = chkbox.parentNode.parentNode;
		chkbox.checked ? setBgColor(tr) : restoreBgColor(tr);
	};
	var selectRow = function (pagId) {
		if (!pagId) { pagId = finalConf.pagId; }
		var arr = [];
		$("#" + pagId + " input[_l_key='checkbox']:checkbox:checked").each(function () {
			arr.push($(this).val());
		});
		return arr;
	};
	var checkboxbind = function () { // 全选/反选
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

	var pageBind = function () { // 页数
		var evt = arguments[0] || window.event;
		var a = evt.srcElement || evt.target;
		var page = a.id.split('_')[1];
		finalConf.data = $.extend(finalConf.data, {
			pageNow: page
		});
		init();
	};
	var datatree = function () { // 页数
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

	var swapTr = function (tr1, tr2) { // 交换tr1和tr2的位置
		var target = (tr1.rowIndex < tr2.rowIndex) ? tr2.nextSibling : tr2;
		var tBody = tr1.parentNode;
		tBody.replaceChild(tr2, tr1);
		tBody.insertBefore(tr1, target);
	};
	var getChkBox = function (tr) { // 从tr得到 checkbox对象
		return tr.cells[1].firstChild;

	};
	var restoreBgColor = function (tr) {// 不勾选设置背景色
		for (var i = 0; i < tr.childNodes.length; i++) {
			tr.childNodes[i].style.backgroundColor = "";
		}
	};
	var setBgColor = function (tr) { // 设置背景色
		for (var i = 0; i < tr.childNodes.length; i++) {
			tr.childNodes[i].style.backgroundColor = "#D4D4D4";
		}
	};
	function $A(arrayLike) { // 数值的填充
		for (var i = 0, ret = []; i < arrayLike.length; i++)
			ret.push(arrayLike[i]);
		return ret;
	}
	;
	Function.prototype.bind = function () { // 数据的绑定
		var __method = this, args = $A(arguments), object = args.shift();
		return function () {
			return __method.apply(object, args.concat($A(arguments)));
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

		var arr = $A(divid.children[0].children.mytable.rows);
		for (var i = arr.length - 1; i > 0; i--) {
			var cbox = getChkBox(arr[i]).value;
			var row = arr[i].rowIndex;
			var sort = {};
			sort.rowNum = row;
			sort.rowId = cbox;
			cb.push(sort);
		}
		;
		return cb.reverse();
	};
	/**
	 * 这是一个分页工具 主要用于显示页码,得到返回来的 开始页码和结束页码 pagecode 要获得记录的开始索引 即 开始页码 pageNow
	 * 当前页 pageCount 总页数
	 * 
	 */
	var pagesIndex = function (pagecode, pageNow, pageCount) {
		/*
		 * var pagecode = _getValueByName(jsonData,conf.pagecode) ==
		 * undefined ? conf.pagecode
		 * :_getValueByName(jsonData,conf.pagecode); var sten =
		 * pagesIndex(pagecode, pageNow,totalPages); var
		 * startpage=sten.start; var endpage=sten.end;
		 */
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
		}
		;
		var se = {
			start: startpage,
			end: endpage
		};
		return se;
	};
	/**
	 * 重新加载
	 */
	var loadData = function () {
		$.extend(finalConf, params);
		init();
	};
	/**
	 * 查询时，设置参数查询
	 */
	var setOptions = function (params) {
		$.extend(finalConf, params);
		init();
	};
	/**
	 * 获取选中的值
	 */
	var getSelectedCheckbox = function (key) {
		var arr = [];
		$(`#${finalConf.pagId} input[_l_key='checkbox']:checkbox:checked`).each(function () {
			if (key) arr.push($(this).data(key));
			else arr.push($(this).val());
		});
		return arr;
	};
	var getSelectedCheckboxObj = function () {
		var arr = [];
		$(`#${finalConf.pagId} input[_l_key='checkbox']:checkbox:checked`).each(function () {
			arr.push($(this).data());
		});
		return arr;
	};
	init();
	return {
		setOptions: setOptions,
		loadData: loadData,
		getSelectedCheckboxObj: getSelectedCheckboxObj,
		getSelectedCheckbox: getSelectedCheckbox,
		selectRow: selectRow,// 选中行事件
		dataGridUp: dataGridUp,
		dataGridDown: dataGridDown,
		rowline: rowline
	};
};

var fixhead = function () {
	for (var i = 0; i <= $('.t_table .pp-list tr:last').find('td:last').index(); i++) {
		$('.pp-list th').eq(i).css('width', ($('.t_table .pp-list tr:last').find('td').eq(i).width()) + 2);
	}
};