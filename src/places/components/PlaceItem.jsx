import React from "react";
import Card from "../../shared/compnents/UI/Card";
import "./PlaceItem.css";

export default function PlaceItem(props) {
  return (
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
          <button>VIEW ON MAP</button>
          <button>EDIT</button>
          <button>DELETE</button>
        </div>
      </Card>
    </li>
  );
}
