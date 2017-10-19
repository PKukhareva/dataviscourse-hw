/** Class implementing the tree view. */
class Tree {
    /**
     * Creates a Tree Object
     */
    constructor() {

    }

    /**
     * Creates a node/edge structure and renders a tree layout based on the input data
     *
     * @param treeData an array of objects that contain parent/child information.
     */
    createTree(treeData) {

        // ******* TODO: PART VI *******

        //Create a tree and give it a size() of 800 by 300.

        let data=treeData;
        data.forEach(function (d, i) {
          if (d.ParentGame > 0){
            d.parentId = data[d.ParentGame].id;
          }
          else {d.parentId = null};
        });


        //Create a root for the tree using d3.stratify();
        let root = d3.stratify()
            .id(function(d) { return d.id; })
            .parentId(function(d) { return d.parentId; })
            (data);

            //adapted from https://bl.ocks.org/d3noob/e7e37cfe0e8763cb0915dee33cc2a24b
            // set the dimensions and margins of the diagram
            var margin = {top: 20, right: 90, bottom: 30, left: 90},
                width = 500 - margin.left - margin.right,
                height = 900 - margin.top - margin.bottom;

            // declares a tree layout and assigns the size
            var treemap = d3.tree()
                .size([height, width]);

            //  assigns the data to a hierarchy using parent-child relationships
            var nodes = d3.hierarchy(root, function(d) {
                return d.children;
              });

            // maps the node data to the tree layout
            nodes = treemap(nodes);
            // append the svg object to the body of the page
            // appends a 'group' element to 'svg'
            // moves the 'group' element to the top left margin
            var svg = d3.selectAll("#tree")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom),
                g = svg.append("g")
                  .attr("transform",
                        "translate(" + margin.left + "," + margin.top + ")");

            // adds the links between the nodes
            var link = g.selectAll(".link")
                .data( nodes.descendants().slice(1))
              .enter().append("path")
                .attr("class", "link")
                .attr("id", function(d){
                return d.data.data['Team'];
                })
                .attr("d", function(d) {
                   return "M" + d.y + "," + d.x
                     + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                     + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                     + " " + d.parent.y + "," + d.parent.x;
                   });

            // adds each node as a group
            var node = g.selectAll(".node")
                .data(nodes.descendants())
              .enter().append("g")
              .attr("id", function(d){
              return d.data.data['Team'];
              })
                .attr("transform", function(d) {
                  return "translate(" + d.y + "," + d.x + ")"; });

            // adds the circle to the node
            node.append("circle")
              .attr("r", 10)
              .attr("fill", function(d) {
                return (d.data.data['Wins'] == 1? "red" : "blue"); });

            // adds the text to the node
            node.append("text")
              .attr("dy", ".35em")
              .attr("x", function(d) { return d.children ? -13 : 13; })
              .style("text-anchor", function(d) {
                return d.children ? "end" : "start"; })
              .text(function(d) {
                return d.data.data['Team']; });

    };

    /**
     * Updates the highlighting in the tree based on the selected team.
     * Highlights the appropriate team nodes and labels.
     *
     * @param row a string specifying which team was selected in the table.
     */
    updateTree(row) {
        // ******* TODO: PART VII *******
        d3.selectAll("#tree")
        .selectAll("#" + row)
        .attr("fill", "red")
        .style("stroke", "red");

    }

    /**
     * Removes all highlighting from the tree.
     */
    clearTree(row) {
        // ******* TODO: PART VII *******
        d3.selectAll("#tree")
        .selectAll("#" + row)
        .attr("fill", "blue")
        .style("stroke", "gray");
        // You only need two lines of code for this! No loops!
    }
}
