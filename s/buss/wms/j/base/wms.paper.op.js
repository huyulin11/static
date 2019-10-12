import { gf } from "/s/buss/g/j/g.f.js";
import { doInitPaperOp, btns } from "/s/buss/wms/j/base/wms.paper.op.obj.js";
import { submit } from "/s/buss/g/j/g.xlsx.js";

var _tasktype = null;

var initPaperOp = function (tasktype, model) {
    _tasktype = tasktype;
    doInitPaperOp(_tasktype);

    let tempBtns = null;
    if (model == "RF") {
        tempBtns = [btns.detail, btns.taked, btns.pickOne, btns.pickMore, btns.cancel, btns.refresh,];
    } else {
        if (localStorage.projectKey == "CSY_DAJ") {
            tempBtns = [btns.add, btns.detail, btns.edit, btns.send,
            btns.cancel, btns.del, btns.refresh,];
            if (_tasktype == "inventory") {
                tempBtns = tempBtns.concat(btns.whichAgv);
            }
        } else {
            tempBtns = [btns.add, btns.detail, btns.edit, btns.send,
            btns.over, btns.del, btns.cancel, btns.refresh, btns.whichOne,];
            if (_tasktype == "shipment") {
                if (model == "DETAIL") {
                    tempBtns = [btns.refresh,];
                } else {
                    tempBtns = tempBtns.concat(btns.taked);
                    tempBtns = tempBtns.concat(btns.pickOne);
                    tempBtns = tempBtns.concat(btns.pickMore);
                    tempBtns = tempBtns.concat(btns.combineVna);
                    tempBtns = tempBtns.concat(btns.stockOut);
                    $("div.doc-buttons").append(`<div><label>导入出库单：</label><input type="file" id="excel-file" multiple /></div>`);
                    $('#excel-file').on("change", function (e) {
                        submit(e, function (workbook) {
                            for (var sheetName in workbook.Sheets) {
                                if (workbook.Sheets.hasOwnProperty(sheetName)) {
                                    debugger
                                    let sheet = workbook.Sheets[sheetName];
                                    let json = XLSX.utils.sheet_to_json(sheet);
                                    console.log(json);
                                }
                            }
                        });
                    });
                }
            } else if (_tasktype == "receipt") {
                tempBtns = tempBtns.concat(btns.execute);
            }
        }
    }
    gf.bindBtns("div.doc-buttons", tempBtns);
}

export { initPaperOp };