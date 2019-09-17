export var initUdf = function (_tasktype, _conf) {
    if (_tasktype == 'inventory') {
        _conf.items = [{
            key: "allocItem",
            alias: "userdef1",
            name: "纵号/行号（全盘无需填写）",
            notnull: true,
            type: "input",
        },];
    } else if (localStorage.projectKey == 'CSY_DAJ') {
        $("#warehouse").data("notnull", false);
        let obj = {
            max: 6,
            items: [{
                key: "allocItem",
                alias: "userdef1",
                name: "货位名称",
                notnull: true,
                type: "associating-input",
                searchurl: "/alloc/item/findFirstPage.shtml?allocItemFormMap.text=",
                containerofinput: "#panelBody",
                showcol: 'text,getStatus(status)'
            },]
        }
        Object.assign(_conf, obj);
    }
}