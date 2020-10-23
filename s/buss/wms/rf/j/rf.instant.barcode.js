import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";

let container = "#rootContainer";

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
        barcodeEnter(){
            this.saveBarCode();
        }
    }
})