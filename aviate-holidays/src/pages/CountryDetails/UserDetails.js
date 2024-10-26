import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css'; // Add your styles here
import { useNavigate } from 'react-router-dom';



const CountryDetailsPage = () => {
  const navigate = useNavigate();

  const [countryDetails, setCountryDetails] = useState([]);
  const [showAll, setShowAll] = useState(false);
  
  const selectedCountry = localStorage.getItem('selectedCountry') || 'Bangladesh';

  useEffect(() => {
    fetchCountryDetails();
  }, []);

  const fetchCountryDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/${selectedCountry}/details`);
      console.log('API Response:', response.data);
      setCountryDetails(response.data);
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  };

  const handleDetails = (detail) => {
    navigate(`/UserTourDetailsPage/${detail.id}`, { state: { detail } });
  };

  const handleShowMore = () => {
    setShowAll(true);
  };
  const handleShowLess = () => {
    setShowAll(false);
  };

  const cardsToShow = showAll ? countryDetails : countryDetails.slice(0, 3);

  return (
    <div className="country-details-container">
      {cardsToShow.length > 0 ? (
        cardsToShow.map((detail, index) => (
          <div key={index} className="detail-card">
            <img src={`http://localhost:3001/countrydetails/${detail.image}`} alt={detail.title} className="detail-image" />
            <h3>{detail.title}</h3>
            <p>{detail.description}</p>
            <div className="action-row">
              <p className="price">BDT {detail.price}</p>
              <p className="more-button" onClick={() => handleDetails(detail)}>MORE</p>
            </div>
          </div>
        ))
      ) : (
        <p>No details available for {selectedCountry}.</p>
      )}
      {!showAll && countryDetails.length > 3 && (
        <button onClick={handleShowMore} className="show-more-button">Show More</button>
      )}
      {showAll && countryDetails.length > 3 && (
        <button onClick={handleShowLess} className="show-more-button">Show less</button>
      )}
    </div>
  );
};

export default CountryDetailsPage;
