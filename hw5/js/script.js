    /**
<<<<<<< HEAD
     * Loads in the table information from fifa-matches.json
=======
     * Loads in the table information from fifa-matches.json 
>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9
     */
d3.json('data/fifa-matches.json',function(error,data){

    /**
     * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
     *
     */
    d3.csv("data/fifa-tree.csv", function (error, csvData) {

        //Create a unique "id" field for each game
        csvData.forEach(function (d, i) {
            d.id = d.Team + d.Opponent + i;
        });

        //Create Tree Object
        let tree = new Tree();
        tree.createTree(csvData);

        //Create Table Object and pass in reference to tree object (for hover linking)
        let table = new Table(data,tree);

        table.createTable();
        table.updateTable();
    });
});

<<<<<<< HEAD
function addCountry(countryObject, tableElements) {
  let cellContent =
  [
  {"type":"aggregate", "vis": "country", "value":countryObject.key},
  {"type":"aggregate", "vis": "goals", "value":[
    countryObject.value['Goals Made'],
    countryObject.value['Goals Conceded'],
    countryObject.value['Delta Goals']]},
  {"type":"aggregate", "vis": "text", "value":countryObject.value['Result'].label},
  {"type":"aggregate", "vis": "bars", "value":countryObject.value['Wins']},
  {"type":"aggregate", "vis": "bars", "value":countryObject.value['Losses']},
  {"type":"aggregate", "vis": "bars", "value":countryObject.value['TotalGames']}
  ];
  tableElements.push(cellContent);
}
function addGames(countryObject, array) {
  for (let j =0; j < countryObject.value.games.length; j++){
    let game = countryObject.value.games[j];
    let gameContent =
    [
    {"type":"game", "vis": "gameCountry", "value":game.key},
    {"type":"game", "vis": "gameGoals", "value":[
      game.value['Goals Made'],
      game.value['Goals Conceded'],
      game.value['Delta Goals']]},
    {"type":"aggregate", "vis": "text", "value":game.value['Result'].label}
    ];
    array.push(gameContent);
  }
}
/**
 * Updates the global tableElements variable, with a row for each row to be rendered in the table.
 *
 */
function updateList(table, teamData, tableElements, element) {
    // ******* TODO: PART IV *******
    //Only update list for aggregate clicks, not game clicks
    let newTableElements = [];
    let country = element.value;
    let removeGame = false;
    for (let i =0; i < tableElements.length; i++){
      if (removeGame == false){
        newTableElements.push(tableElements[i]);
      }
      //next element in the list is also a team
      if (tableElements[i][0].value === country
            && tableElements[i+1][0].type == "aggregate"){
              addGames(teamData.find(team => team.key === country), newTableElements);
      }
      else if (tableElements[i][0].value === country
            && tableElements[i+1][0].type == "game"){
            removeGame = true;
      }
      if (removeGame == true && tableElements[i+1][0].type == "aggregate"){
        removeGame = false;
      }
    }
    table.tableElements = newTableElements;
    table.updateTable();
}

/**
 * Collapses all expanded countries, leaving only rows for aggregate values per country.
 *
 */
function collapseList(table, tableElements) {

    // ******* TODO: PART IV *******
    let newTableElements = [];

    for (let i =0; i < tableElements.length; i++){
      if (tableElements[i][0].type == "aggregate"){
        newTableElements.push(tableElements[i]);
      }
    }
    table.tableElements = newTableElements;
    table.updateTable();
}

function sortTeams(table,i, sortType) {
  console.log("sorting");
  collapseList(table, table.tableElements);
  if (sortType == "descending"){
  table.tableElements = table.tableElements.sort(
    function(a, b){
      if (a[i].value < b[i].value)
        return -1;
      if (a[i].value > b[i].value)
        return 1;
      return 0;
    });
  }
  else if (sortType == "ascending"){
  table.tableElements = table.tableElements.sort(
    function(a, b){
      if (a[i].value > b[i].value)
        return -1;
      if (a[i].value < b[i].value)
        return 1;
      return 0;
    });
  }
  table.updateTable();
}
=======

>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9

// // // ********************** HACKER VERSION ***************************
// /**
//  * Loads in fifa-matches.csv file, aggregates the data into the correct format,
//  * then calls the appropriate functions to create and populate the table.
//  *
//  */
// d3.csv("data/fifa-matches.csv", function (error, matchesCSV) {

//     /**
//      * Loads in the tree information from fifa-tree.csv and calls createTree(csvData) to render the tree.
//      *
//      */
<<<<<<< HEAD
// d3.csv("data/fifa-tree.csv", function (error, treeCSV) {
//
//     // ******* TODO: PART I *******
//     teamData = d3.nest()
//         .key(function (d) {
//             return d.Team;
//         })
//         .rollup(function (leaves) {
//             return d3.sum(leaves,function(l){return l.Wins});
//         })
//         .entries(allGames);
//
//     });
//
=======
//     d3.csv("data/fifa-tree.csv", function (error, treeCSV) {

//     // ******* TODO: PART I *******


//     });

>>>>>>> a32a0c9cec2a23eafad62c4e18de23b1cfaca7e9
// });
// // ********************** END HACKER VERSION ***************************
