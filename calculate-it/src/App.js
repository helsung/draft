import React, { useState } from "react";
import styled from "styled-components";
import Input from "./components/Input";
import Buttons from "./components/Buttons";

export default function App() {
  const [userInput, setUserInput] = useState("");

  const handleInput = (button) => {
    if (button === "AC") clearAll();
    else if (button === "DEL") backspace();
    else if (button === "=") {
      validateInput(userInput) ? calculate(convertToArr(userInput)) : null;
    } else if (userInput.length > 20)
      alert("Please limit input to 20 characters");
    else if (button === undefined) return false;
    else setUserInput(userInput + button);
  };

  const clearAll = () => {
    setUserInput("");
  };

  const backspace = () => {
    let inputArr = convertToArr(userInput);
    setUserInput(inputArr.slice(0, -1).join(""));
  };

  const convertToArr = (input) => {
    //add spaces for non-numerical characters for easy string parsing
    let spacedInput = "";
    for (let i = 0; i < input.length; i++) {
      let char = input[i];
      if (isNaN(char) && char !== ".") {
        spacedInput += ` ${char} `;
      } else {
        spacedInput += char;
      }
    }
    return spacedInput.split(" ").filter((el) => el);
  };

  const validateInput = (input) => {
    let operators = ["+", "-", "x", "/"];
    let errorMsg = "Please enter a valid expression!";
    let arr = convertToArr(input);
    let balancedBrackets = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "(") balancedBrackets++;
      if (arr[i] === ")") balancedBrackets--;

      if (balancedBrackets < 0) {
        alert(errorMsg);
        return;
      }

      if (operators.includes(arr[i]) && operators.includes(arr[i + 1])) {
        if (arr[i + 1] !== "-") {
          alert(errorMsg);
          return;
        }
      }
    }

    return balancedBrackets === 0 ? true : alert(errorMsg);
  };

  const calculate = (arr, i = 0) => {
    let res = 0;
    let operator = "+";
    let currNum = 0;
    let stack = [];
    while (i <= arr.length) {
      if (arr[i] === "(") {
        i++;
        let [res, idx] = calculate(arr, i);
        updateStack(stack, res, operator);
        i = idx++;
        operator = arr[i++];
        continue;
      } else if (arr[i] === ")") {
        updateStack(stack, currNum, operator);
        res = stack.reduce((accum, val) => accum + val);
        return [res, i];
      } else {
        if (!isNaN(arr[i])) {
          currNum = Number(arr[i]);
        }

        if (isNaN(arr[i]) || i === arr.length - 1) {
          if (arr[i] === "-" && arr[i + 1] === "-") {
            operator, (arr[i + 1] = "+");
          }
          updateStack(stack, currNum, operator);
          operator = arr[i];
          currNum = 0;
        }
      }
      i++;
    }
    res = stack.reduce((accum, val) => accum + val);
    setUserInput(parseFloat(res.toFixed(10)));
  };

  const updateStack = (stack, currNum, operator) => {
    switch (operator) {
      case "+":
        stack.push(currNum);
        break;
      case "-":
        stack.push(-currNum);
        break;
      case "x":
        stack.push(stack.pop() * currNum);
        break;
      case "÷":
        stack.push(stack.pop() / currNum);
        break;
    }
  };

  return (
    <Wrapper>
      <CalculatorContainer>
        <Input userInput={userInput} />
        <Buttons handleInput={handleInput} />
      </CalculatorContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-width: 550px;
  min-height: 590px;
  font-family: Sans-serif;
`;

const CalculatorContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #5c636e;
  width: 530px;
  height: 570px;
`;
