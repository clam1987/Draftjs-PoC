import React from "react";
import "./CandyColorButton.css";

const CandyColorButton = ({ title, title2 }) => {
    return (
        <>
          <button className="custom-btn btn-12"><span>{title2}</span><span>{title}</span></button>
        </>
    )
}

export default  CandyColorButton;