import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllProducts } from "../../services/productService";

import ProductCard from "../../components/ProductCard/ProductCard";

import "./Home.css";

export default function Home() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProducts();

    }, []);

    async function loadProducts() {

        try {

            const response = await getAllProducts();

            setProducts(response.data);

        } catch (error) {

            console.error("Failed to load products:", error);

        } finally {

            setLoading(false);

        }

    }

    /*
        Featured Products
        First 4 products
    */
    const featuredProducts = products.slice(0, 4);

    /*
        New Arrivals
        Last 4 products
    */
    const newArrivals = [...products]
        .reverse()
        .slice(0, 4);

    /*
        Best Sellers
        For beginner project, use first 4 products.
        Later backend-la sales count based on real logic add pannalaam.
    */
    const bestSellers = products.slice(0, 4);

    if (loading) {

        return (
            <div className="home-loading">
                Loading ShopKart...
            </div>
        );

    }

    return (

        <div className="home">

            {/* =========================
                WELCOME SECTION
            ========================== */}

            <section className="welcome-section">

                <div className="welcome-content">

                    <span className="welcome-tag">
                        Welcome to ShopKart
                    </span>

                    <h1>
                        Everything You Need,
                        <br />
                        All in One Place.
                    </h1>

                    <p>
                        Discover quality products, great prices,
                        and a seamless shopping experience.
                    </p>

                    <div className="welcome-actions">

                        <Link to="/products">
                            <button className="primary-btn">
                                Shop Now
                            </button>
                        </Link>

                        <Link to="/category">
                            <button className="secondary-btn">
                                Explore Categories
                            </button>
                        </Link>

                    </div>

                </div>

                <div className="welcome-side">

                    <div className="welcome-stat">

                        <strong>
                            100+
                        </strong>

                        <span>
                            Products
                        </span>

                    </div>

                    <div className="welcome-stat">

                        <strong>
                            24/7
                        </strong>

                        <span>
                            Shopping
                        </span>

                    </div>

                    <div className="welcome-stat">

                        <strong>
                            100%
                        </strong>

                        <span>
                            Secure
                        </span>

                    </div>

                </div>

            </section>


            {/* =========================
                FEATURED PRODUCTS
            ========================== */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <span className="section-label">
                            Featured
                        </span>

                        <h2>
                            Featured Products
                        </h2>

                    </div>

                    <Link to="/products">
                        View All
                    </Link>

                </div>

                <div className="home-product-grid">

                    {featuredProducts.length > 0 ? (

                        featuredProducts.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))

                    ) : (

                        <p className="empty-text">
                            No products available.
                        </p>

                    )}

                </div>

            </section>


            {/* =========================
                NEW ARRIVALS
            ========================== */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <span className="section-label">
                            Fresh Picks
                        </span>

                        <h2>
                            New Arrivals
                        </h2>

                    </div>

                    <Link to="/products">
                        View All
                    </Link>

                </div>

                <div className="home-product-grid">

                    {newArrivals.length > 0 ? (

                        newArrivals.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))

                    ) : (

                        <p className="empty-text">
                            No new products available.
                        </p>

                    )}

                </div>

            </section>


            {/* =========================
                BEST SELLERS
            ========================== */}

            <section className="home-section">

                <div className="section-heading">

                    <div>

                        <span className="section-label">
                            Most Loved
                        </span>

                        <h2>
                            Best Sellers
                        </h2>

                    </div>

                    <Link to="/products">
                        View All
                    </Link>

                </div>

                <div className="home-product-grid">

                    {bestSellers.length > 0 ? (

                        bestSellers.map((product) => (

                            <ProductCard
                                key={product.id}
                                product={product}
                            />

                        ))

                    ) : (

                        <p className="empty-text">
                            No best sellers available.
                        </p>

                    )}

                </div>

            </section>


            {/* =========================
                OFFER BANNER
            ========================== */}

            <section className="offer-section">

                <div>

                    <span>
                        LIMITED TIME OFFER
                    </span>

                    <h2>
                        Great Products.
                        <br />
                        Better Prices.
                    </h2>

                    <p>
                        Find your next favorite product
                        at a price you'll love.
                    </p>

                </div>

                <Link to="/products">

                    <button className="offer-btn">
                        Shop Deals
                    </button>

                </Link>

            </section>


            {/* =========================
                WHY SHOPKART
            ========================== */}

            <section className="why-section">

                <div className="section-heading centered">

                    <div>

                        <span className="section-label">
                            Why ShopKart
                        </span>

                        <h2>
                            Shopping Made Simple
                        </h2>

                    </div>

                </div>

                <div className="why-grid">

                    <div className="why-card">

                        <div className="why-icon">
                            ✓
                        </div>

                        <h3>
                            Quality Products
                        </h3>

                        <p>
                            Carefully selected products
                            with reliable quality.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            🚚
                        </div>

                        <h3>
                            Fast Delivery
                        </h3>

                        <p>
                            Simple and convenient
                            delivery experience.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            🔒
                        </div>

                        <h3>
                            Secure Shopping
                        </h3>

                        <p>
                            Your shopping experience
                            stays safe and simple.
                        </p>

                    </div>

                    <div className="why-card">

                        <div className="why-icon">
                            ↩
                        </div>

                        <h3>
                            Easy Returns
                        </h3>

                        <p>
                            Hassle-free return experience
                            for eligible products.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );

}