import Layout from "../commponets/Layouts/Layout";

function About() {
    return (
        <>
            <Layout title='E-Commerce About Us'>
                <section className="bg-grey py-5 px-3 text-center">
                    <div className="container">
                        <h2 className="h3 fw-bold text-dark mb-4">About Us</h2>
                        <p className="h5 text-dark mb-4">
                            Welcome to <span className="fw-semibold">E-commerce</span>, your one-stop destination for everything you need!
                            We are committed to bringing you a seamless shopping experience with a vast collection of products ranging from
                            electronics, fashion, home essentials, beauty, and more—all at unbeatable prices.
                        </p>
                        <p className="h5 text-dark mb-4">
                            At <span className="fw-semibold">E-commerce Site</span>, we believe in quality, affordability, and convenience.
                            With a user-friendly interface, secure payment options, and swift delivery services, we ensure that shopping is
                            not just a task but a delightful experience.
                        </p>
                        <ul className="h5 text-dark mb-4 list-unstyled text-start">
                            <li><strong>Wide Selection:</strong> Thousands of products across multiple categories.</li>
                            <li><strong>Best Prices:</strong> Competitive pricing and exclusive deals.</li>
                            <li><strong>Fast & Secure Delivery:</strong> Reliable shipping to your doorstep.</li>
                            <li><strong>Easy Returns & Support:</strong> Hassle-free returns and 24/7 customer assistance.</li>
                        </ul>
                        <a
                            href="#"
                            className="btn btn-primary btn-lg px-4 py-2 rounded-3"
                        >
                            Shop Now
                        </a>
                    </div>
                </section>
            </Layout>
        </>
    );
}

export default About;
