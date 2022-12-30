import React, { useState, useContext } from "react";
import Button from "../../shared/compnents/FormElements/Button";
import Input from "../../shared/compnents/FormElements/Input";
import Card from "../../shared/compnents/UI/Card";
import { AuthContext } from "../../shared/context/auth-context";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
} from "../../shared/util/validators";
import "./Auth.css";

export default function Auth() {
  //Consuming the context
  const { login } = useContext(AuthContext);

  //State for switching the Signup and login
  const [isLoginMode, setIsLoginMode] = useState(true);

  //Calling the custom hook for form
  const [formState, inputChangeHandler, setFormData] = useForm({
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
    login();
  };

  //Hanlder function for swtich button
  function switchToHandler() {
    if (!isLoginMode) {
      setFormData(
        { ...formState, name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        { ...formState.inputs, name: { value: "", isValid: false } },
        false
      );
    }
    setIsLoginMode((prevState) => {
      return !prevState;
    });
  }
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
          {!isLoginMode && (
            <Input
              id="name"
              type="name"
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              label="Full Name"
              errorText="Please enter a valid name"
              onInput={inputChangeHandler}
            />
          )}
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
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchToHandler}>
          {isLoginMode ? "CREATE ACCOUNT" : "I HAVE AN ACCOUNT"}
        </Button>
      </div>
    </Card>
  );
}
