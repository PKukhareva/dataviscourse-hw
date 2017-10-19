/** Class implementing the map view. */
class Map {
    /**
     * Creates a Map Object
     */
    constructor() {
        this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);

    }

    /**
     * Function that clears the map
     */
    clearMap() {
      d3.selectAll(".gold").remove();
      d3.selectAll(".silver").remove();
      d3.select("#map").selectAll("path").style("fill", "black");
        // ******* TODO: PART V*******
        // Clear the map of any colors/markers; You can do this with inline styling or by
        // defining a class style in styles.css

        // Hint: If you followed our suggestion of using classes to style
        // the colors and markers for hosts/teams/winners, you can use
          // d3 selection and .classed to set these classes on and off here.

    }

    /**
     * Update Map with info for a specific FIFA World Cup
     * @param wordcupData the data for one specific world cup
     */
    updateMap(worldcupData) {

        //Clear any previous selections;
        this.clearMap();

        // ******* TODO: PART V *******

        // Add a marker for the winner and runner up to the map.

        // Hint: remember we have a conveniently labeled class called .winner
        // as well as a .silver. These have styling attributes for the two
        // markers.


        // Select the host country and change it's color accordingly.

        // Iterate through all participating teams and change their color as well.

        // We strongly suggest using CSS classes to style the selected countries.


        // Add a marker for gold/silver medalists
        let map = d3.select("#map");
        let width = 600;
        let height = 600;
        let projection = d3.geoMercator()
            .translate([width - 200, height - 200]) // this centers the map in our SVG element
            .scale([100]);  // this specifies how much to zoom
        for (var i=0; i < worldcupData.teams_names.length; i++){
         map.select("#" + worldcupData.teams_iso[i]).style("fill", "pink")
         .attr("class", "legend-element");
        }

        let host = map.select("#" + worldcupData.host_country_code).style("fill", "blue")
                 .attr("class", "legend-element");

         let points = d3.select("#points")
         points.append("circle")
         .attr("cx", function (d) {
                    return projection(worldcupData.win_pos)[0];
                })
          .attr("cy", function (d) {
                     return projection(worldcupData.win_pos)[1];
                 })
          .attr("r", 8)
          .attr("class", "gold")
          ;
          points.append("circle")
          .attr("cx", function (d) {
                     return projection(worldcupData.ru_pos)[0];
                 })
           .attr("cy", function (d) {
                      return projection(worldcupData.ru_pos)[1];
                  })
           .attr("r", 8)
           .attr("class", "silver")
           ;
        // d3.select("#host").text(oneWorldCup.host);
        //
        // d3.select("#winner").text(oneWorldCup.winner);
        // d3.select("#silver").text(oneWorldCup.runner_up);
        // let teams = d3.select("#teams");
        // console.log(teams);
        // teams.selectAll("p").remove();
        // console.log(oneWorldCup.teams_names.length);
        // for (var i=0; i < oneWorldCup.teams_names.length; i++){
        //   teams.append("p").text(oneWorldCup.teams_names[i])

    }

    /**
     * Renders the actual map
     * @param the json data with the shape of all countries
     */
    drawMap(world) {

        //(note that projection is a class member
        // updateMap() will need it to add the winner/runner_up markers.)

        // ******* TODO: PART IV *******

        // Draw the background (country outlines; hint: use #map)
        // Make sure and add gridlines to the map

        // Hint: assign an id to each country path to make it easier to select afterwards
        // we suggest you use the variable in the data element's .id field to set the id

        // Make sure and give your paths the appropriate class (see the .css selectors at
        // the top of the provided html file)
        console.log(world);
        let width = 600;
        let height = 600;
        let svg = d3.select("#map");
        let countries = topojson.feature(world, world.objects.countries).features;
        console.log(countries);
        let projection = d3.geoMercator()
            .translate([width - 200, height - 200]) // this centers the map in our SVG element
            .scale([100]);  // this specifies how much to zoom
        let path = d3.geoPath()
        .projection(projection);
        svg.selectAll(".country")
            .data(countries)
          .enter().insert("path", ".graticule")
            .attr("class", function(d) { return "country " + "code" + d.id; })
            .attr("id", function(d){
                return d.id;
            })
            .attr("d", path);


    }


}
