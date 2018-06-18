(function() {
    'use strict';

    angular
        .module('main')
        .service('main.bisectionService', Service);

    Service.$inject = [];

    function Service() {
        var self = this;

        /* public method */
        self.bisection = bisection;

        function bisection(equation, a, b, tolerance) {
            self.equation = equation;
            let interaction = 0;
            var result = {};

            while (tolerance > interaction) {
                var midpoint = math.eval((a + b) / 2);

                let resultSolve = solve(midpoint);
                if (resultSolve < 0) {
                    a = midpoint;
                    result.a = a;
                } else {
                    b = midpoint;
                    result.b = b;
                }

                result.equation = resultSolve;
                result.value = math.eval((a + b) / 2);
                interaction++;
            }

            //draw();
            return result;
        }

        function solve(value) {
            return math.eval(self.equation.replace(/[a-zA-Z]+/g, value));
        }

        function draw() {
            try {
                const expr = math.compile(self.equation)

                const xValues = math.range(-10, 10, 0.5).toArray()
                const yValues = xValues.map(function(x) {
                    return expr.eval({ x: x })
                })

                const trace1 = {
                    x: xValues,
                    y: yValues,
                    type: 'scatter'
                }
                const data = [trace1]
                Plotly.newPlot('plot', data)
            } catch (err) {
                console.error(err)
            }
        }
    }
}());