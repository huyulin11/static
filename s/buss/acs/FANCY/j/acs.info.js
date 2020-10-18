export var refreshAcsInfo = function (callback) {
	jQuery.ajax({
		url: "/s/jsons/" + localStorage.projectKey + "/agv/acsInfo.json",
		type: "GET",
		dataType: "json",
		cache: false,
		success: function (data) {
			callback(data);
		},
		error: function (e) {
		},
		timeout: 5000
	});
}