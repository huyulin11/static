var keyword;
var formMgr, dataMgr;
$(function() {
	$('div#workscope').ready(
			function() {
				function init() {
					keyword = $("select#tableChoose").val();
					formMgr = new FormMgr().rebuildForm('ADD');
					dataMgr = new DataMgr(formMgr);
					dataMgr.searchMgr = new SearchMgr(
							formMgr.columnsDetail.queryColArray);
					document.getElementById('searchDiv').appendChild(
							dataMgr.searchMgr.createHtml());
					$("div#view").show();
				}
				// 选择表
				$("select#tableChoose").on(
						"change",
						function() {
							var keyword = $(this).val();
							if (keyword) {
								var url = location.origin + location.pathname
										+ "?keyword=" + keyword;
								window.location.assign(url);
							}
						});
				$("#reset").click(function() {
					formMgr.rebuildForm('ADD');
				});
				// 保存数据操作
				$("#save").click(function() {
					formMgr.saveData();
				});
				// 双击数据列表行 填充数据
				$("div#viewData tbody tr").on(
						"dblclick",
						function() {
							$(this).css({
								color : "blue"
							});
							var id = this.getAttribute('data-id');
							if (id) { // 跳过标题栏
								if (formMgr.rebuildForm('EDIT').fillData(
										dataMgr.getOneByID(id))) {
									window.scrollBy(0, $('#tableChoose')
											.parents("tr").next().offset().top
											- $(this).offset().top);
								} else {
									formMgr.clearForm().rebuildForm('ADD'); // 如果填充失败，还原表单
								}

							}
						});
				$("div#viewData button[name='edit']").on(
						"click",
						function() {
							$(this).css({
								color : "blue"
							});
							var id = $(this).parents('tr')[0]
									.getAttribute('data-id');
							formMgr.rebuildForm('EDIT').fillData(
									dataMgr.getOneByID(id));
							window.scrollBy(0, $('#tableChoose').parents("tr")
									.next().offset().top
									- $(this).offset().top);
						});
				$("div#viewData button[name='delete']").on("click", function() {
					var id = $(this).parents('tr')[0].getAttribute('data-id');
					// 删除操作前请求确认
					if (confirm('确认删除？')) {
						var rtn = dataMgr.deleteByID(id);
						if (rtn) {
							$(this).parents('tr').remove();
						}
					}
				});

				$("#reGet")
						.click(
								function() {
									dataMgr.pageMgr.countPerPage = $(
											'div#view p :text').val() / 1;
									var scObject = dataMgr.pageMgr.goFirst();
									dataMgr.searchFlag = false; // get all data
									dataMgr.getData(scObject.start,
											scObject.count);
									dataMgr.createDataViewTable();
								});
				$("div#searchDiv form").submit(function(event) {
					event.preventDefault();
					dataMgr.searchFlag = true; // get all data
					dataMgr.pageMgr.goFirst();
					dataMgr.refresh();
				});
			});
});