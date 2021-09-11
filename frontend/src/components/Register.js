import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/actions/userActions";
import Cookie from "js-cookie";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/users/register", { name, email, password })
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
      .catch((err) => setErr("Invalid input !"));
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h3>Create Account </h3>
          </li>
          {err !== "" && <li style={{ color: "red" }}>{err}</li>}

          <li>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
          </li>
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
              type="text"
              name="password"
              id="password"
              className="signin-input"
              onChange={(e) => setPassword(e.target.value)}
            />
          </li>
          <li>
            <button type="submit" className="signin-btn">
              Register
            </button>
          </li>
          <li>Already have an account ?</li>
          <li>
            <Link to="/signin">Sign-in</Link>
          </li>
        </ul>
      </form>
    </div>
  );
}

export default Register;
