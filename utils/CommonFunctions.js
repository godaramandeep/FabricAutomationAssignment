const { expect } = require("@playwright/test");

class CommonFunctions {
  
  static createRandomValue = prefix =>
    `${prefix}${Math.floor(Math.random() * 1000)}`;

  static addTwoNumbers = (firstNumber, secondNumber) =>
    `$${(+firstNumber.slice(1) + +secondNumber.slice(1)).toFixed(2)}`;

  static subtractTwoNumbers = (firstNumber, secondNumber) =>
    `$${(+firstNumber.slice(1) - +secondNumber.slice(1)).toFixed(2)}`;

  static removeDollar = num => +num.replace('$', '');
}

module.exports = CommonFunctions;
