import "/s/j/vue/vue.min.js";
import { gf } from "/s/buss/g/j/g.f.js";
import { gp } from "/s/buss/g/j/g.p.js";

var data = { shortname: "凯钒科技", expireTime: "" }
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
                    location.assign("/s/buss/g/h/manager.html");
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
        this.calExpireTime();
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
        },
        calExpireTime: function () {
            var times = gp.expireTime;
            var deadline;
            if (times == "0") {
                deadline = "永久";
            } else {
                let deadtime = new Date(0 + Number(times));
                let leftDays = (deadtime - new Date()) / (24 * 3600 * 1000);
                if (leftDays >= 0 && leftDays < 7) {
                    layer.msg("授权日期不足七天，请提前与技术提供商联系，防止授权到期影响您的使用！");
                } else if (leftDays < 0) {
                    layer.msg("当前授权已过期！");
                }
                deadline = deadtime.toLocaleDateString() + "(测试授权)";
            }
            this.expireTime = "授权有效期至:" + deadline;
        }
    },
    computed: {
        powerInfo: function () {
            return "power by" + this.shortname;
        },
    }
});