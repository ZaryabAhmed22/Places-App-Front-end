import React from "react";
import Button from "../../shared/compnents/FormElements/Button";
import Input from "../../shared/compnents/FormElements/Input";
import Card from "../../shared/compnents/UI/Card";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import "./Auth.css";

export default function Auth() {
  //Calling the custom hook for form
  const [formState, inputChangeHandler] = useForm({
    inputs: {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    formIsValid: false,
  });

  console.log(formState);

  //Handler for form submission
  const authenticateUSerHandler = (e) => {
    e.preventDefault();
    console.log(formState); //Send this data to the API
  };

  return (
    //Rendering the for only once the places are loaded
    <Card
      className="authentication"
      style={{ backgroundColor: "white", padding: "1rem" }}
    >
      <h2 className="authentication__header">User Login </h2>
      <hr />
      <div className="athentication">
        <form onSubmit={authenticateUSerHandler}>
          <Input
            id="email"
            type="email"
            element="input"
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
            label="Email"
            errorText="Please enter a valid email"
            onInput={inputChangeHandler}
          />

          <Input
            id="password"
            type="password"
            element="input"
            validators={[VALIDATOR_MINLENGTH(6)]}
            label="Password"
            errorText="Please enter a valid password, atleast 6 charachters"
            onInput={inputChangeHandler}
          />
          <Button type="submit" disabled={!formState.formIsValid}>
            LOGIN
          </Button>
        </form>
      </div>
    </Card>
  );
}
