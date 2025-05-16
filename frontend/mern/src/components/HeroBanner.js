import React from "react";
import "../css/HeroBanner.css";

const HeroBanner = () => {
  return (
    <section className="flash-banner">
      <div className="overlay">
        <div className="banner-content">
          <div className="left-content">
            <h2 className="title">FLASH</h2>
            <h1 className="subtitle">SALE</h1>
            <p className="description">
             "Flash Sale: Up to 70% off on top trending products. Hurry, while stocks last!"
            </p>
          </div>
          <div className="right-content">
            <div className="tag">50% OFF</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
