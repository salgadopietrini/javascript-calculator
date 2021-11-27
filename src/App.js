import React, { useState } from "react";
import "./app.css";

function App() {
  const [display, setDisplay] = useState("0");
  const [operators, setOperators] = useState([]);

  const calculator = {
    operations: {
      equals: {
        name: "equals",
        value: "=",
        operation: (arr) => {
          if (
            arr[arr.length - 1] === "add" ||
            arr[arr.length - 1] === "subtract" ||
            arr[arr.length - 1] === "divide" ||
            arr[arr.length - 1] === "multiply"
          ) {
            arr = arr.slice(0, arr.length - 1);
          }
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "multiply" || arr[i] === "divide") {
              arr = [
                ...arr.slice(0, i - 1),
                calculator.operations[arr[i]].operation(arr[i - 1], arr[i + 1]),
                ...arr.slice(i + 2),
              ];
              i -= 2;
              console.log(arr);
            }
          }
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "add" || arr[i] === "subtract") {
              arr = [
                ...arr.slice(0, i - 1),
                calculator.operations[arr[i]].operation(arr[i - 1], arr[i + 1]),
                ...arr.slice(i + 2),
              ];
              i -= 2;
              console.log(arr);
            }
          }
          setOperators([arr.toString()]);
          setDisplay(arr.join());
        },
      },
      add: {
        name: "add",
        value: "+",
        operation: (a, b) => parseFloat(a) + parseFloat(b),
      },
      subtract: {
        name: "subtract",
        value: "-",
        operation: (a, b) => parseFloat(a) - parseFloat(b),
      },
      multiply: {
        name: "multiply",
        value: "*",
        operation: (a, b) => parseFloat(a) * parseFloat(b),
      },
      divide: {
        name: "divide",
        value: "/",
        operation: (a, b) => parseFloat(a) / parseFloat(b),
      },

      decimal: {
        name: "decimal",
        value: ".",
      },
      clear: {
        name: "clear",
        value: "C",
        operation: () => {
          setOperators([]);
          setDisplay("0");
        },
      },
    },

    numbers: [
      {
        value: 0,
        name: "zero",
      },
      {
        value: 1,
        name: "one",
      },
      {
        value: 2,
        name: "two",
      },
      {
        value: 3,
        name: "three",
      },
      {
        value: 4,
        name: "four",
      },
      {
        value: 5,
        name: "five",
      },
      {
        value: 6,
        name: "six",
      },
      {
        value: 7,
        name: "seven",
      },
      {
        value: 8,
        name: "eight",
      },
      {
        value: 9,
        name: "nine",
      },
    ],
  };

  const addOperator = ({ value, name }) => {
    value = value.toString();
    switch (value) {
      case "=":
        calculator.operations.equals.operation(operators);
        break;
      case "C":
        calculator.operations.clear.operation();
        break;
      case ".":
        if (operators.length === 0) {
          setOperators(["0."]);
          setDisplay("0.");
          break;
        } else if (
          (parseFloat(operators[operators.length - 1]) === 0 &&
            /\./.test(operators[operators.length - 1])) ||
          /\./.test(operators[operators.length - 1])
        ) {
          break;
        } else if (
          operators[operators.length - 1] === "add" ||
          operators[operators.length - 1] === "subtract" ||
          operators[operators.length - 1] === "multiply" ||
          operators[operators.length - 1] === "divide"
        ) {
          setOperators((state) => [...state, "0."]);
          setDisplay((state) => state.concat("0."));
          break;
        } else {
          setOperators((state) => [
            ...state.slice(0, state.length - 1),
            state[state.length - 1].concat("."),
          ]);
          setDisplay((state) => state.concat("."));
          break;
        }
      case "0":
        if (
          operators.length === 0 ||
          (parseFloat(operators[operators.length - 1]) === 0 &&
            !/\./.test(operators[operators.length - 1]))
        ) {
          break;
        } else if (
          operators[operators.length - 1] === "add" ||
          operators[operators.length - 1] === "subtract" ||
          operators[operators.length - 1] === "multiply" ||
          operators[operators.length - 1] === "divide"
        ) {
          setDisplay((state) => state.concat(value));
          setOperators((state) => [...state, value]);
          break;
        } else {
          setDisplay((state) => state.concat(value));
          setOperators((state) => [
            ...state.slice(0, state.length - 1),
            state[state.length - 1].concat(value),
          ]);
          break;
        }
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (operators.length === 0) {
          setDisplay(value);
          setOperators([value]);
        } else if (
          operators[operators.length - 1] === "add" ||
          operators[operators.length - 1] === "subtract" ||
          operators[operators.length - 1] === "multiply" ||
          operators[operators.length - 1] === "divide"
        ) {
          setDisplay((state) => state.concat(value));
          setOperators((state) => [...state, value]);
          break;
        } else {
          setDisplay((state) => state.concat(value));
          setOperators((state) => [
            ...state.slice(0, state.length - 1),
            state[state.length - 1].concat(value),
          ]);
        }
        break;
      case "+":
      case "/":
      case "*":
        if (operators.length === 0 && name === "subtract") {
          setDisplay("-");
          setOperators(["0", "subtract"]);
          break;
        } else if (operators.length === 0) {
          break;
        } else if (
          operators[operators.length - 1] === "add" ||
          operators[operators.length - 1] === "subtract" ||
          operators[operators.length - 1] === "multiply" ||
          operators[operators.length - 1] === "divide"
        ) {
          setDisplay((state) => state.slice(0, state.length - 1).concat(value));
          setOperators((state) => [...state.slice(0, state.length - 1), name]);
          break;
        } else if (operators[operators.length - 1] === "-") {
          setDisplay((state) => state.slice(0, state.length - 4).concat(value));
          setOperators((state) => [...state.slice(0, state.length - 2), name]);
          break;
        } else {
          setDisplay((state) => state.concat(value));
          setOperators((state) => [...state, name]);
        }
        break;
      case "-":
        if (operators.length === 0 && name === "subtract") {
          setDisplay("-");
          setOperators(["0", "subtract"]);
          break;
        } else if (
          operators.length === 0 ||
          operators[operators.length - 1] === "-"
        ) {
          break;
        } else if (operators[operators.length - 1] === "add") {
          setDisplay((state) => state.slice(0, state.length - 1).concat(value));
          setOperators((state) => [...state.slice(0, state.length - 1), name]);
          break;
        } else if (
          operators[operators.length - 1] === "multiply" ||
          operators[operators.length - 1] === "divide"
        ) {
          setDisplay((state) => state + "(" + value + ")");
          setOperators((state) => [...state, "-"]);
          break;
        } else {
          setDisplay((state) => state.concat(value));
          setOperators((state) => [...state, name]);
        }
        break;
      default:
    }
  };

  return (
    <div className="container">
      <div className="calculator">
        <div id="display">{display}</div>
        <div className="keys">
          <div className="numberKeys">
            {calculator.numbers.reverse().map((elem) => (
              <button
                id={elem.name}
                key={elem.name}
                className="number"
                onClick={() => addOperator(elem)}
              >
                {elem.value}
              </button>
            ))}
          </div>
          <div className="operationKeys">
            {Object.keys(calculator.operations).map((elem) => (
              <button
                id={calculator.operations[elem].name}
                key={calculator.operations[elem].name}
                className="operation"
                onClick={() => addOperator(calculator.operations[elem])}
              >
                {calculator.operations[elem].value}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
