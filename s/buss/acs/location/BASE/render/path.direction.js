export var dToStrig = function (x1, x2, y1, y2) {
    if (y1 >= y2 && x1 >= x2) {
        return leftUpPath(x1, x2, y1, y2);
    } else if (y1 >= y2 && x1 <= x2) {
        return rightUpPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 >= x2) {
        return leftDownPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 <= x2) {
        return rightDownPath(x1, x2, y1, y2);
    };
}

var leftUpPath = function (x1, x2, y1, y2) {
    if (x1 - x2 >= 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - 50) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 < 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - x1 + x2) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 >= 50 && y1 - y2 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + y1 - y2) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    }
};
var leftDownPath = function (x1, x2, y1, y2) {
    if (x1 - x2 >= 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + 50) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 < 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + x1 - x2) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 >= 50 && y2 - y1 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + y2 - y1) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    }
};
var rightDownPath = function (x1, x2, y1, y2) {
    if (x2 - x1 >= 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + 50) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 < 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + x2 - x1) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 >= 50 && y2 - y1 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - y2 + y1) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    }
};
var rightUpPath = function (x1, x2, y1, y2) {
    if (x2 - x1 >= 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - 50) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 < 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - x2 + x1) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 >= 50 && y1 - y2 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - y1 + y2) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2;
    }
};
