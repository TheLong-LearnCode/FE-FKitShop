import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="loading-overlay">
    <div className="loading-content">
      <div className="hourglass"></div>
      {/* <p>Loading</p> */}
    </div>
  </div>
);

export default Loading;
