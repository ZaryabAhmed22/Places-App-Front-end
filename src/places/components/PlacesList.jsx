import React from "react";
import Button from "../../shared/compnents/FormElements/Button";
import Card from "../../shared/compnents/UI/Card";
import PlaceItem from "./PlaceItem";
import "./PlacesList.css";

export default function PlacesList(props) {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card className="no-users">
          <h2>No places found. Create one?</h2>
          <Button to={"/places/new"}>Add Place</Button>
        </Card>
      </div>
    );
  }

  const placesList = props.items.map((place) => {
    return <PlaceItem place={place} key={place.id} />;
  });

  return <ul className="place-list">{placesList}</ul>;
}
