import React from "react";
import "./Input.css";

export default function Input(props) {
  const element =
    props.element === "input" ? (
      <input type={props.type} placeholder={props.placeholder} id={props.id} />
    ) : (
      <textarea id={props.id} rows={props.rows || 3} />
    );
  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
    </div>
  );
}
