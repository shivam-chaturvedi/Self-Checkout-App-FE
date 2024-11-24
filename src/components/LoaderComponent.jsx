import React from "react";

const LoaderComponent = () => {
  return (
    /* From Uiverse.io by mobinkakei */
    <div className="loader-wrapper z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent">
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
      <div className="loader-circle"></div>
      <div className="loader-shadow"></div>
      <div className="loader-shadow"></div>
      <div className="loader-shadow"></div>
    </div>
  );
};

export default LoaderComponent;

