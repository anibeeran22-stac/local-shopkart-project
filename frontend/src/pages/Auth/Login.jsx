import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email:"",
        password:""
    });

    const [showPassword,setShowPassword]=useState(false);

    const [loading,setLoading]=useState(false);

    function handleChange(e) {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!formData.email || !formData.password) {

            alert("Please enter email and password");
            return;

        }
        

        try {

            setLoading(true);

const response = await loginUser({
    email: formData.email,
    password: formData.password
});

login(response.data);

if (response.data.role === "ADMIN") {

    navigate("/admin");

} else {

    navigate("/");

}

if (response.data.role === "ADMIN") {



    navigate("/admin");

} else {

    navigate("/");

}

        } catch (error) {

            console.error(error);

            alert("Invalid Email or Password");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="login-page">

            <div className="login-card">

                <h1>Login</h1>

                <p>Sign in to your account</p>

                <form onSubmit={handleSubmit}>
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

                        <label>Password</label>

                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <span
                            className="show-password"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? "Hide" : "Show"}
                        </span>

                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                </form>

                <div className="login-footer">

                    <p>
                        Don't have an account?
                    </p>

                    <Link to="/register">
                        Register
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