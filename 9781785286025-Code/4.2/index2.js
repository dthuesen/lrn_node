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
