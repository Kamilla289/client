import React, { useEffect, useRef, useState } from "react";
import { aboutMe } from "../../data/AboutMe";
import "./About.css";

const ImageMotion = () => {
  const wrapperRef = useRef(null);
  const [outerAngle, setOuterAngle] = useState(0);
  const [innerAngle, setInnerAngle] = useState(0);

  const totalImages = aboutMe.image.length;
  const innerCount = 3;
  const outerCount = totalImages - innerCount;

  useEffect(() => {
    let angleOuter = 0;
    let angleInner = 0;

    const animate = () => {
      angleOuter += 0.003;
      angleInner -= 0.004;
      setOuterAngle(angleOuter);
      setInnerAngle(angleInner);
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div className="circle-wrapper" ref={wrapperRef}>
      <div className="circle-layer outer">
        {aboutMe.image.slice(0, outerCount).map((img, index) => {
          const angle = outerAngle + (index / outerCount) * 2 * Math.PI;
          const x = 50 + Math.cos(angle) * 41; // 50% центр, 41% радиус
          const y = 50 + Math.sin(angle) * 41;

          return (
            <div
              key={img.id}
              className="circle-image"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          );
        })}
      </div>

      <div className="circle-layer inner">
        {aboutMe.image.slice(outerCount).map((img, index) => {
          const angle = innerAngle + (index / innerCount) * 2 * Math.PI;
          const x = 50 + Math.cos(angle) * 16;
          const y = 50 + Math.sin(angle) * 16;

          return (
            <div
              key={img.id}
              className="circle-image"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageMotion;