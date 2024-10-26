import React, { useEffect, useState, useRef } from 'react';
import './footer.css'; // Import your CSS file for styling

const Footer = () => {
 
  return (
    <div className=''>
    <div className="myfooter2">
      <h1>Talk, Contribute, Innovate</h1>
      <div className="row">
        <div className="col-8 col_8 col-xm-12">
          <p>EdIndia is a section 8 Not for Profit Company that leverages technology and data analytics to create innovative solutions to impact the quality of education at scale. It has been provided incubation support by Sterlite Power Transmission Ltd. (SPTL) and its group companies.</p>
          <h2>Address</h2>
          <h6>Maker Maxity, 5 North Avenue, Level 5th, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra, 400051, India</h6>
          <div className="my_iframe">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3105.150382269581!2d-77.03910472440305!3d38.89767627172412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7bcdecbb1df%3A0x715969d86d0b76bf!2sThe%20White%20House!5e0!3m2!1sen!2sbd!4v1687436123822!5m2!1sen!2sbd"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="iframe"
            ></iframe>
          </div>
        </div>
        <div className="col-2 col_2">
          <h2>Quick Links</h2>
          <ul>
            <li>About</li>
            <li>Nirnay</li>
            <li>Pragyan</li>
            <li>Teachable</li>
            <li>Digital Classroom</li>
            <li>Innovations</li>
            <li>Care</li>
          </ul>
        </div>
        <div className="col-2 col_2">
          <h2>Quick Links</h2>
          <ul>
            <li>About</li>
            <li>Nirnay</li>
            <li>Pragyan</li>
            <li>Teachable</li>
            <li>Digital Classroom</li>
            <li>Innovations</li>
            <li>Care</li>
          </ul>
        </div>
            
      </div>
    </div>
    </div>
  );
};

export default Footer;
