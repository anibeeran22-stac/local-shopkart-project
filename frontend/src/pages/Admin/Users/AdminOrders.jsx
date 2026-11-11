import { useEffect, useState } from "react";

import {
    getAllOrders,
    updateOrderStatus
} from "../../../services/orderService";

import "./AdminOrders.css";

export default function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
    }, []);


    async function loadOrders() {

        try {

            const response = await getAllOrders();

            setOrders(response.data);

        } catch (error) {

            console.error("Failed to load orders:", error);

        } finally {

            setLoading(false);

        }

    }


    async function handleStatusChange(orderId, status) {

        try {

            await updateOrderStatus(
                orderId,
                status
            );

            await loadOrders();

        } catch (error) {

            console.error(
                "Failed to update order:",
                error
            );

            alert("Failed to update order status");

        }

    }


    function formatDate(date) {

        if (!date) return "-";

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    }


    if (loading) {

        return (
            <div className="admin-page-loading">
                Loading Orders...
            </div>
        );

    }


    return (

        <div className="admin-orders-page">

            <div className="admin-page-header">

                <div>

                    <span>
                        ORDER MANAGEMENT
                    </span>

                    <h1>
                        Orders
                    </h1>

                    <p>
                        View what each customer ordered and manage order status.
                    </p>

                </div>

                <div className="order-count">
                    {orders.length} Orders
                </div>

            </div>


            <div className="orders-table-wrapper">

                <table className="orders-table">

                    <thead>

                        <tr>

                            <th>Order</th>
                            <th>Customer</th>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Amount</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Date</th>

                        </tr>

                    </thead>


                    <tbody>

                        {orders.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="8"
                                    className="no-orders"
                                >
                                    No Orders Found
                                </td>

                            </tr>

                        ) : (

                            orders.map((order) => (

                                <tr key={order.orderId}>

                                    <td>

                                        <strong>
                                            #{order.orderId}
                                        </strong>

                                    </td>


                                    <td>

                                        <div className="customer-cell">

                                            <strong>
                                                {order.customerName}
                                            </strong>

                                            <span>
                                                {order.customerEmail}
                                            </span>

                                        </div>

                                    </td>


                                    <td>

                                        <div className="product-cell">

                                            <img
                                                src={order.items?.[0]?.imageUrl}
                                                alt=""
                                                onError={(e) => {
                                                    e.target.src =
                                                        "https://placehold.co/50x50";
                                                }}
                                            />

                                            <div>

                                                <strong>
                                                    {order.items?.[0]?.productName}
                                                </strong>

                                                {order.items?.length > 1 && (
                                                    <span>
                                                        +{" "}
                                                        {order.items.length - 1}
                                                        {" "}more
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                    </td>


                                    <td>
                                        {order.items?.reduce(
                                            (sum, item) =>
                                                sum + item.quantity,
                                            0
                                        )}
                                    </td>


                                    <td>

                                        ₹ {
                                            Number(
                                                order.totalAmount
                                            ).toLocaleString(
                                                "en-IN"
                                            )
                                        }

                                    </td>


                                    <td>
                                        {order.paymentMethod}
                                    </td>


                                    <td>

                                        <select
                                            className="status-select"
                                            value={order.status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.orderId,
                                                    e.target.value
                                                )
                                            }
                                        >

                                            <option value="PENDING">
                                                PENDING
                                            </option>

                                            <option value="CONFIRMED">
                                                CONFIRMED
                                            </option>

                                            <option value="SHIPPED">
                                                SHIPPED
                                            </option>

                                            <option value="DELIVERED">
                                                DELIVERED
                                            </option>

                                            <option value="CANCELLED">
                                                CANCELLED
                                            </option>

                                        </select>

                                    </td>


                                    <td>
                                        {formatDate(
                                            order.createdAt
                                        )}
                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}