import React from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
// import { Link as RouterLink }  from "react-router-dom" ;
import "./css/Login.css";

let url = "http://127.0.0.1:8000/register/";

// {
//   "username": "swapnil",
//   "password": "Abc12345678"
// }

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first, setFirst] = useState("");
  const [last, setlast] = useState("");
  const [email, setemail] = useState("");
  const [error, setError] = useState({});

  let onpassChange = (e) => {
    setPassword(e.target.value);
  };

  let onnameChange = (e) => {
    setUsername(e.target.value);
  };
  let onfirstChange = (e) => {
    setFirst(e.target.value);
  };
  let onlastChange = (e) => {
    setlast(e.target.value);
  };
  let onemailChange = (e) => {
    setemail(e.target.value);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
      password2: password,
      first_name: first,
      last_name: last,
      email: email,
    };
    await axios
      .post(url, data)
      .then((res) => {
        setLogin(true);
      })
      .catch((err) => {
        setError(JSON.parse(err.request.response));
      });
  };
  const [isLoggedIn, setLogin] = useState(false);

  // if (isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <div className="align">
        <div className="grid">
          <p style={{ fontSize: "50px", color: "#8fa7c0" }}> Sign up </p>
          <form className="form login">
            <div className="form__field">
              
              <input
                autoComplete="username"
                id="login__username"
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
                onChange={onnameChange}
                required
              />
            </div>
            <div className="form__field">
              
              <input
                autoComplete="username"
                type="text"
                name="username"
                className="form__input"
                placeholder="Email"
                onChange={onemailChange}
                required
              />
            </div>
            <div className="form__field">
              
              <input
                autoComplete="username"
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
                onChange={onfirstChange}
                required
              />
            </div>
            <div className="form__field">
              
              <input
                autoComplete="username"
                type="text"
                name="username"
                className="form__input"
                placeholder="Username"
                onChange={onlastChange}
                required
              />
            </div>
            <div className="form__field">
              
              <input
                id="login__password"
                type="password"
                name="password"
                className="form__input"
                placeholder="Password"
                onChange={onpassChange}
                required
              />
            </div>

            <div className="form__field">
              <input type="submit" value="Sign Up" onClick={handleSubmit} />
            </div>
          </form>
          <p className="text--center">
            Already a member?
            <Link to="/Login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
