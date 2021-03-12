import { faCheckCircle, faPager } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import DashboardNewsTable from "./DashboardNewsTable";
import "../../../../Styles/Toast.css";

export default function DashboardNews(props) {
  const table = ["Title", "Category", "Date", "Views", "Action"];

  return (
    <div className="dashboard-product">
      <div
        className={props.toast ? "toast toast-show" : "toast"}
        style={{ top: "20px" }}
      >
        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
        Update products successfully
      </div>
      <DashboardNewsTable
        icon={faPager}
        title="News"
        color="green"
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
