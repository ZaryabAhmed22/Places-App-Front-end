import React, { useState } from "react";
import Button from "../../shared/compnents/FormElements/Button";
import Card from "../../shared/compnents/UI/Card";
import Map from "../../shared/compnents/UI/Map";
import Modal from "../../shared/compnents/UI/Modal";
import "./PlaceItem.css";

export default function PlaceItem(props) {
  // using the useState hook to set the state for opening and closing the modal that displays the map
  const [showMap, setShowMap] = useState(false);

  function openModalHandler() {
    setShowMap(true);
  }

  function closeModalHandler() {
    setShowMap(false);
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
            <Button to={`places/${props.place.id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
}
