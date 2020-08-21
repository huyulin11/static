import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";

let params = {
	pagId: 'paging',
	jsonColumn: 'value',
	checkValue: "key",
	columns: [{
		colkey: "key",
		name: "TU",
	}, {
		colkey: "name",
		name: "产线",
	}, {
		colkey: "sequence",
		name: "优先级",
		renderData: function (rowindex, data, rowdata, column, json) {
			let sequence = json.sequence;
			if (!sequence) {
				sequence = 1;
			}
			return sequence;
		}
	}, {
		colkey: "detailsequence",
		name: "顺序",
		renderData: function (rowindex, data, rowdata, column, json) {
			let detailsequence = json.detailsequence;
			if (!detailsequence)
				detailsequence = 0;
			return detailsequence;
		}
	}, {
		colkey: "detailsequence",
		name: "顺序",
		hide: true,
		renderData: function (rowindex, data, rowdata, column, json) {
			let col = {
				name: "顺序", key: "detailsequence", notnull: true, type: "input",
			};
			let json2 = { id: rowdata.key };
			let btnStr = `<button type="button" class="edit btn btn-primary marR10" ${gf.jsonToLabelData(json2)}>保存</button>`;
			let html = getInput(col, { value: json.detailsequence, width: '50%', });
			return $(html).append(btnStr);
		}
	}, {
		colkey: "company",
		name: "订单号",
		hide: true,
	}, {
		colkey: "value",
		name: "状态",
		renderData: function (rowindex, data, rowdata, column, json) {
			let status = json.status;
			if (status) {
				return gv.get("ACS_STATUS", status) + gf.rowDisplay(rowdata, json);
			}
			return "--空--";
		}
	}, {
		colkey: "value",
		name: "货物",
		renderData: function (rowindex, data, rowdata, column, json) {
			let items = json.items;
			let i = 0;
			if (items) {
				let itemArr = [];
				for (let item of items) {
					itemArr.push(item.su);
					i++;
					if (i == 3) {
						itemArr.push('<br/>');
						i = 0;
					}
				}
				return itemArr.join(',');
			}
			return "--空--";
		}
	}],
	jsonUrl: '/app/conf/findByPage.shtml',
	checkbox: true,
	searchInInit: false,
	serNumber: true
}

export var init = function () {
	params = Object.assign(params, {
		data: { "TABLE_KEY": "COMBINED_TU_INFO" }
	});

	window.datagrid = dataGrid(params);
	doSearch();
}

$("#paging").delegate(".edit", "click", function (e) {
	let id = $(this).data("id");
	let target = $(this).parent("td").find("input").val();
	if (!target || isNaN(target) || target < 0 || target >= 100) {
		gf.layerMsg("提交内容应为大于0小于100的数值！");
		return;
	}
	if (window.confirm(`是否要将该数据的顺序值改为${target}？`)) {
		gf.doAjax({
			url: `/shipment/util/editSeqDetail.shtml`,
			data: { id: id, sequence: target }
		});
	}
});

$("#searchForm").delegate("#search", "click", function () {
	doSearch();
});

let doSearch = function () {
	var searchParams = $("#searchForm").serializeObject();
	let product = $("#product").val();
	if (!product) {
		// gf.layerMsg("需指定查询数据的产线名称！");
		// return;
	}
	// localStorage.currentSearchProduct = product;
	window.datagrid.setOptions({
		data: Object.assign(searchParams, { "TABLE_KEY": "COMBINED_TU_INFO" })
	});
}

let tempBtns = [{
	id: "refresh", name: "刷新", class: "btn-info",
	bind: function () {
		window.datagrid.loadData();
	}
}, {
	url: `/app/conf/bjjkhuirui/deleteBySure.shtml`,
	id: "deleteSure", name: "确定撤销", class: "btn-danger",
	bind: function () {
		var cbox = gf.checkOnlyOne("key");
		if (!cbox) { return; }
		let that = this;
		let work = function (index) {
			gf.ajax(that.url, { key: cbox, TABLE_KEY: "COMBINED_TU_INFO" }, "json");
		}
		layer.confirm(`是否确定撤销托盘${cbox}？`, function (index) { work(index); });
	},
}, {
	id: "back", name: "返回", class: "btn-info",
	bind: function () {
		window.history.back();
	}
}];
if (localStorage.isTest) {
	tempBtns = tempBtns.concat(
		[{
			url: `/shipment/main/startPcs.shtml`,
			id: "startPcs", name: "上PCS", class: "btn-primary",
			bind: function () {
				var cbox = gf.checkOnlyOne("key");
				if (!cbox) { return; }
				gf.ajax(this.url, { tu: cbox }, "json");
			},
		}, {
			url: `/shipment/main/overPcs.shtml`,
			id: "overPcs", name: "出PCS", class: "btn-primary",
			bind: function () {
				var cbox = gf.checkOnlyOne("key");
				if (!cbox) { return; }
				gf.ajax(this.url, { tu: cbox }, "json");
			},
		}, {
			url: `/shipment/main/overAll.shtml`,
			id: "overAll", name: "结束运输", class: "btn-primary",
			bind: function () {
				var cbox = gf.checkOnlyOne("key");
				if (!cbox) { return; }
				gf.ajax(this.url, { tu: cbox }, "json");
			}
		}]);
}

let searchHtml = '<a class="btn btn-default" id="search">查询</a>';
$("#searchForm").find("div.search-group").html(
	`<label>
		<span>产线:</span>
		<input id="product" name="product" value='${localStorage.currentSearchProduct ? localStorage.currentSearchProduct : ""}'>
	</label>`
);
$("#searchForm").find("div.search-group").append(searchHtml).parents("form").show();

gf.bindBtns("div.doc-buttons", tempBtns);