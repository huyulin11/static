import { renderAll } from "/s/buss/g/j/jquery/jquery.jsSelect.js";
import { getInput } from "/s/buss/g/j/g.input.render.js";
import { sku } from "/s/buss/wms/sku/info/j/wms.sku.js";
import { initMainColsData as initMainColsData_CSY_DAJ, initDetailColsData as initDetailColsData_CSY_DAJ } from "/s/buss/wms/j/base/wms.paper.add.init.form.udf.CSY_DAJ.js";
import { initMainColsData as initMainColsData_YZBD_NRDW, initDetailColsData as initDetailColsData_YZBD_NRDW } from "/s/buss/wms/j/base/wms.paper.add.init.form.udf.YZBD_NRDW.js";
import { initMainColsData as initMainColsData_BJJK_HUIRUI, initDetailColsData as initDetailColsData_BJJK_HUIRUI } from "/s/buss/wms/j/base/wms.paper.add.init.form.udf.BJJK_HUIRUI.js";
import { initMainColsData as initMainColsData_DEFAULT, initDetailColsData as initDetailColsData_DEFAULT } from "/s/buss/wms/j/base/wms.paper.add.init.form.udf.DEFAULT.js";

export var initDetailColsData = function (_tasktype, _conf) {
    switch (localStorage.projectKey) {
        case "CSY_DAJ": {
            initDetailColsData_CSY_DAJ(_tasktype, _conf);
            return;
        }
        case "YZBD_NRDW": {
            initDetailColsData_YZBD_NRDW(_tasktype, _conf);
            return;
        }
        case "BJJK_HUIRUI": {
            initDetailColsData_BJJK_HUIRUI(_tasktype, _conf);
            return;
        }
        default: {
            initDetailColsData_DEFAULT(_tasktype, _conf);
            return;
        }
    }
}

export var initMainColsData = function (_tasktype) {
    switch (localStorage.projectKey) {
        case "CSY_DAJ": {
            return initMainColsData_CSY_DAJ(_tasktype);
        }
        case "YZBD_NRDW": {
            return initMainColsData_YZBD_NRDW(_tasktype);
        }
        case "BJJK_HUIRUI": {
            return initMainColsData_BJJK_HUIRUI(_tasktype);
        }
        default: {
            return initMainColsData_DEFAULT(_tasktype);
        }
    }
}