var _ = require('underscore')
	, dir = {}
	, list = [];

function newPlayer(id) {
	return { id: id
	, x: 100 + 10 * id
	, y: 10 * id
	, dx: 60
	, dy: 10
	, ddx: []
	, ddy: []
	};
}

_.range(10).map(function (el, i, all) {
	dir[el] = newPlayer(el);
	list.push(dir[el]);
});

var pf = 150;
exports.setForce = function (id, force) {
	var pl = dir[id];
	pl.ddx = [];
	pl.ddy = [];
	if (force.r)
		pl.ddx.push(pf);
	if (force.l)
		pl.ddx.push(-pf);
	if (force.u)
		pl.ddy.push(-pf);
	if (force.d)
		pl.ddy.push(pf);
};

exports.update = function (dt) {
	_.each(list, function (pl) {
		box(pl);
		pl.dy += 98.2 * dt;
		_.each(pl.ddx, function (ddx) {
			pl.dx += ddx * dt;
		});
		_.each(pl.ddy, function (ddy) {
			pl.dy += ddy * dt;
		});
		pl.x += pl.dx * dt;
		pl.y += pl.dy * dt;
	});
	return { players: list, playerDir: dir };
};

function box(pl) {
	if (pl.x < 100) {
		pl.dx = 0.9*Math.abs(pl.dx);
		pl.x = 100;
	}
	if (pl.x > 600) {
		pl.dx = -0.9 * Math.abs(pl.dx);
		pl.x = 600;
	}
	if (pl.y < 0) {
		pl.dy = 0.9*Math.abs(pl.dy);
		pl.y = 0;
	}
	if (pl.y > 300) {
		pl.dy = -0.9 * Math.abs(pl.dy);
		pl.y = 300;
	}
}

