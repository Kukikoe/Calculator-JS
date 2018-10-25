function calc(operation, arg1, arg2) {
	switch(operation) {
		case "/":
		return arg1 / arg2;
		case "×":
		return arg1 * arg2;
		case "+":
		return arg1 + arg2;
		case "-":
		return arg1 - arg2;
		case "%":
		return arg1/100;
		case "cos":
		return Math.cos(arg1).toFixed(11);
		case "sin":
		return Math.sin(arg1).toFixed(11);
		case "tan":
		return Math.tan(arg1).toFixed(11);
		case "arcsin":
		return Math.asin(arg1).toFixed(11);
		case "arccos":
		return Math.acos(arg1).toFixed(11);
		case "arctan":
		return Math.atan(arg1).toFixed(11);
		case "ln":
		return Math.log(arg1).toFixed(11);
		case "lg":
		return Math.log10(arg1).toFixed(11);
		case "^":
		return Math.pow(arg1, arg2);
		case "√":
		return Math.sqrt(arg1);
		case "!":
		return factorial(arg1);
	}	
}

module.exports = calc;

function factorial(n) {
	return (n != 1) ? n * factorial(n - 1) : 1;
}