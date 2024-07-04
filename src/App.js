import React, { useState } from 'react';
import Select from 'react-select';
import countries from './countries'; // A file containing a list of countries
import './App.css';

const App = () => {
  const [records, setRecords] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState(null);
  const [score, setScore] = useState('');

  const addRecord = () => {
    if (firstName && lastName && country && score) {
      const newRecord = { firstName, lastName, country: country.label, score: parseInt(score) };
      const updatedRecords = [...records, newRecord].sort((a, b) => b.score - a.score);
      setRecords(updatedRecords);
      setFirstName('');
      setLastName('');
      setCountry(null);
      setScore('');
    }
  };

  const increaseScore = (index) => {
    const updatedRecords = records.map((record, i) =>
      i === index ? { ...record, score: record.score + 1 } : record
    ).sort((a, b) => b.score - a.score);
    setRecords(updatedRecords);
  };

  const decreaseScore = (index) => {
    const updatedRecords = records.map((record, i) =>
      i === index ? { ...record, score: record.score - 1 } : record
    ).sort((a, b) => b.score - a.score);
    setRecords(updatedRecords);
  };

  const deleteRecord = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
  };

  return (
    <div className="App">
      <h1>Leaderboard</h1>
      <div className="form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Select
          options={countries}
          value={country}
          onChange={setCountry}
          placeholder="Select Country"
        />
        <input
          type="number"
          placeholder="Score"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button onClick={addRecord}>Add Record</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Country</th>
            <th>Score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{record.firstName}</td>
              <td>{record.lastName}</td>
              <td>{record.country}</td>
              <td>{record.score}</td>
              <td>
                <button onClick={() => increaseScore(index)}>Increase</button>
                <button onClick={() => decreaseScore(index)}>Decrease</button>
                <button onClick={() => deleteRecord(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
