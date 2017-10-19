/** Class implementing the infoPanel view. */
class InfoPanel {
    /**
     * Creates a infoPanel Object
     */
    constructor() {
    }

    /**
     * Update the info panel to show info about the currently selected world cup
     * @param oneWorldCup the currently selected world cup
     */
    updateInfo(oneWorldCup) {

        // ******* TODO: PART III *******

        d3.select("#host").text(oneWorldCup.host);
        d3.select("#winner").text(oneWorldCup.winner);
        d3.select("#silver").text(oneWorldCup.runner_up);
        let teams = d3.select("#teams");
        console.log(teams);
        teams.selectAll("p").remove();
        console.log(oneWorldCup.teams_names.length);
        for (var i=0; i < oneWorldCup.teams_names.length; i++){
          teams.append("p").text(oneWorldCup.teams_names[i])
        }
        // Update the text elements in the infoBox to reflect:
        // World Cup Title, host, winner, runner_up, and all participating teams that year

        // Hint: For the list of teams, you can create an list element for each team.
        // Hint: Select the appropriate ids to update the text content.

        //Set Labels

    }

}
