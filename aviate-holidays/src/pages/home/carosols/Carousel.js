import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyCarousel.css';

function MyCarousel() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Bangladesh');
  const [countryOptions, setCountryOptions] = useState([]);
  const [slides, setSlides] = useState([]);

  // Retrieve selected country from local storage or default to 'Bangladesh'
  useEffect(() => {
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
      setSelectedCountry(savedCountry);
      fetchCountryImages(savedCountry);
    } else {
      fetchCountryImages('Bangladesh');
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!hovered) {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

    }, 3500);

    return () => clearInterval(intervalId);
  }, [hovered, slides.length]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/countries');
      const options = response.data.map((country) => ({
        value: country.name,
        label: country.name,
      }));
      setCountryOptions(options);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchCountryImages = async (country) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/countries/${country}/images`);
      const countrySlides = response.data.map((imageName) => ({
        imgSrc: `http://localhost:3001/images/${country}/${imageName}`,
        caption: { title: country, content: '' },
      }));
      setSlides(countrySlides);
      setCurrentSlide(0);
    } catch (error) {
      console.error('Error fetching country images:', error);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleCircleClick = (index) => {
    setCurrentSlide(index);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#000',
      backgroundColor: state.isFocused ? '#555' : state.isSelected ? '#333' : '#fff',
      padding: 10,
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderColor: 'black',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#ccc',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#000',
      fontWeight: 'bold', // Add your custom font style here
      fontSize: '1.2rem', // Example of changing font size
      fontFamily: 'Arial, sans-serif', // Example of changing font family
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#fff',
      marginLeft: '-8px',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#000',
      fontWeight: 'bold',
      fontSize: '1rem',
      
    }),
  };

  const handleCountryChange = (selectedOption) => {
    const country = selectedOption.value;
    setSelectedCountry(country);
    localStorage.setItem('selectedCountry', country);
    fetchCountryImages(country);
    //selectedOption.preventDefault(); // Prevent the default link behavior
    window.location.reload(); // Reload the page
  };

  const handleNavigate = () => {
    navigate('/other-page', { state: { selectedCountry } });
  };

  return (
    <div className="carousel">
      <div
        className="carousel-container"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <button className="prev-btn" onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <div className="carousel-slides">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}>
              <img
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
              {/* <div className="carousel-caption">
                <h3>{slide.caption.title}</h3>
                <p>{slide.caption.content}</p>
              </div> */}
            </div>
          ))}
        </div>
        <button className="next-btn" onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        {/* <div className="carousel-indicators">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleCircleClick(index)}
            ></span>
          ))}
        </div> */}
        <div className="carousel-dropdown">
          <Select
            value={countryOptions.find((option) => option.value === selectedCountry)}
            onChange={handleCountryChange}
            options={countryOptions}
            className="country-dropdown"
            styles={customStyles}
            placeholder="Select a Country"
            menuPlacement="top"
          />
        </div>
        
      </div>
    </div>
  );
}

export default MyCarousel;
