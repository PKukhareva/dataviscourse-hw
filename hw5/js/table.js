/** Class implementing the table. */
class Table {
    /**
     * Creates a Table Object
     */
    constructor(teamData, treeObject) {

<<<<<<< HEAD
        //Maintain reference to the tree Object;
        this.tree = treeObject;
        console.log(this.tree);

        // Create list of all elements that will populate the table
        // Initially, the tableElements will be identical to the teamData
        ///** Store all match data for the 2014 Fifa cup */
        this.teamData =  teamData;
        this.tableElements = null;
=======
        //Maintain reference to the tree Object; 
        this.tree = null; 

        // Create list of all elements that will populate the table
        // Initially, the tableElements will be identical to the teamData
        this.tableElements = null; // 

        ///** Store all match data for the 2014 Fifa cup */
        this.teamData = null;

>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9
        //Default values for the Table Headers
        this.tableHeaders = ["Delta Goals", "Result", "Wins", "Losses", "TotalGames"];

        /** To be used when sizing the svgs in the table cells.*/
        this.cell = {
            "width": 70,
            "height": 20,
            "buffer": 15
        };

        this.bar = {
            "height": 20
        };

        /** Set variables for commonly accessed data columns*/
        this.goalsMadeHeader = 'Goals Made';
        this.goalsConcededHeader = 'Goals Conceded';

        /** Setup the scales*/
<<<<<<< HEAD
        this.goalScale = null;

        /** Used for games/wins/losses*/
        this.gameScale = null;

        /**Color scales*/
        /**For aggregate columns  Use colors '#ece2f0', '#016450' for the range.*/
        this.aggregatebarColorScale = null;

        /**For goal Column. Use colors '#cb181d', '#034e7b'  for the range.*/
        this.goalbarColorScale = null;

        this.sort = null;
=======
        this.goalScale = null; 

        /** Used for games/wins/losses*/
        this.gameScale = null; 

        /**Color scales*/
        /**For aggregate columns  Use colors '#ece2f0', '#016450' for the range.*/
        this.aggregateColorScale = null; 

        /**For goal Column. Use colors '#cb181d', '#034e7b'  for the range.*/
        this.goalColorScale = null; 
>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9
    }


    /**
     * Creates a table skeleton including headers that when clicked allow you to sort the table by the chosen attribute.
     * Also calculates aggregate values of goals, wins, losses and total games as a function of country.
     *
     */
    createTable() {

        // ******* TODO: PART II *******

        //Update Scale Domains

        // Create the x axes for the goalScale.
<<<<<<< HEAD
        let data = this.teamData;
        let thisTree = this.tree;
        let width = 70;
        let max = d3.max(data, d => d.value["Goals Made"]);
        let maxBar = d3.max(data, d => d.value["TotalGames"]);
        this.goalScale = d3.scaleLinear()
          .domain([0, max])
          .range([0, width])
          .nice();
        this.gameScale = d3.scaleLinear()
              .domain([0, maxBar])
              .range([0, width])
              .nice();
        this.aggregatebarColorScale = d3.scaleSequential(function(t) {
                return d3.hsl(170, 1, 1-t/(maxBar)) + "";
        });
           //Discrete diverging scale
        this.goalbarColorScale = d3.scaleThreshold()
            .domain([0])
            .range(['pink', 'lightblue']);
        this.tableElements = [];
        for (let i =0; i < data.length; i++){
            addCountry(data[i], this.tableElements);
        }

        //add GoalAxis to header of col 1.
        let xAxis = d3.axisBottom();

        xAxis.scale(this.goalScale)
          .ticks(5);
        d3.select("#goalHeader")
          .append("svg")
          .attr("width", 70)
          .attr("height", 30)
          .attr("transform", "translate(" + 5 + "," + 0 + ")")
          .classed("axis", true)
          .call(xAxis);





=======

        //add GoalAxis to header of col 1.
>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9

        // ******* TODO: PART V *******

        // Set sorting callback for clicking on headers

<<<<<<< HEAD
        // Clicking on headers should also trigger collapseList() and updateTable().


=======
        // Clicking on headers should also trigger collapseList() and updateTable(). 

       
>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9
    }


    /**
     * Updates the table contents with a row for each element in the global variable tableElements.
     */
    updateTable() {
        // ******* TODO: PART III *******
        //Create table rows
<<<<<<< HEAD
        let thisTable = this;
        let newTree = this.tree;
        let teamData = this.teamData;
        console.log(this.tableElements);
        let tableElements = this.tableElements;
        console.log(tableElements);
        let goalScale = this.goalScale;
        let gameScale = this.gameScale;
        let aggregatebarColorScale = this.aggregatebarColorScale;
        let goalbarColorScale = this.goalbarColorScale;

        //Append th elements for the Team Names
        let table = d3.selectAll("thead");
        table.selectAll("tr").filter(".rows").remove();
        let rows = table.selectAll("tr").filter(".rows").data(tableElements);

        let newRows = rows.enter();
        console.log(newRows);

        rows.exit().remove();
        rows = newRows.merge(rows);
        console.log(rows);
        let tr = rows.append("tr");
        tr.attr('class','rows');

        let cells = tr.selectAll("td").data(function(d){return d;});
        let newCells = cells.enter();
        cells.exit().remove();
        cells = newCells.merge(cells);
        let td = cells.append("td");


        let country = td.filter(function (d) {
           return d.vis == "country";
        })
        let countrySvg = country.append("svg")
                  .attr("width", 80)
                  .attr("height", 20);
        countrySvg.append("text")
                    .attr("x", 0)
                    .attr("y", 15)
                    .text( function (d) { return d.value; })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "1epx")
                    .attr("fill", "green")
          .on("click", function(d) {
            updateList(thisTable, teamData, tableElements, d);
          })
          .on("mouseover", function(d) {

            d3.select(this).style("fill", "red");
            newTree.updateTree(d.value);
          })
          .on('mouseout', function(d) {
                d3.select(this).style("fill", "green");
                newTree.clearTree(d.value);
            });


        let gameCountry = td.filter(function (d) {
             return d.vis == "gameCountry";
          })
        let gameCountrySvg = gameCountry.append("svg")
                  .attr("width", 80)
                  .attr("height", 20);
        gameCountrySvg.append("text")
                    .attr("x", 0)
                    .attr("y", 15)
                    .text( function (d) { return 'x' + d.value; })
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "12px")
                    .attr("fill", "gray");

        let text = td.filter(function (d) {
	         return d.vis == "text";
        })
        text.text(function (d) {return d.value;});


        let bars = td.filter(function (d) {
           return d.vis == "bars";
        })
        let barSvg = bars
          .append("svg")
          .attr("width", 80)
          .attr("height", 30);
        barSvg.append("rect")
          .attr("height", 25)
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", function (d, i) {return gameScale(d.value);})
          .style("fill", function (d, i) {return aggregatebarColorScale(d.value);});
        barSvg.append("text")
          .attr("x", function(d) { return gameScale(d.value) - 10; })
          .attr("y", function(d) { return 20; })
          .text( function (d) { return d.value; })
          .attr("font-family", "sans-serif")
          .attr("font-size", "16px")
          .attr("fill", "white");

        let goals = td.filter(function (d) {
             return d.vis == "goals"
          })
          let goalsSvg = goals.append("svg")
            .attr("width", 80)
            .attr("height", 30);
          goalsSvg.append("rect")
            .attr("height", 10)
            .attr("x", function (d, i) {return 5 + goalScale(Math.min(d.value[0],d.value[1]));})
            .attr("y", 5)
            .attr("width", function (d, i) {return goalScale(Math.abs(d.value[2]));})
            .style("fill", function (d, i) {return goalbarColorScale(d.value[2]);});
          goalsSvg.append("circle")
            .attr("cx", function (d) { return 5 + goalScale(d.value[0]);})
            .attr("cy", 10)
            .attr("r", 5)
            .style("fill", "#cb181d");
          goalsSvg.append("circle")
            .attr("cx", function (d) { return 5 + goalScale(d.value[1]);})
            .attr("cy", 10)
            .attr("r", 5)
            .style("fill", "#034e7b");

            let gameGoals = td.filter(function (d) {
                 return d.vis == "gameGoals"
              })
              let gameGoalsSvg = gameGoals.append("svg")
                .attr("width", 80)
                .attr("height", 30);
              gameGoalsSvg.append("rect")
                .attr("height", 2)
                .attr("x", function (d, i) {return 5 + goalScale(Math.min(d.value[0],d.value[1]));})
                .attr("y", 10)
                .attr("width", function (d, i) {return goalScale(Math.abs(d.value[0] - d.value[1]));})
                .style("fill", function (d, i) {return goalbarColorScale(d.value[0] - d.value[1]);});
              gameGoalsSvg.append("circle")
                .attr("cx", function (d) { return 5 +  goalScale(d.value[0]);})
                .attr("cy", 10)
                .attr("r", 3)
                .style("fill", "white")
                .style("stroke", "#cb181d")
                .style("stroke-width", 2)
              gameGoalsSvg.append("circle")
                .attr("cx", function (d) { return 5 +  goalScale(d.value[1]);})
                .attr("cy", 10)
                .attr("r", 3)
                .style("fill", "white")
                .style("stroke", "#034e7b")
                .style("stroke-width", 2);

        //Append td elements for the remaining columns.

        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'value':<[array of 1 or two elements]>}

=======

        //Append th elements for the Team Names

        //Append td elements for the remaining columns. 
        //Data for each cell is of the type: {'type':<'game' or 'aggregate'>, 'value':<[array of 1 or two elements]>}
        
>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9
        //Add scores as title property to appear on hover

        //Populate cells (do one type of cell at a time )

        //Create diagrams in the goals column

        //Set the color of all games that tied to light gray

<<<<<<< HEAD
        d3.selectAll("#header0").on("click", function(d) {
          if (this.sort == 0) {
            sortTeams(thisTable,0, "ascending");
            this.sort = null;
          } else {
            sortTeams(thisTable,0, "descending");
            this.sort = 0;
          }
        });
        d3.selectAll("#header1").on("click", function(d)  {
          if (this.sort == 1) {
            sortTeams(thisTable,1, "descending");
            this.sort = null;
          } else {
            sortTeams(thisTable,1, "ascending");
            this.sort = 1;
          }
        });
        d3.selectAll("#header2").on("click", function(d) {
          if (this.sort == 2) {
            sortTeams(thisTable,0, "ascending");
            this.sort = null;
          } else {
            sortTeams(thisTable,0, "descending");
            this.sort = 2;
          }
        });
        d3.selectAll("#header3").on("click", function(d)  {
          if (this.sort == 3) {
            sortTeams(thisTable,3, "descending");
            this.sort = null;
          } else {
            sortTeams(thisTable,3, "ascending");
            this.sort = 3;
          }
        });
        d3.selectAll("#header4").on("click", function(d)  {
          if (this.sort == 4) {
            sortTeams(thisTable,4, "descending");
            this.sort = null;
          } else {
            sortTeams(thisTable,4, "ascending");
            this.sort = 4;
          }
        });
        d3.selectAll("#header5").on("click", function(d)  {
          console.log(this.sort);
          if (this.sort == 5) {
            sortTeams(thisTable,5, "descending");
            this.sort = null;
          } else {
            sortTeams(thisTable,5, "ascending");
            this.sort = 5;
          }
        });

    };

=======
    };

    /**
     * Updates the global tableElements variable, with a row for each row to be rendered in the table.
     *
     */
    updateList(i) {
        // ******* TODO: PART IV *******
       
        //Only update list for aggregate clicks, not game clicks
        
    }

    /**
     * Collapses all expanded countries, leaving only rows for aggregate values per country.
     *
     */
    collapseList() {
        
        // ******* TODO: PART IV *******

    }
>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9


}
