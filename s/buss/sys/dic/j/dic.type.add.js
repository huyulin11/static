import "/s/buss/g/j/dynamic.rows.add.js";

$("input#dictype0").on("change", function () {
    var data = $(this).data("vvvv-" + "remark");
    if (data) {
        $("input#remark0").val(data);
    } else {
        $("input#remark0").val("");
    }
});

$("input#dictype0").on("blur", function () {
    var data = $(this).data("vvvv-" + "remark");
    if (!data || !$(this).val()) {
        $("input#remark0").val("");
    } else {
        $("input#remark0").val(data);
    }
});