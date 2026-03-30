import React, { useState, useEffect } from "react";
import Layout from "./../../commponets/Layouts/Layout";
import AdminMenu from "./../../commponets/Layouts/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../commponets/Feedback/PageLoader";
import StateMessage from "../../commponets/Feedback/StateMessage";
import { getErrorMessage } from "../../utils/error";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [offerings,setOfferings]= useState("")
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  

  //get all category
  const getAllCategory = async () => {
    setLoadingCategories(true);
    setPageError("");
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      const message = getErrorMessage(error, "Failed to load categories");
      setPageError(message);
      toast.error(message);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("offerings",offerings);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.error) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/product");
      }
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to create product"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            {pageError ? (
              <StateMessage
                title="Unable to load categories"
                message={pageError}
                variant="danger"
                actionLabel="Retry"
                onAction={getAllCategory}
              />
            ) : null}
            {loadingCategories ? <PageLoader message="Loading categories..." /> : null}
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    disabled={submitting}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={submitting}
                />
              </div>
               <div className="mb-3">
                <textarea
                  type="text"
                  value={offerings}
                  placeholder="Offerings"
                  className="form-control"
                  onChange={(e) => setOfferings(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="write a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                  disabled={submitting}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate} disabled={submitting || loadingCategories}>
                  {submitting ? "Creating..." : "CREATE PRODUCT"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
