import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/compnents/UI/Avatar";
import Card from "../../shared/compnents/UI/Card";
import styles from "./UserItem.module.css";

export default function UserItem(props) {
  return (
    <li className={styles["user-item"]}>
      <Card className="user-item__content">
        <Link to={`/${props.user.id}/places`}>
          <div className={styles["user-item__image"]}>
            <Avatar alt={props.user.name} image={props.user.image} />
          </div>
          <div className={styles["user-item__info"]}>
            <h2>{props.user.name}</h2>
            <h3>
              {props.user.places}{" "}
              {props.user.places === 1 ? "Places" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}
