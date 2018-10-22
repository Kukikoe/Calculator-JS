"use strict";

const calculator = document.getElementById("calculator");
const calcInput = calculator.querySelector(".calculator__input");
const calcChar = calculator.querySelectorAll(".calculator__char");
const calcEqual = calculator.querySelector(".calculator__equal");
const calcClear = calculator.querySelector(".calculator__clear");
const calcClearOne = calculator.querySelector(".calculator__clear-one");

const arrayOp = ["+", "-", "/", "×", "%", "(", ")", "^", "!", "√"];
let boolVal = false;

for (let i = 0; i < calcChar.length; i++) {
	calcChar[i].addEventListener("click", (event) => {
		let btn = event.target;
		let btnText = event.target.innerHTML;
		let lastSymbol = calcInput.value[calcInput.value.length - 1];

		//if you press . then add 0.
		if ((calcInput.value.length == 0 || arrayOp.indexOf(lastSymbol) >= 0) && btnText == ".") {
			calcInput.value += 0;
		}

		//input operation multiplicat between π and a number
		if (lastSymbol == "π" && arrayOp.indexOf(btnText) < 0) {
			calcInput.value += "×";
		}
		else if (arrayOp.indexOf(lastSymbol) < 0 && btnText == "π" && calcInput.value.length !== 0) {
			calcInput.value += "×";
		}

		if (lastSymbol == "%" && btnText == "%" || lastSymbol == "π" && btnText == "π") {
			calcInput.value = calcInput.value.slice(0, -1);
			return;
		}

		if (btn.dataset.op) {
			calcInput.value += btn.dataset.op;
			return;
		}

		if (btnText == "+/-") {
			calcInput.value = handlePlusMinus(calcInput.value);
			return;
		}

		//can't put the operation after another operation
		if (arrayOp.indexOf(lastSymbol) >= 0 && arrayOp.indexOf(btnText) >= 0 && lastSymbol !== "%" && lastSymbol !== "π" && lastSymbol !== "(" && lastSymbol !== ")") {
			if (arrayOp.indexOf(lastSymbol) >= 0 && btnText == "%") {
				return;
			}
			else if (arrayOp.indexOf(lastSymbol) >= 0 && btnText == "(") {
				calcInput.value += btnText;
				return;
			}
			calcInput.value = calcInput.value.slice(0, -1);
		} 

		//can't put the operation at the beginning of the expression (exeption -)
		if (calcInput.value == "" && arrayOp.indexOf(btnText) >= 0 && btnText !== "-" && btnText !== "π" && btnText !== "(") {
			return;
		}
		calcInput.value += btnText;
	});
}

//clear input
calcClear.addEventListener("click", (event) => {
	calcInput.value = "";
});

//clear one symbol
calcClearOne.addEventListener("click", (event) => {
	let str = calcInput.value.substring(0, calcInput.value.length - 1);
	calcInput.value = str;
});


calcEqual.addEventListener("click", (event) => {
	let calcString = calcInput.value;
	let array = getArrayFromString(calcString, arrayOp);
	let arrayTemp = [], count = 2, position;
	if (array.indexOf("(") >= 0 || array.indexOf(")") >= 0) {
		for (let i = 0; i < array.length; i++) {
			if (array[i] == ")") {	
				while(array[i - 1] != "(") {
					arrayTemp.unshift(array[i - 1]);
					count++;
					i--;
				}
				position = i - 1;
				if (count == 3) {
					array.splice(position, count, array[position + 1]);
				}
				else {
					let temp = parseInt(getResult(arrayTemp));
					array.splice(position, count, temp);
				}
				count = 2;
				arrayTemp = [];
				i--;
			}		
			console.log(array)
		}
	}
	let result = getResult(array);
	result = parseInt(result);
	console.log(result)
	boolVal = false;
	calcInput.value = result;
});

//make the number positive or negative
function handlePlusMinus(string) {
	let temp = [], str = "";
	for (let i = string.length - 1; i >= 0; i--) {

		if (arrayOp.indexOf(string[i]) >= 0) {
			str = temp.join('');
			if (boolVal == true) {
				string = string.slice(0, i);
				string += str;
				boolVal = false;
				return string;
			}
			else {
				string = string.slice(0, (i + 1));
				string += "-" + str;
				boolVal = true;
				return string;
			}
		}
		temp.unshift(string[i]);
		if (i == 0) {
			str = temp.join('');
			if (boolVal == true) {
				string = "";
				string += str;
				boolVal = false;
				return string;
			}
			else 
			{
				string = "";
				string += "-" + str;
				boolVal = true;
				return string;
			}
		}
	}
}

//splitting a string into an array
function getArrayFromString(string, operators) {
	let array = [], temp = "";
	for (let i = 0; i < string.length; i++) {
		if (string[i] == "-" && (operators.indexOf(string[i - 1]) >= 0 || i == 0)) {
			temp += string[i];
			i++;
		}
		if (operators.indexOf(string[i]) == -1) {
			if (string[i] == "π") {
				array.push(Math.PI);
			}
			else if (string[i] == "e") {
				array.push(2.71828182846);
			}
			else {
				temp += string[i];
			}
		}
		else {
			array.push(temp);
			array.push(string[i]);
			temp = "";
		}

		if (i == string.length - 1) {
			array.push(temp);
			temp = "";
		}
	}
	console.log(array.filter(element => element !== ""))
	return array.filter(element => element !== "");
}

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
		return Math.cos(arg1);
		case "sin":
		return Math.sin(arg1);
		case "tan":
		return Math.tan(arg1);
		case "arcsin":
		return Math.asin(arg1);
		case "arccos":
		return Math.acos(arg1);
		case "arctan":
		return Math.atan(arg1);
		case "ln":
		return Math.log(arg1);
		case "lg":
		return Math.log10(arg1);
		case "^":
		return Math.pow(arg1, arg2);
		case "√":
		return Math.sqrt(arg1);
		case "!":
		return factorial(arg1);
	}	
}

function factorial(n) {
	return (n != 1) ? n * factorial(n - 1) : 1;
}

//prioritizes operations
function getResult(array) {
	let temp = 0;
	let arrayСomplicatedOper = ["cos", "sin", "tan", "arctan", "arccos", "arcsin", "ln", "lg", "!", "^", "√", "%"];
	let arraySomeOper = arrayСomplicatedOper.filter(op => op !== "^" && op !== "!" && op !== "%");
	let found = array.some(r => arrayСomplicatedOper.indexOf(r) >= 0);
	if (array.indexOf("%") >= 0 || found) {
		for (let i = 0; i < array.length; i++) {	

			if (array[i] == "%" || array[i] == "!") {
				temp = calc(array[i], array[i - 1]);
				array.splice(i - 1, 2, temp);
				temp = 0;
				i--;
			}

			if (arraySomeOper.indexOf(array[i]) >= 0) {
				temp = calc(array[i], array[i + 1]);
				array.splice(i, 2, temp);
				temp = 0;
				i--;
			}

			if (array[i] == "^") {
				temp = calc(array[i], array[i - 1], array[i + 1]);
				array.splice(i - 1, 3, temp);
				temp = 0;
				i--;
			}
		}
	}

	if (array.indexOf("/") >= 0 || array.indexOf("×") >= 0) {
		for (let i = 0; i < array.length; i++) {

			if (array[i] == "/" || array[i] == "×") {
				temp = calc(array[i], array[i - 1], array[i + 1]);
				array.splice(i - 1, 3, temp);
				temp = 0;
				i--;
			}
		}
	}

	if (array.indexOf("+") >= 0 || array.indexOf("-") >= 0) {
		for (let i = 0; i < array.length; i++) {

			if (array[i] == "+" || array[i] == "-") {
				temp = calc(array[i], +array[i - 1], +array[i + 1]);
				array.splice(i - 1, 3, temp);
				temp = 0;
				i--;
			}
		}
	}
	return array;
}