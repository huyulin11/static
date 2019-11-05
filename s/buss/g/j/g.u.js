import { gv } from "/s/buss/g/j/g.v.js";

class GU {
    huiruiImportExcelCols() {
        let excelCols = {
            "A": "转移单号", "B": "物料号", "C": "物料名称",
            "D": "批号", "E": "存储号", "F": "单位",
            "G": "货位号（FROM）", "H": "货位号（TO）",
            "I": "转移量（PLANNING）", "J": "转移量（ACTUAL）", "K": "确认"
        };
        return excelCols;
    }
}

var gu = new GU();
window.gu = gu;
export { gu };