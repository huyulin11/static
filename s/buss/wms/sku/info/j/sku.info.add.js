import { initRows } from "/s/buss/g/j/dynamic.rows.init.js";
import { submitForm } from "/s/buss/g/j/dynamic.rows.add.js";

var _conf;

_conf = {
    container: "div#rows",
    targetClass: "item-group",
    addBtn: "div.addOne",
    serial: 0,
    max: 20,
    items: [{
        key: "name",
        name: "SKU名称",
        notnull: true,
    },]
}

$("#sub").on("click", function () {
    submitForm();
});

initRows(_conf);