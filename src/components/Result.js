import React from "react";
import { useParams } from "react-router-dom";
import "./css/Result.css";
import { useEffect , useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Result() {
  const params = useParams();
  const poll_id = params.id;
  const token = localStorage.getItem("token");
  const [title , setTitle] = useState("Default");
  const [results , setResults] = useState([{
    option : "option 1",
    value : 50
  }]);

  let config = {
    headers: {
      Authorization: "Token " + token,
    },
  };

  let url = "http://127.0.0.1:8000/" + poll_id + "/votes/";

  let getData = async (e) => {
    let data = {
      poll: poll_id
    }

    await axios
      .get(url,data, config)
      .then((res) => {
        setResults(res.data.result);
        setTitle(res.data.title);
        console.log(res.data);
      })
      .catch((err) => {
        // console.log(data);
        // setError(JSON.parse(err.request.response))
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="backk">
        <Link to="/">
          <button className="buttonn">Home </button>
        </Link>
      </div>

      <div className="poll-results">
        <h1>Poll Results</h1>
        <h2>{title}</h2>
      {
        results&&results.map((result) => {
          return (
            <div className="poll-option" key = {result.id}>
              <div className="poll-option-text">{result.option}</div>
              <div className="poll-option-bar" >
                <div className="poll-option-bar-fill" style={{width: result.value*2}} key = {result.id}></div>
              </div>
              <div>  {result.value}%  </div>
            </div>
          );

        })
      }
      </div>
    </>
  );
}

export default Result;
