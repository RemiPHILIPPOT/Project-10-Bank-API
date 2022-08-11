import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getJWT, getUser } from "../services/user-service";
import Navigation from "./Navigation";
import "../main.css";
import Footer from "./Footer";
import store from "../store";
import { getUserProfile } from "../store/actions/actions";

const SignIn = ({ match }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (jwt) {
      getUser(jwt).then((user) => {
        store.dispatch(getUserProfile(user));
        navigate("/user");
      });
    }
  }, [navigate, jwt]);

  const onSubmit = async (e) => {
    const jwt = await getJWT(e);
    if (navigate && jwt) {
      getUser(jwt).then((user) => {
        store.dispatch(getUserProfile(user));
        navigate("/user");
      });
    }
  };
  return (
    <>
      <Navigation></Navigation>
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email
                ? errors.email.type === "required" && (
                    <p style={{ color: "red" }}>This field is required</p>
                  )
                : ""}
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password
                ? errors.password.type === "required" && (
                    <p style={{ color: "red" }}>This field is required</p>
                  )
                : ""}
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <input className="sign-in-button" type="submit" name="Sign In" disabled={errors.password || errors.email} />
          </form>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default SignIn;
