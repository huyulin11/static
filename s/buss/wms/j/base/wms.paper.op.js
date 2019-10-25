import { gf } from "/s/buss/g/j/g.f.js";
import { doInitPaperOp, paperOp, btns } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { submit } from "/s/buss/g/j/g.xlsx.js";

var _tasktype = null;

let _warehouse = gf.urlParam("warehouse");

let chooseByWarehouse = function (model) {
    let temp = [];
    if (!_warehouse) {
        temp = temp.concat(btns.pickVNA);
        temp = temp.concat(btns.pickCold);
        temp = temp.concat(btns.combineVNA);
        temp = temp.concat(btns.combineCold);
    } else {
        if (_warehouse == '1') {
            temp = temp.concat(btns.pickVNA);
            temp = temp.concat(btns.combineVNA);
        }
        if (_warehouse == '2') {
            temp = temp.concat(btns.pickCold);
            temp = temp.concat(btns.combineCold);
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
                tempBtns = [btns.detail, btns.taked, btns.pickOne, btns.cancel, btns.refresh, btns.back,];
                tempBtns = tempBtns.concat(chooseByWarehouse(tempBtns));
            } else if (model == "DETAIL") {
                tempBtns = [btns.refresh,];
            } else if (model == "COMBINED") {
                tempBtns = [btns.refresh,];
                tempBtns = tempBtns.concat(btns.combineVNA);
                tempBtns = tempBtns.concat(btns.combineCold);
            } else if (model == "PICKED") {
                tempBtns = [btns.refresh,];
                tempBtns = tempBtns.concat(btns.taked);
                tempBtns = tempBtns.concat(btns.pickVNA);
                tempBtns = tempBtns.concat(btns.pickCold);
            } else {
                tempBtns = tempBtns.concat(btns.taked);
                tempBtns = tempBtns.concat(btns.pickOne);
                tempBtns = tempBtns.concat(chooseByWarehouse(tempBtns));
                tempBtns = tempBtns.concat(btns.stockOut);
                $("div.doc-buttons").append(`<label class="ui-upload">导入出库单<input type="file" id="upload" style="display: none;" /></label>`);
                $('#upload').on("change", function (e) {
                    submit(e, function (workbook) {
                        for (var sheetName in workbook.Sheets) {
                            if (workbook.Sheets.hasOwnProperty(sheetName)) {
                                let sheet = workbook.Sheets[sheetName];
                                // let json = XLSX.utils.sheet_to_json(sheet);
                                let _paper = {};
                                _paper.warehouse = sheet.A3.v;
                                _paper.company = sheet.B3.v;
                                _paper.name = sheet.C3.v;
                                _paper.items = [];
                                for (let i = 5; i > 0; i++) {
                                    if (i > 20) {
                                        alert("单次最多仅能导入20条明细！");
                                        break;
                                    }
                                    if (sheet["B" + i] && sheet["C" + i]) {
                                        _paper.items.push({ item: sheet["B" + i].v, userdef3: sheet["C" + i].v });
                                    } else { break; }
                                }
                                console.log(JSON.stringify(_paper));
                                $('#upload').val("");
                                sessionStorage.paper = JSON.stringify(_paper);
                                paperOp.add(btns.add);
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