import React, { useReducer } from "react";
import { validate } from "../../util/validators";
import "./Input.css";

//Reducer function for the useReducer hook
function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
}

// Initial state for the useReducer hook
const initialInputState = { value: "", isTouched: false, isValid: false };

export default function Input(props) {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    initialInputState
  );

  function changeHandler(e) {
    dispatchInput({
      type: "CHANGE",
      value: e.target.value,
      validators: props.validators,
    });
  }

  //function for the onBlur event, that is triggered when the user loses focus
  function touchHandler() {
    dispatchInput({
      type: "TOUCH",
    });
  }

  //JSX for either input element or textArea element to use the component more useable
  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
}
