import Axios from "axios";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import "../../../App.css";
import "../../Styles/Dashboard.css";
import DashboardCollection from "./Collection/DashboardCollection";
import DashboardCollectionCreate from "./Collection/DashboardCollectionCreate";
import DashboardCollectionEdit from "./Collection/DashboardCollectionEdit";
import DashboardHeader from "./DashboardHeader";
import DashboardNews from "./News/DashboardNews";
import DashboardNewsCreate from "./News/DashboardNewsCreate";
import DashboardNewsEdit from "./News/DashboardNewsEdit";
import DashboardOrder from "./Order/DashboardOrder";
import DashboardOrderCreate from "./Order/DashboardOrderCreate";
import DashboardOrderEdit from "./Order/DashboardOrderEdit";
import DashboardProduct from "./Product/DashboardProduct";
import DashboardProductCreate from "./Product/DashboardProductCreate";
import DashboardProductEdit from "./Product/DashboardProductEdit";
import DashboardSubscriber from "./Subscriber/DashboardSubscriber";
import DashboardSubscriberCreate from "./Subscriber/DashboardSubscriberCreate";
import DashboardSubscriberEdit from "./Subscriber/DashboardSubscriberEdit";
import DashboardUser from "./User/DashboardUser";
import DashboardUserCreate from "./User/DashboardUserCreate";
import DashboardUserEdit from "./User/DashboardUserEdit";
import DashboardMain from "./Main/DashboardMain";
import DashboardLiveChat from "../LiveChat/DashboardLiveChat";
import { getNewsById } from "../../../services/news";
import { getProductById } from "../../../services/products";

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
    getProductById(props.productId).then((res) => {
      setProduct(res.data);
    });
    getNewsById(props.productId).then((res) => {
      setNews(res.data);
    });
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
      {tabId === "1" && <DashboardMain />}
      {tabId === "2" && <DashboardLiveChat />}
      {tabId === "3" && (
        <DashboardOrder
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {props.openCreate && tabId === "3" && (
        <DashboardOrderCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === "3" && (
        <DashboardOrderEdit
          setCloseEditFunc={props.setCloseEditFunc}
          setToastFunc={setToastFunc}
          order={order}
        />
      )}
      {tabId === "4" && (
        <DashboardProduct
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {props.openCreate && tabId === "4" && (
        <DashboardProductCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === "4" && (
        <DashboardProductEdit
          setCloseEditFunc={props.setCloseEditFunc}
          setToastFunc={setToastFunc}
          product={product}
        />
      )}
      {tabId === "5" && (
        <DashboardNews
          setOpenCreateFunc={props.setOpenCreateFunc}
          setCloseCreateFunc={props.setCloseCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          setCloseEditFunc={props.setCloseEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {props.openCreate && tabId === "5" && (
        <DashboardNewsCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
          openMenu={props.openMenu}
        />
      )}
      {props.openEdit && tabId === "5" && (
        <DashboardNewsEdit
          setCloseEditFunc={props.setCloseEditFunc}
          setToastFunc={setToastFunc}
          openMenu={props.openMenu}
          news={news}
        />
      )}
      {tabId === "6" && (
        <DashboardUser
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {props.openCreate && tabId === "6" && (
        <DashboardUserCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === "6" && (
        <DashboardUserEdit
          setCloseEditFunc={props.setCloseEditFunc}
          setToastFunc={setToastFunc}
          user={user}
        />
      )}
      {tabId === "7" && (
        <DashboardCollection
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {props.openCreate && tabId === "7" && (
        <DashboardCollectionCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === "7" && (
        <DashboardCollectionEdit
          setCloseEditFunc={props.setCloseEditFunc}
          setToastFunc={setToastFunc}
          collection={collection}
        />
      )}
      {tabId === "8" && (
        <DashboardSubscriber
          setOpenCreateFunc={props.setOpenCreateFunc}
          setOpenEditFunc={props.setOpenEditFunc}
          toast={toast}
          isChange={isChange}
        />
      )}
      {props.openCreate && tabId === "8" && (
        <DashboardSubscriberCreate
          setCloseCreateFunc={props.setCloseCreateFunc}
          setToastFunc={setToastFunc}
        />
      )}
      {props.openEdit && tabId === "8" && (
        <DashboardSubscriberEdit
          setCloseEditFunc={props.setCloseEditFunc}
          setToastFunc={setToastFunc}
          email={email}
        />
      )}
    </div>
  );
}
