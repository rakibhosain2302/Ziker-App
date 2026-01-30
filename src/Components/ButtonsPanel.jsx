import React from "react";
import { FcPlus } from "react-icons/fc";

const ButtonsPanel = ({ handleIncrement }) => {
  return (
    <div className="mt-5 d-flex justify-content-center mb-5">
      <div className="orbit-wrapper" onClick={handleIncrement} style={{ cursor: "pointer" }}>
        {/* rotating rings */}
        <span className="orbit orbit-1"></span>
        <span className="orbit orbit-2"></span>
        <span className="orbit orbit-3"></span>

        {/* main button */}
        <button
          className="btn btn-success rounded-circle main-btn"
        >
          <FcPlus size={90} />
        </button>
      </div>
    </div>
  );
};

export default ButtonsPanel;
