import api from "./api";

// Get All Categories
export const getAllCategories = () => {
    return api.get("/categories");
};

// Get Category By Id
export const getCategoryById = (id) => {
    return api.get(`/categories/${id}`);
};

// Add Category
export const createCategory = (category) => {
    return api.post("/categories", category);
};

// Update Category
export const updateCategory = (id, category) => {
    return api.put(`/categories/${id}`, category);
};

// Delete Category
export const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`);
};