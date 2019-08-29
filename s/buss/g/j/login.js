import "/s/j/vue/vue.min.js";

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
            if (data == "SUCCESS") {
                window.location.href = "/manager.shtml";
            } else {
                layer.msg(data);
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
    },
    mounted: function () {
        console.log('App is power by: ' + this.shortname)
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

$("#username").focus();

setTimeout(() => {
    if ($("#username").val() && $("#password").val()) {
        login();
    }
}, 3000);