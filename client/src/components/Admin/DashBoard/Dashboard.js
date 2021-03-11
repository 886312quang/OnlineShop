import React, { useEffect, useState } from "react";
import "../../../App.css";
import { withRouter } from "react-router-dom";
import {
  faEnvelope,
  faFileInvoice,
  faHome,
  faInbox,
  faNewspaper,
  faShoppingBag,
  faTshirt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DashboardMenu from "./DashboardMenu";
import DashboardBody from "./DashboardBody";

function Dashboard(props) {
  const menuItems = [
    {
      id: "1",
      name: "Dashboard",
      icon: faHome,
    },
    {
      id: "2",
      name: "Live Chat",
      icon: faInbox,
    },
    {
      id: "3",
      name: "Orders",
      icon: faFileInvoice,
    },
    {
      id: "4",
      name: "Products",
      icon: faTshirt,
    },
    {
      id: "5",
      name: "News",
      icon: faNewspaper,
    },
    {
      id: "6",
      name: "Users",
      icon: faUser,
    },
    {
      id: "7",
      name: "Collection",
      icon: faShoppingBag,
    },
    {
      id: "8",
      name: "Subscribers",
      icon: faEnvelope,
    },
  ];

  const [tabId, setTabId] = useState("1");
  const [openMenu, setOpenMenu] = useState(true);
  const [openMenuMobile, setOpenMenuMobile] = useState(true);
  const [productId, setProductId] = useState("");
  const [orderNotice, setOrderNotice] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const setTabIdOnClick = (id) => {
    setTabId(id);
  };

  const setOpenMenuOnClick = () => {
    if (window.innerWidth <= 1110) {
      setOpenMenu(true);
      if (openMenuMobile) setOpenMenuMobile(false);
      else setOpenMenuMobile(true);
    } else {
      if (openMenu) setOpenMenu(false);
      else setOpenMenu(true);
    }
  };

  const setOpenCreateFunc = () => {
    document.body.style.overflow = "hidden";
    setOpenCreate(true);
  };

  const setCloseCreateFunc = (bool) => {
    document.body.style.overflow = "unset";
    setOpenCreate(bool);
  };

  const setOpenEditFunc = (event) => {
    document.body.style.overflow = "hidden";
    setOpenEdit(true);
    setProductId(event.target.id);
  };

  const setCloseEditFunc = (bool) => {
    document.body.style.overflow = "unset";
    setOpenEdit(bool);
  };

  // toggle Menu
  let toggleMenuOnResize = () => {
    if (window.innerWidth > 1110) {
      setOpenMenuMobile(true);
    }
  };

  useEffect(() => {
    toggleMenuOnResize();
    window.addEventListener("resize", toggleMenuOnResize);
    return () => {
      window.removeEventListener("resize", toggleMenuOnResize);
    };
  }, []);

  return (
    <div className="Dashboard flex">
      <DashboardMenu
        setTabIdOnClick={setTabIdOnClick}
        setOpenMenuOnClick={setOpenMenuOnClick}
        tabId={tabId}
        menuItems={menuItems}
        openMenu={openMenu}
        openMenuMobile={openMenuMobile}
        setCloseCreateFunc={setCloseCreateFunc}
        setCloseEditFunc={setCloseEditFunc}
        useInfo={userInfo}
      />
      <DashboardBody
        tabId={tabId}
        menuItems={menuItems}
        openMenu={openMenu}
        openMenuMobile={openMenuMobile}
        openCreate={openCreate}
        openEdit={openEdit}
        setOpenMenuOnClick={setOpenMenuOnClick}
        setOpenCreateFunc={setOpenCreateFunc}
        setCloseCreateFunc={setCloseCreateFunc}
        setOpenEditFunc={setOpenEditFunc}
        setCloseEditFunc={setCloseEditFunc}
        productId={productId}
        orderNotice={orderNotice}
      />
    </div>
  );
}

export default withRouter(Dashboard);
