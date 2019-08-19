import { sku } from "/s/buss/acs/g/j/wms.sku.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { getSingleTask } from "/s/buss/acs/g/j/singletask.js";
import { taskexe } from "/s/buss/acs/g/j/agv.taskexe.add.js";
import { initAlloc } from "/s/buss/acs/g/j/alloc.render.js";
import { allocOp } from "/s/buss/acs/g/j/alloc.op.js";

var initTask = function (allocId) {
    var rtn = null;
    jQuery.ajax({
        url: "/getSingletaskByAllocId.shtml?allocId=" + allocId,
        type: "post",
        dataType: "json",
        async: false,
        success: function (data) {
            rtn = data;
        },
        timeout: 5000
    });
    return rtn;
}

$("html").delegate("button.clr", "click", function () {
    if (!window.confirm('你确定要' + '清空第该货位吗？')) {
        return;
    }

    jQuery.ajax({
        url: "/json/wms/clearAllocByColId.shtml?allocId=" + $(this).data("id"),
        type: "post",
        dataType: "json",
        success: function (data) {
            alert(data);
        },
        error: function () {
            alert("更新失败！");
        },
        timeout: 5000
    });
});

if (localStorage.projectKey == 'HONGFU_ZHENMU') {
    $("html").delegate("button.doChange", "click", function () {
        allocOp(this);
    });
}

$("table.alloc").delegate("button", "click", function () {
    var singletasks = getSingleTask($(this).data("id"));
    var num = $(this).data("num");
    if (!num) { num = 0; }
    var taskStr = "";
    // if (gv.getCurrentRole() == "admin") { }
    var numInRow = 1;
    var task = "";
    var i = 0;
    for (var singletask of singletasks) {
        task = task + "<td><div><button class='tck doTask' id='" + singletask.taskcode + "'"
            + " data-id='" + singletask.id + "' " + " data-agvid='" + singletask.agvid + "' "
            + " data-environmentId='" + singletask.environmentid + "' "
            + " data-tasktype='" + singletask.tasktype + "' " + ">" + singletask.tasktext
            + "</button></div></td>";
        if (++i % numInRow == 0) {
            taskStr = taskStr + "<tr>" + task + "</tr>";
            task = "";
        }
    }
    var allowedskuid = $("table.allocCol tr.allocColTr").find("td button[data-colid='" + $(this).data("colid") + "']").data("allowedskuid");
    var allowedskutype = $("table.allocCol tr.allocColTr").find("td button[data-colid='" + $(this).data("colid") + "']").data("allowedskutype");
    var changeNumForm = "<div id='doChangeDiv'>修改当前货位库存"
        + "<div class='hidden'>种类为：" + sku.select($(this).data("skuid"), allowedskutype, allowedskuid) + "</div>"
        + "数量为：<input type='text' class='doChange' name='num' value='" + num + "'/></div>";
    var changeNumBtn = "<button class='tck doChange' data-id='" + $(this).data("id") + "' "
        + "data-text='" + $(this).data("text") + "' data-status='" + $(this).data("status") + "'>确认</button>";

    layer.open({
        type: 1,
        title: $(this).data("text") + ($(this).data("status") != 1 ? ("-<font style='color:red;'>" + sku.value($(this).data("skuid")) + "</font>") : ""),
        skin: 'layui-layer-demo',
        closeBtn: 0,
        area: ['70%', '45%'],
        anim: 2,
        shade: 0.7,
        shadeClose: true,
        offset: '10%',
        content: "<div style='text-align: center;'><table><tr><td width='50%'>" + changeNumForm + "</td></tr><tr><td>" + changeNumBtn + "</td></tr>" + "</table>"
            + "<hr>" + "<table>" + taskStr + "</table>" + "<hr>" + "<table>" + "<tr><td>" + "</td></tr></table></div>"
    });
});

$("html").delegate("button.doTask", "click", function () {
    var confirmMsg = "";
    if ($(this).html().endsWith('上料')) {
        confirmMsg = "上料需保证送料工序已经执行完毕，";
    } else if ($(this).html().endsWith('送光轴')) {
        confirmMsg = "送光轴需保证上料工序已经执行完毕，";
    } else if ($(this).html().endsWith('叫料')) {
        confirmMsg = "叫料需保证agv已回到起始位置，";
    } else if ($(this).html().endsWith('送料')) {
        confirmMsg = "送料需保证agv已回到起始位置，";
    }

    if (window.confirm(confirmMsg + '你确定要' + "执行:" + $(this).html() + '吗？')) {
        alert(taskexe.addTaskById($(this).data("agvid"), $(this).data("id")));
        initAlloc();
    } else {
        return;
    }
});