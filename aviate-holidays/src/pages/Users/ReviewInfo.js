import React from 'react';
import { useLocation ,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReviewPage.css'; // Import the CSS file

const ReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { detail, formData, adultsData, childrenData } = location.state || {};

  const noOfTravelers = Number(formData.ADULT) + Number(formData.CHILD);

  const userInfo = JSON.parse(localStorage.getItem('AviateHolidaysUserInfo'));
  const userEmail = userInfo ? userInfo.email : null;

  const handlePayLater = async () => {
    const postData = {
      detailId: detail.id,
      packageName: detail.title,
      packageDetails: detail.description,
      dateOfTravel: formData.date,
      noOfTravelers: noOfTravelers,
      adults: adultsData,
      children: childrenData,
      userEmail: userEmail,
      payment:'pending'
    };

    try {
        await axios.post('http://localhost:3001/api/bookings', postData);
        alert('Booking information saved successfully!');
        // Navigate to the bookings page
      navigate('/BookingsPage');
    } catch (error) {
        console.error('Error saving booking information:', error);
    
        // Check if the error response has the relevant information
        if (error.response && error.response.data && error.response.data.error) {
            const errorMsg = error.response.data.error.sqlMessage || error.response.data.error.message || 'Unknown error';
            alert(`Failed to save booking: ${errorMsg}`);
        } else {
            alert('Failed to save booking: An unexpected error occurred.');
        }
    }
    
  };

  return (
    <div className="review-container">
      <h2 className="title">REVIEW INFORMATION</h2>
      <div className="info-section">
        <p><strong>PACKAGE NAME:</strong> {detail.title}</p>
        <p><strong>PACKAGE DETAILS:</strong> {detail.description}</p>
        <p><strong>NO OF TRAVELER:</strong> {noOfTravelers}</p>
        <p><strong>DATE OF TRAVEL:</strong> {formData.date}</p>
      </div>
      <div className="travelers-section">
        <h3>Adults</h3>
        {adultsData.map((adult, index) => (
          <div key={index} className="traveler-info">
            <p><strong>NAME:</strong> {adult.name}</p>
            <p><strong>EMAIL:</strong> {adult.email}</p>
            <p><strong>ORIGIN COUNTRY:</strong> {adult.country}</p>
            <p><strong>MOBILE NUMBER:</strong> {adult.number}</p>
          </div>
        ))}
        <h3>Children</h3>
        {childrenData.map((child, index) => (
          <div key={index} className="traveler-info">
            <p><strong>NAME:</strong> {child.name}</p>
            <p><strong>AGE:</strong> {child.age}</p>
            <p><strong>ORIGIN COUNTRY:</strong> {child.country}</p>
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button className="pay-now">PAY NOW</button>
        <button className="pay-later" onClick={handlePayLater}>PAY LATER</button>
      </div>
    </div>
  );
};

export default ReviewPage;
