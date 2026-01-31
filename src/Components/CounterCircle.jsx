import React from "react";

const CounterCircle = ({ count, progress, mode, size = 200 }) => {
  const STROKE = 12;
  const RADIUS = (size - STROKE) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const progressOffset =
    mode === "infinity" ? 0 : CIRCUMFERENCE - (progress / 100) * CIRCUMFERENCE;

  const banglaText = (num) => {
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .split("")
      .map((d) => banglaDigits[d] ?? d)
      .join("");
  };

  return (
    <div
      className="position-relative rounded-circle mx-auto"
      style={{ width: size, height: size, background: "rgba(0, 0, 0, 0.42)" }}
    >
      <svg width={size} height={size}>
        {/* background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="#ddd"
          strokeWidth={STROKE}
          fill="none"
        />

        {/* progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={RADIUS}
          stroke="#198754"
          strokeWidth={STROKE}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>

      <h1
        className="position-absolute top-50 start-50 translate-middle text-white"
        style={{ pointerEvents: "none", fontWeight: "bold", fontSize: "2.5rem" }}
      >
        {banglaText(count)}
      </h1>
    </div>
  );
};

export default CounterCircle;
