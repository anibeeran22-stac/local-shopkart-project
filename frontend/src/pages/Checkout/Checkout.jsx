import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";

import { createOrder } from "../../services/orderService";

import "./Checkout.css";

export default function Checkout() {

    const navigate = useNavigate();

    const { cartItems, clearCart } = useContext(CartContext);

    const { user } = useContext(AuthContext);

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [placingOrder, setPlacingOrder] = useState(false);

    const [formData, setFormData] = useState({
        fullName: user?.firstName || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });


    const deliveryCharge = cartItems.length > 0 ? 99 : 0;

    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price) * Number(item.quantity),
        0
    );

    const discount = subtotal > 5000 ? 500 : 0;

    const grandTotal =
        subtotal + deliveryCharge - discount;


    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    }


    async function handlePlaceOrder(e) {

        e.preventDefault();

        if (!user) {

            alert("Please login to continue");

            navigate("/login");

            return;

        }


        if (
            !formData.fullName.trim() ||
            !formData.phone.trim() ||
            !formData.address.trim() ||
            !formData.city.trim() ||
            !formData.state.trim() ||
            !formData.pincode.trim()
        ) {

            alert("Please fill all delivery details");

            return;

        }


        if (cartItems.length === 0) {

            alert("Your cart is empty");

            navigate("/products");

            return;

        }


        if (formData.pincode.length !== 6) {

            alert("Please enter a valid 6 digit pincode");

            return;

        }


        if (formData.phone.length < 10) {

            alert("Please enter a valid phone number");

            return;

        }


        const orderData = {

            userId: user.id,

            paymentMethod: paymentMethod,

            address:
                `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,

            phone: formData.phone,

            items: cartItems.map((item) => ({

                productId: item.id,

                quantity: item.quantity

            }))

        };


        console.log("Order Request:");
        console.log(orderData);


        try {

            setPlacingOrder(true);

            const response = await createOrder(orderData);

            console.log("Order Response:");
            console.log(response.data);


            clearCart();


            navigate("/order-success", {

                state: {

                    order: response.data

                }

            });


        } catch (error) {

            console.error("Order creation failed:", error);

            console.error(
                "Backend response:",
                error.response?.data
            );


            const backendMessage =
                error.response?.data?.message ||
                "Failed to place order";

            alert(backendMessage);


        } finally {

            setPlacingOrder(false);

        }

    }


    if (cartItems.length === 0) {

        return (

            <div className="checkout-empty">

                <div className="checkout-empty-card">

                    <div className="empty-icon">
                        🛒
                    </div>

                    <h2>
                        Your Cart is Empty
                    </h2>

                    <p>
                        Add some products before checkout.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                    >
                        Continue Shopping
                    </button>

                </div>

            </div>

        );

    }


    return (

        <div className="checkout-page">

            <h1 className="checkout-title">
                Checkout
            </h1>

            <p className="checkout-subtitle">
                Complete your details to place your order
            </p>


            <div className="checkout-layout">


                {/* =========================
                    LEFT SIDE
                ========================== */}

                <div className="checkout-form-card">


                    {/* DELIVERY */}

                    <div className="checkout-section-title">

                        <div className="step-number">
                            01
                        </div>

                        <div>

                            <h2>
                                Delivery Details
                            </h2>

                            <p>
                                Where should we deliver your order?
                            </p>

                        </div>

                    </div>


                    <form onSubmit={handlePlaceOrder}>


                        <div className="form-row">


                            <div className="input-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                />

                            </div>


                            <div className="input-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    maxLength="10"
                                    required
                                />

                            </div>


                        </div>


                        <div className="input-group">

                            <label>
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                            />

                        </div>


                        <div className="input-group">

                            <label>
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="House number, street, area..."
                                required
                            />

                        </div>


                        <div className="form-row">


                            <div className="input-group">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    required
                                />

                            </div>


                            <div className="input-group">

                                <label>
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="Enter state"
                                    required
                                />

                            </div>


                        </div>


                        <div className="input-group">

                            <label>
                                Pincode
                            </label>

                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Enter 6 digit pincode"
                                maxLength="6"
                                required
                            />

                        </div>


                        {/* =========================
                            PAYMENT
                        ========================== */}

                        <div className="checkout-section-title payment-title">

                            <div className="step-number">
                                02
                            </div>

                            <div>

                                <h2>
                                    Payment Method
                                </h2>

                                <p>
                                    Select your preferred payment option
                                </p>

                            </div>

                        </div>


                        <div className="payment-options">


                            <label
                                className={
                                    paymentMethod === "COD"
                                        ? "payment-option active"
                                        : "payment-option"
                                }
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="COD"
                                    checked={
                                        paymentMethod === "COD"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <div className="payment-info">

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <span>
                                        Pay when your order arrives
                                    </span>

                                </div>

                            </label>


                            <label
                                className={
                                    paymentMethod === "UPI"
                                        ? "payment-option active"
                                        : "payment-option"
                                }
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="UPI"
                                    checked={
                                        paymentMethod === "UPI"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <div className="payment-info">

                                    <strong>
                                        UPI
                                    </strong>

                                    <span>
                                        Google Pay, PhonePe, Paytm
                                    </span>

                                </div>

                            </label>


                            <label
                                className={
                                    paymentMethod === "CARD"
                                        ? "payment-option active"
                                        : "payment-option"
                                }
                            >

                                <input
                                    type="radio"
                                    name="payment"
                                    value="CARD"
                                    checked={
                                        paymentMethod === "CARD"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                <div className="payment-info">

                                    <strong>
                                        Credit / Debit Card
                                    </strong>

                                    <span>
                                        Secure card payment
                                    </span>

                                </div>

                            </label>


                        </div>


                        <button
                            type="submit"
                            className="place-order-btn"
                            disabled={placingOrder}
                        >

                            {placingOrder
                                ? "Placing Order..."
                                : "Place Order"
                            }

                        </button>


                    </form>

                </div>


                {/* =========================
                    RIGHT SIDE
                ========================== */}

                <div className="checkout-summary">


                    <h2>
                        Order Summary
                    </h2>


                    <div className="checkout-products">


                        {cartItems.map((item) => (

                            <div
                                className="checkout-product"
                                key={item.id}
                            >


                                <div className="checkout-product-image">

                                    <img
                                        src={`http://localhost:8080/images/${item.imageUrl}`}
                                        alt={item.name}
                                        onError={(e) => {

                                            e.target.src =
                                                "https://placehold.co/100x100";

                                        }}
                                    />

                                </div>


                                <div className="checkout-product-info">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        Qty: {item.quantity}
                                    </p>

                                </div>


                                <strong>

                                    ₹ {
                                        (
                                            Number(item.price) *
                                            Number(item.quantity)
                                        ).toLocaleString("en-IN")
                                    }

                                </strong>


                            </div>

                        ))}


                    </div>


                    {/* PRICE DETAILS */}

                    <div className="summary-line">

                        <span>
                            Subtotal
                        </span>

                        <span>

                            ₹ {
                                subtotal.toLocaleString("en-IN")
                            }

                        </span>

                    </div>


                    <div className="summary-line">

                        <span>
                            Delivery
                        </span>

                        <span>

                            ₹ {
                                deliveryCharge.toLocaleString("en-IN")
                            }

                        </span>

                    </div>


                    <div className="summary-line discount-line">

                        <span>
                            Discount
                        </span>

                        <span>

                            - ₹ {
                                discount.toLocaleString("en-IN")
                            }

                        </span>

                    </div>


                    <div className="summary-divider"></div>


                    <div className="summary-grand-total">

                        <span>
                            Grand Total
                        </span>

                        <span>

                            ₹ {
                                grandTotal.toLocaleString("en-IN")
                            }

                        </span>

                    </div>


                    <div className="secure-note">

                        🔒 Secure & protected checkout

                    </div>


                </div>

            </div>

        </div>

    );

}