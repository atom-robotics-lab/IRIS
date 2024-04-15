import React, { useEffect, useRef } from 'react';

const WebcamStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const constraints = { video: true };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        // Attach the stream to the video element
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error('Error accessing the webcam:', error);
      });

    return () => {
      // Stop the video stream when the component unmounts
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach(track => {
          track.stop();
        });
      }
    };
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'vh', background: 'black' }}>
      <div>
        <video ref={videoRef} autoPlay playsInline />
      </div>
    </div>
  );
};

export default WebcamStream;
