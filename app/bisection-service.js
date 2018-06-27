function bisection(equation, a, b, tolerance) {
    let epsilon = 0.00001;
    let interaction = 0;
    let midpoint = 0;
    let results = [];

    while ((b - a) > epsilon) {
        midpoint = math.eval((a + b) / 2);
        let y_m = solve(midpoint, equation);
        let y_a = solve(a, equation);

        if ((y_m > 0 && y_a < 0) || (y_m < 0 && y_a > 0)) {
            b = midpoint;
        } else {
            a = midpoint;
        }
        interaction++;

        let result = {
            n: interaction,
            a: a,
            b: b,
            x: midpoint,
            f: y_m
        }
        results.push(result);
    }
    drawTable(results);
    console.log("- Solução aproximada: ");
    return midpoint;
}

function solve(value, equation) {
    return math.eval(equation.replace(/[xy]+/g, value));
}

function drawTable(results) {
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    let row;

    results.reverse();
    results.filter(function(result) {
        row = table.insertRow(0);
        row.insertCell(0).appendChild(document.createTextNode(result.n));
        row.insertCell(1).appendChild(document.createTextNode(result.x));
        row.insertCell(2).appendChild(document.createTextNode(result.f));
    });
    row = table.insertRow(0);
    row.insertCell(0).appendChild(document.createTextNode("n"));
    row.insertCell(1).appendChild(document.createTextNode("x"));
    row.insertCell(2).appendChild(document.createTextNode("f(x)"));
}

function drawGraph(equation) {
    try {
        const expr = math.compile(equation)

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