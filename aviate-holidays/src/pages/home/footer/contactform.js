import React, { useEffect, useState } from 'react';
import './contact.css'; // Import your CSS file for styling
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const ContactForm = () => {
  const navigate = useNavigate();

 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Print form data for debugging
    console.log('Form Data:', formData);
  
    try {
      const userInfo = JSON.parse(localStorage.getItem('AviateHolidaysUserInfo'));
      const userEmail = userInfo ? userInfo.email : null;
    
      if (userEmail) {
        // Get the user ID based on the email
        const userResponse = await axios.get(`http://localhost:3001/api/users-email/${userEmail}`);
        const userId = userResponse.data.userId;
    
        // Now use the userId to submit the form data
        await axios.post(`http://localhost:3001/api/datas/${userId}`, formData);
        alert('Data submitted successfully!');
        
        // Reset the form fields after successful submission
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        navigate('/UserComments');
      } else {
        alert('No user email found in localStorage');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data');
    }
    
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='container formcontaimer'>
    <div className="myfooter">
      
      <div className="row">
        
        <div className="col-5  col_5">
          <h2>Contact</h2>
          <h4>Call Us</h4>
          <h6>+880254615566</h6>
          <h4>Email Us</h4>
          <h6>info@example.com</h6>
          <h4>Address</h4>
          <h6>20, 25 Dhaka, 0123 Ratrba baraj, 20</h6>
        </div>
        <div className="col-7 form" >
          <h2>Email</h2>
          <p>info@edindia.net</p>
          <h2>Write to us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="row">
                <div className="col-md-6 col-12 mb-4">
                  <input
                    type="name"
                    name="name" value={formData.name} onChange={handleChange}
                    className="form-control"
                    style={{ borderRadius: '10px' }}
                    id="exampleFormControlInput1"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <input
                    type="email"
                    name="email" value={formData.email} onChange={handleChange}
                    className="form-control"
                    style={{ borderRadius: '10px' }}
                    id="exampleFormControlInput1"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="col-md-12 col-12 mb-4">
                  <textarea
                  name="message" value={formData.message} onChange={handleChange}
                    className="form-control commentbox"
                    style={{ borderRadius: '10px' }}
                    id="exampleFormControlTextarea1"
                    placeholder="Message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="send_button" /*onClick={() => }*/ >
                  Send Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
