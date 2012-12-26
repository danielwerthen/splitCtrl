var svg = d3.select('body').append('svg')
	, players = null
	, display = io.connect('http://shielded-wave-2749.herokuapp.com/display');

display.on('connect', function () {
});

display.on('update', function (root) {
	if (!players) {
		players = svg.selectAll('.node')
			.data(root.players)
			.enter().append('circle')
			.attr('r', 35)
			.attr('cx', function (d) { return d.x; })
			.attr('cy', function (d) { return d.y; })
			.attr('fill', function (d) {
				var c = (d.id / root.players.length) * 177
				return d3.rgb(c,c,c);
			})
	}
	else {
		players.transition()
			.duration(root.interval)
			.attr('cx', function (d) { return root.playerDir[d.id].x; })
			.attr('cy', function (d) { return root.playerDir[d.id].y; })
			.ease('linear')
	}
});


