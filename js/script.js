"use strict";

const calculator = document.getElementById("calculator");
const calcInput = calculator.querySelector(".calculator__input");
const calcChar = calculator.querySelectorAll(".calculator__char");
const calcEqual = calculator.querySelector(".calculator__equal");
const calcClear = calculator.querySelector(".calculator__clear");

const arrayOp = ["+", "-", "/", "x"];

for (let i = 0; i < calcChar.length; i++) {
	calcChar[i].addEventListener("click", (event) => {
		let btnText = event.target.innerHTML;
		let lastSymbol = calcInput.value[calcInput.value.length - 1];

		if (arrayOp.indexOf(lastSymbol) >= 0 && arrayOp.indexOf(btnText) >= 0) {
			calcInput.value = calcInput.value.slice(0, -1);
		}

		if (calcInput.value == "" && arrayOp.indexOf(btnText) >= 0 && btnText !== "-") {
			return;
		}

		calcInput.value += btnText;
	});
}

calcClear.addEventListener("click", (event) => {
	calcInput.value = "";
});

calcEqual.addEventListener("click", (event) => {
	let calcString = calcInput.value;
	let array = getArrayFromString(calcString, arrayOp);
	let result = getResult(array);

	calcInput.value = result;
});

function getArrayFromString(string, operators) {
	let array = [], temp = "";
	for (let i = 0; i < string.length; i++) {
		if (operators.indexOf(string[i]) == -1) {
			temp += string[i];
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
	console.log(array)
	return array;
}

function getResult(array) {
	let temp = 0;

	if (array.indexOf("/") >= 0 || array.indexOf("x") >= 0) {
		for (let i = 0; i < array.length; i++) {

			if (array[i] == "/") {
				temp = array[i - 1] / array[i + 1];
				array.splice(i-1, 3, temp);
				temp = 0;
				i--;
			}

			if (array[i] == "x") {
				temp = array[i - 1] * array[i + 1];
				array.splice(i-1, 3, temp);
				temp = 0;
				i--;
			}
		}
	}

	if (array.indexOf("+") >= 0 || array.indexOf("-") >= 0) {
		for (let i = 0; i < array.length; i++) {

			if (array[i] == "+") {
				temp = +array[i - 1] + +array[i + 1];
				array.splice(i-1, 3, temp);
				temp = 0;
				i--;
			}

			if (array[i] == "-") {
				temp = array[i - 1] - array[i + 1];
				array.splice(i-1, 3, temp);
				temp = 0;
				i--;
			}
		}
	}
	return array;
}