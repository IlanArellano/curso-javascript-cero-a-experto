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
    type: "operator",
  },
  {
    name: "C",
    display: "C",
    value: undefined,
    type: "operator",
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
    display: "X",
    value: undefined,
    type: "operator",
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
    resolve: (values) => {
      const l = values.prevs.length;
      if (l === 0) return 0;
      if (values.curr) return values.prevs[l - 1] + values.curr;
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
    type: "operator",
  },
  {
    name: "equal",
    display: "=",
    value: undefined,
    type: "operator",
  },
];

const CalculatorButtonsContainer = document.querySelector(
  "#calculator-buttons"
);
const input = document.querySelector("#input");
const result = document.querySelector("#result");
const values = {
  prevs: [0],
  curr: 0,
  result: 0,
};

for (const item of buttons) {
  const button = document.createElement("button");

  button.innerHTML = item.display;
  button.addEventListener("click", () => resolveButton(item));
  CalculatorButtonsContainer.appendChild(button);
}

function resolveButton(item) {
  switch (item.type) {
    case "input":
      const prev = result.innerHTML;
      const curr = (prev.startsWith("0") ? prev.slice(1) : prev) + item.display;
      result.innerHTML = curr;
      break;
    case "operator":
      const currentValue = result.innerHTML;
      if (!currentValue || currentValue === "0") return;
      values.prevs.push(Number(currentValue));
      const resolve = item?.resolve(values) ?? 0;
      values.curr = resolve;
      input.innerHTML = input.innerHTML + resolve + item.display;
      result.innerHTML = "0";
      break;
  }
}
