var gp = new Object();

$(function () {

	var _init = function () {
		_initProjectInfo();
	};

	var _getProjectKey = function () {
		var projectKey;
		$.ajax({
			url: '/s/jsons/projectKey.json',
			async: false,
			type: 'GET',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function (data) {
				var str = JSON.stringify(data);
				var pk = jQuery.parseJSON(str);
				projectKey = pk.PROJECT_KEY;
				gp.projectKey = projectKey;
				localStorage.setItem("timeStamp", pk.TIME_STAMP);
				localStorage.setItem("acsControl", pk.ACS_CONTROL);
				localStorage.setItem("agvControl", pk.AGV_CONTROL);
				localStorage.setItem("expireTime", pk.EXPIRE_TIME);
				localStorage.setItem("projectKey", projectKey);
			},
			error: function (e) { console.log(e); }
		});
		return projectKey;
	};

	var _initProjectInfo = function () {
		var projectKey = _getProjectKey();
		$.ajax({
			url: '/s/jsons/' + projectKey + '/projectInfo.json',
			async: true,
			type: 'GET',
			dataType: 'json',
			timeout: 5000,
			cache: false,
			success: function (data) {
				var str = JSON.stringify(data);
				gp = jQuery.parseJSON(str);
				localStorage.setItem("projectinfo", str);

				gp.isReady = function () {
					return gp != null;
				}

			},
			error: function (e) { console.log(e); }
		});
	};

	_init();
});

export { gp };