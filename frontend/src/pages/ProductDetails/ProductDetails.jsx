
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

import {
    getProductById,
    getAllProducts
} from "../../services/productService";

import "./ProductDetails.css";

const BACKEND_URL = "http://localhost:8080";

// Convert backend image path into a complete URL
function getImageUrl(imageUrl) {

    if (!imageUrl) {
        return "https://placehold.co/500x500?text=No+Image";
    }

    if (/^https?:\/\//i.test(imageUrl)) {
        return imageUrl;
    }

    // If only filename is stored
    if (!imageUrl.startsWith("/")) {
        imageUrl = `/images/${imageUrl}`;
    }

    return `${BACKEND_URL}${imageUrl}`;
}

export default function ProductDetails() {

    const navigate = useNavigate();

    const { id } = useParams();

    const { user } = useContext(AuthContext);

    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProduct();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, [id]);

    async function loadProduct() {

        setLoading(true);

        try {

            const response = await getProductById(id);

            setProduct(response.data);

            const allProducts = await getAllProducts();

            const related = allProducts.data.filter(

                item =>
                    item.categoryId === response.data.categoryId &&
                    item.id !== response.data.id

            );

            setRelatedProducts(related);

        } catch (error) {

            console.error("Product loading failed:", error);

        } finally {

            setLoading(false);

        }
    }

    function increaseQuantity() {

        setQuantity(prev => prev + 1);

    }

    function decreaseQuantity() {

        if (quantity > 1) {

            setQuantity(prev => prev - 1);

        }

    }

    function handleAddToCart() {

        if (!user) {

            alert("Please Login");

            navigate("/login");

            return;

        }

        if (user.role === "ADMIN") {

            return;

        }

        addToCart({

            ...product,

            quantity

        });

        alert("Product Added Successfully");

    }

    function buyNow() {

        if (!user) {

            alert("Please Login");

            navigate("/login");

            return;

        }

        navigate("/Checkout");

    }

    if (loading) {

        return <h2 className="loading">Loading...</h2>;

    }

    if (!product) {

        return <h2 className="loading">Product Not Found</h2>;

    }

    return (

        <>

            <div className="product-details">

                {/* LEFT SIDE IMAGE */}

                <div className="product-details-image">

                    <div className="product-image-box">

                        <img
                            src={getImageUrl(product.imageUrl)}
                            alt={product.name || "Product"}
                            onError={(e) => {

                                console.error(
                                    "Product image failed:",
                                    e.currentTarget.src
                                );

                                e.currentTarget.src =
                                    "https://placehold.co/500x500?text=No+Image";

                            }}
                        />

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div className="product-info">

                    <span className="tag">
                        Premium Product
                    </span>

                    <h1>{product.name}</h1>

                    <div className="rating">
                        ⭐⭐⭐⭐⭐
                        <span> (4.8 Reviews)</span>
                    </div>

                    <p className="description">
                        {product.description}
                    </p>

                    <div className="price-box">

                        <h2>₹ {product.price}</h2>

                        <span className="old-price">
                            ₹ {Math.round(product.price * 1.2)}
                        </span>

                        <span className="offer">
                            20% OFF
                        </span>

                    </div>

                    <div className="features">

                        <p>✅ Premium Quality</p>

                        <p>🚚 Free Delivery</p>

                        <p>🔒 Secure Payment</p>

                        <p>↩️ 7 Days Return</p>

                    </div>

                    {/* Quantity */}

                    <div className="quantity-box">

                        <h3>Quantity</h3>

                        <div className="quantity-controls">

                            <button onClick={decreaseQuantity}>
                                -
                            </button>

                            <input
                                type="text"
                                value={quantity}
                                readOnly
                            />

                            <button onClick={increaseQuantity}>
                                +
                            </button>

                        </div>

                    </div>

                    {/* Buttons */}

                    <div className="action-buttons">

                        {(!user || user.role === "USER") && (

                            <>

                                <button
                                    className="cart-btn"
                                    onClick={handleAddToCart}
                                >
                                    Add To Cart
                                </button>

                                <button
                                    className="buy-btn"
                                    onClick={buyNow}
                                >
                                    Buy Now
                                </button>

                            </>

                        )}

                        {user && user.role === "ADMIN" && (

                            <div className="admin-buttons">

                                <Link to={`/admin/edit-product/${product.id}`}>

                                    <button className="edit-btn">
                                        Edit Product
                                    </button>

                                </Link>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        alert("Delete API Next")
                                    }
                                >
                                    Delete Product
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </div>

            {/* DESCRIPTION */}

            <div className="product-section">

                <h2>Product Description</h2>

                <p>{product.description}</p>

                <div className="specifications">

                    <div className="spec-item">

                        <span className="spec-title">
                            Product Name
                        </span>

                        <span className="spec-value">
                            {product.name}
                        </span>

                    </div>

                    <div className="spec-item">

                        <span className="spec-title">
                            Price
                        </span>

                        <span className="spec-value">
                            ₹ {product.price}
                        </span>

                    </div>

                    <div className="spec-item">

                        <span className="spec-title">
                            Stock
                        </span>

                        <span className="spec-value">
                            {product.stock}
                        </span>

                    </div>

                    <div className="spec-item">

                        <span className="spec-title">
                            Availability
                        </span>

                        <span className="spec-value">
                            {product.stock > 0
                                ? "In Stock"
                                : "Out Of Stock"}
                        </span>

                    </div>

                </div>

            </div>

            {/* RELATED PRODUCTS */}

            <div className="related-products">

                <h2>Related Products</h2>

                <div className="related-grid">

                    {relatedProducts.length > 0 ? (

                        relatedProducts.map((item) => (

                            <div
                                className="related-card"
                                key={item.id}
                            >

                                <div className="related-image">

                                    <img
                                        src={getImageUrl(item.imageUrl)}
                                        alt={item.name}
                                        onError={(e) => {

                                            e.currentTarget.src =
                                                "https://placehold.co/300x300";

                                        }}
                                    />

                                </div>

                                <div className="related-content">

                                    <h3>{item.name}</h3>

                                    <p>
                                        {item.description?.length > 70
                                            ? item.description.substring(0, 70) + "..."
                                            : item.description}
                                    </p>

                                    <div className="related-price">
                                        ₹ {item.price}
                                    </div>

                                    <button
                                        className="related-btn"
                                        onClick={() => {
                                            navigate(`/products/${item.id}`);
                                        }}
                                    >
                                        View Details
                                    </button>

                                </div>

                            </div>

                        ))

                    ) : (

                        <div className="empty-related">

                            <h3>
                                No Related Products Available
                            </h3>

                        </div>

                    )}

                </div>

            </div>

        </>

    );
}
