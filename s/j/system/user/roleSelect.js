
$(document).ready(function () {
    $("#groupsForSelect").dblclick(function () {
        selected();
    });
    $("#selectGroups").dblclick(function () {
        unselected();
    });
});
function selected() {
    var selOpt = $("#groupsForSelect option:selected");

    selOpt.remove();
    var selObj = $("#selectGroups");
    selObj.append(selOpt);

    var selOpt = $("#selectGroups")[0];
    ids = "";
    for (var i = 0; i < selOpt.length; i++) {
        ids += (selOpt[i].value + ",");
    }

    if (ids != "") {
        ids = ids.substring(0, ids.length - 1);
    }
    $('#txtGroupsSelect').val(ids);
}

function selectedAll() {
    var selOpt = $("#groupsForSelect option");

    selOpt.remove();
    var selObj = $("#selectGroups");
    selObj.append(selOpt);

    var selOpt = $("#selectGroups")[0];
    ids = "";
    for (var i = 0; i < selOpt.length; i++) {
        ids += (selOpt[i].value + ",");
    }

    if (ids != "") {
        ids = ids.substring(0, ids.length - 1);
    }
    $('#txtGroupsSelect').val(ids);
}

function unselected() {
    var selOpt = $("#selectGroups option:selected");
    selOpt.remove();
    var selObj = $("#groupsForSelect");
    selObj.append(selOpt);

    var selOpt = $("#selectGroups")[0];
    ids = "";
    for (var i = 0; i < selOpt.length; i++) {
        ids += (selOpt[i].value + ",");
    }

    if (ids != "") {
        ids = ids.substring(0, ids.length - 1);
    }
    $('#txtGroupsSelect').val(ids);
}

function unselectedAll() {
    var selOpt = $("#selectGroups option");
    selOpt.remove();
    var selObj = $("#groupsForSelect");
    selObj.append(selOpt);

    $('#txtGroupsSelect').val("");
}