import { gv } from "/s/buss/g/j/g.v.js";

class GU {
    huiruiImportExcelCols() {
        let excelCols = [
            { index: "A", name: "转移单号" },
            { index: "B", name: "物料号" },
            { index: "C", name: "物料名称" },
            { index: "D", name: "批号" },
            { index: "E", name: "存储号" },
            { index: "F", name: "单位" },
            { index: "G", name: "货位号（FROM）" },
            { index: "H", name: "货位号（TO）" },
            { index: "I", name: "转移量（PLANNING）" },
            { index: "J", name: "转移量（ACTUAL）", hide: true },
            { index: "K", name: "确认", hide: true }];
        return excelCols;
    }
}

var gu = new GU();
window.gu = gu;
export { gu };