import React, { useState, useEffect } from "react";
import Layout from "../../commponets/Layouts/Layout";
import AdminMenu from "../../commponets/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const CreateCarousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCarouselItems = async () => {
    try {
      const { data } = await axios.get("/api/v1/craousel");
      setCarouselItems(data);
    } catch (error) {
      console.error("Error fetching carousel items:", error);
      toast.error("Failed to fetch carousel items");
    }
  };

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const resetForm = () => {
    setImage(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Image is required");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      if (editingId) {
        // Update existing item
        await axios.put(`/api/v1/craousel/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Carousel item updated");
      } else {
        // Create new item
        await axios.post("/api/v1/craousel", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Carousel item created");
      }
      resetForm();
      fetchCarouselItems();
    } catch (error) {
      console.error("Error saving carousel item:", error);
      toast.error("Failed to save carousel item");
    }
    setLoading(false);
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setImage(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this carousel item?")) {
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`/api/v1/craousel/${id}`);
      toast.success("Carousel item deleted");
      fetchCarouselItems();
    } catch (error) {
      console.error("Error deleting carousel item:", error);
      toast.error("Failed to delete carousel item");
    }
    setLoading(false);
  };

  return (
    <Layout title="Admin - Manage Carousel">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Carousel Items</h1>
            <form onSubmit={handleSubmit} className="mb-4" encType="multipart/form-data">
              <div className="mb-3">
                <label className="form-label">Image *</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  required={!editingId}
                  disabled={loading}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {editingId ? "Update" : "Create"} Carousel Item
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={resetForm}
                  disabled={loading}
                >
                  Cancel
                </button>
              )}
            </form>

            <h2>Existing Carousel Items</h2>
            {carouselItems.length === 0 ? (
              <p>No carousel items found.</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {carouselItems.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`/api/v1/craousel/image/${item._id}`}
                          alt="carousel"
                          style={{ width: "150px", height: "auto" }}
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-info me-2"
                          onClick={() => handleEdit(item)}
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(item._id)}
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCarousel;
