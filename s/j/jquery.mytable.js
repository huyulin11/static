(function($) {

	var _changeNumindex = function(src, des) {
		srcIndex = src.find("td input[name*='numindex']").attr('value');
		desIndex = des.find("td input[name*='numindex']").attr('value');
		src.find("td input[name*='numindex']").attr('value', desIndex);
		des.find("td input[name*='numindex']").attr('value', srcIndex);
	};
	$.fn.extend({
		sortTable : function(options) {
			var compareCol, compareFun;
			compareCol = options["compareCol"];
			compareFun = options["compareFun"];
			var compareColVal;
			if (typeof compareCol == 'function') {
				compareColVal = compareCol().toArray();
			} else {
				compareColVal = $(compareCol).toArray();
			}
			compareColVal.sort(function(a, b) {
				return compareFun(a, b);
			});
			$.each(compareColVal, function() {
				var news = $(this).parents("tr");
				news.appendTo(news.parent());
			});
		},

		rowUp : function() {
			var src = $(this);
			var des = $(this).prev();
			if (!des || !des.attr('id') || des.attr('id').indexOf('tr') < 0) {
				return;
			}
			_changeNumindex(des, src);
			des.fadeOut(100);
			src.fadeOut(100);
			src.after(des);
			src.fadeIn(100);
			des.fadeIn(100);
		},
		rowDown : function() {
			var src = $(this);
			var des = $(this).next();
			if (!des || !des.attr('id') || des.attr('id').indexOf('tr') < 0) {
				return;
			}
			_changeNumindex(des, src);
			des.fadeOut(100);
			src.fadeOut(100);
			src.before(des);
			src.fadeIn(100);
			des.fadeIn(100);
		},
		chooseBackColor : function(color) {
			var rColor1 = "", rColor2 = "";
			if (color == "graybackground") {
				rColor1 = "redbackground";
				rColor2 = "bluebackground";
			}
			if (color == "redbackground") {
				rColor1 = "graybackground";
				rColor2 = "bluebackground";
			}
			if (color == "bluebackground") {
				rColor1 = "redbackground";
				rColor2 = "graybackground";
			}
			$(this).removeClass(rColor1).removeClass(rColor2).addClass(color);
		}
	});
})(jQuery);