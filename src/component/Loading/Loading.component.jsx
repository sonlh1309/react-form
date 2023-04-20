import React from "react";
import ReactLoading from "react-loading";
import "./Loading.component.css";

export default function Loading(props) {
  return (
    <div className="loading">
      <ReactLoading
        type={"spinningBubbles"}
        color={props.color || "#00BFFF"}
        height={50}
        width={50}
      />
    </div>
  );
}
