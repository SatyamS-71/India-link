import React from "react";

function Loader() {
  return (
    <div className="loader-parent">
      <div
        className="spinner-grow"
        style={{width: '3rem', height: '3rem' , BackgroundColor: 'white'}}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
