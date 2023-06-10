import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./css/Poll.css";
import { Link } from "react-router-dom";

function PollApp() {
  const params = useParams();
  const poll_id = params.id;
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [poll, setPoll] = useState({ title: "Default" });
  const [voted, setVoted] = useState(false);
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Token " + token,
    },
  };

  let url = "http://127.0.0.1:8000/" + poll_id + "/choices/";

  let getData = async (e) => {
    await axios
      .get(url, config)
      .then((res) => {
        setOptions(res.data.choices);
        setPoll(res.data.poll);
      })
      .catch((err) => {
        // console.log(data);
        // setError(JSON.parse(err.request.response))
      });
  };

  useEffect(() => {
    getData();
  }, []);

  let onClick = () => {
    const form = document.getElementById("poll-form");
    const selectedOption = form.querySelector('input[type="radio"]:checked');
    if (selectedOption) {
      setSelectedOption(selectedOption.id);
      vote();
    } else {
      alert("Please select an option");
    }
  };
  let voteUrl = "http://127.0.0.1:8000/" + poll_id + "/vote/";

  let vote = async () => {
    let data = {
      poll: poll_id,
      selected: selectedOption
    }


    await axios
      .post(voteUrl, data, config)
      .then((res) => {
        if (res.data.slice(0, 17) === "You already voted") {
          alert(res.data)
          setVoted(true);
        }
        else {
          alert('Your vote has been recorded')
          setVoted(true);
        }

      })
      .catch((err) => {
        // console.log(data);
        // setError(JSON.parse(err.request.response))
      });
  }
  let turl = "../" + poll_id + "/result/";
  if (voted) {
    return <Navigate to={turl} />
  }

  return (
    <div>
      <div className="backk">
        <Link to="/">
          <button className="buttonn">Home </button>
        </Link>
      </div>
      <div className="poll-container">
        <h2 id="question">{poll.title}</h2>
        <form id="poll-form">
          {options &&
            options.map((option) => {
              return (<div className='radio-option' key={option.id}>
                <input type="radio" id={option.id} name="color" value={option.option} />
                <label htmlFor={option.option}>{option.option}</label>
              </div>)
            })}
        </form>
        <button id="submit-button" onClick={onClick}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default PollApp;
