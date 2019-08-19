export var sku = new Object();
var allSkuInfo;
var allSkuType;

sku.select = function (json) {
    var tmpOpStr = "";
    var skuId = json.id, allowedskutype = json.allowedskutype,
        allowedskuid = json.allowedskuid, environment = json.environment;
    $.each(sku.getSkuInfo(), function (sn, thisSkuInfo) {
        if (allowedskutype && allowedskutype != 0 && allowedskuid && allowedskuid != 0) {
            if (!(thisSkuInfo.type == allowedskutype || thisSkuInfo.id == allowedskuid)) {
                return;
            }
        } else {
            if (allowedskutype && allowedskutype != 0 && thisSkuInfo.type != allowedskutype) {
                return;
            }
            if (allowedskuid && allowedskuid != 0 && thisSkuInfo.id != allowedskuid) {
                return;
            }
        }
        if (environment && environment != 0 && thisSkuInfo.environment != environment) {
            return;
        }
        tmpOpStr = tmpOpStr + "<option " + "value='" + thisSkuInfo.id + "' "
            + (thisSkuInfo.id == skuId ? "selected='selected'" : "") + ">"
            + thisSkuInfo.name + "</option>";
    });
    return "<select>" + tmpOpStr + "</select>";
}

sku.value = function (skuId) {
    var tmpOpStr = "";
    $.each(sku.getSkuInfo(), function (sn, thisSkuInfo) {
        if (thisSkuInfo.id == skuId) { tmpOpStr = thisSkuInfo.name; return; }
    });
    return tmpOpStr;
}

sku.typevalue = function (skuTypeId) {
    var tmpOpStr = "";
    $.each(sku.getSkuType(), function (sn, thisSkuType) {
        if (thisSkuType.id == skuTypeId) { tmpOpStr = thisSkuType.name; return; }
    });
    return tmpOpStr;
}

sku.getSkuInfo = function () {
    if (!allSkuInfo) {
        sku.initData();
    } return allSkuInfo;
}


sku.getSkuType = function () {
    if (!allSkuType) {
        sku.initData();
    } return allSkuType;
}

sku.initData = function () {
    jQuery.ajax({
        url: "/json/wms/getSkuInfo.shtml",
        type: "post",
        dataType: "json",
        async: true,
        timeout: 3000,
        success: function (data) {
            localStorage.setItem("skuinfo", JSON.stringify(data.skuInfo));
            localStorage.setItem("skutype", JSON.stringify(data.skuType));
            allSkuInfo = data.skuInfo;
            allSkuType = data.skuType;
        },
        error: function () {
            console.log("get sku info err");
        }
    });
}

sku.changeSku = function (lapId, skuId) {
    jQuery.ajax({
        url: "/json/wms/changeSku.shtml?lapId=" + lapId + "&skuId=" + skuId,
        type: "post",
        dataType: "json",
        success: function (data) {
            if (data > 0) {
                getSkuInfo();
                alert("更新成功");
            }
        }
    });
}


var refresh = function () {
    if (Number(localStorage.refreshSkuInfo) > 0) {
        sku.initData();
        localStorage.setItem("refreshSkuInfo", 0);
    }
}

setInterval(() => {
    refresh();
}, 1000);

sku.initData();
