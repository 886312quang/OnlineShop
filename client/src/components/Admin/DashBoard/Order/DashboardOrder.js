import { faCheckCircle, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import DashboardOderTable from "./DashboardOrderTable";

export default function DashboardOrder(props) {
  const [table, setTable] = useState([]);

  useEffect(() => {
    if (window.innerWidth <= 600) {
      setTable([
        "ID",
        "ShippingInfo",
        "Date",
        "PaymentMethod",
        "Items",
        "Total Money",
        "Action",
      ]);
    } else {
      setTable([
        "Order Info",
        "ShippingInfo",
        "Date",
        "PaymentMethod",
        "Items",
        "Total Money",
        "Action",
      ]);
    }
    function handleResize() {
      if (window.innerWidth <= 600) {
        setTable([
          "ID",
          "ShippingInfo",
          "Date",
          "PaymentMethod",
          "Items",
          "Total Money",
          "Action",
        ]);
      } else {
        setTable([
          "Order Info",
          "ShippingInfo",
          "Date",
          "PaymentMethod",
          "Items",
          "Total Money",
          "Action",
        ]);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="dashboard-product">
      <div
        className={props.toast ? "toast toast-show" : "toast"}
        style={{ top: "20px" }}
      >
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Update order successfully
      </div>
      <DashboardOderTable
        icon={faFileInvoice}
        title="Orders"
        color="orange"
        table={table}
        setOpenCreateFunc={props.setOpenCreateFunc}
        setCloseCreateFunc={props.setCloseCreateFunc}
        setOpenEditFunc={props.setOpenEditFunc}
        setCloseEditFunc={props.setCloseEditFunc}
        isChange={props.isChange}
      />
    </div>
  );
}
