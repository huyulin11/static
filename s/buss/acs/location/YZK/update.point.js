import { datas } from "/s/buss/acs/location/BASE/location.data.js";
import { updateTaskSiteLocation } from "/s/buss/acs/FANCY/j/acs.site.info.js";
import { windowToDB } from "/s/buss/acs/location/YZK/trans.location.js";

export var updateID = function (circle, id1, x, y) {
    layer.prompt({ title: '输入id', formType: 0 }, function (id2, index) {
        layer.close(index);
        if (window.confirm(`确定将id：${id1}修改为id：${id2}？`)) {
            debugger
            for (var i of datas.id) {
                if (id2 == i.id) {
                    return layer.msg("存在相同站点，修改失败");
                }
            }
            var result = windowToDB(id2, x, y);
            gf.doAjax({
                url: `/app/location/update.shtml`, type: "POST",
                data: { table: "TASK_SITE_LOCATION", key1: id1, key2: id2, value: JSON.stringify(result) },
                success: (obj) => {
                    updateTaskSiteLocation(id1, result);
                    layer.msg(obj.msg ? obj.msg : '保存成功！');
                    circle.attr("id",id2);
                }
            });
        }
    })
}