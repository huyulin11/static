import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { dataGrid } from "/s/j/kf.grid.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { initConfList } from "/s/buss/g/j/template.conf.table.js";

export let init = function () {
	initConfList("task_site_location", {
		checkbox: true,
		jsonColumn: 'value',
		columns: [{
			colkey: "key",
			name: "ID",
		}, {
			colkey: "value",
			name: "x",
			renderData: function (rowindex, data, rowdata, column) {
				let col = {
					name: "键值", key: "key", notnull: true, type: "input"
				};
				let xPos = JSON.parse(data).x;
				let html = getInput(col, { value: xPos, width: '50%', class: "x" });
				return html;
			}
		}, {
			colkey: "value",
			name: "y",
			renderData: function (rowindex, data, rowdata, column) {
				let col = {
					name: "键值", key: "key", notnull: true, type: "input"
				};
				let yPos = JSON.parse(data).y;
				let html = getInput(col, { value: yPos, width: '50%', class: "y" });
				return html;
			}
		}, {
			colkey: "updatetime",
			name: "更新时间",
			renderData: function (rowindex, data, rowdata, column) {
				var standardTime = new Date(data).toLocaleString();
				return standardTime;
			},
		}, {
			colkey: "value",
			name: "",
			renderData: function (rowindex, data, rowdata, column) {
				let json = { key: rowdata.key };
				let btnStr = `<button type="button" class="edit btn btn-primary marR10" ${gf.jsonToLabelData(json)}>保存</button>`;
				return btnStr;
			},
		}],
		fenyeInTail: true,
	},`<label>
	<span>ID:</span>
	<input id="id" name="key">
</label>`
);
	$("#paging").delegate(".edit", "click", function (e) {
		let id = $(this).data("key");
		let x = $(this).parents("tr").find("input.x").val();
		let y = $(this).parents("tr").find("input.y").val();
		let targetObj = { id, x, y };
		let target = JSON.stringify(targetObj);
		if (!x || !y) {
			return layer.msg('x,y的值不能为空，请重新输入！！');
		}
		let targetShow = target;
		console.log($(this).attr("type"));
		if ($(targetObj).attr("type") == "password") {
			targetShow = "***";
		}
		if (window.confirm(`是否要改变${id}的值为${targetShow}？`)) {
			gf.doAjax({
				url: `/app/conf/set.shtml`, type: "POST",
				data: { table: "TASK_SITE_LOCATION", key: id, value: target }
			});
		}
	});
}
