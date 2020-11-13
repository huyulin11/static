import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { initConfList } from "/s/buss/g/j/template.conf.table.js";

export let init = function () {
	initConfList("task_site_location", {
		checkbox: false,
		jsonColumn: 'value',
		columns: [{
			colkey: "key",
			name: "id",
		}, {
			colkey: "value",
			name: "location",
			renderData: function (rowindex, data, rowdata, column) {
				let col;
				try {
					let json = JSON.parse(data);
					if (json instanceof Array || json instanceof Object) {
						col = {
							name: "键值", key: "key", notnull: true, type: "textarea",
						};
					}
				} catch (error) {
				}
				if (rowdata.key.indexOf("PASSWORD") >= 0) {
					col = {
						name: "键值", key: "key", notnull: true, type: "password",
					};
				}
				if (!col) {
					col = {
						name: "键值", key: "key", notnull: true, type: "input",
					};
				}
				let json = { key: rowdata.key };
				let btnStr = `<button type="button" class="edit btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
				let html = getInput(col, { value: data, width: '50%', });
				$(html).append(btnStr);
				return html;
			}
		}, {
			colkey: "updatetime",
			name: "更新时间",
			renderData: function (rowindex, data, rowdata, column) {
				var standardTime = new Date(data).toLocaleString();
				return standardTime;
			},
		}],
		fenyeInTail: true,
	});
	$("#paging").delegate(".edit", "click", function (e) {
		let key = $(this).data("key");
		let targetObj = $(this).parents("td").find("input");
		let target = $(targetObj).val();
		if (!target) {
			targetObj = $(this).parents("td").find("textarea");
			target = $(targetObj).val();
		}
		let targetShow = target;
		console.log($(this).attr("type"));
		if ($(targetObj).attr("type") == "password") {
			targetShow = "***";
		}
		if (window.confirm(`是否要改变${key}的值为${targetShow}？`)) {
			gf.doAjax({
				url: `/app/conf/set.shtml`, type: "POST",
				data: { table: "TASK_SITE_LOCATION", key: key, value: target }
			});
		}
	});
}