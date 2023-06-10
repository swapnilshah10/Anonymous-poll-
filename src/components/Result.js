import React from "react";
import { useParams } from "react-router-dom";
import "./css/Result.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Result() {
  const params = useParams();
  const poll_id = params.id;
  const token = localStorage.getItem("token");
  const [title, setTitle] = useState("Default");
  const [results, setResults] = useState([]);

  let config = {
    headers: {
      Authorization: "Token " + token,
    },
  };

  let url = "http://127.0.0.1:8000/" + poll_id + "/votes/";

  let getData = async (e) => {
    let data = {
      poll: poll_id,
    };

    await axios
      .get(url, data, config)
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
        <div className="card">
          <div className="body">
            {results &&
              results.map((result) => {
                return (
                  <div className="skill" key={result.id}>
                    <div className="skill-name">{result.option}</div>
                    <div className="skill-fix">
                      <div className="skill-level">
                        <div
                          className="skill-percent"
                          style={{ width: Math.round(result.value) }}
                        ></div>
                      </div>
                      <div className="skill-percent-number">
                        {result.value}%
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Result;
