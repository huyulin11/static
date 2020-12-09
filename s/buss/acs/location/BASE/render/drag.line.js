export var startedPath = function () {
    d3.select(this).attr("d", function () {
        console.log($(this).attr("d"));
        return $(this).attr("d");
    });
}
export var dragedPath = function () {

}
export var endedPath = function () {

}