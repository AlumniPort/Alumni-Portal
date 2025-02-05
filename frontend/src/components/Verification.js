import React, { useState } from 'react';
import axios from 'axios';
import './Verification.css';

const Verification = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    middle_name: '',
    last_name: '',
    birth_date: '',
    email: '',
    phone_number: '',
    enrollment_number: '',
    batch_year: '',
    course_of_study: '',
    branch: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.29.84:5000/api/users/verify', formData);
      setMessage('Your verification status is pending. Check your mail for further updates.');
    } catch (error) {
      setMessage('Your Data has been Recorded but it did not match with the university data. For now your status is pending..');
    }
  };

  // Function to format field labels
  const formatLabel = (label) => {
    return label.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="verification-container">
      <h2>Verification</h2>
      <form onSubmit={handleSubmit} className="verification-form">
        {Object.keys(formData).map((key) => (
          <div key={key} className="form-group">
            <label>{formatLabel(key)}:</label>
            <input
              type={key === 'birth_date' ? 'date' : 'text'}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="verification-button">Verify</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Verification;
