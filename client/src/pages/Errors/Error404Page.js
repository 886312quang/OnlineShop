import React from "react";
import ErrorWrapper from "./styles/ErrorWrapper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { BACK_HOME, ERROR_404 } from "../../constants/ErrorPage";

const Error404Page = () => {
  return (
    <ErrorWrapper>
      <div className="exception">
        <div className="imgBlock">
          <div
            className="imgEle"
            style={{
              backgroundImage: `url(/images/404.svg)`,
            }}
          />
        </div>
        <div className="content">
          <h1>404</h1>
          <div className="desc">{ERROR_404}</div>
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

export default Error404Page;
