var getM = function (s) {
    var m = s.indexOf('M');
    var l = s.indexOf('L');
    var M = s.substring(m, l);
    return M;
};

var getL1 = function (s) {
    var l1 = s.indexOf('L');
    var q = s.lastIndexOf('Q');
    return s.substring(l1, q);
};

var getL2 = function (s) {
    var l2 = s.lastIndexOf('L');
    return s.slice(l2);
}

export var getMPoint = function (s) {
    var M = getM(s);
    var num = M.indexOf(",");
    var arr = [M.substring(1, num), M.slice(num + 1)];
    var a = parseFloat(arr[0]);
    var b = parseFloat(arr[1]);
    return [a, b];
}

export var getL1Point = function (s) {
    var L1 = getL1(s);
    var num = L1.indexOf(",");
    var arr = [L1.substring(1, num), L1.slice(num + 1)];
    var a = parseFloat(arr[0]);
    var b = parseFloat(arr[1]);
    return [a, b];
}

export var getL2Point = function (s) {
    var L2 = getL2(s);
    var num = L2.indexOf(",");
    var arr = [L2.substring(1, num), L2.slice(num + 1)];
    var a = parseFloat(arr[0]);
    var b = parseFloat(arr[1]);
    return [a, b];
}