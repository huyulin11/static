import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { dataGrid } from "/s/j/kf.grid.js";
import "/s/buss/sys/lap/j/lap.info.edit.name.js";

let _columns = [{
    colkey: "id",
    name: "id",
    hide: true,
}, {
    colkey: "key",
    name: "时间",
    renderData: function (rowindex, data, rowdata, column) {
        return data;
    }
}, {
    colkey: "value",
    name: "任务信息",
    renderData: function (rowindex, data, rowdata, column) {
        try {
            let divider = window.innerWidth < 960 ? "<hr/>" : "";
            let json = JSON.parse(data);
            let info = [];
            if (json.agvId) {
                info.push("指定执行车辆：" + json.agvId + ";");
            }
            info.push("类型：" + json.tasktype + ";");
            let jsonTo = json.to;
            let path = [];
            if (typeof jsonTo == 'string') {
                jsonTo = jsonTo.split(",");
            }
            for (let item of jsonTo) {
                if (typeof item == 'string') {
                    path.push(item);
                } else {
                    let site = gv.site(item.id);
                    path.push((!site ? item.id : site) + "[" + gv.get("ARRIVED_SITE_ACT_TYPE", item.arrivedact) + "]");
                }
            }
            info.push("路线:" + path.join("->"));
            return info.join(divider);
        } catch (error) {
        }
    }
}, {
    colkey: "delflag",
    name: "是否删除",
    hide: true,
    renderData: function (rowindex, data, rowdata, column) {
        if (data == "1") {
            $("tr[d-tree='" + rowdata.dtee + "']").css("color", "#dcdcdc");
            return "已删除";
        } else {
            return "使用中";
        }
    }
}, {
    name: "操作",
    renderData: function (rowindex, data, rowdata, column) {
        if (rowdata.delflag == "1") {
            return "";
        }
        var btns = $(`<button type='button' class='btn btn-info marR10 delByLogic' data-key='${rowdata.key}'>删除</button>`);
        btns.bind("click", this.fun);
        return btns;
    },
}];

window.datagrid = dataGrid({
    pagId: 'paging',
    columns: _columns,
    jsonUrl: `/app/conf/findByPage.shtml`,
    checkbox: false,
    serNumber: true,
    pageSize: 10,
    refreshTime: 3000,
    fenyeInTail: true,
    data: { "TABLE_KEY": "AGV_CACHED_TASK", "ORDER_BY_KEY": "key" }
});

let doSearch = function () {
    var searchParams = $("#searchForm").serialize();
    window.datagrid.setOptions({
        data: searchParams
    });
}

$("#search").on("click", function () {
    doSearch();
});

$("#searchForm").on("submit", function () {
    doSearch();
    return false;
});

$("#paging").delegate(".delByLogic", "click", function () {
    let key = $(this).data("key");
    layer.confirm(`是否删除该任务？`, function (index) {
        gf.ajax("/app/conf/delByLogic.shtml", { "table": "AGV_CACHED_TASK", key: key }, "json");
    });
});