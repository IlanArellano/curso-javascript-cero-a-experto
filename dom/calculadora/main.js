//Declaraciones
const buttons = [
  {
    name: "percentage",
    display: "%",
    value: undefined,
    type: "operator",
  },
  {
    name: "CE",
    display: "CE",
    value: undefined,
    type: "clear",
  },
  {
    name: "C",
    display: "C",
    value: undefined,
    type: "clear",
  },
  {
    name: "back",
    display: "<-",
    value: undefined,
    type: "operator",
  },
  {
    name: "inverse",
    display: "1/x",
    value: undefined,
    type: "operator",
  },
  {
    name: "pow",
    display: "x2",
    value: undefined,
    type: "operator",
  },
  {
    name: "square",
    display: "sqrt",
    value: undefined,
    type: "operator",
  },
  {
    name: "division",
    display: "/",
    value: undefined,
    type: "operator",
    resolve: () => {
      const l = values.prevs.length;
      if (l === 0) return 0;
      if (values.curr) return values.curr / values.prevs[l - 1];
      return values.prevs[l - 1];
    },
  },
  {
    name: "seven",
    display: "7",
    value: 7,
    type: "input",
  },
  {
    name: "eight",
    display: "8",
    value: 8,
    type: "input",
  },
  {
    name: "nine",
    display: "9",
    value: 9,
    type: "input",
  },
  {
    name: "multiplication",
    display: "x",
    value: undefined,
    type: "operator",
    resolve: () => {
      const l = values.prevs.length;
      if (l === 0) return 0;
      if (values.curr) return values.curr * values.prevs[l - 1];
      return values.prevs[l - 1];
    },
  },
  {
    name: "four",
    display: "4",
    value: 4,
    type: "input",
  },
  {
    name: "five",
    display: "5",
    value: 5,
    type: "input",
  },
  {
    name: "six",
    display: "6",
    value: 6,
    type: "input",
  },
  {
    name: "minus",
    display: "-",
    value: undefined,
    type: "operator",
    resolve: () => {
      const l = values.prevs.length;
      if (l === 0) return 0;
      if (values.curr) return values.curr - values.prevs[l - 1];
      return values.prevs[l - 1];
    },
  },
  {
    name: "one",
    display: "1",
    value: 1,
    type: "input",
  },
  {
    name: "two",
    display: "2",
    value: 2,
    type: "input",
  },
  {
    name: "three",
    display: "3",
    value: 3,
    type: "input",
  },
  {
    name: "plus",
    display: "+",
    value: "+",
    type: "operator",
    resolve: () => {
      const l = values.prevs.length;
      if (l === 0) return 0;
      console.log({ values });
      if (values.curr) return values.curr + values.prevs[l - 1];
      return values.prevs[l - 1];
    },
  },
  {
    name: "zero",
    display: "0",
    value: 0,
    type: "input",
  },
  {
    name: "dot",
    display: ".",
    value: undefined,
    type: "input",
  },
  {
    name: "equal",
    display: "=",
    value: undefined,
    type: "equal",
  },
];

const CalculatorButtonsContainer = document.querySelector(
  "#calculator-buttons"
);
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const INITIAL = {
  prevs: [0],
  curr: 0,
  hasResultCalculated: false,
};
let values = createValues();
let prevType = null;
let prevOperator = null;

//utilidades
function fixNumberStr(str) {
  return str.startsWith("0") ? str.slice(1) : str;
}

function createValues() {
  return window.structuredClone(INITIAL);
}

function isOperator(item) {
  return item !== null && item.type === "operator";
}

//Funcionalidad
for (const item of buttons) {
  const button = document.createElement("button");

  button.innerHTML = item.display;
  button.addEventListener("click", () => resolveButton(item));
  CalculatorButtonsContainer.appendChild(button);
}

function pushStackValue() {
  const currentValue = result.innerHTML;
  if (!currentValue || currentValue === "0") return false;
  values.prevs.push(Number(currentValue));
  return true;
}

function clear() {
  values = createValues();
  prevType = null;
  result.innerHTML = "0";
  input.innerHTML = "0";
}

function calculateOperator(item) {
  if (
    (isOperator(prevType) && item.name !== prevType.name) ||
    !pushStackValue()
  )
    return;
  const resolve = values.hasResultCalculated
    ? values.prevs[values.prevs.length - 1]
    : (prevOperator ? prevOperator : item)?.resolve() ?? 0;
  values.hasResultCalculated = false;
  values.curr = resolve;
  input.innerHTML =
    fixNumberStr(input.innerHTML) + result.innerHTML + item.display;
  result.innerHTML = resolve;
  prevOperator = item;
}

function resolveInputs() {
  if (
    isOperator(prevType) ||
    values.hasResultCalculated ||
    !prevOperator ||
    !pushStackValue()
  )
    return;
  const resolve = prevOperator?.resolve() ?? 0;
  values.curr = resolve;
  input.innerHTML += result.innerHTML;
  result.innerHTML = resolve;
  values.hasResultCalculated = true;
}

function resolveButton(item) {
  switch (item.type) {
    case "input":
      const prev =
        prevType !== null && prevType.type === "operator"
          ? "0"
          : result.innerHTML;
      const curr = fixNumberStr(prev) + item.display;
      result.innerHTML = curr;
      break;
    case "operator":
      calculateOperator(item);
      break;
    case "clear":
      clear();
      break;
    case "equal":
      resolveInputs();
      break;
  }
  prevType = item;
}
