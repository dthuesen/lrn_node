let fruits = ['apple', 'banana', 'grapes', 'orange'];


for (let i = 0; i < fruits.length; i++) {
  let delay = Math.random(0, 1000) + 1000;
  setTimeout( ()=> {
    console.log('using for() loop... ');
    console.log(i + '. ' + fruits[i] + ' delayed ' + delay/1000 + ' seconds');
  }, delay)
}


fruits.forEach( (fruit, index) => {
  let delay = Math.random(0, 1000) + 1000;
  setTimeout( ()=> {
    console.log('using callback with forEach()... ');
    console.log(index + '. ' + fruit + ' delayed ' + delay/1000 + ' seconds');
  }, delay)
})
