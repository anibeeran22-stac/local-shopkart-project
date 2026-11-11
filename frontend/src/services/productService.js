import api from "./api";

// Get All Products
export const getAllProducts = () => {
    return api.get("/products");
};

// Get Product By Id
export const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

// Add Product
export const createProduct = (formData) => {
    return api.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Update Product
export const updateProduct = (id, formData) => {
    return api.put(`/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
};

// Delete Product
export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};