import { gf } from "/s/buss/g/j/g.f.js";
import { gv } from "/s/buss/g/j/g.v.js";
import { doInitPaperOp, paperOp, btns } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { submit } from "/s/buss/g/j/g.xlsx.js";

var _tasktype = null;

let _warehouse = gf.urlParam("warehouse");

let chooseByWarehouse = function (model) {
    let temp = [];
    if (!_warehouse) {
        for (let ware of gv.getT("WAREHOUSE")) {
            temp = temp.concat(btns[`pick${ware.key}`]);
            temp = temp.concat(btns[`combine${ware.key}`]);
        }
    } else {
        if (_warehouse) {
            temp = temp.concat(btns[`pick${_warehouse}`]);
            temp = temp.concat(btns[`combine${_warehouse}`]);
        }
    }
    return temp;
}

var initPaperOp = function (tasktype, model) {
    _tasktype = tasktype;
    doInitPaperOp(_tasktype);

    let tempBtns = [];
    if (localStorage.projectKey == "CSY_DAJ") {
        tempBtns = [btns.add, btns.detail, btns.edit, btns.send, btns.cancel, btns.del, btns.refresh,];
        if (_tasktype == "inventory") {
            tempBtns = tempBtns.concat(btns.whichAgv);
        }
    } else {
        tempBtns = [btns.add, btns.detail, btns.edit, btns.send, btns.over, btns.del, btns.cancel, btns.refresh, btns.whichOne,];
        if (_tasktype == "shipment") {
            if (model == "RF") {
                tempBtns = [btns.detail, btns.pickOne, btns.cancel, btns.refresh, btns.back,];
                tempBtns = tempBtns.concat(chooseByWarehouse(tempBtns));
            } else if (model == "DETAIL") {
                tempBtns = [btns.refresh,];
            } else if (model == "COMBINED") {
                tempBtns = [btns.refresh,];
                for (let ware of gv.getT("WAREHOUSE")) {
                    tempBtns = tempBtns.concat(btns[`combine${ware.key}`]);
                }
            } else if (model == "PICKED") {
                tempBtns = [btns.refresh,];
                for (let ware of gv.getT("WAREHOUSE")) {
                    tempBtns = tempBtns.concat(btns[`pick${ware.key}`]);
                }
            } else {
                tempBtns = tempBtns.concat(btns.pickOne);
                tempBtns = tempBtns.concat(chooseByWarehouse(tempBtns));
                tempBtns = tempBtns.concat(btns.stockOut);
                $("div.doc-buttons").append(`<label class="ui-upload">导入出库单<input type="file" id="upload" style="display: none;" />
                <input type="checkbox" id="importthenedit" title="选中后导入进入编辑界面" ${localStorage.importThenEdit ? "checked" : ""}></label>`);
                $('div.doc-buttons').delegate("input:checkbox#importthenedit", "change", function (e) {
                    if (this.checked) {
                        localStorage.importThenEdit = true;
                    } else {
                        localStorage.importThenEdit = "";
                    }
                });
                $('#upload').on("change", function (e) {
                    submit(e, function (workbook) {
                        for (var sheetName in workbook.Sheets) {
                            if (workbook.Sheets.hasOwnProperty(sheetName)) {
                                let sheet = workbook.Sheets[sheetName];
                                // let json = XLSX.utils.sheet_to_json(sheet);
                                let _paper = {};
                                _paper.warehouse = sheet.A3.v;
                                for (let ware of gv.getT("WAREHOUSE")) {
                                    if (ware.value == _paper.warehouse) {
                                        _paper.warehouse = ware.key;
                                    }
                                }

                                _paper.company = sheet.B3.v;
                                _paper.name = sheet.C3.v;

                                for (let i = 5; i > 0; i++) {
                                    if (i > 20) {
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
        } else if (_tasktype == "receipt") {
            tempBtns = tempBtns.concat(btns.execute);
            tempBtns = tempBtns.concat(btns.receiptColdOne);
            tempBtns = tempBtns.concat(btns.receiptColdMore);
        }
    }
    gf.bindBtns("div.doc-buttons", tempBtns);
}

export { initPaperOp };