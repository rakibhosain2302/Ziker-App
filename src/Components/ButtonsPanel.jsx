import React from "react";
import { BsPatchPlusFill } from "react-icons/bs";


const ButtonsPanel = ({ handleIncrement }) => {
  return (
    <div className="mt-4 d-flex justify-content-center">
      <div className="orbit-wrapper" onClick={handleIncrement} style={{ cursor: "pointer", marginBottom: "40px"}}>
        {/* rotating rings */}
        <span className="orbit orbit-1"></span>
        <span className="orbit orbit-2"></span>
        <span className="orbit orbit-3"></span>

        {/* main button */}
        <button
          className="btn btn-success rounded-circle main-btn"
        >
          <BsPatchPlusFill size={50} />
        </button>
      </div>
    </div>
  );
};

export default ButtonsPanel;
