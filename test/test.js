var calc = require('../js/calc.js');
var assert = require('assert');
var chai = require('chai');

describe("Calculations", function() {
	describe("Should return math operation", function(){
		describe("Plus", function(){
			function makeTest(a, b) {
				var expected = a + b;
				it( a + " + " + b + " = "  + expected, function() {
					assert.equal(calc("+", a, b), expected);
				});
			}

			for (var a = 1, b = 6; a <= 6; a++, b++) {
				makeTest(a, b);
			}
		});
		describe("Minus", function(){
			function makeTest(a, b) {
				var expected = a - b;
				it( a + " - " + b + " = "  + expected, function() {
					assert.equal(calc("-", a, b), expected);
				});
			}

			for (var a = 1, b = 6; a <= 6; a++, b+=2) {
				makeTest(a, b);
			}
		});
		describe("Multiply", function(){
			function makeTest(a, b) {
				var expected = a * b;
				it( a + " * " + b + " = "  + expected, function() {
					assert.equal(calc("×", a, b), expected);
				});
			}

			for (var a = 1, b = 6; a <= 6; a++, b++) {
				makeTest(a, b);
			}
		});
		describe("Division", function(){
			function makeTest(a, b) {
				var expected = a / b;
				it( a + " / " + b + " = "  + expected, function() {
					assert.equal(calc("/", a, b), expected);
				});
			}

			for (var a = 6, b = 1; a <= 12; a++, b++) {
				makeTest(a, b);
			}
		});
		describe("Pow", function(){
			function makeTest(a, b) {
				var expected = Math.pow(a, b);
				it( a + " ^(" + b + ") = "  + expected, function() {
					assert.equal(calc("^", a, b), expected);
				});
			}

			for (var a = 4, b = 2; a <= 9; a++, b++) {
				makeTest(a, b);
			}
		});
		describe("Factorial", function(){
			function makeTest(a) {
				var expected = factorial(a);
				it( a + "! = "  + expected, function() {
					assert.equal(calc("!", a), expected);
				});
			}

			for (var a = 2; a <= 7; a++) {
				makeTest(a);
			}

			function factorial(n) {
				return (n != 1) ? n * factorial(n - 1) : 1;
			}
		});
		it("percent (6% = 0.06)", function() {
			const gets = calc("%", 6);
			const expect = 0.06;
			assert.equal(gets, expect);
		});
		it("cos(6) = 0.96017028665", function() {
			const gets = calc("cos", 6);
			const expect = 0.96017028665;
			assert.equal(gets, expect);
		});
		it("sin(6) = -0.27941549820", function() {
			const gets = calc("sin", 6);
			const expect = -0.27941549820;
			assert.equal(gets, expect);
		});
		it("arcsin(5) = NaN", function() {
			const gets = calc("arcsin", 5);
			const expect = "NaN";
			assert.equal(gets, expect);
		});
		it("arccos(5) = NaN", function() {
			const gets = calc("arccos", 5);
			const expect = "NaN";
			assert.equal(gets, expect);
		});
		it("arcsin(0.5) = 0.5235987756", function() {
			const gets = calc("arcsin", 0.5);
			const expect = 0.5235987756;
			assert.equal(gets, expect);
		});
		it("arccos(0.5) = 1.0471975512", function() {
			const gets = calc("arccos", 0.5);
			const expect = 1.0471975512;
			assert.equal(gets, expect);
		});
		it("arctan(0.5) = 0.4636476090", function() {
			const gets = calc("arctan", 0.5);
			const expect = 0.4636476090;
			assert.equal(gets, expect);
		});
		it("lg(10) = 1", function() {
			const gets = calc("lg", 10);
			const expect = 1;
			assert.equal(gets, expect);
		});
		it("ln(10) = 2.30258509299", function() {
			const gets = calc("ln", 10);
			const expect = 2.30258509299;
			assert.equal(gets, expect);
		});
		it("sqrt (√25 = 5)", function() {
			const gets = calc("√", 25);
			const expect = 5;
			assert.equal(gets, expect);
		});
	});
});