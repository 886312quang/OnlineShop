import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../contexts/User";
import "../../App.css";
import "../Styles/Account.css";
import { getOrder, getOrderByUser } from "../../services/order";
import { updateUser } from "../../services/user";

function AccountInfo(props) {
  const [tinh, setTinh] = useState([]);
  const [huyen, setHuyen] = useState([]);
  const [tabId, setTabId] = useState(1);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAvt, setUserAvt] = useState("");
  const [file, setFile] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [userTinh, setUserTinh] = useState(null);
  const [userHuyen, setUserHuyen] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [toast, setToast] = useState(false);
  const [orderList, setOrderList] = useState([]);

  const { userInfo, setUserInfoFunc } = useContext(UserContext);

  const createForm = useRef();

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.userName);
      setUserEmail(userInfo.email);
      setUserPhone(userInfo.phone);
      setUserAvt(userInfo.avatar);
      setUserAddress(userInfo.address);
      if (userInfo.tinh !== "") {
        axios.get(`http://pe.heromc.net:4000/vietnam`).then((res) => {
          setTinh(res.data[0].tinh);
          setHuyen(res.data[0].huyen);
          res.data[0].tinh.filter((item) => {
            if (userInfo.userTinh === item.name) {
              setProvinceId(item.id);
            }
            return null;
          });
        });
        setUserTinh(userInfo.tinh);
      } else {
        axios.get(`http://pe.heromc.net:4000/vietnam`).then((res) => {
          setTinh(res.data[0].tinh);
          setHuyen(res.data[0].huyen);
        });
      }
      if (userInfo.huyen !== "") {
        setUserHuyen(userInfo.huyen);
      }
      getOrderByUser(userInfo.email).then((res) => {
        const orderList2 = [];
        for (let i in res.data) {
          orderList2.push(res.data[i]);
        }
        setOrderList(orderList2);
      });
    }
  }, [userInfo]);

  const logout = () => {
    localStorage.removeItem("user-id");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("exp");
    localStorage.removeItem("iat");
    sessionStorage.removeItem("chat-id");
    window.location.reload(false);
    localStorage.removeItem("total");
    localStorage.removeItem("cart");
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    const imageArr = Array.from(file);
    imageArr.forEach((image) => {
      formData.append("avatar", image);
    });
    formData.append("userName", userName);
    formData.append("email", userEmail);
    formData.append("phone", userPhone);
    formData.append("tinh", userTinh);
    formData.append("huyen", userHuyen);
    formData.append("address", userAddress);

    updateUser(userInfo._id, formData).then((res) => {
      logout();
    });

    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2000);
  };

  return (
    <div className="AccountInfo">
      <div className="accountinfo-container flex">
        <div
          className={toast ? "toast toast-show" : "toast"}
          style={{ top: "20px" }}
        >
          <FontAwesomeIcon icon={faCheckCircle} className="icon" />
          Change account infomation success!
        </div>
        <div className="accountinfo-menu">
          <div className="accountinfo-avt flex">
            <img
              style={{ borderRadius: "50%" }}
              className="accountinfo-avt-img"
              src={userInfo.avatar}
              alt=""
              width="48px"
              height="48px"
            ></img>
            <div className="accountinfo-avt-name">{userInfo.userName}</div>
          </div>
          <div className="accountinfo-menu-list">
            <div
              className={
                tabId === 1
                  ? "accountinfo-active accountinfo-menu-item flex"
                  : "accountinfo-menu-item flex"
              }
              onClick={() => setTabId(1)}
            >
              My account
            </div>
            <div
              className={
                tabId === 2
                  ? "accountinfo-active accountinfo-menu-item flex"
                  : "accountinfo-menu-item flex"
              }
              onClick={() => setTabId(2)}
            >
              Orders
            </div>
            <div
              className={
                tabId === 3
                  ? "accountinfo-active accountinfo-menu-item flex"
                  : "accountinfo-menu-item flex"
              }
              onClick={() => {
                logout();
              }}
            >
              Log out
            </div>
          </div>
        </div>
        {tabId === 1 && (
          <div className="accountinfo-main">
            <div className="accountinfo-title">
              <p>Account Infomation</p>
              <p>Manage account information for account security</p>
            </div>
            <div className="accountinfo-body flex">
              <form
                onSubmit={onSubmit}
                encType="multipart/form-data"
                ref={createForm}
              >
                <div className="create-box-row account-box-row flex">
                  <div className="dashboard-left create-box-left flex">
                    Name
                  </div>
                  <div className="dashboard-right create-box-right">
                    <input
                      type="text"
                      name="title"
                      className="input"
                      value={userName}
                      onChange={(event) => {
                        setUserName(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="create-box-row account-box-row flex">
                  <div className="dashboard-left create-box-left flex">
                    Images{" "}
                  </div>
                  <div className="dashboard-right search-form create-box-right">
                    <input
                      className="input"
                      onChange={(event) => {
                        const files = event.target.files;
                        setUserAvt(URL.createObjectURL(files[0]));
                        const fileArr = Array.prototype.slice.call(files);
                        fileArr.forEach((item) => {
                          setFile((file) => [...file, item]);
                        });
                      }}
                      type="file"
                      name="newsImg"
                      className="noborder"
                      multiple="multiple"
                      style={{ height: "30px" }}
                    ></input>
                    <div
                      className="flex"
                      style={{ overflowY: "hidden", flexWrap: "wrap" }}
                    >
                      <img
                        className="accountinfo-editavt-img"
                        src={userAvt}
                        alt=""
                        width="80px"
                        height="80px"
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="create-box-row account-box-row flex">
                  <div className="dashboard-left create-box-left flex">
                    Email
                  </div>
                  <div className="dashboard-right create-box-right">
                    <input
                      type="text"
                      className="input"
                      value={userEmail}
                      onChange={(event) => {
                        setUserEmail(event.target.value);
                      }}
                      disabled="true"
                    ></input>
                  </div>
                </div>
                <div className="create-box-row account-box-row flex">
                  <div className="dashboard-left create-box-left flex">
                    Phone number
                  </div>
                  <div className="dashboard-right create-box-right">
                    <input
                      type="text"
                      className="input"
                      value={userPhone}
                      onChange={(event) => {
                        setUserPhone(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="create-box-row account-box-row flex">
                  <div className="dashboard-left create-box-left flex">
                    Province
                  </div>
                  <div className="dashboard-right create-box-right">
                    <select
                      className="input"
                      value={userTinh || ""}
                      onChange={(event) => {
                        setProvinceId(event.target.selectedIndex);
                        setUserTinh(event.target.value);
                      }}
                    >
                      <option defaultValue disabled>
                        select a province
                      </option>
                      {tinh.map((item, index) => {
                        return (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="create-box-row account-box-row flex">
                  <div className="dashboard-left create-box-left flex">
                    District
                  </div>
                  <div className="dashboard-right create-box-right">
                    <select
                      className="input"
                      value={userHuyen || ""}
                      onChange={(event) => {
                        setUserHuyen(event.target.value);
                      }}
                    >
                      <option defaultValue disabled>
                        select a district
                      </option>
                      {provinceId ? (
                        huyen.map((item, index) => {
                          if (item.tinh_id === provinceId) {
                            return (
                              <option key={index} value={item.name}>
                                {item.name}
                              </option>
                            );
                          }
                          return null;
                        })
                      ) : (
                        <option key={userHuyen}>{userHuyen}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="create-box-row account-box-row flex">
                  <div className="dashboard-left create-box-left flex">
                    Address
                  </div>
                  <div className="dashboard-right create-box-right">
                    <input
                      type="text"
                      className="input"
                      name="phone"
                      value={userAddress || ""}
                      onChange={(event) => {
                        setUserAddress(event.target.value);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="accountinfo-btn-row">
                  <button className="accountinfo-btn btn">
                    Update infomation
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {tabId === 2 && (
          <div className="accountinfo-main">
            <div className="accountinfo-title">
              <p>Orders infomation</p>
              <p>List of your orders</p>
            </div>
            <div className="dashboard-table-orderlist">
              <table
                className="dashboard-table"
                style={{ tableLayout: "fixed" }}
              >
                <tbody>
                  <tr className="dashboard-order">
                    <th className="table-new-title table-order-title">
                      Shipping info
                    </th>
                    <th className="table-new-title table-order-title">Date</th>
                    <th className="table-new-title table-order-title">
                      Payment Method
                    </th>
                    <th className="table-new-title table-order-title">Items</th>
                    <th className="table-new-title table-order-title">
                      Total money
                    </th>
                  </tr>
                  {orderList.reverse().map((item, index) => {
                    const date = new Date(item.orderDate);
                    const day = date.getDate();
                    const month = date.getMonth() + 1;
                    const year = date.getFullYear();
                    var totalItem = 0;
                    for (let i in item.orderList) {
                      totalItem += item.orderList[i].amount;
                    }
                    return (
                      <tr key={index} className="mobile-table">
                        <td>
                          <div
                            className="flex"
                            style={{ alignItems: "center", margin: "10px 0" }}
                          >
                            <p
                              style={{
                                wordWrap: "break-word",
                                WebkitLineClamp: "3",
                              }}
                            >
                              {item.orderAddress}, {item.orderHuyen}{" "}
                              {item.orderTinh}
                            </p>
                          </div>
                        </td>
                        <td>
                          <p>
                            {day}-{month}-{year}
                          </p>
                        </td>
                        <td>
                          <p style={{ textTransform: "capitalize" }}>
                            {item.orderPaymentMethod}
                          </p>
                        </td>
                        <td>
                          {typeof totalItem === "number" && (
                            <div
                              key={index}
                              className="flex"
                              style={{ justifyContent: "space-between" }}
                            >
                              <p
                                style={{
                                  margin: "10px 0",
                                  width: "50px",
                                  marginLeft: "20px",
                                }}
                              >
                                {totalItem}
                              </p>
                            </div>
                          )}
                        </td>
                        <td>
                          <p>{item.orderTotal} đ</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(AccountInfo);
