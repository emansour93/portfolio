import { useState } from "react";

export default function BeforeAfterSlider({ before, after }) {
  const [position, setPosition] = useState(50);

  return (
    <div className="ba-slider">
      <img src={before} alt="Before" />
      <div className="after-image" style={{ width: `${position}%` }}>
        <img src={after} alt="After" />
      </div>

      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        className="slider"
      />
    </div>
  );
}
