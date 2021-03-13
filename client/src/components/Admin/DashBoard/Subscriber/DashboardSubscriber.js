import { faCheckCircle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DashboardSubscriberTable from "./DashboardSubscriberTable";

export default function DashboardSubscriber(props) {
  const table = ["Email", "Sent", "Read", "Action"];

  return (
    <div className="dashboard-product">
      <div
        className={props.toast ? "toast toast-show" : "toast"}
        style={{ top: "20px" }}
      >
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Update subscriber successfully
      </div>
      <DashboardSubscriberTable
        icon={faEnvelope}
        title="Subscriber"
        color="lightblue"
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
