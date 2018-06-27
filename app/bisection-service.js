var newEquation;

function bisection(equation, a, b, tolerance) {
    let epsilon = 0.00001;
    let interaction = 0;
    let midpoint = 0;
    let results = [];
    newEquation = equation;

    while ((b - a) > epsilon) {
        midpoint = math.eval((a + b) / 2);
        let y_m = solve(midpoint);
        let y_a = solve(a);

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
    draw(results);
    console.log("- Solução aproximada: ");
    return midpoint;
}

function draw(results) {
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    let row;

    results.reverse();
    results.filter(function(result) {
        row = table.insertRow(0);
        row.insertCell(0).appendChild(document.createTextNode(result.n));
        row.insertCell(1).appendChild(document.createTextNode(result.a));
        row.insertCell(2).appendChild(document.createTextNode(result.b));
        row.insertCell(3).appendChild(document.createTextNode(result.f));
    });
    row = table.insertRow(0);
    row.insertCell(0).appendChild(document.createTextNode("n"));
    row.insertCell(1).appendChild(document.createTextNode("a"));
    row.insertCell(2).appendChild(document.createTextNode("b"));
    row.insertCell(3).appendChild(document.createTextNode("f(x)"));

    try {
        const expr = math.compile(newEquation)

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

function solve(value) {
    return math.eval(newEquation.replace(/[xy]+/g, value));
}