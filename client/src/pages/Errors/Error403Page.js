import React from "react";
import ErrorWrapper from "./styles/ErrorWrapper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ERROR_403, BACK_HOME } from "../../constants/ErrorPage";

const Error403Page = () => {
  return (
    <ErrorWrapper>
      <div className="exception">
        <div className="imgBlock">
          <div
            className="imgEle"
            style={{
              backgroundImage: `url(/images/403.svg)`,
            }}
          />
        </div>
        <div className="content">
          <h1>403</h1>
          <div className="desc">{ERROR_403}</div>
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

export default Error403Page;
