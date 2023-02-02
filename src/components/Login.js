import React from "react";
import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Link  }  from "react-router-dom" ;
import './css/Login.css';


let url = "http://127.0.0.1:8000/api-auth/";


// {
//   "username": "swapnil",
//   "password": "Abc12345678"
// }


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isLoggedIn, setLogin] = useState("");


  let onpassChange = (e) => {
    setPassword(e.target.value);
  };

  let onnameChange = (e) => {
    setUsername(e.target.value);
  };
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    
    await axios
      .post(url, data)
      .then((res) => {  
        console.log(res ,  res.data.token)
        localStorage.setItem('token', res.data.token)
        setLogin(true);
      })
      .catch((err) => {
        // console.log(data);
      setError(JSON.parse(err.request.response))
    });

  };

  
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  if(localStorage.getItem('token')){
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="align">
        <div className="grid">
          <form
            className="form login"
          >
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
              <input type="submit" value="Sign In"  onClick={handleSubmit}/>
            </div>
          </form>

          <p className="text--center">
            Not a member?
             <Link to='/signup'>Sign up now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
