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
            let epsilon = 0.00001;
            let interaction = 0;
            let midpoint = 0;
            self.equation = equation;

            while (interaction < tolerance) {
                midpoint = math.eval((a + b) / 2);
                let y_m = solve(midpoint);
                let y_a = solve(a);

                if ((y_m > 0 && y_a < 0) || (y_m < 0 && y_a > 0)) {
                    b = midpoint;
                } else {
                    a = midpoint;
                }
                interaction++;
                console.log("n:" + interaction + " ; a:" + a + "; b:" + b + " ; x:" + midpoint + " ; f(x):" + y_m);
            }
            draw();
            console.log("- Solução aproximada: ");
            return midpoint;
        }

        function solve(value) {
            let newEquation = self.equation.replace(/[xy]+/g, value);
            return math.eval(newEquation);
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