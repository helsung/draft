import React from "react";
import { mount, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import App from "./App";

configure({ adapter: new Adapter() });

let wrapper;
window.alert = jest.fn();
beforeEach(() => (wrapper = mount(<App />)));

describe("<App> component can validate user input: ", () => {
  it("invalid order of parenthesis will produce an alert", () => {
    let invalidInput = ")2-1(";

    for (let i = 0; i < invalidInput.length; i++) {
      wrapper.find(`button[value="${invalidInput[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter a valid expression!"
    );
    window.alert.mockClear(); //global object and its calls will persist across tests??
  });

  it("unbalanced parenthesis will produce an alert", () => {
    let invalidInput = "(2-1(";

    for (let i = 0; i < invalidInput.length; i++) {
      wrapper.find(`button[value="${invalidInput[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter a valid expression!"
    );
    window.alert.mockClear();
  });

  it("more than two operators in a series will not be supported...", () => {
    let invalidInput = "2+-+-1";

    for (let i = 0; i < invalidInput.length; i++) {
      wrapper.find(`button[value="${invalidInput[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(window.alert).toHaveBeenCalledWith(
      "Please enter a valid expression!"
    );
    window.alert.mockClear();
  });

  it("...however consecutive (-) operators are supported", () => {
    let input = "2--3";
    for (let i = 0; i < input.length; i++) {
      wrapper.find(`button[value="${input[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(wrapper.find("p").text()).toBe("5");
  });
});

//backspace and delete
describe("<App> component can handle various functionalities from <Button> component:", () => {
  it("backspace will delete one element at a time", () => {
    let input = "22x5";
    for (let i = 0; i < input.length; i++) {
      wrapper.find(`button[value="${input[i]}"]`).simulate("click");
    }
    expect(wrapper.find("p").text()).toBe("22x5");

    wrapper.find('button[value="DEL"]').simulate("click");
    expect(wrapper.find("p").text()).toBe("22x");

    wrapper.find('button[value="DEL"]').simulate("click");
    expect(wrapper.find("p").text()).toBe("22");

    wrapper.find('button[value="DEL"]').simulate("click");
    expect(wrapper.find("p").text()).toBe("");
  });

  it("AC will clear entire entry (All Clear)", () => {
    let input = "22x5";
    for (let i = 0; i < input.length; i++) {
      wrapper.find(`button[value="${input[i]}"]`).simulate("click");
    }

    expect(wrapper.find("p").text()).toBe("22x5");
    wrapper.find('button[value="AC"]').simulate("click");
    expect(wrapper.find("p").text()).toBe("");
  });
});

//calculate
describe("<App> component can calculate valid expressions:", () => {
  it("can support decimals", () => {
    let input = "-.32÷.5";

    for (let i = 0; i < input.length; i++) {
      wrapper.find(`button[value="${input[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(wrapper.find("p").text()).toBe("-0.64");
  });

  it("can support standard mathematical order of operations", () => {
    let input = "-5+-8--11x2";

    for (let i = 0; i < input.length; i++) {
      wrapper.find(`button[value="${input[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(wrapper.find("p").text()).toBe("9");
  });

  it("can support parenthesis", () => {
    let input = "(4-2)x3.5";

    for (let i = 0; i < input.length; i++) {
      wrapper.find(`button[value="${input[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(wrapper.find("p").text()).toBe("7");
  });

  it("can support nested parenthesis", () => {
    let input = "1+(5x(5-2)÷3)";

    for (let i = 0; i < input.length; i++) {
      wrapper.find(`button[value="${input[i]}"]`).simulate("click");
    }

    wrapper.find('button[value="="]').simulate("click");
    expect(wrapper.find("p").text()).toBe("6");
  });
});
