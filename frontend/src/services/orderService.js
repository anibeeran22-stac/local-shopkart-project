import api from "./api";

// Create Order
export const createOrder = (orderData) => {
    return api.post("/orders", orderData);
};

// Get Orders By User
export const getOrdersByUser = (userId) => {
    return api.get(`/orders/user/${userId}`);
};

// Get All Orders
export const getAllOrders = () => {
    return api.get("/orders");
};

// Get Single Order
export const getOrderById = (orderId) => {
    return api.get(`/orders/${orderId}`);
};

// Update Order Status
export const updateOrderStatus = (orderId, status) => {
    return api.put(
        `/orders/${orderId}/status?status=${encodeURIComponent(status)}`
    );
};
