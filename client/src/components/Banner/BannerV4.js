import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { withRouter } from "react-router-dom";
import "../../App.css";

function BannerV4(props) {
  const location = props.history.location.pathname;
  const locationText = location.slice(1);

  return (
    <div className="BannerV4">
      <div className="bannerv4-title">{props.collectionTitle}</div>
      <div className="newsbanner-breadcrumb flex-center">
        <div>Home</div>
        <FontAwesomeIcon
          icon={faAngleRight}
          className="cart-icon"
          style={{ margin: "0 10px" }}
        />
        <div style={{ textTransform: "capitalize" }}>{locationText}</div>
      </div>
    </div>
  );
}

export default withRouter(BannerV4);
