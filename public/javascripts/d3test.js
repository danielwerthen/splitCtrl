var diameter = 960
	, format = d3.format(',d')
	, color = d3.scale.category20c();

var bubble = d3.layout.pack()
	.sort(null)
	.size([diameter, diameter])
	.padding(100.5);

var svg = d3.select('body').append('svg')
	.attr('width', diameter)
	.attr('height', diameter)
	.attr('class', 'bubble')

var t = svg.append('circle')
	.attr('r', 140)
	.attr('x', 1000)
	.attr('y', 1000)

/*d3.json('/positions', function (err, root) {
	var node = svg.selectAll('.node')
		.data(bubble.nodes(classes(root))
			.filter(function (d) { return !d.children; }))
		.enter().append('g')
		.attr('class', 'node')
		.attr('transform', function (d) { return "translate(" + d.x + ", " + d.y + ")"; });

	node.append('circle')
		.attr('r', function (d) { return d.r; })
		.style('fill', function (d) { return color(d.packageName); });

});*/

function classes(root) {
	var classes = [];

	function rec(name, node) {
		if (node.children) node.children.forEach(function (child) { rec(node.name, child); });
		else classes.push({packageName: name, className: node.name, value: node.size});
	}
	rec(null, root);
	return { children: classes };
}

d3.select(self.frameElement).style('height', diameter + 'px');
