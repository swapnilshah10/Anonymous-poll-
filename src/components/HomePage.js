import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/Homepage.css";

let url = "http://127.0.0.1:8000/polls/";

function HomePage() {
  const token = localStorage.getItem("token");
  const [data, setData] = useState();

  let getdata = async (e) => {
    await axios.get(url).then((res) => {
      setData(res.data);
    });
  };
  useEffect(() => {
    getdata();
  }, []);
  if (token === "undefined" || token === null) {
    return <Navigate to="/login" />;
  }
  return (
    <>
    
    <div className ="container">
      <div className="poll-container1">
        <ul className="poll-list">
          {data &&
            data.map((item) => {
              return (
                <li className="row poll-item" key={item.id}>
                  <div className="row">
                  <div className="poll-title col-sm-8 text-justify text-center p-3">
                    {item.title}
                    </div>
                    <div className="poll-date col-sm">
                  <Link to={`${item.id}/poll/`}   >
                    <button>Vote Now</button>
                  </Link>
                  </div>  
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      </div>
    </>
  );
}

export default HomePage;
