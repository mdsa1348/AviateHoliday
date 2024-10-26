import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './BookingInfo.css'; // Import the CSS file

const BookingInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { detail, formData } = location.state || {};
  const detailId = detail.id;

  const [UserformData, setUserFormData] = useState({
    name: '',
    email: '',
    country: '',
    number: '',
  });

  const [adultsData, setAdultsData] = useState(
    Array.from({ length: formData.ADULT }, () => ({
      name: '',
      email: '',
      country: '',
      number: '',
    }))
  );

  const [childrenData, setChildrenData] = useState(
    Array.from({ length: formData.CHILD }, () => ({
      name: '',
      age: '',
      country: '',
    }))
  );

  const handleChange = (index, e, type) => {
    if (type === 'adult') {
      const updatedAdultsData = adultsData.map((adult, i) =>
        i === index ? { ...adult, [e.target.name]: e.target.value } : adult
      );
      setAdultsData(updatedAdultsData);
    } else if (type === 'child') {
      const updatedChildrenData = childrenData.map((child, i) =>
        i === index ? { ...child, [e.target.name]: e.target.value } : child
      );
      setChildrenData(updatedChildrenData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all adult forms
    for (let i = 0; i < adultsData.length; i++) {
      if (!adultsData[i].name || !adultsData[i].email || !adultsData[i].country || !adultsData[i].number) {
        alert(`Please fill out all fields for Adult ${i + 1}`);
        return;
      }
    }

    // Validate all child forms
    for (let i = 0; i < childrenData.length; i++) {
      if (!childrenData[i].name || !childrenData[i].age || !childrenData[i].country) {
        alert(`Please fill out all fields for Child ${i + 1}`);
        return;
      }
    }

    // Navigate to the next page with form data
    navigate('/ReviewInfo', {
      state: { detail, formData, adultsData, childrenData }
    });
  };

  return (
    <div className="booking-container">
      <h2 className="title">PLEASE ENTER THE TRAVELER’S INFORMATION</h2>
      <form onSubmit={handleSubmit}>
        <div className="formInputs">
          <div className="PrevInputs">
            Date
            <input
              className='dateInput'
              type="text"
              name="date"
              value={formData.date}
              readOnly
            />
            Adult
            <input
              className='dateInput'
              type="text"
              name="adult"
              value={formData.ADULT}
              readOnly
            />
            Child
            <input
              className='dateInput'
              type="text"
              name="child"
              value={formData.CHILD}
              readOnly
            />
          </div>
          <div>
            <h3>Adults</h3>
            <div className="users-container">
              {adultsData.map((adult, index) => (
                <div className="userInputs" key={index}>
                  <h3 className="section-title">Adult {index + 1}:</h3>
                  <div className="input-group">
                    <label>Name</label>
                    <input
                      onChange={(e) => handleChange(index, e, 'adult')}
                      className='formInput'
                      type="text"
                      name="name"
                      value={adult.name}
                    />
                  </div>
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      onChange={(e) => handleChange(index, e, 'adult')}
                      className='formInput'
                      type="email"
                      name="email"
                      value={adult.email}
                    />
                  </div>
                  <div className="input-group">
                    <label>Origin Country</label>
                    <input
                      onChange={(e) => handleChange(index, e, 'adult')}
                      className='formInput'
                      type="text"
                      name="country"
                      value={adult.country}
                    />
                  </div>
                  <div className="input-group">
                    <label>Mobile Number</label>
                    <input
                      onChange={(e) => handleChange(index, e, 'adult')}
                      className='formInput'
                      type="number"
                      name="number"
                      value={adult.number}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3>Children</h3>
            <div className="users-container">
              {childrenData.map((child, index) => (
                <div className="userInputs" key={index}>
                  <h3 className="section-title">Child {index + 1}:</h3>
                  <div className="input-group">
                    <label>Name</label>
                    <input
                      onChange={(e) => handleChange(index, e, 'child')}
                      className='formInput'
                      type="text"
                      name="name"
                      value={child.name}
                    />
                  </div>
                  <div className="input-group">
                    <label>Age(must be under 15 )</label>
                    <input
                      onChange={(e) => handleChange(index, e, 'child')}
                      className='formInput'
                      type="number"
                      name="age"
                      max='15'
                      value={child.age}
                    />
                  </div>
                  <div className="input-group">
                    <label>Origin Country</label>
                    <input
                      onChange={(e) => handleChange(index, e, 'child')}
                      className='formInput'
                      type="text"
                      name="country"
                      value={child.country}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="formsubmit" type="submit">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookingInfo;
