import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";
import {agvRunningLogs} from "/s/buss/acs/FANCY/j/agv.running.logs.js";

let container = "#rootContainer";

setInterval(() => {
	agvRunningLogs((datas) => {
        if (!datas) { return; }
        for (let data of datas) {
            layer.msg(data.key + "号车辆：" + data.value, { offset: 'b' });
        }
    });
}, 5000);

Vue.directive('focus', {
    inserted: function (el) {
      el.focus()
    }
  })

var vm = new Vue({
    data:{
        msg:null,
        savacode:null,
    },
    el:container,
    methods:{
        saveBarCode(){
            this.savacode=this.msg;
            if(!this.savacode){
                $("#barcode").focus();
                layer.msg("条码不能为空！");
                return;
            };
            gf.doAjax({
                url:'/de/acs/instantBarcode.shtml',
                data:{barcode : this.savacode}
            });
            this.clearBarCode();
        },
        clearBarCode(){
            this.msg=null;
            $("#barcode").focus();
        },
    }
})