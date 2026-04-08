import React from "react";

const StateMessage = ({
  title,
  message,
  variant = "info",
  actionLabel,
  onAction,
}) => {
  const className = `alert alert-${variant} state-card`;

  return (
    <div className={className} role="alert">
      {title ? <h5 className="mb-2 fw-semibold">{title}</h5> : null}
      <p className="mb-0 state-card__message">{message}</p>
      {actionLabel && onAction ? (
        <button className="btn btn-outline-dark btn-sm mt-3 px-3" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
};

export default StateMessage;
