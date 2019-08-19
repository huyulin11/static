function HideShow() {
	var alt = document.getElementById('switchPoint').alt;
	if (alt == '隐藏') {
		jQuery('#switchPoint').attr('alt', '显示').attr('src',
				'/coin-portlet/images/arrow_right.png');
		jQuery('#leftFrame').hide(100);
	} // if
	else {
		jQuery('#switchPoint').attr('alt', '隐藏').attr('src',
				'/coin-portlet/images/arrow_left.png');
		jQuery('#leftFrame').show(100);
	}
};

$(document).ready(function() {
	HideShow();
});