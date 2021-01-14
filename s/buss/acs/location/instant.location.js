import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";



Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

var vm = new Vue({
    data: {
        siteid: null,
        x: null,
        y: null,
        preID: null,
        nextID: null,
    },
    el: container,
    methods: {
        saveBarCode() {
            let id = parseInt(this.siteid);
            let x = parseInt(this.x);
            let y = parseInt(this.y);
            // let preID = this.preID;
            // let nextID = this.nextID;
            if (!this.siteid || !this.x || !this.y) {
                $("#barcode").focus();
                layer.msg("ID,X坐标,Y坐标不能为空！");
                return;
            };
            let value = { id, x, y };
            let data = JSON.stringify(value);
            gf.doAjax({
                url: `/app/conf/set.shtml`, type: "POST",
                data: { table: "TASK_SITE_LOCATION", key: id, value: data }
            });
            this.clearBarCode();
        },
        clearBarCode() {
            this.siteid = null;
            this.x = null;
            this.y = null;
            $("#barcode").focus();
        },
    }
})