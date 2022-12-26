import React, { useReducer } from "react";
import "./Input.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return { ...state, value: action.value, isValid: true };

    default:
      return state;
  }
}

const initialInputState = { value: "", isValid: false };

export default function Input(props) {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    initialInputState
  );

  function changeHandler(e) {
    dispatchInput({ type: "CHANGE", value: e.target.value });
  }
  const element =
    props.element === "input" ? (
      <input
        type={props.type}
        placeholder={props.placeholder}
        id={props.id}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
}
