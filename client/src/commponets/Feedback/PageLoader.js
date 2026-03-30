import React from "react";

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="state-card state-card--centered" role="status" aria-live="polite">
      <div className="spinner-border text-primary mb-3" role="status">
        <span className="visually-hidden">{message}</span>
      </div>
      <p className="mb-0 text-muted">{message}</p>
    </div>
  );
};

export default PageLoader;
