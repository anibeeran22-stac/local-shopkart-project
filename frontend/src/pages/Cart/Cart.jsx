import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";

import { Link, useNavigate } from "react-router-dom";

import "./Cart.css";

export default function Cart() {

    const navigate = useNavigate();

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    } = useContext(CartContext);

    const deliveryCharge = cartItems.length > 0 ? 99 : 0;

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const discount = subtotal > 5000 ? 500 : 0;

    const grandTotal = subtotal + deliveryCharge - discount;

    if (cartItems.length === 0) {

        return (

            <div className="empty-cart">

                <h1>Your Cart is Empty 🛒</h1>

                <p>
                    Looks like you haven't added any products yet.
                </p>

                <Link to="/products">

                    <button>
                        Continue Shopping
                    </button>

                </Link>

            </div>

        );

    }

    return (

        <div className="cart-container">

            <h1 className="cart-title">
                Shopping Cart
            </h1>

            <div className="cart-wrapper">

                <div className="cart-items">

                    {cartItems.map((item) => (

                        <div
                            className="cart-card"
                            key={item.id}
                        >

                            <img
                                src={`http://localhost:8080/images/${item.imageUrl}`}
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/150";
                                }}
                            />

                            <div className="cart-info">

                                <h2>{item.name}</h2>

                                <p>{item.description}</p>

                                <h3>
                                    ₹ {item.price}
                                </h3>

                            </div>

                            <div className="quantity-box">

                                <button
                                    onClick={() =>
                                        decreaseQuantity(item.id)
                                    }
                                >
                                    -
                                </button>

                                <span>
                                    {item.quantity}
                                </span>

                                <button
                                    onClick={() =>
                                        increaseQuantity(item.id)
                                    }
                                >
                                    +
                                </button>

                            </div>

                            <div className="item-total">

                                ₹ {(item.price * item.quantity).toLocaleString("en-IN")}

                            </div>

                            <button
                                className="remove-btn"
                                onClick={() =>
                                    removeFromCart(item.id)
                                }
                            >
                                Remove
                            </button>

                        </div>

                    ))}

                </div>

                <div className="summary-card">

                    <h2>
                        Price Details
                    </h2>

                    <div className="summary-row">

                        <span>
                            Subtotal
                        </span>

                        <span>
                            ₹ {subtotal}
                        </span>

                    </div>

                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <span>
                            ₹ {deliveryCharge}
                        </span>

                    </div>

                    <div className="summary-row">

                        <span>
                            Discount
                        </span>

                        <span className="discount">

                            - ₹ {discount}

                        </span>

                    </div>

                    <hr />

                    <div className="summary-total">

                        <span>
                            Grand Total
                        </span>

                        <span>

                            ₹ {grandTotal}

                        </span>

                    </div>
                    <button
                        type="button"
                        className="checkout-btn"
                        onClick={() => navigate("/checkout")}
                    >
                        Proceed To Checkout
                    </button>

                </div>

            </div>

        </div>

    );

}