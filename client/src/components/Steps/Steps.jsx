import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import Sector from '../Desing/Sector';
import { stepsData } from '../../data/stepsData';
import './Steps.css';
import { useInView } from "react-intersection-observer";

const Steps = () => {
  const { ref, inView } = useInView({ threshold: 1, triggerOnce: true });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (inView) {
      setAnimate(true);
    }
  }, [inView]);

  return (
    <Element name="steps" className="main-mraz" >
      <Sector to="contacts" >
        <div className="block-steps">
          <div className="steps-container">
            <h2 ref={ref} className="steps-title">ЭТАПЫ РАБОТЫ</h2>
            {stepsData.map((step) => (
              <div
                key={step.id}
                className={`step-item ${inView ? "visible" : ""}`}
                style={{
                  top: step.top,
                  left: step.left,
                  animationDelay: `${step.delay}s`
                }}
              >
                <span className="step-description">
                  {step.description}
                </span>
              </div>
            ))}

            <svg
              className="animated-line"
              viewBox="0 0 1076 735"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={animate ? "path-animate" : "path-hidden"}
                d="M208.501 142C122 142 71.666 82.6736 159.001 45.5C256.5 4 979.841 -35.5001 969.001 74.4999C952.001 247 69.8841 97.922 129.5 257.5C149.025 309.762 281.578 307.455 354.5 293.5C422 280.583 402.501 200 189.501 224C47.5009 240 160.501 459 506.501 276C852.501 93 969.001 213 969.001 276C969.001 362.835 760.501 421.5 714.501 289C669.36 158.974 1016.41 149.5 1059 257.5C1143 470.5 832.684 444.863 776.001 503.5C718.001 563.5 833.614 667.862 1000.5 578C1104.5 522 913.255 350.457 638.5 460C409 551.5 333.27 435.023 405.5 396.5C465.5 364.5 685.858 363.666 670.501 503.5C658.431 613.413 379.5 544 280 503.5C180.5 463 51.9404 562.1 13.4999 472.5C-54.5003 314 221.5 325 292.5 396.5C363.5 468 383.299 491.2 370.5 578C354.5 686.5 117.18 746.535 79.9998 657C39.5126 559.5 271.5 529.5 332.5 617.5C380.032 686.071 163.001 789 60.4998 694"
                stroke="#56C7FF"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

      </Sector>
    </Element>
  );
};

export default Steps;
