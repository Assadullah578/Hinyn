import React from 'react';
import { CircleFadeLoader } from 'react-loaders-kit';
// import Typed from 'react-typed';

function Loader() {
  const loaderProps = {
    loading: true,
    size: 90,
    duration: 0.6,
    color: 'linear-gradient(to right, #FF5A5F,#A52226 )',
  };

  return (
    <div className="loader">
      <CircleFadeLoader {...loaderProps} />
      {/* <Typed
        className="loader-text"
        strings={['Loading...']}
        typeSpeed={60}
        backSpeed={0}
      /> */}
    </div>
  );
}

export default Loader;
