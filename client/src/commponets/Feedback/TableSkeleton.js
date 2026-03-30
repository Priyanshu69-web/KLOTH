import React from "react";
import "../../styles/Skeleton.css";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="card shadow-sm border-0 p-3">
      <div className="table-responsive">
        <table className="table align-middle mb-0">
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th key={index}>
                  <div className="skeleton skeleton-text skeleton-table-head" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: columns }).map((__, columnIndex) => (
                  <td key={columnIndex}>
                    <div className="skeleton skeleton-text mb-0" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableSkeleton;
