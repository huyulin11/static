
import { gf } from "/s/buss/g/j/g.f.js";

export function byRes(id) {
    var url = '/resources/reslists.shtml';
    var data = gf.ajax(url, null, "json");
    if (data != null) {
        var h = "<option value='0'>------顶级目录------</option>";
        for (var i = 0; i < data.length; i++) {
            if (parseInt(id, 10) == parseInt(data[i].id, 10)) {
                h += "<option value='" + data[i].id + "' selected='selected'>"
                    + data[i].name + "</option>";
            } else {
                h += "<option value='" + data[i].id + "'>" + data[i].name + "</option>";
            }
        }
        $("#parentId").html(h);
    } else {
        bootbox.alert("获取菜单信息错误，请联系管理员！");
    }
}