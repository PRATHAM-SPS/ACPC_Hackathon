// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [response, setResponse] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      phone,
    };

    try {
      // Make the POST request to Flask API
      const res = await axios.post('http://localhost:5000/call', data);
      setResponse(res.data.message);  // Display the response message from Flask
    } catch (error) {
      setResponse('Error making the call');
    }
  };

  return (
    <div>
      <h1>Call Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone Number: </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Make the Call</button>
      </form>

      {response && <p>{response}</p>}
    </div>
  );
}

export default App;

