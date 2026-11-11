import "./Admin.css";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { getAllOrders } from "../../services/orderService";

export default function Admin() {

    // Backend connect pannumbodhu
    // const orderCount = orders.length;

    const [orderCount, setOrderCount] = useState(0);
    useEffect(() => {
    loadOrderCount();
}, []);

async function loadOrderCount() {

    try {

        const response = await getAllOrders();

        setOrderCount(response.data.length);

    } catch (error) {

        console.error(error);

    }

}


    return (

        <div className="admin-container">

            <h1>Admin Dashboard</h1>

            <p>Welcome Admin</p>

            <div className="admin-cards">

                <Link to="/admin/categories" className="admin-card">
                    <h2>📂 Categories</h2>
                    <p>Manage Categories</p>
                </Link>

                <Link to="/admin/products" className="admin-card">
                    <h2>📦 Products</h2>
                    <p>Manage Products</p>
                </Link>

                <Link to="/admin/users" className="admin-card">
                    <h2>👤 Users</h2>
                    <p>View Users</p>
                </Link>

                <Link to="/orders" className="admin-card order-card">

                    <div className="order-header">

                        <h2>🛒 Orders</h2>

                        <span className="order-badge">
                            {orderCount}
                        </span>

                    </div>

                    <p>Manage Orders</p>

                    <small>
                        {
                            orderCount > 0
                                ? `${orderCount} Orders Available`
                                : "No Orders Yet"
                        }
                    </small>

                </Link>

            </div>

        </div>

    );

}