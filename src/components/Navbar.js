import React from "react";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";

function Navbar() {
  const token = localStorage.getItem("token");
  const [status , setData ]= useState("Log Out")

  useEffect(() => {
    if (token === "undefined" || token === null) {
      setData("Log In");
    }
  }, []);


  let onClk = () => {
  localStorage.removeItem("token");
  }
  return (
    <div>
      <nav>
        <div className="nav-left">
         <Link to="/" id = "name"> Anonymous Poll</Link>
        </div>
        <div className="nav-right">
          <Link to="/" className="nav-items">Home</Link>
          <Link to="/about" className="nav-items">About</Link>
          <Link to="/createpoll" className="nav-items">Create Poll</Link>
          <Link to="/mypoll" className="nav-items">My Polls</Link>
          <Link to="/login" id="login-logout-button" onClick={onClk}>
            {status}
          </Link>
        </div>
      </nav>


    </div>
  );
}

export default Navbar;
