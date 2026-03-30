import React, { useState, useEffect } from "react";
import AdminMenu from "../../commponets/Layouts/AdminMenu";
import Layout from "./../../commponets/Layouts/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../../utils/api";
import SkeletonCard from "../../commponets/Layouts/SkeletonCard";
import StateMessage from "../../commponets/Feedback/StateMessage";
import { getErrorMessage } from "../../utils/error";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  //getall products
  const getAllProducts = async () => {
    setLoading(true);
    setPageError("");
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      const message = getErrorMessage(error, "Failed to load products");
      setPageError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products List</h1>
          {pageError ? (
            <StateMessage
              title="Could not load products"
              message={pageError}
              variant="danger"
              actionLabel="Retry"
              onAction={getAllProducts}
            />
          ) : null}
          <div className="d-flex flex-wrap">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                <div className="m-2" style={{ width: "18rem" }} key={index}>
                  <SkeletonCard />
                </div>
              ))
              : products?.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={buildApiUrl(`/api/v1/product/product-image/${p._id}`)}
                    className="card-img-top"
                    alt={p.name}
                    style={{ width: "100%", height:"200px" }}/>
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
