import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "../main.css";
import { updateUserProfile } from "../services/user-service";

import Footer from "./Footer";
import Navigation from "./Navigation";
import store from "../store";
import { updateUserProfile as setUserProfile } from "../store/actions/actions";

const User = () => {
  const profile = useSelector((state) => state.user.profile);
  const [editProfile, setEditProfile] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const { register, handleSubmit } = useForm();

  if (!profile) {
    return <Navigate to="/signin" />;
  }

  const getFormUpdateProfile = () => {
    setEditProfile(true);
  };

  const onSubmit = async (e) => {
    if (!e.firstName) e.firstName = profile.firstName;
    if (!e.lastName) e.lastName = profile.lastName;

    if (e.lastName === profile.lastName && e.firstName === profile.firstName) {
      setAlertMessage("Unchanged user value");
      setAlertType("warning");
      setShowAlert(true);
    } else {
      updateUserProfile(e, localStorage.getItem("jwt")).then((data) => {
        const alertStatus = data.status === 200 ? "success" : "danger";
        setAlertType(alertStatus);
        setAlertMessage(data.message);
        setShowAlert(true);

        store.dispatch(setUserProfile(data.body));
      });
    }
  };

  const closeForm = () => {
    setEditProfile(false);
  };

  return (
    <>
      <Navigation profile={profile}></Navigation>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br /> {profile.firstName} {profile.lastName}
          </h1>

          {!editProfile && (
            <button className="edit-button" onClick={getFormUpdateProfile}>
              Edit Name
            </button>
          )}
          {showAlert && (
            <div className={`alert alert-${alertType}`} role="alert">
              {alertMessage}
            </div>
          )}
          {editProfile && (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    placeholder={profile.firstName}
                    {...register("firstName", {
                      required: false,
                    })}
                  />
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    placeholder={profile.lastName}
                    {...register("lastName", {
                      required: false,
                    })}
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-outline-primary">
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* <h2 className="sr-only">Accounts</h2> */}
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default User;
