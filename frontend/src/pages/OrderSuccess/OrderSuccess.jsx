import { Link, useLocation } from "react-router-dom";

import "./OrderSuccess.css";

export default function OrderSuccess() {

    const location = useLocation();

    const order = location.state?.order;


    return (

        <div className="order-success-page">

            <div className="order-success-card">

                <div className="success-icon">
                    ✓
                </div>


                <span className="success-label">
                    ORDER CONFIRMED
                </span>


                <h1>
                    Order Placed Successfully
                </h1>


                <p>
                    Thank you for shopping with ShopKart.
                    Your order has been placed successfully.
                </p>


                {order && (

                    <div className="success-order-info">

                        <div>

                            <span>
                                Order ID
                            </span>

                            <strong>
                                #{order.orderId}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Status
                            </span>

                            <strong className="status">
                                {order.status}
                            </strong>

                        </div>


                        <div>

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹ {
                                    Number(
                                        order.totalAmount || 0
                                    ).toLocaleString("en-IN")
                                }
                            </strong>

                        </div>


                    </div>

                )}


                <div className="success-actions">

                    <Link to="/products">

                        <button className="continue-btn">
                            Continue Shopping
                        </button>

                    </Link>


                    <Link to="/">

                        <button className="home-btn">
                            Back To Home
                        </button>

                    </Link>

                </div>

            </div>

        </div>

    );

}