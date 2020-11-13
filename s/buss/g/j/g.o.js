import { gv } from "/s/buss/g/j/g.v.js";

class GO {
    trans(o, callback) {
        return callback(o);
    };
    transList(list, callback) {
        let rtn = [];
        for (let o of list) {
            rtn.push(callback(o));
        }
        return rtn;
    };
}

var go = new GO();
window.go = go;
export { go };