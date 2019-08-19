(function () {
	var getAreaList = function () {
		jQuery.ajax({
			url: "/json/wms/getAreaList.shtml",
			type: "post",
			dataType: "json",
			success: function (data) {
				var taskStr = "";
				var dl = data.length;
				$.each(data, function (n, value) {
					var currentTable = "table.area[data-area='" + value.environment + "']";
					if ($(currentTable).length <= 0) {
						$("div#wmsMgr").append("<hr class='withBorder'/>" +
							"<table class='area' data-area='" + value.environment + "'><caption style='color:black'>"
							+ (value.environment == 1 ? "一楼仓库" : "二楼仓库") + "↓" + "</caption></table>");
					}
					var tmpStr = "<td><div><button id='" + value.areaId + "'" + ">"
						+ value.text + "区" + "<br/><font color='yellow'>实际:"
						+ (value.inSkuNames ? value.inSkuNames + ";" : "无")
						+ "</font>" + "<br/>预期:"
						+ (value.allowedSkuNames ? value.allowedSkuNames + ";" : "")
						+ (value.allowedSkuTypeNames ? value.allowedSkuTypeNames + ";" : "")
						+ "" + "</button></div></td>";

					if ($(currentTable).find("tr.areaTr:last").find("td").length >= 3 || $(currentTable).find("tr.areaTr:last").length == 0) {
						$(currentTable).append("<tr class='areaTr'></tr>");
					}
					$(currentTable).find("tr.areaTr:last").append(tmpStr);
				});

				areaInfoInitOver = 1;
			}
		});
	}

	var init = function () {
		getAreaList();

		$("div#wmsMgr").delegate("table.area tr.areaTr button", "click", function () {
			openAlloc($(this).attr("id"), $(this).html());
		});
	}

	var openAlloc = function (areaId, layerName) {
		layerOpen({
			content: '/s/buss/acs/g/h/alloc.html?areaId=' + areaId,
			title: layerName,
			area: ['50%', '70%']
		});
	}

	init();
})(jQuery);
