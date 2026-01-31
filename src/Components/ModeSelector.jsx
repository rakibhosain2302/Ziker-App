import React, { useState, useRef, useEffect } from "react";
import { TiInfinityOutline } from "react-icons/ti";
import { IoMdArrowDropdown } from "react-icons/io";
import { SiImagedotsc } from "react-icons/si";


const ModeSelector = ({ mode, onChange, changeBg }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const options = [
    { value: 33, label: "৩৩" },
    { value: 99, label: "৯৯" },
    { value: "infinity", label: <TiInfinityOutline size={20} /> }, // শুধু ∞ icon বড়
  ];

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Selected label
  const selectedLabel = options.find(
    (opt) => String(opt.value) === String(mode),
  )?.label;

  // ✅ Handle option click properly
  const handleSelect = (value) => {
    onChange(value); // directly pass value
    setOpen(false);
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between my-3"
      ref={dropdownRef}
      style={{ width: "100px", margin: "0 auto", gap: "10px" }}
    >
      {/* Dropdown */}
      <div className="position-relative" style={{  }}>
        {/* Selected item */}
        <div
          className="border rounded p-1 d-flex bg-white justify-content-between align-items-center"
          style={{ cursor: "pointer", width: "55px"}}
          onClick={() => setOpen(!open)}
        >
          <span className="text-success fs-5 btn-sm fw-bold">{selectedLabel}</span>
          <IoMdArrowDropdown size={20} />
        </div>

        {/* Options */}
        {open && (
          <div
            className="position-absolute border rounded mt-1 bg-white"
            style={{ zIndex: 100, width: "55px" }}
          >
            {options.map((opt) => (
              <div
                key={opt.value}
                className="p-2 d-flex justify-content-center align-items-center fs-5 fw-bold text-success hover-bg"
                style={{ cursor: "pointer" }}
                onClick={() => handleSelect(opt.value)}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Change BG Button */}
      <span
        className="border p-1 rounded bg-white btn-sm text-success"
        onClick={changeBg}
        style={{ whiteSpace: "nowrap", cursor: "pointer"}}
      >
        <SiImagedotsc size={30} />
      </span>
    </div>
  );
};

export default ModeSelector;
