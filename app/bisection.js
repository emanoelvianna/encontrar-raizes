f = function(x) {
    return Math.pow(x, 3) - Math.pow(x, 2) - 4 * x + 2
}

var left = -2.0;
var right = -1.0;
var tolerance = 0.1;
while (right - left > tolerance) {
    var mid = (left + right) / 2;
    if (f(left) * f(mid) > 0) {
        left = mid;
    } else {
        right = mid;
    }
}

//alert((left + right) / 2)