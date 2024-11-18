import "../App.css";
import React, { useState, useEffect } from "react";

export default function Keys() {

  const [display, setDisplay] = useState("0");
  const [currentValue, setCurrentValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? String(digit) : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setCurrentValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(-parseFloat(display)));
  };

  const inputPercent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (currentValue == null) {
      setCurrentValue(inputValue);
    } else if (operator) {
      const result = calculate(currentValue, inputValue, operator);
      setDisplay(String(result));
      setCurrentValue(result);

    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };


  const calculate = (a, b, op) => {
    switch (op) {
      case "+": return a + b;
      case "-": return a - b;
      case "x": return a * b;
      case "/": return b !== 0 ? a / b : "Error";
      default: return b;
    }
  };

  const keys = [
    [{
      "symbol": "AC",
      onClick: () => { clearDisplay() },
    },
    {
      "symbol": "+-",
      onClick: () => { toggleSign() },
    },
    {
      "symbol": "%",
      onClick: () => { inputPercent() },
    },], [
      {
        "symbol": "/",
        onClick: () => performOperation("/"),
      },
      {
        "symbol": "x",
        onClick: () => performOperation("x"),
      },
      {
        "symbol": "-",
        onClick: () => performOperation("-"),
      },
      {
        "symbol": "+",
        onClick: () => performOperation("+"),
      },
      {
        "symbol": "=",
        onClick: () => performOperation("=")
      }],

  ]
  const keyValues = [
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["0", "."]
  ];

  return (
    <div className="calc-keys-background">
      <div className="calc-display">{display}</div>
      <div className="all-keys">
        <div>
          {keys[0].map((key, i) =>
            <button key={i} onClick={key.onClick} title={key.symbol} className="calc-keys">{key.symbol}</button>
          )}
          {keyValues.map((row, i) => {
            return <div key={i}>
              {row.map((value) =>
                <button onClick={() => value === "." ? inputDecimal() : inputDigit(parseInt(value))} title={value} className={parseInt(value) === 0 ? "zero-key" : "calc-keys"}>{value}</button>
              )}
            </div>
          })}
        </div>
        <div className="vertical-keys">
          {keys[1].map((key, i) => (
            <button key={i} onClick={key.onClick} className="op-keys">{key.symbol}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

