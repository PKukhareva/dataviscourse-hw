/** Class representing a Tree. */
class Tree {
	/**
	 * Creates a Tree Object
	 * parentNode, children, parentName,level,position
	 * @param {json[]} json - array of json object with name and parent fields
	 */
	 constructor(json) {
 		this.nodes=[];
 		/*adding data from json to an array nodes*/
 		for (var i = 0; i<json.length; i++){
			let node = new Node(json[i].name, json[i].parent);
 			this.nodes.push(node);
 		}

	/**
	 * Recursive function that assign positions to each node
	 */
	assignPosition(node, position) {
		var positionLevelExists = false;
 		for (var h = 0; h<this.nodes.length; h++){
				var existingNode = this.nodes[h];
				if (node.level === existingNode.level && position === existingNode.position){
					positionLevelExists = true
				}
			}
		if (!positionLevelExists){
			node.position = position;
			for (var i = 0; i<node.children.length; i++){
					this.assignPosition(node.children[i], position + i);
			}
		} else {
			this.assignPosition(node, position + 1);
		}
	}

	/**
	 * Recursive function that assign levels to each node
	 */
	assignLevel(node, level) {
		node.level = level;
		for (var i = 0; i<node.children.length; i++){
			this.assignLevel(node.children[i], level+1);
		}
	}
	/**
	 * Function that builds a tree from a list of nodes with parent refs
	 */
	buildTree() {
		/*adding parents and children*/
 		for (var h = 0; h<this.nodes.length; h++){
			var node = this.nodes[h];
 			for (var j = 0; j<this.nodes.length; j++){
 				/*parents*/
 				if (node.parentName == this.nodes[j].name ){
 					node.parentNode = this.nodes[j];
 				}
 				/*children*/
 				if (node.name == this.nodes[j].parentName ){
 					node.children.push(this.nodes[j]);
 				}
 			}
 		}
	//Assign Positions and Levels by making calls to assignPosition() and assignLevel()

	this.assignLevel(this.nodes[0], 0);
	this.assignPosition(this.nodes[0], 0);
	}

	/**
	 * Function that renders the tree
	 */
	renderTree() {

		var treeArray=this.nodes;
		var execute = function () {
    let svg = d3.select("svg");
 		for (var j = 0; j<treeArray.length; j++){
				var node = treeArray[j];
				if (node.level > 0){
				svg.append("line")
								.attr("x1", 50+200*node.parentNode.level)
								.attr("y1", 50+100*node.parentNode.position)
								.attr("x2", 50+200*node.level)
								.attr("y2", 50+100*node.position);
				}
    }
		for (var j = 0; j<treeArray.length; j++){
				var node = treeArray[j];
				svg.append("circle")
								.attr("cx", 50+200*node.level)
								.attr("cy", 50+100*node.position)
								.attr("r", 40);
	}
	for (var j = 0; j<treeArray.length; j++){
			var node = treeArray[j];
			svg.append("text")
							.attr("x", 50+200*node.level)
							.attr("y", 50+100*node.position)
							.text(node.name)
							.style("fill","white")
							.style("font-weight","bold")
							.style("text-anchor","middle")
							.style("font-size","16px")
							.style("letter-spacing","3px")
							;
}
	}
	execute();

}
}

        
    }

}

