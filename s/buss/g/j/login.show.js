let showInLogin = localStorage.showInLogin;
if (showInLogin) {
    let showInLogins = showInLogin.split(",");
    let fun = () => {
        if (showInLogins.length > 0) {
            layer.msg(showInLogins.shift(), null, fun);
        }
    };
    fun();
}