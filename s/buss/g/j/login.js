import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";

var data = { shortname: "凯钒科技" }
var login = function () {
    $("#loginform").ajaxSubmit({
        type: "post",
        dataType: "json",
        timeout: 2000,
        error: function (data) {
            layer.msg("连接错误！");
        },
        success: function (data) {
            if (data.code >= 0) {
                if (!gf.isPc() && localStorage.projectKey == "BJJK_HUIRUI") {
                    location.assign("/s/buss/wms/rf/h/rf.mgr.html");
                } else {
                    location.assign("/manager.shtml");
                }
            } else {
                layer.msg(data.msg);
                $("#username").focus();
            }
        }
    });
};
var vm = new Vue({
    data: data,
    el: "#loginbox",
    created: function () {
        console.log('App is power by: ' + this.shortname);
        switch (localStorage.projectKey) {
            case "BJJK_HUIRUI":
                $("title").html("MFA");
                break;
            default:
                $("title").html("AGV调度系统");
                break;
        }
    },
    mounted: function () {
        console.log('App is power by: ' + this.shortname);
        $("#username").focus();
    },
    methods: {
        checkUserForm: function () {
            login();
        },
        doLogin: function () {
            login();
        }
    },
    computed: {
        powerInfo: function () {
            return "power by" + this.shortname;
        },
        expireTime: function () {
            var times = localStorage.expireTime;
            var deadline;
            if (times == "0") {
                deadline = "永久";
            } else {
                deadline = new Date(0 + Number(times)).toLocaleDateString() + "(测试授权)";
            }
            return "授权有效期至:" + deadline;
        }
    }
});