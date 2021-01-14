export var dragDashPoint4 = function (id, x, y) {
    var x2 = parseFloat($('[num=' + id + '1]').attr('cx'));
    var y2 = parseFloat($('[num=' + id + '1]').attr('cy'));
    var width = x - x2;
    var height = y - y2;
    if (width >= 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y2)
            .attr('width', width)
            .attr('height', height);
        $('[num=' + id + '2]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y;
        });
    } else if (width < 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y2)
            .attr('width', 20)
            .attr('height', height);
        $('[num=' + id + '2]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y;
        });
    } else if (width >= 20 && height < 20) {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y2)
            .attr('width', width)
            .attr('height', 20);
        $('[num=' + id + '2]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 + 20;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2 + 20;
        });
    } else {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y2)
            .attr('width', 20)
            .attr('height', 20);
        $('[num=' + id + '2]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 + 20;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y2 + 20;
        });
    };
    $('[num=' + id + '1]').attr('cx', function () {
        return x2;
    }).attr('cy', function () {
        return y2;
    });
}
export var dragDashPoint3 = function (id, x, y) {
    var x2 = parseFloat($('[num=' + id + '2]').attr('cx'));
    var y2 = parseFloat($('[num=' + id + '2]').attr('cy'));
    var width = x2 - x;
    var height = y - y2;
    if (width >= 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x)
            .attr('y', y2)
            .attr('width', width)
            .attr('height', height);
        $('[num=' + id + '1]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y;
        });
    } else if (width < 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x2 - 20)
            .attr('y', y2)
            .attr('width', 20)
            .attr('height', height);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y;
        });
    } else if (width >= 20 && height < 20) {
        d3.select('#rect' + id)
            .attr('x', x)
            .attr('y', y2)
            .attr('width', width)
            .attr('height', 20);
        $('[num=' + id + '1]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2 + 20;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 + 20;
        });
    } else {
        d3.select('#rect' + id)
            .attr('x', x2 - 20)
            .attr('y', y2)
            .attr('width', 20)
            .attr('height', 20);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y2;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y2 + 20;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 + 20;
        });
    };
    $('[num=' + id + '2]').attr('cx', function () {
        return x2;
    }).attr('cy', function () {
        return y2;
    });
}
export var dragDashPoint2 = function (id, x, y) {
    var x2 = parseFloat($('[num=' + id + '3]').attr('cx'));
    var y2 = parseFloat($('[num=' + id + '3]').attr('cy'));
    var width = x - x2;
    var height = y2 - y;
    if (width >= 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2;
        });
    } else if (width < 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y)
            .attr('width', 20)
            .attr('height', height);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y2;
        });
    } else if (width >= 20 && height < 20) {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y2 - 20)
            .attr('width', width)
            .attr('height', 20);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2 + width;
        }).attr('cy', function () {
            return y2;
        });
    } else {
        d3.select('#rect' + id)
            .attr('x', x2)
            .attr('y', y2 - 20)
            .attr('width', 20)
            .attr('height', 20);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '4]').attr('cx', function () {
            return x2 + 20;
        }).attr('cy', function () {
            return y2;
        });
    };
    $('[num=' + id + '3]').attr('cx', function () {
        return x2;
    }).attr('cy', function () {
        return y2;
    });
}
export var dragDashPoint1 = function (id, x, y) {
    var x2 = parseFloat($('[num=' + id + '4]').attr('cx'));
    var y2 = parseFloat($('[num=' + id + '4]').attr('cy'));
    var width = x2 - x;
    var height = y2 - y;
    if (width >= 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x)
            .attr('y', y)
            .attr('width', width)
            .attr('height', height);
        $('[num=' + id + '1]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x + width;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y + height;
        });
    } else if (width < 20 && height >= 20) {
        d3.select('#rect' + id)
            .attr('x', x2 - 20)
            .attr('y', y)
            .attr('width', 20)
            .attr('height', height);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x + width;
        }).attr('cy', function () {
            return y;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y2;
        });;
    } else if (width >= 20 && height < 20) {
        d3.select('#rect' + id)
            .attr('x', x)
            .attr('y', y2 - 20)
            .attr('width', width)
            .attr('height', 20);
        $('[num=' + id + '1]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x;
        }).attr('cy', function () {
            return y2;
        });
    } else {
        d3.select('#rect' + id)
            .attr('x', x2 - 20)
            .attr('y', y2 - 20)
            .attr('width', 20)
            .attr('height', 20);
        $('[num=' + id + '1]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '2]').attr('cx', function () {
            return x2;
        }).attr('cy', function () {
            return y2 - 20;
        });
        $('[num=' + id + '3]').attr('cx', function () {
            return x2 - 20;
        }).attr('cy', function () {
            return y2;
        });
    };
    $('[num=' + id + '4]').attr('cx', function () {
        return x2;
    }).attr('cy', function () {
        return y2;
    })
}