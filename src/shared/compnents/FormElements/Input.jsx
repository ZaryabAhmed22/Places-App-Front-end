import React, { useEffect, useReducer } from "react";
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

//Using the useReducer hook to manage the complex state
export default function Input(props) {
  const [inputState, dispatchInput] = useReducer(
    inputReducer,
    initialInputState
  );

  // >> Using the object destructuring for clean code and pass in as dependencies
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  //Using the useEffect hook to avoid unessary re-rendering
  useEffect(() => {
    //Lifting the state up to the parent component NewPlace
    onInput(id, value, isValid);

    // const timeOut = setTimeout(() => {}, 1000);

    // //Cleanup function
    // return () => {
    //   clearTimeout(timeOut);
    // };
  }, [id, value, isValid, onInput]);

  //The onChange handler function
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
