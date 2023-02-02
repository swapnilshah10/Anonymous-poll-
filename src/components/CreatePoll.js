import React, { useState } from 'react';
import './css/CreatePoll.css';
import axios from "axios";
import { Navigate} from "react-router-dom";
const CreatePoll = () => {
  const [pollQuestion, setPollQuestion] = useState('');
  const [options, setOptions] = useState(['']);
  const [created, setCreated] = useState(false);
  const url = 'http://127.0.0.1:8000/user_polls/';
  const token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: "Token " + token,
    },
  };
  const handleQuestionChange = (event) => {
    setPollQuestion(event.target.value);
  };

  const handleOptionChange = (index) => (event) => {
    const newOptions = [...options];
    newOptions[index] = event.target.value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const deleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
    title: pollQuestion,
    options: options,
     
};
    await axios
      .post(url, data ,  config)
      .then((res) => {
        if (res.status === 201) {
          console.log(res.data);
          alert("Poll created successfully");
          setCreated(true);
        }
      })
      .catch((err) => {
        
      });
  };
  
  if(created){
      return <Navigate to = '../'/> 
  }

  return (
    <form className="create-poll-form">
      <h2>Create a Poll</h2>
      <div className="form-group">
        <label htmlFor="question">Question:</label>
        <input
          type="text"
          id="question"
          value={pollQuestion}
          onChange={handleQuestionChange}
        />
      </div>
      {options.map((option, index) => (
        <div className="form-group" key={index}>
          <label htmlFor={`option-${index}`}>Option {index + 1}:</label>
          <input
            type="text"
            id={`option-${index}`}
            value={option}
            onChange={handleOptionChange(index)}
          />
          <button type="button" onClick={() => deleteOption(index)} className="delete-option-button">
            Delete Option
          </button> 
        </div>
      ))}
      <button type="button" onClick={addOption} className="add-option-button">
        Add Option
      </button>
      <button type="submit" className="create-poll-button" onClick={handleSubmit}>Create Poll</button>
    </form>
  );
};

export default CreatePoll;
