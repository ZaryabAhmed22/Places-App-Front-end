import React from "react";
import UsersList from "../components/UsersList";

export default function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Zaryab",
      image:
        "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
      places: 3,
    },
  ];
  return (
    <>
      <UsersList items={USERS} />
    </>
  );
}
