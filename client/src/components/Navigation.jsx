import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../main.css";

import { userLogout } from "../store/actions/actions";
import Logo from "../assets/img/argentBankLogo.png";
import store from "../store";

const Navigation = () => {
  const profile = useSelector((state) => state.user.profile);
  const navigate = useNavigate();

  function handleLogout() {
    store.dispatch(userLogout());
    localStorage.removeItem("jwt");
    navigate.push("/");
  }

  return (
    <>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          {/* <h1 className="sr-only">Argent Bank</h1> */}
        </Link>
        <div>
          {profile && (
            <Link to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i> {profile.firstName}{" "}
              {profile.lastName}
            </Link>
          )}
          {!profile && (
            <Link to="/signin" className="main-nav-item">
              <i className="fa fa-user-circle"></i> Sign In
            </Link>
          )}

          {profile && (
            <Link to="/" className="main-nav-item" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navigation;
