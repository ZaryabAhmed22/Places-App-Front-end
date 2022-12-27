import React, { useCallback } from "react";
import Input from "../../shared/compnents/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";

export default function NewPlace() {
  //Pulling the state up from the child component "Input"
  // >> Using the useCallback hook to avoid unecesssary re-evaluation of title change handler because functions are premitive valuee and whenever their state changes they are re allocated to the memory and cause the component to re-render hance this will create an infinte loop
  const titleChangeHandler = useCallback((id, value, isValid) => {
    console.log(id, value, isValid);
  }, []);

  const descriptionChangeHandler = useCallback((id, value, isValid) => {
    console.log(id, value, isValid);
  }, []);

  return (
    <form className="place-form">
      <Input
        id="text"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid text"
        onInput={titleChangeHandler}
      />

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid text (with 5 characters minimum)"
        onInput={descriptionChangeHandler}
      />
    </form>
  );
}
