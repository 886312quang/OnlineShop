import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
import b1 from "../../assets/b1.jpg";
import b2 from "../../assets/phone.jpg";
import b3 from "../../assets/mac.jpg";
import b4 from "../../assets/Accessories.jpg";

export default function RecommendBanner() {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="RecommendBanner flex-center">
      <div className="RecommendBanner-container flex-center">
        <div className="banner-box img-hover">
          <img src={b1} alt="banner" width="100%" height="100%" />
          <div className="blackbox-center-container">
            <div className="blackbox-title">New Arrivals</div>
            <div className="blackbox-center">
              <Link
                className="blackbox-link a"
                to="/shop"
                onClick={handleClick}
              >
                Shop now
              </Link>
            </div>
          </div>
        </div>
        <div className="banner-box">
          <div className="banner-top flex-center">
            <div className="banner-top2 img-hover">
              <img src={b2} alt="banner" width="100%" height="100%"></img>
              <div className="blackbox-center-container">
                <div className="blackbox-title blackbox-title-small">Phone</div>
                <div className="blackbox-center">
                  <Link
                    className="blackbox-link blackbox-link-smaill a"
                    to="/phone"
                    onClick={handleClick}
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
            <div className="banner-top2 img-hover">
              <img src={b3} alt="banner" width="100%" height="100%"></img>
              <div className="blackbox-center-container">
                <div className="blackbox-title blackbox-title-small">
                  Laptop
                </div>
                <div className="blackbox-center">
                  <Link
                    className="blackbox-link blackbox-link-smaill a"
                    to="/laptop"
                    onClick={handleClick}
                  >
                    Shop now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="banner-bottom img-hover">
            <img src={b4} alt="banner" width="100%" height="100%"></img>
            <div className="blackbox-center-container">
              <div className="blackbox-title blackbox-title-medium">
                Accessories
              </div>
              <div className="blackbox-center">
                <Link
                  className="blackbox-link blackbox-link-medium a"
                  to="/shop"
                  onClick={handleClick}
                >
                  Shop now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
