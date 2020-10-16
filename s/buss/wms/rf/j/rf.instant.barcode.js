import "/s/j/vue/vue.min.js";

let container = "#rootContainer";

var initRf = function () {
    var vm = new Vue({
        data: {},
        el: container,
        created: function () {
        },
        mounted: function () {
        },
        methods: {
            barcodeEnter: function () {
                $("#su").focus();
            },
            suInput: function () {
                if (!$("#lineTr").hasClass("hidden")) {
                    $("#lineTr").addClass("hidden");
                }
            },
            getCombinedList: function () {
                getCombinedList();
            },
            suEnter: function () {
                sub();
            },
            toEnter: function () {
                sub();
            },
            lineEnter: function () {
                sub();
            },
        }
    });
}

initRf();