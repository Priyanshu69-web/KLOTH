import React from "react";

const CategoryForm = ({
  handleSubmit,
  value,
  setValue,
  loading = false,
  buttonLabel = "Submit",
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : buttonLabel}
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
