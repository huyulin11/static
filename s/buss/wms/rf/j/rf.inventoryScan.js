import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";

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
            if(this.savacode.trim().length != 6){
                $("#barcode").focus();
                layer.msg("条码格式需为6位！");
                $("#barcode").val("");
                return;
            };
            gf.doAjax({
                url:'/de/acs/inventoryScan.shtml',
                data:{barcode : this.savacode}
            })
        },
        clearBarCode(){
            this.msg=null
        }
    }
})