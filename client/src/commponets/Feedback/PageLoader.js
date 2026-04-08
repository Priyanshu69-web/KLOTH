import React from "react";

const PageLoader = ({ message = "Loading..." }) => {
  return (
    <div className="state-card state-card--centered" role="status" aria-live="polite">
      <div className="loader-shimmer loader-shimmer--hero" aria-hidden="true" />
      <div className="loader-copy">
        <div className="loader-shimmer loader-shimmer--line loader-shimmer--title" aria-hidden="true" />
        <div className="loader-shimmer loader-shimmer--line" aria-hidden="true" />
      </div>
      <p className="mb-0 text-muted fw-medium">{message}</p>
    </div>
  );
};

export default PageLoader;
