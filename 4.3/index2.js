function nodeStyleCallback(err, data) {
  if(err) {
    console.log('err: ', err);
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
  
  let result = x * y;
  
  callback(null, result);
  
};

addNumbers(1, 2, nodeStyleCallback);
addNumbers('a','b', nodeStyleCallback);
addNumbers(2,'b', nodeStyleCallback);

console.log('callback hell ...');

addNumbers(1,2, (err, data) => {
  addNumbers(data, 3, (err, data) => {
    addNumbers(data, 4, (err, data) => {
      addNumbers(data, 5, (err, data) => {
        addNumbers(data, 6, (err, data) => {
          addNumbers(data, 7, (err, data) => {
            addNumbers(data, 8, (err, data) => {
              addNumbers(data, 9, (err, data) => {
                console.log(data);
              })
            })
          })
        })
      })
    })
  })
})

let async = require('async');

async.waterfall([
  async.apply( 
    (arg1, arg2, callback) => {
      addNumbers(arg1, arg2, callback);
    }, 1, 2
  ),
  
  (arg1, callback) => {
    addNumbers(arg1, 3, callback);
  },
  (arg1, callback) => {
    addNumbers(arg1, 4, callback);
  },
  (arg1, callback) => {
    addNumbers(arg1, 5, callback);
  },
  (arg1, callback) => {
    addNumbers(arg1, 6, callback);
  },
  (arg1, callback) => {
    addNumbers(arg1, 7, callback);
  },
  (arg1, callback) => {
    addNumbers(arg1, 8, callback);
  },
  (arg1, callback) => {
    addNumbers(arg1, 9, callback);
  },
],
  (err, result) => {
    console.log('The sum is: ', result);
  }
)

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
  function measureBPulseRate(callback) {
    callback(null, 60);
  },
], (err, results) => {
  console.log('async.parallel ...');
  console.log('Blood Pressure:   ', results[0]);
  console.log('Respiration Rate: ', results[1]);
  console.log('Temperature:      ', results[2]);
  console.log('Pulse Rate:       ', results[3]);
});

