import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";
import { setUser } from "../redux/actions/userActions";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/users/signin", { email, password })
      .then((res) => {
        dispatch(setUser(res.data));
        Cookie.set(
          "userInfo",
          JSON.stringify({
            name: res.data.name,
            email: res.data.email,
            userId: res.data._id,
            isAdmin: res.data.isAdmin,
            isLogged: true,
          })
        );
        props.history.push("/productlist");
      })
      .catch((err) => setErr("Email or password is incorrect!"));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>SignIn </h3>
          </li>
          {err !== "" && <li style={{ color: "red" }}>{err}</li>}
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>
          <li>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="signin-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="signin-btn">
              SignIn
            </button>
          </li>
          <li>new user?</li>
          <li>
            <Link to="/register">Create your account</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default SignIn;
