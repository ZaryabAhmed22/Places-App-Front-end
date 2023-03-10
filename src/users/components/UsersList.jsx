import React from "react";
import Card from "../../shared/compnents/UI/Card";
import UserItem from "./UserItem";
import styles from "./UsersList.module.css";

export default function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <Card className="no-users">
          <h2>No users found</h2>
        </Card>
      </div>
    );
  }

  const usersList = props.items.map((user) => {
    return <UserItem key={user.id} user={user} />;
  });

  return <ul className={styles["users-list"]}>{usersList}</ul>;
}
