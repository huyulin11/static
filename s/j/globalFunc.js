(function($) {
	$GF = {};
	$GF.randomString = function(len) {
		len = len || 32;
		var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
		var maxPos = $chars.length;
		var pwd = '';
		for (i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
	};
})(jQuery);
