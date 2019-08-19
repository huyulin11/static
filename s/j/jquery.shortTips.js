(function($) {
	var _initCloseEvent = function(options, timeid) {
		var father = options["father"] == undefined ? document
				: options["father"];
		$(father).one("click", function(ev) {
			if (father == document) {
				$(".black_overlay").hide();
			}
			$(options["targetLabel"]).hide();
			try {
				clearTimeout(timeid);
			} catch (e) {
			}
		});
		$(options["targetLabel"]).live("click", function(ev) {
			return false;
		});
		if (options["showType"] == "mouseover") {
			$(options["targetLabel"]).live("mouseout", function() {
				try {
					clearTimeout(timeid);
				} catch (e) {
				}
			});
		}
	};

	$.fn.initTips = function(options) {
		var _timeid = null;
		var father = options["father"] == undefined ? document
				: options["father"];
		$(this)
				.live(
						options["showType"],
						function(e) {
							if (!options["initDataFun"](this)) {
								return;
							}
							var pointX, pointY;
							if ((options["posType"] == undefined || options["posType"]) == "relative") {
								pointX = options["pointX"];
								pointY = options["pointY"];
								pointX = e.clientX
										+ (pointX == undefined ? 0 : pointX);
								pointY = e.clientY
										+ (pointY == undefined ? 0 : pointY);
							} else {
								pointX = options["pointX"];
								pointY = options["pointY"];
							}
							if (pointX == null || pointX == undefined) {
								pointX = $(window).width()
										- $(options["targetLabel"])
												.css("width").replace("px", "")
										- 20;
							}
							if (pointY == null || pointY == undefined) {
								pointY = ($(window).height() - $(
										options["targetLabel"]).css("height")
										.replace("px", "")) / 2;
							}
							if (options["targetWidth"] == "auto") {
								$(options["targetLabel"]).css({
									width : $(window).width() / 3
								});
							}
							if (options["targetHeight"] == "auto") {
								$(options["targetLabel"]).css({
									height : $(window).height() / 3
								});
							}
							_timeid = setTimeout(
									function() {
										if (father == document) {
											$(".black_overlay")
													.appendTo("html").show()
													.css(
															"height",
															$(document)
																	.height());
										}
										$(options["targetLabel"]).show(50).css(
												{
													left : pointX,
													top : pointY
												});
									},
									(options["timeoutTime"] == undefined ? 200
											: options["timeoutTime"]));
							if (options["closeEvent"] == undefined
									|| options["closeEvent"] == "normal") {
								_initCloseEvent(options, _timeid);
							} else {
								options["closeEvent"](this, options, _timeid);
							}
							return false;
						});
		return _timeid;
	};
	$.fn.closeTips = function(timeid) {
		if (options["beforeCloseTipsFunc"]) {
			options["beforeCloseTipsFunc"]();
		}
		try {
			clearTimeout(timeid);
		} catch (e) {
		}
	};
})(jQuery);