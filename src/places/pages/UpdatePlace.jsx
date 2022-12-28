import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/compnents/FormElements/Button";
import Input from "../../shared/compnents/FormElements/Input";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageURL:
      "https://images.unsplash.com/photo-1428366890462-dd4baecf492b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1waXJlJTIwc3RhdGUlMjBidWlsZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },

  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    imageURL:
      "https://images.unsplash.com/photo-1528291151377-165f5107c82a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8ZW1waXJlJTIwc3RhdGUlMjBidWlsZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

export default function UpdatePlace() {
  //The useParam hooks from react-router-dom returns all the parameters inside the route url
  const params = useParams();
  const placeId = params.pid;

  //Finding the places that matches the pid parameter
  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  //Calling the custom hook for form
  const [formState, inputChangeHandler] = useForm({
    inputs: {
      title: { value: identifiedPlace.title, isValid: true },
      description: { value: identifiedPlace.description, isValid: true },
    },
    formIsValid: true,
  });

  //If no places are  found at that url
  if (!identifiedPlace) {
    return (
      <div className="center">
        <h2>Could not find place</h2>
      </div>
    );
  }

  //Handler for form submission
  const updatePlaceHandler = (e) => {
    e.preventDefault();
    console.log(formState); //Send this data to the API
  };

  console.log(formState);

  return (
    <form className="place-form" onSubmit={updatePlaceHandler}>
      <Input
        id="title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        label="Title"
        errorText="Please enter a valid title"
        onInput={inputChangeHandler}
        initialValue={formState.inputs.title.value}
        initialyValid={formState.inputs.title.value}
      />

      <Input
        id="description"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        label="Description"
        errorText="Please enter a valid description, atleast 5 charachters"
        onInput={inputChangeHandler}
        initialValue={formState.inputs.description.value}
        initialyValid={formState.inputs.description.value}
      />
      <Button type="submit" disabled={!formState.formIsValid}>
        UPDATE
      </Button>
    </form>
  );
}
