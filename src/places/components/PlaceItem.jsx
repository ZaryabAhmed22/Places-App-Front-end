import React, { useState, useContext } from "react";
import Button from "../../shared/compnents/FormElements/Button";
import Card from "../../shared/compnents/UI/Card";
import Map from "../../shared/compnents/UI/Map";
import Modal from "../../shared/compnents/UI/Modal";
import { AuthContext } from "../../shared/context/auth-context";
import "./PlaceItem.css";

export default function PlaceItem(props) {
  //Consuming the context
  const { isLoggedIn } = useContext(AuthContext);

  // using the useState hook to set the state for opening and closing the modal that displays the map
  const [showMap, setShowMap] = useState(false);

  // using the useState hook to set the state for opening and closing the modal that displays the Deletion warning
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  function openModalHandler() {
    setShowMap(true);
  }

  function closeModalHandler() {
    setShowMap(false);
  }

  function showDeleteWarningHandler() {
    setShowConfirmModal(true);
  }

  function cancelDeleteHandler() {
    setShowConfirmModal(false);
  }

  function confirmDeleteHandler() {
    setShowConfirmModal(false);
    console.log("DELETING...");
  }

  return (
    <>
      {showMap && (
        <Modal
          show={showMap}
          onCancel={closeModalHandler}
          header={props.place.address}
          contentClass="place-item__modal-content"
          footerClass="place-item__modal-actions"
          footer={<Button onClick={closeModalHandler}>Close</Button>}
        >
          <div className="map-container">
            <Map center={props.place.location} title={props.place.title} />
          </div>
        </Modal>
      )}
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete the place, note that this action can
          not be returned
        </p>
      </Modal>

      {/* Places List */}
      <li className="place-item">
        <Card className="place-item__content places">
          <div className="place-item__image">
            <img src={props.place.imageURL} alt={props.place.title} />
          </div>

          <div className="place-item__info">
            <h2>{props.place.title}</h2>
            <h3>{props.place.address}</h3>
            <p>{props.place.description}</p>
          </div>

          <div className="place-item__actions">
            <Button inverse onClick={openModalHandler}>
              VIEW ON MAP
            </Button>
            {isLoggedIn && (
              <Button to={`/places/${props.place.id}`}>EDIT</Button>
            )}
            {isLoggedIn && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}
