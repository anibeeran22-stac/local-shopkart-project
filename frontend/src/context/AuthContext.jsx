import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
});

    function login(userData) {

        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setUser(userData);

    }

    function logout() {

        localStorage.removeItem("user");

        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isLoggedIn: user !== null
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}