import React, { useCallback, useReducer } from "react";

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

// const initialFormState = {
//   inputs: {
//     title: { value: "", isValid: false },
//     description: { value: "", isValid: false },
//     address: { value: "", isValid: false },
//   },
//   formIsValid: false,
// };
export default function useForm(initialFormState) {
  //Using the useRecuder hook to manage the form state
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState);

  //Pulling the state up from the child component "Input"
  // >> Using the useCallback hook to avoid unecesssary re-evaluation of title change handler because functions are premitive valuee and whenever their state changes they are re allocated to the memory and cause the component to re-render hance this will create an infinte loop
  //IMPOTANT >> This function is returned from the hook and will be used as a pointer inside the props so that it can bring the state up from the child component "Input"
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

  //Returning values from the hook
  return [formState, inputChangeHandler];
}
