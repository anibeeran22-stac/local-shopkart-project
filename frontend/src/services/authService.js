import api from "./api";

export const registerUser = (user) => {
    return api.post("/users", user);
};

export const loginUser = (loginData) => {
    return api.post("/auth/login", loginData);
};