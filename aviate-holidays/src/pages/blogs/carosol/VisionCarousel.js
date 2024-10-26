import "./VisionCarousel.css" ;

import React from 'react';

const VisionCarousel = () => {
  return (
    <section className="container" style={{ backgroundColor: 'grey', overflowX: 'hidden' }}>
      <div className="row">
        <div className="col-5">
          <h3>Our Vision</h3>
          <p>Every child in the country has access to quality education</p>

          <h3>Our Mission</h3>
          <p>
            To engage with the educational ecosystem - teachers, future teachers, and administrators - with
            tech-innovations, content, skills, and analytics to provide a quality learning experience to children
          </p>

          <h3>Our Goal</h3>
          <p>Every child in the country has access to quality education</p>
        </div>
        <div className="col-7">
          <h1>Scrollable Carousel</h1>

          <div id="carousel" style={{ display: 'flex', overflowX: 'scroll' }}>
            <div className="item">🍎</div>
            <div className="item">🥑</div>
            <div className="item">🍋</div>
            <div className="item">🌽</div>
            <div className="item">🍇</div>
            <div className="item">🥭</div>
            <div className="item">🥝</div>
            <div className="item">🍑</div>
            <div className="item">🥦</div>
            <div className="item">🍓</div>
            <div className="item">🥕</div>
            <div className="item">🍅</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionCarousel;
