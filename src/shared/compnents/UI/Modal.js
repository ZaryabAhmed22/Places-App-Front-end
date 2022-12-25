import React from "react";
import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./Modal.css";

function ModalOverlay(props) {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}></footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-overlay-root")
  );
}

export default function Modal(props) {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={"modal"}
      >
        {/* Passing all the props passed to Modal component to the ModalOverlay component */}
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
}
