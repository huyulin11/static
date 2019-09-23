export var initUdf = function (_tasktype, _conf) {
    if (_tasktype == 'inventory') {
        _conf.items = [{
            key: "allocItem",
            alias: "userdef1",
            name: "纵号/行号（全盘无需填写）",
            notnull: true,
            type: "input",
        },];
    } else if (_tasktype == 'receipt') {
        $("#targetPlace").parents("div.col").remove();
        let obj = {
            max: 20,
            items: [{
                key: "item",
                name: "SU",
                notnull: true,
            }, {
                key: "userdef3",
                name: "TU",
                notnull: true,
            },]
        }
        Object.assign(_conf, obj);
    } else if (_tasktype == 'shipment') {
        $("#targetPlace").parents("div.col").remove();
        let obj = {
            max: 20,
            items: [{
                key: "item",
                name: "SU",
                notnull: true,
            },]
        }
        Object.assign(_conf, obj);
    }
}