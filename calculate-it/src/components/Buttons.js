import React from "react";
import styled from "styled-components";

export default function Buttons(props) {
  const { handleInput } = props;

  const handleKeyDown = (key) => {
    let keyCode = {
      "(": "(",
      ")": ")",
      D: "AC",
      Backspace: "DEL",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      0: "0",
      ".": ".",
      "+": "+",
      "-": "-",
      "*": "x",
      "/": "÷",
      "=": "=",
    };

    handleInput(keyCode[key]);
  };

  return (
    <ButtonContainer
      onKeyDown={(evt) => handleKeyDown(evt.key)}
      onClick={(evt) => handleInput(evt.target.value)}
    >
      <GrayButton value="(">(</GrayButton>
      <GrayButton value=")">)</GrayButton>
      <GrayButton value="AC">AC</GrayButton>
      <GrayButton value="DEL">←</GrayButton>

      <Button value="1">1</Button>
      <Button value="2">2</Button>
      <Button value="3">3</Button>
      <DarkOrangeButton value="÷">÷</DarkOrangeButton>

      <Button value="4">4</Button>
      <Button value="5">5</Button>
      <Button value="6">6</Button>
      <DarkOrangeButton value="x">x</DarkOrangeButton>

      <Button value="7">7</Button>
      <Button value="8">8</Button>
      <Button value="9">9</Button>
      <DarkOrangeButton value="-">-</DarkOrangeButton>

      <Button value=".">.</Button>
      <Button value="0">0</Button>
      <Button value="=">=</Button>
      <DarkOrangeButton value="+">+</DarkOrangeButton>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 24.2%);
  border: 0;
  margin: 20px 20px;
  gap: 5px;
`;

const Button = styled.button`
  background: #faebcd;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const DarkOrangeButton = styled(Button)`
  background: #f8b500;
`;

const GrayButton = styled(Button)`
  background: #c4c4c4;
`;
