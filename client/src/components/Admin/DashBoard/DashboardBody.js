import React, { useEffect, useState } from "react";
import "../../../App.css";
import "../../Styles/Dashboard.css";
import DashboardHeader from "./DashboardHeader";
import classNames from "classnames";
import Axios from "axios";

export default function DashboardBody(props) {
  const tabId = props.tabId;
  const openMenuMobile = props.openMenuMobile;

  const [toast, setToast] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [product, setProduct] = useState({});
  const [news, setNews] = useState({});
  const [user, setUser] = useState({});
  const [order, setOrder] = useState({});
  const [collection, setCollection] = useState({});
  const [email, setEmail] = useState([]);

  const setToastFunc = (bool) => {
    setIsChange(true);
    setTimeout(() => {
      setIsChange(false);
    }, 100);
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 3000);
  };

  useEffect(() => {
    Axios.get(`http://pe.heromc.net:4000/products/${props.productId}`).then(
      (res) => {
        setProduct(res.data);
      },
    );
    Axios.get(`http://pe.heromc.net:4000/news/${props.productId}`).then(
      (res) => {
        setNews(res.data);
      },
    );
    Axios.get(`http://pe.heromc.net:4000/users/list/${props.productId}`).then(
      (res) => {
        setUser(res.data);
      },
    );
    Axios.get(`http://pe.heromc.net:4000/order/${props.productId}`).then(
      (res) => {
        setOrder(res.data);
      },
    );
    Axios.get(`http://pe.heromc.net:4000/collection/${props.productId}`).then(
      (res) => {
        setCollection(res.data);
      },
    );
    Axios.get(`http://pe.heromc.net:4000/email/${props.productId}`).then(
      (res) => {
        setEmail(res.data);
      },
    );
  }, [props.productId, props.openEdit]);

  const openMenuOnClick = () => {
    props.setOpenMenuOnClick();
  };

  return (
    <div
      className={classNames(
        classNames("DashboardBody", {
          DashboardBody_small: !props.openMenu,
        }),
      )}
    >
      {!openMenuMobile && (
        <div
          className="DashboardBody-closemenu"
          onClick={props.setOpenMenuOnClick}
        ></div>
      )}
      <DashboardHeader
        itemName={props.menuItems[tabId - 1].name}
        setOpenMenuOnClick={props.setOpenMenuOnClick}
        openMenu={props.openMenu}
        orderNotice={props.orderNotice}
      />
    </div>
  );
}
