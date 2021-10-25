const previousInput = document.querySelector(".previous-input");
const currentInput = document.querySelector(".current-input");
const digitButtons = document.querySelectorAll(".digit");
const operationButtons = document.querySelectorAll(".operation-button");
const deleteAllButton = document.querySelector("#delete-all");
const deleteOnceButton = document.querySelector("#delete-once");
const equalsButton = document.querySelector("#equals-button");

function deleteAll() {
  previousInput.innerText = "";
  currentInput.innerText = "0";
}

function deleteOnce() {
  currentInput.innerText = currentInput.innerText.slice(0, -1);
  if (currentInput.innerText.length === 0) {
    currentInput.innerText = "0";
  }
}

function roundDecimal(num) {
  return num % 1 != 0 ? Math.round(num * 1000) / 1000 : num;
}

function addOperation(num1, num2) {
  let res = num1 + num2;
  return roundDecimal(res);
}
function subtractOperation(num1, num2) {
  let res = num1 - num2;
  return roundDecimal(res);
}
function multiplyOperation(num1, num2) {
  let res = num1 * num2;
  return roundDecimal(res);
}
function divideOperation(num1, num2) {
  let res = num1 / num2;
  return roundDecimal(res);
}

function modulusOperation(num1, num2) {
  let res = num1 % num2;
  return roundDecimal(res);
}

function equalsOperation() {
  const inputedArray = previousInput.innerText.split(" ");
  const num1 = Number(inputedArray[0]);
  const num2 = Number(currentInput.innerText);
  const operation = inputedArray[1];

  switch (operation) {
    case "+":
      previousInput.innerText = `${num1} ${operation} ${num2} =`;
      currentInput.innerText = addOperation(num1, num2);
      break;

    case "-":
      previousInput.innerText = `${num1} ${operation} ${num2} =`;
      currentInput.innerText = subtractOperation(num1, num2);
      break;

    case "x":
      previousInput.innerText = `${num1} ${operation} ${num2} =`;
      currentInput.innerText = multiplyOperation(num1, num2);
      break;

    case "÷":
      previousInput.innerText = `${num1} ${operation} ${num2} =`;
      currentInput.innerText = divideOperation(num1, num2);
      break;

    case "%":
      previousInput.innerText = `${num1} ${operation} ${num2} =`;
      currentInput.innerText = modulusOperation(num1, num2);
      break;

    default:
      break;
  }
}

digitButtons.forEach((digit) => {
  digit.addEventListener("click", (e) => {
    if (currentInput.innerText === "0" && e.target.innerText !== ".") {
      currentInput.innerText = "";
    } else if (
      currentInput.innerText.length === 9 ||
      (currentInput.innerText.includes(".") && e.target.innerText === ".")
    ) {
      return;
    }
    currentInput.innerText += digit.innerText;
  });
});

operationButtons.forEach((operation) => {
  operation.addEventListener("click", (e) => {
    if (
      previousInput.innerText === "" ||
      previousInput.innerText.split(" ").length === 4
    ) {
      previousInput.innerText = `${currentInput.innerText} ${e.target.innerText}`;
    } else {
      equalsOperation();
      previousInput.innerText = `${currentInput.innerText} ${e.target.innerText}`;
    }
    currentInput.innerText = "0";
  });
});

deleteAllButton.addEventListener("click", deleteAll);
deleteOnceButton.addEventListener("click", deleteOnce);
equalsButton.addEventListener("click", equalsOperation);
