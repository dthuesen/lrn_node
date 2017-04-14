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

