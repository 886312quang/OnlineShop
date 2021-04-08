import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import "../../App.css";
import { UserContext } from "../../contexts/User";
import UserInfo from "./UserInfo";
import { fetchSignin, fetchSignup } from "../../services/auth";
import { fetchGetUser } from "../../services/user";

function Auth(props) {
  const { setUserInfoFunc, userInfo } = useContext(UserContext);

  const [check, setCheck] = useState(false);
  const [tabID, setTabID] = useState(0);
  const [arrSuccess, setArrSuccess] = useState([]);
  const [arrErr, setArrErr] = useState([]);
  const [user, setUser] = useState({});
  const [login, setLogin] = useState(false);

  const handleOnChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (tabID === 0) {
      fetchSignin({ email: user.loginEmail, password: user.loginPassword })
        .then((res) => {
          setArrSuccess((arrSuccess) => [...arrSuccess, "Login success!"]);
          setTimeout(() => {
            window.location.reload(false);
            document.body.style.overflow = "unset";
          }, 1000);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refresh-token", res.data.refreshToken);
          localStorage.setItem("user-id", res.data.user._id);
          localStorage.setItem("exp", res.data.exp);
          localStorage.setItem("iat", res.data.iat);
        })
        .catch((err) => {});
    } else {
      fetchSignup({
        userName: user.registerName,
        email: user.registerEmail,
        password: user.registerPassword,
      })
        .then((res) => {
          setArrSuccess((arrSuccess) => [...arrSuccess, res.data]);
          setTimeout(() => {
            window.location.reload(false);
            document.body.style.overflow = "unset";
          }, 1000);
        })
        .catch((err) => {
          setArrErr((arrErr) => [...arrErr, err.response.data]);
        });
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const userId = localStorage.getItem("user-id");
    if (accessToken !== null)
      if (userId)
        fetchGetUser(userId).then((res) => {
          setUserInfoFunc(res.data);
          setLogin(true);
        });
  }, [accessToken]); // accessToken

  let uniqueErr,
    uniqueSuccess = [];
  if (arrErr.length > 0) {
    uniqueErr = arrErr.filter(function (item, pos) {
      return arrErr.indexOf(item) === pos;
    });
  }
  if (arrSuccess.length > 0) {
    uniqueSuccess = arrSuccess.filter(function (item, pos) {
      return arrSuccess.indexOf(item) === pos;
    });
  }

  return (
    <div
      className={
        props.accountOpen === false ? "Account displayNone" : "Account"
      }
    >
      <div className="account-container">
        <div className="search-header flex">
          <div className="search-title">My Account</div>
          <div className="search-close" onClick={props.clickToClose}>
            <FontAwesomeIcon icon={faTimes} className="icon" />
          </div>
        </div>

        {login === true && <UserInfo />}

        {login === false && (
          <div className={props.accountOpen === false ? "" : "fadeIn"}>
            <div className="search-tab login-tab flex">
              <div
                className={
                  tabID === 0
                    ? "search-tab-cate search-tab-active"
                    : "search-tab-cate"
                }
                onClick={() => {
                  setTabID(0);
                  setArrErr([]);
                  setArrSuccess([]);
                }}
              >
                Login
              </div>
              <div
                className={
                  tabID === 1
                    ? "search-tab-cate search-tab-active"
                    : "search-tab-cate"
                }
                onClick={() => {
                  setTabID(1);
                  setArrErr([]);
                  setArrSuccess([]);
                }}
              >
                Register
              </div>
            </div>
            <div className="login-err flex-center flex-col">
              {uniqueErr && (
                <div>
                  {uniqueErr.map((item, index) => {
                    return (
                      <div key={index}>
                        <FontAwesomeIcon
                          icon={faTimes}
                          style={{ marginRight: "10px", color: "red" }}
                        />
                        {item}
                      </div>
                    );
                  })}
                </div>
              )}
              {uniqueSuccess && (
                <div>
                  {uniqueSuccess.map((item, index) => {
                    return (
                      <div key={index} className="login-success">
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ marginRight: "10px", color: "green" }}
                        />
                        {item}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {tabID === 0 && (
              <div className="search-form login-form fadeToRight">
                <form className="flex-col" onSubmit={handleOnSubmit}>
                  <input
                    type="email"
                    placeholder="Email"
                    name="loginEmail"
                    onChange={handleOnChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="loginPassword"
                    onChange={handleOnChange}
                  />
                  <div
                    className="remember-login flex noselect"
                    onClick={() => {
                      if (check) {
                        setCheck(false);
                      } else {
                        setCheck(true);
                      }
                    }}
                  >
                    <div className="check-box"></div>
                    {check && (
                      <div
                        className="check-box-active flex-center"
                        onClick={() => setCheck(false)}
                      >
                        <FontAwesomeIcon
                          className="check-box-active"
                          icon={faCheck}
                        ></FontAwesomeIcon>
                      </div>
                    )}
                    <p>Remember me</p>
                  </div>
                  <button
                    type="submit"
                    onClick={handleOnSubmit}
                    className="btn"
                  >
                    LOGIN
                  </button>
                  <label>LOST YOUR PASSWORD?</label>
                </form>
              </div>
            )}
            {tabID === 1 && (
              <div className="search-form login-form fadeToLeft">
                <form className="flex-col" onSubmit={handleOnSubmit}>
                  <input
                    type="text"
                    placeholder="Name"
                    name="registerName"
                    onChange={handleOnChange}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    name="registerEmail"
                    onChange={handleOnChange}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    name="registerPassword"
                    onChange={handleOnChange}
                  />
                  <button className="btn">REGISTER</button>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(Auth);
