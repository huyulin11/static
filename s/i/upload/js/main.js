$(function() {
	'use strict';

	$('#fileupload').fileupload({
		url : 'server/php/'
	});

	$('#fileupload').fileupload('option', 'redirect',
			window.location.href.replace(/\/[^\/]*$/, '/cors/result.html?%s'));
	if (1 === 1) {
		var num = $("#num").val();
		var type = $("#type").val();
		var coincode = $("#hidden_txt_coincode").val();
		var coinsize = $("#hidden_txt_coinsize").val();
		var employeeid = $("#hidden_txt_employeeid").val();
		var struts = $("#hidden_struts").val();
		var photograph = $("#hidden_photograph").val();
		var imagetype = $("#hidden_imagetype").val();
		var loadurl;
		if (photograph == "ad") {
			loadurl = "//" + window.location.host
					+ "/coin-portlet//servlet/UploadADImgs?imagetype="
					+ imagetype + "&employeeid=" + employeeid;
		} else {
			loadurl = "//" + window.location.host
					+ "/coin-portlet//servlet/Upload?num=" + num + "&type="
					+ type + "&coincode=" + coincode + "&coinsize=" + coinsize
					+ "&employeeid=" + employeeid + "&struts=" + struts;
		}
		$('#fileupload').fileupload(
				'option',
				{
					url : loadurl,
					disableImageResize : /Android(?!.*Chrome)|Opera/
							.test(window.navigator.userAgent),
					maxFileSize : 20000000,
					acceptFileTypes : /(\.|\/)(gif|jpe?g|png)$/i
				});
		if ($.support.cors) {
			$.ajax({
				url : loadurl,
				type : 'HEAD'
			}).fail(
					function() {
						$('<div class="alert alert-danger"/>').text(
								'Upload server currently unavailable - '
										+ new Date()).appendTo('#fileupload');
					});
		}
	} else {
		$('#fileupload').addClass('fileupload-processing');
		$.ajax({
			url : $('#fileupload').fileupload('option', 'url'),
			dataType : 'json',
			context : $('#fileupload')[0]
		}).always(function() {
			$(this).removeClass('fileupload-processing');
		}).done(function(result) {
			$(this).fileupload('option', 'done').call(this, $.Event('done'), {
				result : result
			});
		});
	}

});
