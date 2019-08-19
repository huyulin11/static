function useYUI(Y) {
	window.Y = Y;
	var checked = Y.one('#sendtype2').get("checked");
	if (checked) {
		Y.all('.Y_toggle').setStyle("display", "none");
		Y.all('.tr_pickup_address').setStyle("display", "table-row");

	} else {
		Y.all('.Y_toggle').setStyle("display", "table-row");
		Y.all('.tr_pickup_address').setStyle("display", "none");
	}
	Y.all('[name="depositAddressBean.sendtype"]').on("change", function() {
		var checked = Y.one('#sendtype2').get("checked");
		if (checked) {
			Y.all('.Y_toggle').setStyle("display", "none");
			Y.all('.tr_pickup_address').setStyle("display", "table-row");
		} else {
			Y.all('.Y_toggle').setStyle("display", "table-row");
			Y.all('.tr_pickup_address').setStyle("display", "none");
		}
	});
}

$(function() {
	YUI().use("node", "event", function(Y) {
		useYUI(Y);
	});
});