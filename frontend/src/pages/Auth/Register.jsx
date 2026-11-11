import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import "./Register.css";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.phone ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            alert("Please fill all fields");
            return;

        }

        if (formData.password !== formData.confirmPassword) {

            alert("Passwords do not match");
            return;

        }

        try {

            setLoading(true);

            await registerUser({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                password: formData.password,
                role: "USER"

});
            alert("Registration Successful");
            navigate("/login");

        } catch (error) {

    console.error(error);

    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    alert("Registration Failed");

} finally {

            setLoading(false);

        }

    }

    return (

        <div className="register-page">

            <div className="register-card">

                <h1>Register</h1>

                <p>Create your account</p>

                <form onSubmit={handleSubmit}>
                                        <div className="input-group">

                        <label>First Name</label>

                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <label>Last Name</label>

                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <label>Email</label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <label>Phone Number</label>

                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <label>Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="input-group">

                        <label>Confirm Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />

                        <span
                            className="show-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>

                    </div>

                    <button
                        type="submit"
                        className="register-btn"
                        disabled={loading}
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <div className="register-footer">

                    <p>Already have an account?</p>

                    <Link to="/login">
                        Login
                    </Link>

                </div>

                <div className="back-home">

                    <Link to="/">
                        Back to Home
                    </Link>

                </div>

            </div>

        </div>

    );

}