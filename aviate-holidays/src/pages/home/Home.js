import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import MyCarousel from "./carosols/Carousel";
import Mycontents from "./contents/contents";
import Numbers from "./numbersAnim/numbers";
import Initiatives from "./initiatives/initiatives";
import Card from "./FromRightorLeft/card";
import Contact from "./footer/contact";
import MyCarouselDetails from "../CountryDetails/UserDetails";
// import MyCarousel from "./carosols/Carousel";

function Home() {
  const [showButton, setShowButton] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("AviateHolidaysUserInfo"));
    const email = userInfo ? userInfo.email : null;
    setUserEmail(email);

    const allowedEmails = ["mdsa134867@gmail.com", "mdsa11@gmail.com", "md12@gmail.com"];

    if (email && allowedEmails.includes(email)) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, []);

  return (
    <div className="Homehm">
      
      {/* <h1 className="center">Home</h1> */}
      <MyCarousel />
      <div className="end">
        {showButton && (
          <Link to="/import" className="my-button">
            Add Country & Carosol image
            
          </Link>
        )}
        {showButton && (
          <Link to="/addcountrydetails" className="my-button">
            add Packages for country
          </Link>
        )}
        {showButton && (
          <Link to="/userdetails" className="my-button">
            details
          </Link>
        )}
        
        {showButton && (
          <Link to="/inexclusions" className="my-button">
            Add In/Excludings
          </Link>
        )}

        {showButton && (
          <Link to="/detailspage" className="my-button">
            In/Excludings
          </Link>
        )}
      </div>
      <h1 className="center">Contents</h1>
      <Mycontents />
      <h1 className="center">Packages</h1>
      {/* <Numbers /> */}
      <MyCarouselDetails />
      {/* <h1 className="center">Packages</h1>
      <MyCarouselDetails /> */}
      <h1 className="center">Number of Contents</h1>
      <Numbers />
      <h1 className="center">Initiatives</h1>
      <Initiatives />
      <h1 className="center">Animated Card</h1>
      <Card />
      <h1 className="center">Contact Us</h1>
      <Contact />
      <h1 className="center">Footer</h1>
    </div>
  );
}

export default Home;
