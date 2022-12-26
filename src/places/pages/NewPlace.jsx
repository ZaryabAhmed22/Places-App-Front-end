import React from "react";
import Input from "../../shared/compnents/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewPlace.css";

export default function NewPlace() {
  return (
    <form className="place-form">
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH()]}
        errorText="Please enter a valid text"
      />
    </form>
  );
}
