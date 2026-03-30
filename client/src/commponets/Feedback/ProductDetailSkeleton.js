import React from "react";
import "../../styles/Skeleton.css";

const ProductDetailSkeleton = () => {
  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-3">
            <div className="skeleton skeleton-detail-image" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm border-0 p-4">
            <div className="skeleton skeleton-detail-title mb-3" />
            <div className="skeleton skeleton-detail-line mb-2" />
            <div className="skeleton skeleton-detail-line mb-2" />
            <div className="skeleton skeleton-detail-line mb-4" />
            <div className="skeleton skeleton-detail-price mb-4" />
            <div className="d-flex gap-2 mb-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="skeleton skeleton-chip" />
              ))}
            </div>
            <div className="skeleton skeleton-cta" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
