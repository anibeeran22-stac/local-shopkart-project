import api from "./api";

// Create User
export const createUser = (userData) => {
    return api.post("/users", userData);
};

// Get All Users
export const getAllUsers = () => {
    return api.get("/users");
};

// Get User By ID
export const getUserById = (id) => {
    return api.get(`/users/${id}`);
};

// Update User Details
export const updateUser = (id, userData) => {
    return api.put(`/users/${id}`, userData);
};

// Delete User
export const deleteUser = (id) => {
    return api.delete(`/users/${id}`);
};

// Update Profile Image
export const updateProfileImage = (id, image) => {

    const formData = new FormData();

    formData.append("image", image);

    return api.post(
        `/users/${id}/profile-image`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );
};