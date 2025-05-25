import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";

const Layout = ({
  children,
  title = "E-Commerce App",
  description = "Mern stack project",
  keywords = "E-Commerce, React, MongoDb, Node",
  author = "Abhijit",
}) => {
  return (
    <HelmetProvider>
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
        </Helmet>
        <Header />
        <main style={{ minHeight: "70vh" }}>
          <Toaster />
          {children}
        </main>
        <Footer />
      </>
    </HelmetProvider>
  );
};

export default Layout;
