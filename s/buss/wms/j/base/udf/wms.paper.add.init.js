export var initUdf = function (_tasktype, _conf) {
    if (_tasktype == 'inventory') {
        _conf.items = [{
            key: "allocItem",
            alias: "userdef1",
            name: "纵号/行号（全盘无需填写）",
            notnull: true,
            type: "input",
        },];
    } else {
        $("#targetPlace").parents("div.col").remove();
        let obj = {
            max: 20,
            items: [{
                key: "allocItem",
                alias: "userdef1",
                name: "货位名称",
                notnull: true,
                type: "associating-input",
                searchurl: "/alloc/item/findFirstPage.shtml?allocItemFormMap.text=",
                containerofinput: "#panelBody",
                showcol: 'text,getStatus(status)',
            }, {
                key: "itemcount",
                name: "数量",
                notnull: true,
                default: 1,
            }, {
                key: "item",
                name: "货物种类",
                notnull: true,
                default: 1,
            },]
        }
        Object.assign(_conf, obj);
    }
}