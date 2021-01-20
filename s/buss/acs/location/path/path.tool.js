export var pathTool = {};

pathTool.markerRadian = function (x1, x2, y1, y2) {
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

pathTool.dPath = function (x1, x2, y1, y2) {
    if (y1 >= y2 && x1 >= x2) {
        return leftUpPath(x1, x2, y1, y2);
    } else if (y1 >= y2 && x1 <= x2) {
        return rightUpPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 >= x2) {
        return leftDownPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 <= x2) {
        return rightDownPath(x1, x2, y1, y2);
    }
}

pathTool.dDoublePath = function (x1, x2, y1, y2) {
    if (y1 >= y2 && x1 >= x2) {
        return upLeftPath(x1, x2, y1, y2);
    } else if (y1 >= y2 && x1 <= x2) {
        return upRightPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 >= x2) {
        return downLeftPath(x1, x2, y1, y2);
    } else if (y1 <= y2 && x1 <= x2) {
        return downRightPath(x1, x2, y1, y2);
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

var leftUpPath = function (x1, x2, y1, y2) {
    if (x1 - x2 >= 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - 50) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 < 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - x1 + x2) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 >= 50 && y1 - y2 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + y1 - y2) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
}

var leftDownPath = function (x1, x2, y1, y2) {
    if (x1 - x2 >= 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + 50) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 < 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + x1 - x2) +
            "L" + x2 + "," + y2;
    } else if (x1 - x2 >= 50 && y2 - y1 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 + y2 - y1) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
}

var rightDownPath = function (x1, x2, y1, y2) {
    if (x2 - x1 >= 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + 50) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 < 50 && y2 - y1 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 + x2 - x1) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 >= 50 && y2 - y1 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - y2 + y1) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
}

var rightUpPath = function (x1, x2, y1, y2) {
    if (x2 - x1 >= 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - 50) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - 50) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 < 50 && y1 - y2 >= 50) {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + (y1 - x2 + x1) +
            "L" + x2 + "," + y2;
    } else if (x2 - x1 >= 50 && y1 - y2 < 50) {
        return "M" + x1 + "," + y1 +
            "L" + (x2 - y1 + y2) + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    } else {
        return "M" + x1 + "," + y1 +
            "L" + x1 + "," + y1 +
            "Q" + x2 + "," + y1 + " " + x2 + "," + y2 +
            "L" + x2 + "," + y2;
    }
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
}

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
}

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
}

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
}