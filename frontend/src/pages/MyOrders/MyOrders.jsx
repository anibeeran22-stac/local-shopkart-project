import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";
import { getOrdersByUser } from "../../services/orderService";

import "./MyOrders.css";

export default function MyOrders() {

    const { user } = useContext(AuthContext);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    useEffect(() => {

        if (user?.id) {
            loadOrders();
        } else {
            setLoading(false);
        }

    }, [user]);


    async function loadOrders() {

        try {

            setLoading(true);
            setError("");

            const response = await getOrdersByUser(user.id);

            console.log("Orders:", response.data);

            setOrders(response.data);

        } catch (error) {

            console.error(
                "Failed to load orders:",
                error
            );

            setError("Failed to load your orders.");

        } finally {

            setLoading(false);

        }

    }


    function formatDate(date) {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    function getStatusClass(status) {

        switch (status?.toUpperCase()) {

            case "DELIVERED":
                return "status delivered";

            case "SHIPPED":
                return "status shipped";

            case "CONFIRMED":
                return "status confirmed";

            case "CANCELLED":
                return "status cancelled";

            default:
                return "status pending";

        }

    }


    if (!user) {

        return (

            <div className="orders-login">

                <div className="orders-login-card">

                    <div className="orders-login-icon">
                        🔐
                    </div>

                    <h2>
                        Login Required
                    </h2>

                    <p>
                        Please login to view your orders.
                    </p>

                    <Link to="/login">

                        <button>
                            Login
                        </button>

                    </Link>

                </div>

            </div>

        );

    }


    if (loading) {

        return (

            <div className="orders-loading">

                <div className="loading-spinner"></div>

                <p>
                    Loading your orders...
                </p>

            </div>

        );

    }


    if (error) {

        return (

            <div className="orders-empty">

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {error}
                </p>

                <button onClick={loadOrders}>
                    Try Again
                </button>

            </div>

        );

    }


    if (orders.length === 0) {

        return (

            <div className="orders-empty">

                <div className="empty-orders-icon">
                    📦
                </div>

                <h2>
                    No Orders Yet
                </h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <Link to="/products">

                    <button>
                        Start Shopping
                    </button>

                </Link>

            </div>

        );

    }


    return (

        <div className="my-orders-page">

            {/* =========================
                HEADER
            ========================== */}

            <div className="orders-header">

                <div>

                    <span className="orders-label">
                        MY ACCOUNT
                    </span>

                    <h1>
                        My Orders
                    </h1>

                    <p>
                        Track and manage your recent orders.
                    </p>

                </div>

                <div className="order-count">

                    <strong>
                        {orders.length}
                    </strong>

                    <span>
                        Orders
                    </span>

                </div>

            </div>


            {/* =========================
                ORDERS
            ========================== */}

            <div className="orders-list">

                {orders.map((order) => (

                    <div
                        className="order-card"
                        key={order.orderId}
                    >

                        {/* ORDER HEADER */}

                        <div className="order-header-row">

                            <div>

                                <span className="small-label">
                                    ORDER ID
                                </span>

                                <h2>
                                    #{order.orderId}
                                </h2>

                            </div>


                            <div>

                                <span className="small-label">
                                    ORDER DATE
                                </span>

                                <p className="order-date">
                                    {formatDate(order.createdAt)}
                                </p>

                            </div>


                            <div>

                                <span className="small-label">
                                    PAYMENT
                                </span>

                                <p className="payment-method">
                                    {order.paymentMethod}
                                </p>

                            </div>


                            <div>

                                <span className="small-label">
                                    STATUS
                                </span>

                                <span
                                    className={
                                        getStatusClass(order.status)
                                    }
                                >
                                    {order.status}
                                </span>

                            </div>

                        </div>


                        {/* PRODUCTS */}

                        <div className="order-items">

                            {order.items?.map((item) => (

                                <div
                                    className="order-item"
                                    key={item.productId}
                                >

                                    <div className="order-item-image">

                                        <img
                                            src={`http://localhost:8080/images/${item.imageUrl}`}
                                            alt={item.productName}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://placehold.co/100x100";
                                            }}
                                        />

                                    </div>


                                    <div className="order-item-info">

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
                                            Quantity: {item.quantity}
                                        </span>

                                    </div>


                                    <div className="order-item-total">

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


                        {/* FOOTER */}

                        <div className="order-footer">

                            <div className="delivery-info">

                                <span>
                                    Delivery Address
                                </span>

                                <p>
                                    {order.address}
                                </p>

                            </div>


                            <div className="order-footer-right">

                                <div className="order-total">

                                    <span>
                                        Total Amount
                                    </span>

                                    <strong>
                                        ₹ {
                                            Number(
                                                order.totalAmount
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        }
                                    </strong>

                                </div>


                                {/* ✅ order is inside map here */}

                                <Link
                                    to={`/my-orders/${order.orderId}`}
                                >

                                    <button className="view-order-btn">
                                        View Details
                                    </button>

                                </Link>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}