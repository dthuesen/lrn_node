const Q = require('q');

let addNumbersPromise = (x, y) => {
  let deferred = Q.defer();
  
  addNumbers(x, y, (err, data) => {
    if(err) {
      deferred.reject(err);
    } else {
      deferred.resolve(data);
    }
    
  });
  
  return deferred.promise;
  
}

function addNumbers(x,y, callback) {
  if(typeof x !== 'number') {
    callback(new Error('The first argument is not a number'));
    return;
  }
  if(typeof y !== 'number') {
    callback(new Error('The first argument is not a number'));
    return;
  }
  
  let result = x + y;
  
  callback(null, result);
}


addNumbersPromise(1,2)
  .then( (result) => {
    return addNumbersPromise(result, 3);
  })
  .then( (result) => {
    return addNumbersPromise(result, 4);
  })
  .then( (result) => {
    return addNumbersPromise(result, 5);
  })
  .then( (result) => {
    return addNumbersPromise(result, 6);
  })
  .then( (result) => {
    return addNumbersPromise(result, 7);
  })
  .then( (result) => {
    return addNumbersPromise(result, 8);
  })
  .then( (result) => {
    return addNumbersPromise(result, 9);
  })
  .then( (result) => {
    console.log('Result = ', result);
  })
  .catch( (err) => {
    console.log('An error occured ', err);
  });

