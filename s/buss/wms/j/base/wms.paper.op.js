import { gf } from "/s/buss/g/j/g.f.js";
import { gu } from "/s/buss/g/j/g.u.js";
import { doInitPaperOp, paperOp, btns } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { submit } from "/s/buss/g/j/g.xlsx.js";

var _tasktype = null;

let _warehouse = gf.urlParam("warehouse");

let chooseByWarehouse = function () {
    let temp = [];
    if (!_warehouse) {
        // temp = temp.concat(btns[`pick`]);
        // temp = temp.concat(btns[`combine`]);
    } else {
        if (_warehouse) {
            temp = temp.concat(btns[`pick${_warehouse}`]);
        }
    }
    return temp;
}

var dealSheet = function (sheet) {
    let _paper = {};
    _paper.orderid = sheet.C8.v;
    _paper.name = sheet.E8.v;

    let index = 200;
    let checkRepeat = [];
    for (let i = 12; i > 0; i++) {
        if (i > index + 12) {
            alert("单次最多仅能导入" + index + "条明细！");
            break;
        }
        if (sheet["A" + i] && sheet["E" + i]) {
            let key = sheet["A" + i].v + "-" + sheet["E" + i].v;
            if (checkRepeat.includes(key)) {
                alert("存在重复数据！转移单号、SU：" + key);
                return;
            } else {
                checkRepeat.push(key);
            }
        }
        if (sheet["E" + i] && sheet["G" + i]) {
            if (localStorage.importThenEdit) {
                if (!_paper.list) _paper.list = [];
                _paper.list.push({ item: sheet["E" + i].v, userdef3: sheet["G" + i].v });
            }
            else {
                _paper[`index[${i}]`] = i;
                _paper[`item[${i}]`] = sheet["E" + i].v;
                _paper[`userdef3[${i}]`] = sheet["G" + i].v;

                let jsonObj = {};
                for (let seq of gu.huiruiImportExcelCols()) {
                    let t = sheet[seq.index + i];
                    jsonObj[seq.index] = t ? t.v : "";
                }
                _paper[`json[${i}]`] = JSON.stringify(jsonObj);
            }
        } else { break; }
    }
    if (localStorage.importThenEdit) {
        sessionStorage.paper = JSON.stringify(_paper);
        paperOp.add(btns.add);
    } else {
        gf.doAjax({
            url: `/${_tasktype}/detail/addEntity.shtml`,
            data: _paper, dataType: "json", type: "POST"
        });
    }
    gf.layerMsg("数据导入操作已提交，请在本页面等待提交结果，数据过多时等待的时间会比较久！");
}

var initPaperOp = function (tasktype, optype) {
    _tasktype = tasktype;
    doInitPaperOp(_tasktype);

    let tempBtns = [];
    switch (localStorage.projectKey) {
        case "CSY_DAJ": {
            tempBtns = [btns.add, btns.detail, btns.edit, btns.send, btns.del, btns.refresh,];
            if (_tasktype == "inventory") {
                tempBtns = tempBtns.concat(btns.whichAgv);
            }
            break;
        }
        case "YZBD_NRDW": {
            tempBtns = [btns.add, btns.detail, btns.edit, btns.send, btns.del, btns.refresh,];
            if (_tasktype == "inventory") {
                tempBtns = tempBtns.concat(btns.whichAgv);
            }
            break;
        }
        case "BJJK_HUIRUI": {
            if (_tasktype == "shipment") {
                tempBtns = [btns.detail, btns.refresh,];
                if (optype == "RF") {
                    tempBtns = [btns.detail, btns.refresh, btns.back,];
                    tempBtns = tempBtns.concat(chooseByWarehouse());
                } else if (optype == "DETAIL") {
                    tempBtns = [btns.refresh,];
                } else if (optype == "PRIORITY") {
                    tempBtns = [btns.refresh, btns.editSeqDetail, btns.editSeq2, btns.editSeq3, btns.editSeq1, btns.back,];
                } else if (optype == "COMBINED") {
                    tempBtns = [btns.refresh, btns.deleteSure,];
                } else if (optype == "PICKED") {
                    tempBtns = [btns.refresh, btns.back, btns.deleteSure,];
                } else if (optype == "PICKED_COLD") {
                    tempBtns = [btns.refresh, btns.callShipmentFromCold, btns.backShipmentToCold, btns.deleteSure,];
                } else if (optype == "PICKED_NORMAL") {
                    tempBtns = [btns.refresh,];
                } else if (optype == "COMBINE") {
                    tempBtns = [btns.refresh, btns.deleteSure,];
                } else {
                    tempBtns = tempBtns.concat(chooseByWarehouse());
                }
            } else if (_tasktype == "receipt") {
                tempBtns = [btns.detail, btns.send, btns.del, btns.over, btns.refresh, btns.whichOne,];
                tempBtns = tempBtns.concat(btns.execute);
            } else if (_tasktype == "transfer") {
                tempBtns = [btns.detail, btns.send, btns.refresh,];
                tempBtns = tempBtns.concat(btns.deleteSub);
                // tempBtns = tempBtns.concat(btns[`combine`]);
                // tempBtns = tempBtns.concat(btns[`pick`]);
                // $('div.doc-buttons').delegate("input:checkbox#importthenedit", "change", function (e) {
                // <input type="checkbox" id="importthenedit" title="选中后导入进入编辑界面" ${localStorage.importThenEdit ? "checked" : ""}>
                //     if (this.checked) {
                //         localStorage.importThenEdit = true;
                //     } else {
                //         localStorage.importThenEdit = "";
                //     }
                // });
                $("div.doc-buttons").append(`<label class="ui-upload">
                导入转移单<input multiple type="file" id="upload" style="display: none;" />
                </label>`);
                $('#upload').on("change", function (e) {
                    var files = e.target.files;
                    if (files.length > 1 && localStorage.importThenEdit) {
                        gf.layerMsg("编辑模式下仅能单个导入");
                        $('#upload').val("");
                        return;
                    }
                    submit(e, function (workbook) {
                        let sheet = workbook.Sheets[workbook.SheetNames[0]];
                        dealSheet(sheet);
                        $('#upload').val("");
                    });
                });
            }
            break;
        }
    }
    gf.bindBtns("div.doc-buttons", tempBtns);
}

export { initPaperOp };