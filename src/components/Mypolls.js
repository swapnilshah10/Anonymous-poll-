import React, { useState ,useEffect } from "react";
import './css/Mypolls.css';
import axios from "axios";
import { Link } from "react-router-dom";

const MyPollsPage = () => {
  const [polls, setPolls] = useState([
    { id: 1, title: "What is your favorite color?" },
  ]);

  const url = 'http://127.0.0.1:8000/user_polls/';
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Token " + token,
    },
  };

    useEffect(() => {
          fetchpolls();
    }, []);

    let fetchpolls = async()=>{
        await axios
        .get(url, config)
        .then((res) => {
          setPolls(res.data);
        })
        .catch((err) => {
          
        });}

        let deletepoll = async(poll_id)=>{
            let del_url = 'http://127.0.0.1:8000/' + poll_id + '/delete/';
            let data = {};
            await axios
            .post(del_url,data, config)
            .then((res) => {
              console.log(res.data);
            })
            .catch((err) => {
              
            });}

  const handleDeletePoll = (pollId) => {
    deletepoll(pollId);
    setPolls(polls.filter(poll => poll.id !== pollId));
  };

  return (
    <div className="my-polls-container">
      <h1>My Polls</h1>
      <ul className="polls-list">
        {polls.map(poll => (
          <li key={poll.id}>
            <div className="poll-question">{poll.title}</div>
            <div className="poll-buttons">
                <Link to={`../${poll.id}/poll/`}   >   
              <button className="view-poll-button">View Poll</button>   </Link>
              <Link to={`../${poll.id}/result/`}   >
              <button className="view-results-button">View Results</button> </Link>
              <button className="delete-poll-button" onClick={() => handleDeletePoll(poll.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>  
  );
};

export default MyPollsPage;
