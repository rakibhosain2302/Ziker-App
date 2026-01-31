import React, { useState, useEffect } from "react";
import { MODES } from "../constants/modes";
import { DOUA_LIST } from "../constants/duas.jsx";
import { BG_IMAGES } from "../constants/theme.jsx";

import CounterCircle from "../Components/CounterCircle";
import ModeSelector from "../Components/ModeSelector";
import DouaSlider from "../Components/DouaSlider";
import ButtonsPanel from "../Components/ButtonsPanel";

const TasbihCounter = () => {
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState(MODES.THIRTY_THREE);
  const [bgIndex, setBgIndex] = useState(0);
  const [douaIndex, setDouaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const size = 180;

  const RADIUS = 70;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  // 🔁 Load from localStorage
  // Load from localStorage on mount
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // "2026-01-30"
    const savedDate = localStorage.getItem("tasbih_date");
    const savedCount = localStorage.getItem("tasbih_count");
    const savedMode = localStorage.getItem("tasbih_mode");
    const savedDoua = localStorage.getItem("tasbih_doua");

    if (savedDate === today && savedCount !== null) {
      setCount(Number(savedCount));
      if (savedMode)
        setMode(savedMode === "infinity" ? "infinity" : Number(savedMode));
      if (savedDoua) setDouaIndex(Number(savedDoua));
    } else {
      localStorage.setItem("tasbih_date", today);
      setCount(0);
    }
  }, []);

  // 💾 Save to localStorage
  // Save to localStorage whenever count, mode, or dua changes
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem("tasbih_date", today);
    localStorage.setItem("tasbih_count", count);
    localStorage.setItem("tasbih_mode", mode);
    localStorage.setItem("tasbih_doua", douaIndex);
  }, [count, mode, douaIndex]);

  // ➕ Increment counter & animate progress
  const handleIncrement = () => {
    if (mode !== "infinity" && count >= mode) return;

    const newCount = count + 1;
    setCount(newCount);

    const targetProgress = mode === "infinity" ? 100 : (newCount / mode) * 100;
    let current = progress;

    const step = () => {
      current += 1;
      if (current >= targetProgress) {
        setProgress(targetProgress);
        return;
      }
      setProgress(current);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const handleModeChange = (value) => {
    setMode(value);
    setCount(0);
    setProgress(0);
  };

  const prevDoua = () => {
    setDouaIndex((prev) => (prev - 1 + DOUA_LIST.length) % DOUA_LIST.length);
    setCount(0);
    setProgress(0);
  };

  const nextDoua = () => {
    setDouaIndex((prev) => (prev + 1) % DOUA_LIST.length);
    setCount(0);
    setProgress(0);
  };

  const changeBg = () => {
    setBgIndex((prev) => (prev + 1) % BG_IMAGES.length);
  };

  const currentDoua = DOUA_LIST[douaIndex];
  const progressColor = "#198754";

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center">
      <div className="position-relative w-100">
        <div className="bg-image"
          style={{
            backgroundImage: `url(${BG_IMAGES[bgIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "contain",
            transition: "background 0.5s ease-in-out",
          }}
        >
          <div
            className="shadow h-100 border-0 image-overlay"
          >
            <div className="card-body text-center">
              <h2 className="fw-bold mb-3 text-white fs-1 pt-4">
                {currentDoua.title}
              </h2>

              {/* Counter Circle */}
              <CounterCircle
                count={count}
                progress={progress}
                mode={mode}
                color={progressColor}
                size={size}
              />

              {/* Doua Slider */}
              <DouaSlider
                currentDoua={currentDoua}
                nextDoua={nextDoua}
                prevDoua={prevDoua}
                index={douaIndex}
                mode={mode}
                progress={progress}
                total={DOUA_LIST.length}
              />

              {/* Mode Dropdown */}
              <ModeSelector
                mode={mode}
                onChange={handleModeChange}
                changeBg={changeBg}
              />

              {/* Buttons Panel */}
              <ButtonsPanel handleIncrement={handleIncrement} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasbihCounter;
