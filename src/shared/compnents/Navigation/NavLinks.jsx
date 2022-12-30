import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

export default function NavLinks() {
  //Consuming the context
  const auth = useContext(AuthContext);

  //Destructuring the auth object
  const { isLoggedIn, logout } = auth;
  return (
    <ul className="nav-links">
      <li>
        <NavLink to={"/"} exact>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <li>
          <NavLink to={"/u1/places"}>MY PLACES</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <NavLink to={"/places/new"}>ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to={"/auth"}>AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
}
