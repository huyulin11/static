$("#simple-2").on("click", function () {
    if ($(this).is(":checked")) {
        localStorage.setItem("refreshAllocInterval", true);
    } else {
        localStorage.setItem("refreshAllocInterval", false);
    }
});