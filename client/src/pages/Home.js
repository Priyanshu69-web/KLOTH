import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../commponets/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../commponets/Layouts/Layout";
import { AiOutlineReload } from "react-icons/ai";
import Slider from "react-slick";
import "../styles/Homepage.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [carouselItems, setCarouselItems] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCarouselItems = async () => {
    try {
      const { data } = await axios.get("/api/v1/craousel");
      setCarouselItems(data);
    } catch (error) {
      console.log("Error fetching carousel items:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
    getCarouselItems();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length && !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Layout title={"All Products - Best Offers"}>
      {carouselItems.length > 0 ? (
        <Slider {...carouselSettings} className="mb-4">
          {carouselItems.map((item, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={`/api/v1/craousel/image/${item._id}`}
                alt="carousel"
                className="banner-img img-fluid w-100"
              />
            </div>
          ))}
        </Slider>
      ) : (
        <img
          src="/images/banner.png"
          className="banner-img img-fluid w-100 mb-4"
          alt="bannerimage"
        />
      )}

      <div className="container-fluid row mt-3 home-page">
        <div className="d-md-none text-end mb-3">
          <button
            className="btn btn-outline-primary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <i className="fas fa-sliders-h"></i> Filters
          </button>
        </div>

        <div
          className={`col-md-3 filters p-4 shadow-sm bg-light rounded-4 mb-4 ${
            showFilters ? "d-block" : "d-none"
          } d-md-block`}
        >
          <h4 className="text-center text-primary mb-3">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories?.map((c, index) => (
              <Checkbox
                key={c._id || index}
                className="mb-2"
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          <h4 className="text-center text-primary mt-4 mb-3">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p, index) => (
                <div key={p._id || index} className="mb-2">
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div className="text-center mt-4">
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center mb-4 text-dark fw-bold display-6">
            Discover Our Products
          </h1>
          <div className="row g-4">
            {products?.map((p) => (
              <div
                className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center"
                key={p._id}
              >
                <div className="card h-100 w-100 border-0 shadow-sm rounded-4">
                  <img
                    src={`/api/v1/product/product-image/${p._id}`}
                    className="card-img-top img-fluid rounded-top"
                    alt={p.name}
                    loading="lazy"
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title text-primary fw-bold">{p.name}</h5>
                    <p className="card-text text-success fw-semibold fs-5">
                      ₹{p.price.toLocaleString("en-IN")}
                    </p>
                    <p className="text-muted small">
                      {p.description.substring(0, 50)}...
                    </p>
                    <div className="mt-auto d-flex flex-column gap-2">
                      <button
                        className="btn btn-outline-info"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to cart");
                        }}
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m-4 p-3 text-center">
            {products && products.length < total && (
              <button
                className="btn btn-outline-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                disabled={loading}
              >
                {loading ? (
                  "Loading ..."
                ) : (
                  <>
                    Load More <AiOutlineReload />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
