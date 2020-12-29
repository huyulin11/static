export var drawArrow = function (x1, x2, y1, y2) {
    if (x1 >= x2 && y1 >= y2) {
        return arrowLeftUp(x1, x2, y1, y2);
    } else if (x1 >= x2 && y1 < y2) {
        return arrowLeftDown(x1, x2, y1, y2);
    } else if (x1 < x2 && y1 >= y2) {
        return arrowRightUp(x1, x2, y1, y2);
    } else {
        return arrowRightDown(x1, x2, y1, y2);
    }
}

var arrowLeftUp = function (x1, x2, y1, y2) {
    var yLen = y1 - y2;
    var xLen = x1 - x2;
    var yPos = y2 + 6.5;
    var proportion = 6.5 / yLen;
    var xPos = x2 + xLen * proportion;
    var dx = x2 - xPos,
        dy = yPos - y1,
        angle = -Math.atan2(dx, dy);
    if (y1 - y2 <= 50 && y1 - y2 > 40) {
        return angle - 100;
    } else if (y1 - y2 <= 40 && y1 - y2 > 20) {
        return angle - 102.5;
    } else if (y1 - y2 <= 20 && y1 - y2 > 5) {
        return angle - 120;
    } else if (y1 - y2 <= 5 && y1 - y2 >= 0) {
        return 180;
    } else return "auto";
}
var arrowLeftDown = function (x1, x2, y1, y2) {
    var yLen = y2 - y1;
    var xLen = x1 - x2;
    var yPos = y2 - 6.5;
    var proportion = 6.5 / yLen;
    var xPos = x2 + xLen * proportion;
    var dx = x2 - xPos,
        dy = yPos - y1,
        angle = Math.atan2(dx, dy);
    if (y2 - y1 <= 50 && y2 - y1 > 40) {
        return angle + 100;
    } else if (y2 - y1 <= 40 && y2 - y1 > 20) {
        return angle + 102.5;
    } else if (y2 - y1 <= 20 && y2 - y1 > 5) {
        return angle + 120;
    } else if (y2 - y1 <= 5 && y2 - y1 >= 0) {
        return 180;
    } else return "auto";
}
var arrowRightUp = function (x1, x2, y1, y2) {
    var yLen = y1 - y2;
    var xLen = x2 - x1;
    var yPos = y2 + 6.5;
    var proportion = 6.5 / yLen;
    var xPos = x2 - xLen * proportion;
    var dx = x2 - xPos,
        dy = yPos - y1,
        angle = Math.atan2(dx, dy);
    if (y1 - y2 <= 50 && y1 - y2 > 40) {
        return angle - 82.5;
    } else if (y1 - y2 <= 40 && y1 - y2 > 20) {
        return angle - 80;
    } else if (y1 - y2 <= 20 && y1 - y2 > 5) {
        return angle - 60;
    } else if (y1 - y2 <= 5 && y1 - y2 >= 0) {
        return 0;
    } else return "auto";
}
var arrowRightDown = function (x1, x2, y1, y2) {
    var yLen = y2 - y1;
    var xLen = x2 - x1;
    var yPos = y2 - 6.5;
    var proportion = 6.5 / yLen;
    var xPos = x2 - xLen * proportion;
    var dx = x2 - xPos,
        dy = yPos - y1,
        angle = Math.atan2(dx, dy);
    if (y2 - y1 <= 50 && y2 - y1 > 40) {
        return angle + 82.5;
    } else if (y2 - y1 <= 40 && y2 - y1 > 20) {
        return angle + 80;
    } else if (y2 - y1 <= 20 && y2 - y1 > 5) {
        return angle + 60;
    } else if (y2 - y1 <= 5 && y2 - y1 >= 0) {
        return 0;
    } else return "auto";
}