import React, { Component } from "react";
import "../../App.css";

class GoogleMap extends Component {
  render() {
    return (
      <div className="google-map">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1959.2612259929485!2d106.7849056079634!3d10.847810698068267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527131ae8b249%3A0x4d2d3c8fab7d3c2e!2zOTcgxJDGsOG7nW5nIE1hbiBUaGnhu4duLCBIaeG7h3AgUGjDuiwgUXXhuq1uIDksIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1615191711170!5m2!1svi!2s"
         
          width="100%"
          height="100%"
          frameBorder="0"
          aria-hidden="false"
          tabIndex="0"
        />
      </div>
    );
  }
}

export default GoogleMap;
