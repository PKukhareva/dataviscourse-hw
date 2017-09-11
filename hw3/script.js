/**
 * Makes the first bar chart appear as a staircase.
 *
 * Note: use only the DOM API, not D3!
 */
function staircase() {
    // ****** PART II ******
    let chartChildren = document.getElementById("barChart1").getElementsByTagName("rect");
    let heightArray = [];

    for (var j = 0; j<chartChildren.length; j++){
      let rect = chartChildren[j];
      heightArray.push (rect.getAttribute("height")*1);
    }

    heightArray.sort(function(a, b){return a - b});

    for (var j = 0; j<chartChildren.length; j++){
      chartChildren[j].setAttribute("height",heightArray[j]);
    }
}

/**
 * Render the visualizations
 * @param error
 * @param data
 */
function update(error, data) {
    if (error !== null) {
        alert('Could not load the dataset!');
    } else {
        // D3 loads all CSV data as strings;
        // while Javascript is pretty smart
        // about interpreting strings as
        // numbers when you do things like
        // multiplication, it will still
        // treat them as strings where it makes
        // sense (e.g. adding strings will
        // concatenate them, not add the values
        // together, or comparing strings
        // will do string comparison, not
        // numeric comparison).

        // We need to explicitly convert values
        // to numbers so that comparisons work
        // when we call d3.max()

        for (let d of data) {
            d.a = +d.a;
            d.b = +d.b;
        }
    }

    // Set up the scales
    let aScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.a)])
        .range([0, 150]);
    let bScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.b)])
        .range([0, 150]);
    let iScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 110]);


    // ****** PART III (you will also edit in PART V) ******

    // Select and update the 'a' bar chart bars

    let rects1 = d3.selectAll("#barChart1 rect").data(data);
    rects1.attr("height", function (d, i) {
          return aScale(d.a);
        })
        .attr("x", function (d, i) {
              return 10 + iScale(i);
        })
        .on('mouseover', function(d) {
            d3.select(this).style("fill", "red");
        })
        .on('mouseout', function(d) {
            d3.select(this).style("fill", "steelblue");
        })

    // Select and update the 'b' bar chart bars

    let rects2 = d3.selectAll("#barChart2 rect").data(data);
    rects2.attr("height", function (d, i) {
          return bScale(d.b);
        })
        .attr("x", function (d, i) {
              return 10 + iScale(i);
        })
        .on('mouseover', function(d) {
            d3.select(this).style("fill", "red");
        })
        .on('mouseout', function(d) {
            d3.select(this).style("fill", "steelblue");
        })
    // Select and update the 'a' line chart path using this line generator

    let aLineGenerator = d3.line()
        .x((d, i) => iScale(i))
        .y((d) => aScale(d.a));

    let lineA = aLineGenerator (data);
    let line1 = d3.selectAll("#lineChart1 path");
    line1.attr("d", function (d, i) {
          return lineA;
        })



    // Select and update the 'b' line chart path (create your own generator)
    let bLineGenerator = d3.line()
        .x((d, i) => iScale(i))
        .y((d) => aScale(d.b));

    let lineB = bLineGenerator (data);
    let line2 = d3.selectAll("#lineChart2 path");
    line2.attr("d", function (d, i) {
          return lineB;
        })

    // Select and update the 'a' area chart path using this area generator
    let aAreaGenerator = d3.area()
        .x((d, i) => iScale(i))
        .y0(0)
        .y1(d => aScale(d.a));

    let areaA = aAreaGenerator (data);
    let area1 = d3.selectAll("#areaChart1 path");
    area1.attr("d", function (d, i) {
          return areaA;
        })
    // Select and update the 'b' area chart path (create your own generator)
    let bAreaGenerator = d3.area()
        .x((d, i) => iScale(i))
        .y0(0)
        .y1(d => aScale(d.b));

    let areaB = bAreaGenerator (data);
    let area2 = d3.selectAll("#areaChart2 path");
    area2.attr("d", function (d, i) {
          return areaB;
        })
    // Select and update the scatterplot points
    let scatterPlot = d3.selectAll("#ScatterPlot circle").data(data);
    scatterPlot.
        attr("cx", function (d) {
          return aScale(d.a);
        })
        .attr("cy", function (d) {
          return aScale(d.b);
        })
        .on('click', function(d) {
            console.log (d.a + ';' + d.b);
          });
        })



    // ****** TODO: PART IV ******

}

/**
 * Load the file indicated by the select menu
 */
function changeData() {
    let dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        randomSubset();
    }
    else {
        d3.csv('data/' + dataFile + '.csv', update);
    }
}

/**
 *   Load the file indicated by the select menu, and then slice out a random chunk before passing the data to update()
 */
function randomSubset() {
    let dataFile = document.getElementById('dataset').value;
    changeData();
    if (document.getElementById('random').checked) {
        d3.csv('data/' + dataFile + '.csv', function (error, data) {
            let subset = [];
            for (let d of data) {
                if (Math.random() > 0.5) {
                    subset.push(d);
                }
            }
            update(error, subset);
        });
    }
    else {
        changeData();
    }
}
