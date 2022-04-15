import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignIn from "./components/SignIn";
import User from "./components/User";
import { getUser } from "./services/user-service";
import { GET_USER_PROFILE } from "./store/actions/constants";


const App = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      getUser(jwt).then((user) => {
        dispatch({
          type: GET_USER_PROFILE,
          payload: user,
        });
      });
    }
  }, [dispatch, jwt]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/user" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
