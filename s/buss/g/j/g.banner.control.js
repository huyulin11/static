export let renderModel = (confs) => {
    if (confs instanceof Array) {
        for (let conf of confs) {
            doRenderModel(conf);
        }
    } else {
        doRenderModel(confs);
    }
}

let doRenderModel = (conf) => {
    let { init, key, target, click, url, self, type } = conf;
    if (type === 'LINK') {
        let style = $(`<style id='${key}HideDiv_style'></style>`);
        $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}.png);}`);
        $("head").append(style);
        $("#topCtrlContainer").prepend(`<div id='${key}HideDiv' class='close hideToggle' data-url='${url}' data-self='${self ? self : ""}'></div>`);
        return;
    }

    if (init) init();
    let style = $(`<style id='${key}HideDiv_style'></style>`);
    $(style).append(`#${key}HideDiv.close {background-image: url(/s//i/icon/${key}Close.png);}`)
        .append(`#${key}HideDiv.open {background-image: url(/s//i/icon/${key}Open.png);}`);
    $("head").append(style);
    let op = $(`<div id='${key}HideDiv' class='close hideToggle'></div>`);
    if (target) $(op).data("target", target);
    if (click) $(op).bind("click", click);
    $("#topCtrlContainer").prepend(op);
}