import React from "react";
import "../../styles/Skeleton.css";

const SkeletonCard = () => {
  return (
    <div className="card shadow product-card skeleton-card border-0">
      <div className="skeleton skeleton-img" />
      <div className="card-body text-center">
        <div className="skeleton skeleton-title mb-2" />
        <div className="skeleton skeleton-text mb-2" />
        <div className="skeleton skeleton-text mb-3" />
        <div className="skeleton skeleton-price mb-3" />
        <div className="d-flex justify-content-center gap-2">
          <div className="skeleton skeleton-btn" />
          <div className="skeleton skeleton-btn" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
