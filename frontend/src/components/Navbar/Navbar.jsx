import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import "./Navbar.css";

export default function Navbar() {

    const { user, logout } = useContext(AuthContext);

    const navigate = useNavigate();


    function handleLogout() {

        logout();

        alert("Logout Successful");

        navigate("/");

    }


    return (

        <nav className="navbar">


            {/* =========================
                LOGO
            ========================== */}

            <div className="logo">

                <Link to="/">
                    ShopKart
                </Link>

            </div>


            {/* =========================
                COMMON NAV LINKS
            ========================== */}

            <ul className="nav-links">

                <li>
                    <NavLink to="/">
                        Home
                    </NavLink>
                </li>


                <li>
                    <NavLink to="/category">
                        Categories
                    </NavLink>
                </li>


                <li>
                    <NavLink to="/products">
                        Products
                    </NavLink>
                </li>


                {/* =========================
                    USER ONLY
                ========================== */}

                {user && user.role === "USER" && (

                    <>

                        <li>
                            <NavLink to="/cart">
                                Cart
                            </NavLink>
                        </li>


                        <li>
                            <NavLink to="/my-orders">
                                My Orders
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/my-account">
                                My Account
                            </NavLink>
                        </li>

                    </>

                )}


                {/* =========================
                    ADMIN ONLY
                ========================== */}

                {user && user.role === "ADMIN" && (
    <>
        <li>
            <NavLink to="/orders">
                Orders
            </NavLink>
        </li>

        <li>
            <NavLink to="/admin/users">
                Users
            </NavLink>
        </li>
    </>
)}

            </ul>


            {/* =========================
                RIGHT SIDE
            ========================== */}

            <div className="nav-right">


                {/* =========================
                    NOT LOGGED IN
                ========================== */}

                {!user && (

                    <>

                        <Link
                            to="/login"
                            className="login-btn"
                        >
                            Login
                        </Link>


                        <Link
                            to="/register"
                            className="register-btn"
                        >
                            Register
                        </Link>

                    </>

                )}


                {/* =========================
                    LOGGED IN USER
                ========================== */}

                {user && (

                    <>

                        <span className="welcome">

                            Hi, {user.firstName}

                        </span>


                        {/* =========================
                            ADMIN DASHBOARD
                        ========================== */}

                        {user.role === "ADMIN" && (

                            <Link
                                to="/admin"
                                className="admin-btn"
                            >
                                Dashboard
                            </Link>

                        )}
                        


                        {/* =========================
                            LOGOUT
                        ========================== */}

                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </>

                )}

            </div>

        </nav>

    );

}