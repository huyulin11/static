import { gfbtn } from "/s/buss/g/j/g.f.btn.js";

export let tempBtns = [{
	id: "add", name: "新增", class: "btn-info",
	bind: function () {
		add(this);
	}
}, {
	url: `/app/conf/del.shtml`,
	id: "del", name: "删除", class: "btn-danger",
	bind: function () {
		del(this);
	},
},];
let del = (that) => {
	var cbox = gf.checkOnlyOne("key");
	if (!cbox) { return; }
	layer.confirm(`是否${that.name}${cbox}？`, function (index) {
		gf.doAjax({
			url: that.url, type: "POST",
			data: { table: "TASK_SITE_LOCATION", key: cbox }
		});
	});
}
let add = (that) => {
	layer.prompt({ title: '输入id', formType: 0 }, function (key, index) {
		layer.close(index);
		if (window.confirm(`确定新增id：${key}？`)) {
			let id = key;
			let x = '0';
			let y = '0';
			let value = { id, x, y };
			let text = JSON.stringify(value);
			gf.doAjax({
				url: `/app/conf/set.shtml`, type: "POST",
				data: { table: "TASK_SITE_LOCATION", key: id, value: text }
			});
		}
	});
}
gfbtn.bindBtns("div.doc-buttons", tempBtns);
