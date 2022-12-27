import React, { useCallback, useReducer } from "react";
import Input from "../../shared/compnents/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./PlaceForm.css";
import Button from "../../shared/compnents/FormElements/Button";

//Reducer function to manage the form state
function formReducer(state, action) {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        formIsValid: formIsValid,
      };

    default:
      return state;
  }
}

const initialFormState = {
  inputs: {
    title: { value: "", isValid: false },
    description: { value: "", isValid: false },
    address: { value: "", isValid: false },
  },
  formIsValid: false,
};

export default function NewPlace() {
  //Using the useRecuder hook to manage the form state
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  //Pulling the state up from the child component "Input"
  // >> Using the useCallback hook to avoid unecesssary re-evaluation of title change handler because functions are premitive valuee and whenever their state changes they are re allocated to the memory and cause the component to re-render hance this will create an infinte loop
  const inputChangeHandler = useCallback((id, value, isValid) => {
    //The dispatch function is called with a type and some payloads. Whenever the dispatch is called, the reducer function is called which updates the state. The updated state is then returned through the useReducer hook
    dispatchForm({
      type: "INPUT_CHANGE",
      inputId: id,
      isValid: isValid,
      value: value,
    });
    // console.log(id, value, isValid);
  }, []);

  const placeSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs); //send to server
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid text"
        onInput={inputChangeHandler}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid text (with 5 characters minimum)"
        onInput={inputChangeHandler}
      />

      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputChangeHandler}
      />
      <Button type={"submit"} disabled={!formState.formIsValid}>
        ADD PLACE
      </Button>
    </form>
  );
}
