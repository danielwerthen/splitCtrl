var player = io.connect('http://' + window.location.hostname + (window.location.port ? ':' + window.location.port : '') + '/player')
	, body = document.getElementsByTagName('body')[0]
	, force = { l: 0, u: 0, r: 0, d: 0 }

function sendUpdate() {
	player.emit('update', force);
}

body.onkeydown = function (event) {
	var key = event.keyCode || event.which;
	var update = false;
	if (key === 37) { //left
		force.l = 1;
		update = true;
	}
	if (key === 38) { //up
		force.u = 1;
		update = true;
	}
	if (key === 39) { //right
		force.r = 1;
		update = true;
	}
	if (key === 40) { //down
		force.d = 1;
		update = true;
	}
	if (update) {
		sendUpdate();
		return false;
	}
};

body.onkeyup = function (event) {
	var key = event.keyCode || event.which;
	var update = false;
	if (key === 37) { //left
		force.l = 0;
		update = true;
	}
	if (key === 38) { //up
		force.u = 0;
		update = true;
	}
	if (key === 39) { //right
		force.r = 0;
		update = true;
	}
	if (key === 40) { //down
		force.d = 0;
		update = true;
	}
	if (update) {
		sendUpdate();
		return false;
	}
};

