import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { getOrderById } from "../../services/orderService";

import "./OrderDetails.css";

export default function OrderDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        loadOrder();

    }, [id]);


    async function loadOrder() {

        try {

            setLoading(true);

            setError("");

            const response =
                await getOrderById(id);

            const data = response.data;

            // USER can only view their own order
            if (
                user?.role === "USER" &&
                Number(data.userId) !== Number(user.id)
            ) {

                setError(
                    "You are not allowed to view this order."
                );

                return;
            }

            setOrder(data);

        } catch (error) {

            console.error(
                "Failed to load order:",
                error
            );

            setError(
                "Unable to load order details."
            );

        } finally {

            setLoading(false);

        }

    }


    function formatDate(date) {

        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );

    }


    function getStatusClass(status) {

        switch (status?.toUpperCase()) {

            case "DELIVERED":
                return "order-status delivered";

            case "SHIPPED":
                return "order-status shipped";

            case "CONFIRMED":
                return "order-status confirmed";

            case "CANCELLED":
                return "order-status cancelled";

            default:
                return "order-status pending";

        }

    }


    if (loading) {

        return (
            <div className="order-details-loading">
                Loading Order...
            </div>
        );

    }


    if (error) {

        return (

            <div className="order-details-error">

                <h2>
                    {error}
                </h2>

                <button
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>

            </div>

        );

    }


    if (!order) {

        return (

            <div className="order-details-error">

                <h2>
                    Order Not Found
                </h2>

                <button
                    onClick={() => navigate(-1)}
                >
                    Go Back
                </button>

            </div>

        );

    }


    return (

        <div className="order-details-page">


            {/* =========================
                HEADER
            ========================== */}

            <div className="order-details-header">

                <div>

                    <span className="page-label">
                        ORDER DETAILS
                    </span>

                    <h1>
                        Order #{order.orderId}
                    </h1>

                    <p>
                        Placed on {formatDate(order.createdAt)}
                    </p>

                </div>


                <span
                    className={
                        getStatusClass(order.status)
                    }
                >
                    {order.status}
                </span>

            </div>


            {/* =========================
                INFO CARDS
            ========================== */}

            <div className="order-info-grid">


                <div className="order-info-card">

                    <span>
                        PAYMENT METHOD
                    </span>

                    <strong>
                        {order.paymentMethod}
                    </strong>

                </div>


                <div className="order-info-card">

                    <span>
                        PHONE
                    </span>

                    <strong>
                        {order.phone}
                    </strong>

                </div>


                <div className="order-info-card">

                    <span>
                        TOTAL ITEMS
                    </span>

                    <strong>
                        {order.items?.reduce(
                            (sum, item) =>
                                sum + item.quantity,
                            0
                        )}
                    </strong>

                </div>


                <div className="order-info-card">

                    <span>
                        TOTAL AMOUNT
                    </span>

                    <strong className="total-highlight">

                        ₹ {
                            Number(
                                order.totalAmount
                            ).toLocaleString(
                                "en-IN"
                            )
                        }

                    </strong>

                </div>

            </div>


            {/* =========================
                ORDER ITEMS
            ========================== */}

            <div className="order-details-card">

                <div className="card-title">

                    <h2>
                        Ordered Products
                    </h2>

                    <span>
                        {order.items?.length || 0}
                        {" "}Products
                    </span>

                </div>


                <div className="details-items">

                    {order.items?.map((item) => (

                        <div
                            className="details-item"
                            key={item.productId}
                        >


                            <div className="details-image">

                                <img
                                    src={`http://localhost:8080/images/${item.imageUrl}`}
                                    alt={item.productName}
                                    onError={(e) => {

                                        e.target.src =
                                            "https://placehold.co/100x100";

                                    }}
                                />

                            </div>


                            <div className="details-product-info">

                                <h3>
                                    {item.productName}
                                </h3>

                                <p>
                                    ₹ {
                                        Number(
                                            item.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )
                                    }
                                </p>

                                <span>
                                    Quantity:{" "}
                                    {item.quantity}
                                </span>

                            </div>


                            <div className="details-product-total">

                                ₹ {
                                    Number(
                                        item.total
                                    ).toLocaleString(
                                        "en-IN"
                                    )
                                }

                            </div>

                        </div>

                    ))}

                </div>

            </div>


            {/* =========================
                DELIVERY
            ========================== */}

            <div className="order-bottom-grid">


                <div className="order-details-card">

                    <div className="card-title">

                        <h2>
                            Delivery Address
                        </h2>

                    </div>

                    <p className="address-text">
                        {order.address}
                    </p>

                </div>


                <div className="order-details-card">

                    <div className="card-title">

                        <h2>
                            Customer
                        </h2>

                    </div>

                    <p className="customer-name">
                        {order.customerName || "Customer"}
                    </p>

                    <p className="customer-email">
                        {order.customerEmail || ""}
                    </p>

                </div>

            </div>


            {/* =========================
                ACTIONS
            ========================== */}

            <div className="order-details-actions">

                <button
                    className="back-btn"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>


                <Link to="/products">

                    <button className="shop-btn">
                        Continue Shopping
                    </button>

                </Link>

            </div>

        </div>

    );

}