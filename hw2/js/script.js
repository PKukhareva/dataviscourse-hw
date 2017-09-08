/**
* Requests the file and executes a callback with the parsed result once
* it is available
* @param {path} file path
* @param {callback} callback to execute once the result is available
*/
function fetchJSONFile(path, callback) {
	var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === 4) {
			if (httpRequest.status === 200) {
				let data = JSON.parse(httpRequest.responseText);
				if (callback) callback(data);
			}
		}
	};
	httpRequest.open('GET', path);
	httpRequest.send();
}

//call fetchJSONFile then build and render a tree
fetchJSONFile('data/Tree.json', function(data) {
	let tree = new Tree(data);
	tree.buildTree();
	tree.renderTree();
});
var jsonData = [{
"name":"Animal",
"parent":"root"
},
{
"name":"Reptile",
"parent":"Animal"
},
{
"name":"Mammal",
"parent":"Animal"
},
{
"name":"Lizard",
"parent":"Reptile"
},
{
"name":"Snake",
"parent":"Reptile"
},
{
"name":"Bird",
"parent":"Reptile"
},
{
"name":"Canary",
"parent":"Bird"
},
{
"name":"Equine",
"parent":"Mammal"
},
{
"name":"Bovine",
"parent":"Mammal"
},
{
"name":"Canine",
"parent":"Mammal"
},
{
"name":"Cow",
"parent":"Bovine"
},
{
"name":"Horse",
"parent":"Equine"
},
{
"name":"Zebra",
"parent":"Equine"
},
{
"name":"Dog",
"parent":"Canine"
}];
let treeTest = new Tree(jsonData);
treeTest.buildTree();
console.log(treeTest.nodes);
