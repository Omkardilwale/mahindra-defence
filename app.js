import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [formData, setFormData] = useState({
    incidentType: '',
    subtype: '',
    gender: '',
    description: '',
    location: '',
    itemsRobbed: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/incidents', formData);
      alert('Incident reported successfully');
      setFormData({
        incidentType: '',
        subtype: '',
        gender: '',
        description: '',
        location: '',
        itemsRobbed: [],
      });
    } catch (error) {
      console.error(error);
      alert('An error occurred while reporting the incident');
    }
  };

  return (
    <div>
      <h1>Railway Incident Reporting</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Incident Type:</label>
          <select
            name="incidentType"
            value={formData.incidentType}
            onChange={handleChange}
          >
            <option value="">Select Incident Type</option>
            <option value="Accident">Accident</option>
            <option value="Theft">Theft</option>
          </select>
        </div>
        {formData.incidentType && (
          <div>
            <label>Subtype:</label>
            {formData.incidentType === 'Accident' ? (
              <select
                name="subtype"
                value={formData.subtype}
                onChange={handleChange}
              >
                <option value="">Select Subtype</option>
                <option value="Human Accident">Human Accident</option>
                <option value="Animal Accident">Animal Accident</option>
                <option value="Railway Track Derailment">Railway Track Derailment</option>
              </select>
            ) : (
              <select
                name="subtype"
                value={formData.subtype}
                onChange={handleChange}
              >
                <option value="">Select Subtype</option>
                <option value="Theft in Boogey">Theft in Boogey</option>
                <option value="Theft on Platform">Theft on Platform</option>
              </select>
            )}
          </div>
        )}
        <div>
          <label>Gender/Animal Type:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Items Robbed:</label>
          <input
            type="text"
            name="itemsRobbed"
            value={formData.itemsRobbed}
            onChange={(e) =>
              setFormData({ ...formData, itemsRobbed: e.target.value.split(',') })
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
