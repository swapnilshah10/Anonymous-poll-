import React from "react";
import { Link } from "react-router-dom";
import { useState ,useEffect} from "react";
import { useSelector , useDispatch} from 'react-redux'
import { setlogout } from '../features/Loginslice'
import './css/Nav.css';


function Navbar() {
  const token = localStorage.getItem("token");
  const status = useSelector((state) => state.login.value)
  console.log(status)
  const dispatch = useDispatch()

  let button = () =>{
    if(status){
      return <button  id = "login-logout-button"><Link to="/login" className="nav-items" onClick={onClk}>Log Out</Link></button>
    }
    else{
      return <button  id = "login-logout-button"><Link to="/login" className="nav-items">Log In</Link></button>
    }
  }


  let onClk = () => {
  localStorage.removeItem("token");
  dispatch(setlogout())
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
          {button()}
        </div>
      </nav>


    </div>
  );
}

export default Navbar;
