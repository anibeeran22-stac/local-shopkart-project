
import { Link } from "react-router-dom";
import "./ProductCard.css";

const BACKEND_URL = "http://localhost:8080";

function getImageUrl(imageUrl) {
    if (!imageUrl) {
        return "https://placehold.co/300x220?text=No+Image";
    }

    if (/^https?:\/\//i.test(imageUrl)) {
        return imageUrl;
    }

    return `${BACKEND_URL}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
}

export default function ProductCard({
    product,
    user,
    onDelete
}) {

    return (
        <div className="product-card">

            <div className="product-image">
                <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name || "Product"}
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://placehold.co/300x220?text=No+Image";
                    }}
                />
            </div>

            <div className="product-content">

                <h3 className="product-title">
                    {product.name}
                </h3>

                <p className="product-description">
                    {product.description}
                </p>

                <h2 className="product-price">
                    ₹ {product.price}
                </h2>

                <div className="product-buttons">

                    <Link to={`/products/${product.id}`}>
                        <button className="view-btn">
                            View Details
                        </button>
                    </Link>

                    {user?.role === "ADMIN" && (
                        <>
                            <Link to={`/admin/edit-product/${product.id}`}>
                                <button className="edit-btn">
                                    Edit
                                </button>
                            </Link>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(product.id)}
                            >
                                Delete
                            </button>
                        </>
                    )}

                </div>

            </div>

        </div>
    );
}
