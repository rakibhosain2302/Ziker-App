import React from "react";
import {
  MdKeyboardDoubleArrowRight as FaArrowRight,
  MdKeyboardDoubleArrowLeft as FaArrowLeft,
} from "react-icons/md";

const DouaSlider = ({
  currentDoua,
  nextDoua,
  prevDoua,
  index,
  total,
  mode,
  progress,
}) => {
  const toBanglaNumber = (num) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((d) => banglaDigits[d] ?? d)
      .join("");
  };

  return (
    <div className="my-3 text-center p-2">
      <h3 className="text-white">{currentDoua.arabic}</h3>
      <h5 className="text-white mt-4">{currentDoua.bangla}</h5>

      {/* Arrow Buttons */}
      <div className="d-flex justify-content-center justify-content-between mt-5">
        <button
          className="btn btn-outline-success text-white btn-sm"
          onClick={prevDoua}
          aria-label="Previous Doua"
        >
          <FaArrowLeft size={26} />
        </button>
        <div>
          <small className="d-block mt-2 text-white">
            দু‘আ {toBanglaNumber(index + 1)}/{toBanglaNumber(total)}
          </small>

          <small className="text-white mt-2 d-block">
            ধরন: {mode === "infinity" ? "অসীম" : toBanglaNumber(mode)} |
            অগ্রগতি: {toBanglaNumber(progress.toFixed(0))}%
          </small>
        </div>

        <button
          className="btn btn-outline-success text-white btn-sm"
          onClick={nextDoua}
          aria-label="Next Doua"
        >
          <FaArrowRight size={26} />
        </button>
      </div>
    </div>
  );
};

export default DouaSlider;
