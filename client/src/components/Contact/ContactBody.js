import React, { Component } from "react";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faMailBulk, faPhone } from "@fortawesome/free-solid-svg-icons";

export default class ContactBody extends Component {
  render() {
    return (
      <div className="ContactBody">
        <div className="contact-info">
          <div className="contact-info-title"></div>
          <div className="contact-info-detail">
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faHome} className="contact-icon" />
              <p className="contact-info-title2">ADDRESS</p>
              <p>97 Man Thien, Q9, TP HCM</p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faPhone} className="contact-icon" />
              <p className="contact-info-title2">phone</p>
              <p>+84 99999999999</p>
            </div>
            <div className="contact-info-item">
              <FontAwesomeIcon icon={faMailBulk} className="contact-icon" />
              <p className="contact-info-title2">email</p>
              <p>willbuy@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
