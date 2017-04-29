function nodeStyleCallback(err, data) {
	if (err) {
		console.log(err);
		return;
	}

	console.log(data);
}

function addNumbers(x, y, callback) {
	if (typeof x !== 'number') {
		callback(new Error('The first argument is not a number'));
		return;
	}

	if (typeof y !== 'number') {
		callback(new Error('The second argument is not a number'));
		return;
	}

	var result = x + y;

	callback(null, result);
}

addNumbers(1, 2, nodeStyleCallback);

addNumbers('a', 'b', nodeStyleCallback);

console.log('Callback hell ...');

addNumbers(1, 2, function(err, data) {
	addNumbers(data, 3, function(err, data) {
		addNumbers(data, 4, function(err, data) {
			addNumbers(data, 5, function(err, data) {
				console.log(data);
			});
		});
	});
});

var async = require('async');

async.waterfall([
	async.apply(function(arg1, arg2, callback) {
		addNumbers(arg1, arg2, callback);
	}, 1, 2),
	function(arg1, callback) {
		addNumbers(arg1, 3, callback);
	},
	function(arg1, callback) {
		addNumbers(arg1, 4, callback);
	},
	function(arg1, callback) {
		addNumbers(arg1, 5, callback);
	}
], function(err, result) {
	console.log("1+2+3+4+5 = ", result);
});

async.parallel([
	function measureBloodPressure(callback) {
		callback(null, 140);
	},
	function measureRespirationRate(callback) {
		callback(null, 20);
	},
	function measureTemperature(callback) {
		callback(null, 26);
	},
	function measurePulseRate(callback) {
		callback(null, 60);
	}
], function(err, results) {
	console.log("async.parallel ...");
	console.log("Blood Pressure:", results[0]);
	console.log("Respiration Rate:", results[1]);
	console.log("Temperature:", results[2]);
	console.log("Pulse Rate:", results[3]);
});
