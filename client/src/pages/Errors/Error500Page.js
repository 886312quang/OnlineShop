import React from "react";
import ErrorWrapper from "./styles/ErrorWrapper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ERROR_500, BACK_HOME } from "../../constants/ErrorPage";

const Error500Page = () => {
  return (
    <ErrorWrapper>
      <div className="exception">
        <div className="imgBlock">
          <div
            className="imgEle"
            style={{
              backgroundImage: `url(/images/500.svg)`,
            }}
          />
        </div>
        <div className="content">
          <h1>500</h1>
          <div className="desc">{ERROR_500}</div>
          <div className="actions">
            <Link to="/">
              <Button variant="contained" color="primary">
                {BACK_HOME}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </ErrorWrapper>
  );
};

export default Error500Page;
