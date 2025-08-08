import React, { useEffect, useState } from 'react';
import { aboutMe } from '../../data/AboutMe';
import './About.css';

const ImageMotion = () => {
  const outerRadius = 330;
  const innerRadius = 130;
  const totalImages = aboutMe.image.length;
  const innerCount = 3;
  const outerCount = totalImages - innerCount;

  const [outerAngle, setOuterAngle] = useState(0);
  const [innerAngle, setInnerAngle] = useState(0);

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
    <div className="circle-wrapper">
      <div className="circle-layer outer">
        {aboutMe.image.slice(0, outerCount).map((img, index) => {
          const angle = outerAngle + (index / outerCount) * 2 * Math.PI;
          const x = Math.cos(angle) * outerRadius;
          const y = Math.sin(angle) * outerRadius;

          return (
            <div
              key={img.id}
              className="circle-image"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
            >
              <img src={img.src} alt={img.alt} />
            </div>
          );
        })}
      </div>

      <div className="circle-layer inner">
        {aboutMe.image.slice(outerCount).map((img, index) => {
          const angle = innerAngle + (index / innerCount) * 2 * Math.PI;
          const x = Math.cos(angle) * innerRadius;
          const y = Math.sin(angle) * innerRadius;

          return (
            <div
              key={img.id}
              className="circle-image"
              style={{
                transform: `translate(${x}px, ${y}px)`
              }}
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