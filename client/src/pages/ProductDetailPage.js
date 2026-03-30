import React, { useEffect, useState } from "react";
import Layout from "../commponets/Layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import ProductDetailSkeleton from "../commponets/Feedback/ProductDetailSkeleton";
import StateMessage from "../commponets/Feedback/StateMessage";
import { buildApiUrl } from "../utils/api";
import { getErrorMessage } from "../utils/error";

const ProductDetailPage = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");
  const availableSizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    const fetchProductAndImage = async () => {
      setLoading(true);
      setPageError("");
      try {
        const response = await axios.get(`/api/v1/product/get-product/${slug}`);
        const productData = response.data.product;
        setProduct(productData);
      } catch (error) {
        const message = getErrorMessage(error, "Error fetching product details");
        setPageError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndImage();
  }, [slug]);

  if (loading) {
    return (
      <Layout title="Loading Product">
        <ProductDetailSkeleton />
      </Layout>
    );
  }

  if (pageError || !product) {
    return (
      <Layout title="Product Unavailable">
        <div className="container py-5">
          <StateMessage
            title="Product unavailable"
            message={pageError || "We could not load this product right now."}
            variant="danger"
          />
        </div>
      </Layout>
    );
  }

  const rating = product.rating || 4.3;
  const stock = product.quantity > 0 ? "In Stock" : "Out of Stock";
  const deliveryEstimate = "3 - 5 business days";

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    const productToAdd = { ...product, selectedSize };
    setCart([...cart, productToAdd]);
    localStorage.setItem("cart", JSON.stringify([...cart, productToAdd]));
    toast.success("Item added to cart");
  };

  return (
    <Layout title={product.name}>
      <div className="container py-5">
        <div className="row g-4 align-items-start">
          <div className="col-md-6">
            <div className="card shadow-sm border-0">
              <img
                src={buildApiUrl(`/api/v1/product/product-image/${product._id}`)}
                alt={product.name}
                className="img-fluid rounded"
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-4 shadow-sm border-0">
              <h2 className="mb-3">{product.name}</h2>

              <div className="mb-2">
                <span className="text-warning me-2">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-star ${i < Math.round(rating) ? "fas" : "far"}`}
                    ></i>
                  ))}
                </span>
                <small className="text-muted">({rating} / 5)</small>
              </div>

              <p className="text-muted">{product.description}</p>
              <p className="text-success fw-semibold mb-2">{product.offerings}</p>
              <h4 className="text-primary mb-3">₹{product.price}</h4>
              <p className={product.quantity > 0 ? "text-success" : "text-danger"}>
                {stock}
              </p>

              <p>
                <i className="fas fa-truck text-secondary me-2"></i>
                <span className="text-muted">Delivery in {deliveryEstimate}</span>
              </p>

              <div className="mb-3">
                <h6 className="mb-2">Select Size:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      className={`btn btn-outline-secondary ${
                        selectedSize === size ? "active fw-bold" : ""
                      }`}
                      onClick={() => setSelectedSize(size)}
                      disabled={product.quantity <= 0}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {selectedSize && (
                  <small className="text-success d-block mt-2">
                    Selected Size: <strong>{selectedSize}</strong>
                  </small>
                )}
              </div>

              <button
                className="btn btn-primary mt-3 w-100 py-2"
                onClick={handleAddToCart}
                disabled={product.quantity <= 0}
              >
                <i className="fas fa-shopping-cart me-2"></i>
                {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
