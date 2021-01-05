export var doubleDToStrig = function (x1, x2, y1, y2) {
    if (y1 >= y2 && x1 >= x2) {
        return upLeftPath(x1, x2, y1, y2);
    } else if (y1 >= y2 && x1 <= x2) {
        return upRightPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 >= x2) {
        return downLeftPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 <= x2) {
        return downRightPath(x1, x2, y1, y2);
    };
}

var upLeftPath = function (x1, x2, y1, y2) {
    if (x1 - x2 >= 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 + 50) +
            "Q" + x1 + "," + y2 + " " + (x1 - 50) + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 < 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 + x1 - x2) +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 >= 50 && y1 - y2 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + (x1 - y1 + y2) + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
};
var downLeftPath = function (x1, x2, y1, y2) {
    if (x1 - x2 >= 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 - 50) +
            "Q" + x1 + "," + y2 + " " + (x1 - 50) + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 < 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 - x1 + x2) +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 >= 50 && y2 - y1 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + (x1 - y2 + y1) + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
};
var downRightPath = function (x1, x2, y1, y2) {
    if (x2 - x1 >= 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 - 50) +
            "Q" + x1 + "," + y2 + " " + (x1 + 50) + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 < 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 - x2 + x1) +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 >= 50 && y2 - y1 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + (x1 + y2 - y1) + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
};
var upRightPath = function (x1, x2, y1, y2) {
    if (x2 - x1 >= 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 + 50) +
            "Q" + x1 + "," + y2 + " " + (x1 + 50) + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 < 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + (y2 + x2 - x1) +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 >= 50 && y1 - y2 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + (x1 + y1 - y2) + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x1 + "," + y2 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
};
