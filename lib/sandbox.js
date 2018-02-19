const {VM} = require('vm2');
const vm = new VM({
	timeout: 1000,
	sandbox: {}
});


var fizzBuzz = function(n) {
	let arr = [], i=1;
	while(i<=n) {
		if (i%15 === 0) {
			arr.push('FizzBuzz');
		} else if(i%3 === 0) {
			arr.push('Fizz');
		} else if (i%5 === 0) {
			arr.push('Buzz');
		} else {
			arr.push(i.toString());
		}
		i++;
	}

	console.log(arr);
		
};

function sum(a,b) {
	console.log(a + b);
	return a + b;
}

function infinite() {
		console.log('hey!');
	
}

vm.run(fizzBuzz(15));

// vm.run(`while(true) {
// 	console.log("hey")}`);
