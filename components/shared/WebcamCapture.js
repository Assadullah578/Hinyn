import React from "react";
import Webcam from "react-webcam";

const videoConstraints = {
    width: 480,
    height: 320,
    facingMode: "user"
  };
  
export const WebcamCapture = () => (
    <Webcam
      audio={false}
      height={320}
      screenshotFormat="image/jpeg"
      width={480}
      videoConstraints={videoConstraints}
    >
      {({ getScreenshot }) => (
        <button
          onClick={() => {
            const imageSrc = getScreenshot()
          }}
        >
          Capture photo
        </button>
      )}
    </Webcam>
);