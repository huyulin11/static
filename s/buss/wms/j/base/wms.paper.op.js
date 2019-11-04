import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
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

var initPaperOp = function (tasktype, optype) {
    _tasktype = tasktype;
    doInitPaperOp(_tasktype);

    let tempBtns = [];
    if (localStorage.projectKey == "CSY_DAJ") {
        tempBtns = [btns.add, btns.detail, btns.edit, btns.send, btns.del, btns.refresh,];
        if (_tasktype == "inventory") {
            tempBtns = tempBtns.concat(btns.whichAgv);
        }
    } else {
        tempBtns = [btns.add, btns.detail, btns.edit, btns.send, btns.over, btns.del, btns.refresh, btns.whichOne,];
        if (_tasktype == "shipment") {
            if (optype == "RF") {
                tempBtns = [btns.detail, btns.refresh, btns.back,];
                tempBtns = tempBtns.concat(chooseByWarehouse());
            } else if (optype == "DETAIL") {
                tempBtns = [btns.refresh,];
            } else if (optype == "PRIORITY") {
                tempBtns = [btns.refresh, btns.back,];
            } else if (optype == "COMBINED") {
                tempBtns = [btns.refresh, btns.deleteSure,];
            } else if (optype == "PICKED") {
                tempBtns = [btns.refresh, btns.back, btns.deleteSure,];
            } else if (optype == "PICKED_COLD") {
                tempBtns = [btns.refresh, btns.back, btns.callAgv, btns.backAgv, btns.deleteSure,];
            } else if (optype == "PICKED_NORMAL") {
                tempBtns = [btns.refresh, btns.back, btns.deleteSure,];
            } else if (optype == "COMBINE") {
                tempBtns = [btns.refresh, btns.back,];
            } else {
                tempBtns = tempBtns.concat(chooseByWarehouse());
            }
        } else if (_tasktype == "receipt") {
            tempBtns = tempBtns.concat(btns.execute);
            tempBtns = tempBtns.concat(btns.receiptColdMore);
        } else if (_tasktype == "transfer") {
            tempBtns = tempBtns.concat(btns[`combine`]);
            tempBtns = tempBtns.concat(btns[`pick`]);
            tempBtns = tempBtns.concat(btns.deleteSub);
            $("div.doc-buttons").append(`<label class="ui-upload">导入出库单<input multiple type="file" id="upload" style="display: none;" />
            <input type="checkbox" id="importthenedit" title="选中后导入进入编辑界面" ${localStorage.importThenEdit ? "checked" : ""}></label>`);
            $('div.doc-buttons').delegate("input:checkbox#importthenedit", "change", function (e) {
                if (this.checked) {
                    localStorage.importThenEdit = true;
                } else {
                    localStorage.importThenEdit = "";
                }
            });
            $('#upload').on("change", function (e) {
                var files = e.target.files;
                if (files.length > 1 && localStorage.importThenEdit) {
                    layer.msg("编辑模式下仅能单个导入");
                    $('#upload').val("");
                    return;
                }
                submit(e, function (workbook) {
                    for (var sheetName in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheetName)) {
                            let sheet = workbook.Sheets[sheetName];
                            let _paper = {};
                            _paper.paperid = sheet.B3.v;
                            _paper.name = sheet.C3.v;

                            for (let i = 5; i > 0; i++) {
                                if (i > 25) {
                                    alert("单次最多仅能导入20条明细！");
                                    break;
                                }
                                if (sheet["B" + i] && sheet["C" + i]) {
                                    if (localStorage.importThenEdit) {
                                        if (!_paper.list) _paper.list = [];
                                        _paper.list.push({ item: sheet["B" + i].v, userdef3: sheet["C" + i].v });
                                    }
                                    else {
                                        _paper[`item[${i}]`] = sheet["B" + i].v
                                        _paper[`userdef3[${i}]`] = sheet["C" + i].v;
                                    }
                                } else { break; }
                            }
                            $('#upload').val("");
                            if (localStorage.importThenEdit) {
                                sessionStorage.paper = JSON.stringify(_paper);
                                paperOp.add(btns.add);
                            } else {
                                gf.doAjax({
                                    url: `/${_tasktype}/detail/addEntity.shtml`,
                                    data: _paper, dataType: "json"
                                });
                            }
                        }
                    }
                });
            });
        }
    }
    gf.bindBtns("div.doc-buttons", tempBtns);
}

export { initPaperOp };