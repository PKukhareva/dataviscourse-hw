/** Class implementing the bar chart view. */
class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor(worldMap, infoPanel, allData) {
        this.worldMap = worldMap;
        this.infoPanel = infoPanel;
        this.allData = allData;
    }

    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */

    updateBarChart(selectedDimension) {

      // ******* TODO: PART I *******


      // Create the x and y scales; make
      // sure to leave room for the axes

      // Create colorScale

      // Create the axes (hint: use #xAxis and #yAxis)

      // Create the bars (hint: use #bars)
      let data = this.allData;
      let  worldMap = this.worldMap;
      let infoPanel = this.infoPanel;
      data = data.sort(function compare(a, b) {return a.year - b.year});
      let margin = {top: 20, right: 30, bottom: 30, left: 40};
      let height = 350;
      let width = 400 - margin.top - margin.bottom;
      let textWidth = 80;

      let max = d3.max(data, d =>d[selectedDimension]);
      let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d =>d[selectedDimension])])
        .range([height, 0])
        .nice();
      let xScale = d3.scaleBand()
        .range([60, width]).padding(.1)
        .domain(data.map(d => d.year));

      let types = ["attendance", "teams", "matches","goals"];
      let colorScale = d3.scaleOrdinal()
          .domain(types)
          .range(colorbrewer.Accent[4]);

    let xAxis = d3.axisBottom();

    console.log(xAxis);
    xAxis.scale(xScale);

    let yAxis = d3.axisLeft();
    yAxis.scale(yScale);

    d3.select("#xAxis")
        .classed("axis", true)
        .attr("transform", "translate(" + 10 + "," + width + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-60)");

    d3.select("#yAxis")
            .classed("axis", true)
            .attr("transform", "translate(" + 60 + "," + 0 + ")")
            .call(yAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-30)");


      let barChart1 = d3.select("#bars");
      console.log(barChart1);
      let rects1 = barChart1.selectAll("rect").data(data);
      console.log(data);
      let newRects1 = rects1.enter().append("rect")
        .attr("height", function (d) { return height - yScale(d[selectedDimension]);})
        .attr("x", function (d, i) {return xScale(d.year)})
        .attr("y", 0)
        .attr("width", 10)
        .style("fill","steelblue")
        ;

      rects1.exit()
        .style("opacity", 1)
        .transition()
        .duration(2000)
        .style("opacity", 0.1)
        .remove();


      rects1 = newRects1.merge(rects1);

      rects1
        .transition()
        .duration(1000)
        .attr("height", function (d) {return height -  yScale(d[selectedDimension]);})
        .attr("x", function (d, i) {return 11 + xScale(d.year)})
        .attr("y", 0)
        .attr("width", 10)
        .style("fill","steelblue")
        ;










        // ******* TODO: PART II *******

        // Implement how the bars respond to click events
        // Color the selected bar to indicate is has been selected.
        // Make sure only the selected bar has this new color.

        // Call the necessary update functions for when a user clicks on a bar.
        // Note: think about what you want to update when a different bar is selected.

        rects1
          .on("click", function(d) {
            d3.select(this).style("fill", "red");
            infoPanel.updateInfo(d);
            worldMap.updateMap(d);
          })
          .on('mouseout', function(d) {
              d3.select(this).style("fill", "steelblue");
          });

    }

    /**
     *  Check the drop-down box for the currently selected data type and update the bar chart accordingly.
     *
     *  There are 4 attributes that can be selected:
     *  goals, matches, attendance and teams.
     */
    chooseData() {
        // ******* TODO: PART I *******
        //Changed the selected data when a user selects a different
        // menu item from the drop down.

    }
}
