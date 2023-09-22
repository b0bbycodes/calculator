let inputDisplay = document.querySelector(".calc-input");
let deleteIcon = document.querySelector(".delete-icon");
let inputResult = document.querySelector(".calc-result");
let buttons = document.querySelectorAll(".btn-text");
let equalsButton = document.querySelector(".equals-btn");
let operators = document.querySelectorAll(".operator");
let clearButton = document.querySelector(".clear-btn");
let displayValue = "";
let initialReplaced = false;
let firstNumber = "";
let secondNumber = "";
let operator = "";
let pendingOperation = null;

function addNumbers(number1, number2) {
  return number1 + number2;
}

function subtractNumbers(number1, number2) {
  return number1 - number2;
}
function multiplyNumbers(number1, number2) {
  return number1 * number2;
}
function divideNumbers(number1, number2) {
  return number1 / number2;
}

function operate(number1, operator, number2) {
  let a = parseFloat(number1);
  let b = parseFloat(number2);

  switch (operator) {
    case "+":
      return addNumbers(a, b);

    case "-":
      return subtractNumbers(a, b);

    case "*":
      return multiplyNumbers(a, b);

    case "/":
      if (number2 == 0) {
        inputDisplay.textContent = "ERROR";

        inputResult.classList.remove("active");
        inputResult.classList.add("calc-result");
        inputResult.textContent = "ERFloat";

        displayValue = "";
        disableButtons();
      } else {
        return divideNumbers(a, b);
      }

    default:
      return;
  }
}

function display() {
  

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let buttonText = button.textContent;
      console.log("button is being clicked");
      if (!initialReplaced) {
        inputDisplay.textContent = buttonText;
        initialReplaced = true;
        displayValue = buttonText;
      } else if (displayValue === "") {
        displayValue = buttonText;
        inputDisplay.textContent = displayValue;
        initialReplaced = true;
        // displayValue = buttonText;

        console.log(`dsiplay value is ${displayValue}`);
      } else {
        inputDisplay.textContent += buttonText;
        displayValue += buttonText;
        console.log(`current display value is: ${displayValue}`);
      }
    });
  });

  operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click", () => {
      console.log("operator clicked", operatorButton.textContent);
      inputDisplay.textContent += operatorButton.textContent;
      if (displayValue != "") {
        if(pendingOperation !== null){
          secondNumber = displayValue;
          const result = operate(firstNumber,operator,secondNumber);
          inputDisplay.textContent = result;
          displayValue = result;
          firstNumber = result;
        }else{
        firstNumber = displayValue;
        console.log(`first number: ${firstNumber}`);



        }
        operator = operatorButton.textContent;
        console.log(`operator: ${operator}`);
        displayValue = "";
        pendingOperation = operatorButton.textContent;
      }
    });
  });

  equalsButton.addEventListener("click", () => {
    console.log("equals button clicked");
    if (displayValue != "" && pendingOperation !== null) {
     

      secondNumber = displayValue;
      console.log(`second number: ${secondNumber}`);
      const result = operate(firstNumber, operator, secondNumber);
      console.log(`Result: ${result}`);
      inputResult.textContent = result;
      inputResult.classList.remove("calc-input");
      inputResult.classList.add("active");
  pendingOperation = null;
    }
  });

  deleteIcon.addEventListener("click", () => {
    console.log("delete icon clicked");
    let currentText = inputDisplay.textContent;
    if (currentText.length > 0) {
      currentText = currentText.slice(0, -1);
      displayValue = displayValue.slice(0, -1);
      inputDisplay.textContent = currentText;
      console.log(`updated displayValue: ${displayValue}`);
    }
    if (currentText.length === 0) {
      inputDisplay.textContent = "0";
      inputResult.classList.remove('active')

      inputResult.classList.add('calc-input');
      displayValue = "";
      console.log(`current display value after deletion: ${displayValue}`);
      // currentText = "0";
      // inputDisplay.textContent = displayValue;
    }
  });
}

display();

function clear() {
  initialReplaced = false;
  displayValue = "";
  firstNumber = "";
  operator = "";
  secondNumber = "";
  inputDisplay.textContent = "0";
  inputResult.classList.remove("active");
  pendingOperation = null;
  enableButtons();
}

clearButton.addEventListener("click", clear);

function disableButtons() {
  buttons.forEach((button) => {
    button.disabled = true;
  });

  operators.forEach((operator) => {
    operator.disabled = true;
  });

  equalsButton.disabled = true;
}

function enableButtons() {
  buttons.forEach((button) => {
    button.disabled = false;
  });

  operators.forEach((operator) => {
    operator.disabled = false;
  });

  equalsButton.disabled = false;
}
