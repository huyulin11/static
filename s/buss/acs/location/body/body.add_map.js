import { addMap } from "/s/buss/acs/location/url/siteinfo.url.js";
import { datas } from "/s/buss/acs/location/location.data.js";
import { drawPoints, drawPointId } from "/s/buss/acs/location/point/point.draw.js";

export var createMap = function () {
    $('#sub_btn').on("click", function (e) {
        layer.confirm('是否确认提交?注意：提交后将删除所有站点、路径，且操作无法撤销！！！', { title: '提示' }, function (index) {
            var files = $("#map_frame")[0].files[0];
            if (files) {
                var oReader = new FileReader();
                oReader.readAsDataURL(files);
                var value = [];
                oReader.onload = function (ev) {
                    var oImgBase64 = ev.currentTarget.result;
                    let i = 0;
                    d3.csv(oImgBase64, function (d) {
                        value.push({ "location": { "id": ++i, "x": d.x, "y": d.y }, "id": i });
                    });
                };
                setTimeout(() => {
                    addMap(datas.id, value, () => {
                        window.location.reload();
                    });
                }, 300);
            } else return layer.msg("地图不存在，新增失败");
            layer.close(index);
        });

    });
}